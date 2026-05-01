# How to Update Your Main n8n Chat Agent

Follow these exact steps in your n8n UI to upgrade your existing HVAC Chat Agent to support the new multi-niche architecture (photos + estimates).

## Step 1: Import the Sub-Workflow
1. In n8n, create a new workflow.
2. Select **Import from File...**
3. Select `GENERATE_ESTIMATE_SUBWORKFLOW.json` that was just generated in your `n8n-niche-workflows` folder.
4. Open the two Supabase nodes (`Save Request to DB` and `Save Result to DB`) and select your Supabase credentials.
5. Save the workflow and **Activate** it.
6. Note the exact Workflow ID (found in the URL: `.../workflow/YOUR_WORKFLOW_ID`).

## Step 2: Update the 'Normalize Input' Node
Open your existing `Normalize Input` code node in your HVAC agent and replace the code with this:

```javascript
const body = $input.first().json.body || $input.first().json || {};
const chatInput = (body.chatInput || body.message || body.text || '').trim();
let metadata = body.metadata || {};
if (typeof metadata === 'string') {
  try { metadata = JSON.parse(metadata); } catch(e) { metadata = {}; }
}
const sessionId = (
  metadata.sessionId || metadata.session_id ||
  body.sessionId || body.session_id ||
  'chat_' + Date.now()
);

// File normalization
const rawFiles = body.files || [];
const files = rawFiles.map(f => ({
  url: f.url || f.data || null,
  mimeType: f.mimeType || f.type || 'image/jpeg',
  fileName: f.fileName || f.name || `upload_${Date.now()}.jpg`,
  size: f.size || null
})).filter(f => f.url);

const niche = (metadata.niche || body.niche || 'hvac').toLowerCase();

return {
  json: {
    chatInput,
    session_id: sessionId,
    niche,
    metadata,
    files,
    hasFiles: files.length > 0,
    timestamp: new Date().toISOString()
  }
};
```

## Step 3: Add the Photo Processing Branch
1. Add an **If** node after `Normalize Input`. Name it "Has Photos?". 
   - Condition: `Boolean`, Value 1: `={{ $json.hasFiles }}`, Value 2: `true`.
2. Connect the **False** branch directly to your **AI Agent** node.
3. Connect the **True** branch to a new **HTTP Request** node named "Upload to Supabase Storage".
   - Method: `PUT`
   - URL: `={{ $env.SUPABASE_URL }}/storage/v1/object/chat-uploads/{{ $json.niche }}/{{ $json.session_id }}/{{ $json.files[0].fileName }}`
   - Authentication: Setup header `Authorization` with `Bearer {{ $env.SUPABASE_SERVICE_KEY }}`
   - Send Body: Check this. Select `Binary`. Input Data Field Name: `data` (Note: Ensure your webhook accepts binary files, or use a download node first if the widget sends URLs).
4. Connect this to a **Supabase** node named "Record Photo in DB".
   - Operation: Insert
   - Table: `estimate_photos`
   - Map `session_id` and `storage_path`.
5. Connect to an **HTTP Request** named "Analyze Photo".
   - POST to `{{ $env.AHA_API_URL }}/photo/analyze`
6. Connect to a **Code** node named "Merge Photo Context".
   - Merge the photo analysis labels into `chatInput`.
7. Finally, connect "Merge Photo Context" to the **AI Agent**.

## Step 4: Add the Estimate Tool
1. Add a **Tool Workflow** node (or `Call n8n Workflow Tool`).
2. Name it "Estimate Tool".
3. Description: `Call this tool to generate a price estimate, service band, or triage assessment when you have collected the required fields (zip, issue type, etc.). NEVER call this without the required fields.`
4. Set the Workflow ID to the ID you noted in Step 1.
5. Under `Workflow Data`, map the inputs to pass down the `session_id`, `niche`, `zip`, etc.
6. Connect this as a Tool to your **AI Agent**.

## Step 5: Update the AI Agent Prompt
Open your AI Agent node and paste this at the bottom of the System Message:

```text
7. ESTIMATE TOOL:
When the user wants an estimate / pricing / next steps, AND you have collected the minimum required fields for your niche (e.g. zip, issue type, equipment type), ALWAYS call the Estimate Tool. 
Pass a JSON object with session_id, niche, and the collected fields.
When it returns the estimate range and next actions, present them clearly in 2-3 sentences. 
ALWAYS append the provided disclaimer. 
NEVER guarantee prices.

8. PHOTO ANALYSIS:
If a photo was analyzed, the findings will be in your context. Reference them naturally (e.g., "Based on the photo, I see rust on the unit...").
```

## Step 6: Test!
Open your chat widget, send a test message for an HVAC repair (e.g. "My AC is blowing warm air, zip 30318, it's a central AC"), and watch the AI Agent trigger the Estimate Tool Sub-Workflow!
