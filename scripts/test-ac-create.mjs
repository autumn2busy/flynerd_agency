const url = 'https://awilliams.api-us1.com/admin/api.php';
const key = '0a2933218bfd5af85b3d17f067d6c3f2f93566cf4522d50de6470f4c622bf40bd23597d1';

async function request(action, data = {}) {
    const params = new URLSearchParams();
    params.append('api_action', action);
    params.append('api_key', key);
    params.append('api_output', 'json');

    const body = new URLSearchParams();
    for (const [k, v] of Object.entries(data)) {
        body.append(k, v);
    }

    const res = await fetch(`${url}?${params.toString()}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: body.toString()
    });

    return res.json();
}

async function main() {
    // 1. Get lists to find a valid list ID
    const listsRes = await request('list_list', { ids: 'all' });
    let listId = 1;
    if (listsRes && listsRes[0] && listsRes[0].id) {
        listId = listsRes[0].id;
    }

    console.log(`Using List ID: ${listId}`);

    // 2. Create message
    const htmlContent = `
        <html>
        <body>
            <p>This is a test message to verify link names.</p>
            <p>Here is a <a href="https://example.com/text" name="Text_Link_1">text link</a>.</p>
            <p>
                <a href="https://example.com/btn1" name="Button_Link_1" style="display:inline-block;padding:10px;background:blue;color:white;">Button 1</a>
            </p>
            <p>
                <a href="https://example.com/btn2" name="Button_Link_2" style="display:inline-block;padding:10px;background:red;color:white;">Button 2</a>
            </p>
        </body>
        </html>
    `;

    const msgData = {
        format: 'html',
        subject: 'Test Message with Link Names v2',
        fromemail: 'hello@flynerd.tech',
        fromname: 'FlyNerd Tech',
        reply2: 'hello@flynerd.tech',
        priority: '3',
        charset: 'utf-8',
        encoding: 'quoted-printable',
        htmlconstructor: 'editor',
        html: htmlContent,
        [`p[${listId}]`]: listId
    };

    const msgRes = await request('message_add', msgData);
    console.log('Message Create Result:', msgRes);

    if (msgRes.result_code === 0) {
        console.error('Failed to create message');
        return;
    }

    const messageId = msgRes.id || msgRes[0]?.id || (msgRes.success ? msgRes.id : null);
    
    // Some API v1 endpoints return ID differently
    let actualMsgId = msgRes.id;
    if (!actualMsgId) {
         // Attempt to extract from result
         console.log("Response keys:", Object.keys(msgRes));
    }
    
    console.log(`Created Message ID: ${actualMsgId}`);

    // 3. Create campaign
    const campData = {
        type: 'single',
        name: `Test Campaign ${Date.now()}`,
        sdate: '2030-01-01 00:00:00', // far future just in case, but status=0 makes it draft
        status: '0', // 0 = draft
        public: '1',
        tracklinks: 'all',
        trackreads: '1',
        trackreadsanalytics: '0',
        [`m[${actualMsgId}]`]: '100',
        [`p[${listId}]`]: listId
    };

    const campRes = await request('campaign_create', campData);
    console.log('Campaign Create Result:', campRes);
    console.log(`Created Campaign ID: ${campRes.id}`);
}

main().catch(console.error);
