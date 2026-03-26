const fs = require('fs');
const path = require('path');

try {
  console.log("START SCRIPT");
  const rawBase = fs.readFileSync('C:/Users/Mother/Projects/flynerd-agency/public/n8n-niche-workflows/HVAC_ESTIMATE_SUBWORKFLOW.json', 'utf8');
  const baseJson = JSON.parse(rawBase);

  // Fix the empty field bug (Target the raw string directly)
  // Fix the empty field bug using proper JS objects instead of dangerous regex
  const saveResultNode = baseJson.nodes.find(n => n.name === 'Save Result to DB');
  if (saveResultNode && saveResultNode.parameters.fieldsUi) {
    saveResultNode.parameters.fieldsUi.fieldValues = saveResultNode.parameters.fieldsUi.fieldValues.filter(f => Object.keys(f).length > 0);
  }
  let cleanedBaseStr = JSON.stringify(baseJson);

  const niches = [
    {
      name: "roofing", title: "Roofing",
      validationLogic: "let input = $input.first().json;\nif (input.input && typeof input.input === 'string') { try { input = JSON.parse(input.input); } catch(e) {} }\nconst errors = [];\nif (!input.session_key) errors.push('session_key required');\nif (!input.zip || !/^\\d{5}$/.test(input.zip)) errors.push('A valid 5-digit ZIP code is required.');\nif (!input.issue_type) errors.push('issue_type required');\nreturn { json: { ...input, niche: 'roofing', valid: errors.length === 0, errors } };",
      pricingLogic: "const input = $input.first().json;\nconst issue = (input.issue_type || '').toLowerCase();\nconst urgency = (input.urgency || '').toLowerCase();\nlet low=150, high=600, action='schedule_diagnostic', cta='A technician needs to assess this on-site.';\nlet disclaimer = \"Preliminary estimate. Actual costs depend on physical inspection.\";\n\nif (issue.includes('replace') || issue.includes('new roof') || issue.includes('install')) {\n    low = 8500; high = 25000; action = 'schedule_consultation';\n    cta = 'I highly recommend a free, no-obligation roof replacement consultation.';\n} else if (issue.includes('repair') || issue.includes('leak')) {\n    low = 350; high = 1200; action = 'schedule_diagnostic';\n    cta = 'We can easily schedule a technician to inspect and patch the leak.';\n}\n\nif (urgency.includes('emergency') || urgency.includes('storm')) {\n    action = 'dispatch_emergency';\n    cta = 'Since this is an emergency, our storm response team will be dispatched ASAP.';\n    low = 500; high = 1500; disclaimer = \"Emergency tarping/mitigation rates apply.\";\n}\nreturn { json: { ...input, estimate_low: low, estimate_high: high, estimate_range: \"$\" + low + \" - $\" + high, action, disclaimer, next_message: cta } };"
    },
    {
      name: "water_damage", title: "Water Damage",
      validationLogic: "let input = $input.first().json;\nif (input.input && typeof input.input === 'string') { try { input = JSON.parse(input.input); } catch(e) {} }\nconst errors = [];\nif (!input.session_key) errors.push('session_key required');\nif (!input.zip || !/^\\d{5}$/.test(input.zip)) errors.push('A valid 5-digit ZIP code is required.');\nif (!input.issue_type) errors.push('issue_type required');\nreturn { json: { ...input, niche: 'water_damage', valid: errors.length === 0, errors } };",
      pricingLogic: "const input = $input.first().json;\nconst issue = (input.issue_type || '').toLowerCase();\nlet low=500, high=1500, action='schedule_diagnostic', cta='We should schedule an assessment to check moisture levels.';\nlet disclaimer = \"Estimates vary heavily based on square footage and category of water.\";\n\nif (issue.includes('flood') || issue.includes('sewage') || issue.includes('emergency')) {\n    low = 2500; high = 5000; action = 'dispatch_emergency';\n    cta = 'Water damage spreads quickly. Our mitigation team can be dispatched immediately.';\n} else if (issue.includes('restoration') || issue.includes('mold') || issue.includes('full')) {\n    low = 5000; high = 20000; action = 'schedule_consultation';\n    cta = 'For full restoration, we will need to schedule a comprehensive site evaluation.';\n}\nreturn { json: { ...input, estimate_low: low, estimate_high: high, estimate_range: \"$\" + low + \" - $\" + high, action, disclaimer, next_message: cta } };"
    },
    {
      name: "plumbing", title: "Plumbing",
      validationLogic: "let input = $input.first().json;\nif (input.input && typeof input.input === 'string') { try { input = JSON.parse(input.input); } catch(e) {} }\nconst errors = [];\nif (!input.session_key) errors.push('session_key required');\nif (!input.zip || !/^\\d{5}$/.test(input.zip)) errors.push('A valid 5-digit ZIP code is required.');\nif (!input.issue_type) errors.push('issue_type required');\nreturn { json: { ...input, niche: 'plumbing', valid: errors.length === 0, errors } };",
      pricingLogic: "const input = $input.first().json;\nconst issue = (input.issue_type || '').toLowerCase();\nconst urgency = (input.urgency || '').toLowerCase();\nlet low=150, high=450, action='schedule_diagnostic', cta='A plumber needs to diagnose this. The dispatch fee is usually applied to the repair.';\nlet disclaimer = \"Preliminary range. Costs depend on parts and labor time.\";\n\nif (issue.includes('water heater') || issue.includes('replace') || issue.includes('install')) {\n    low = 1200; high = 3500; action = 'schedule_consultation';\n    cta = 'We can schedule a consultation to discuss unit replacement options.';\n}\n\nif (urgency.includes('emergency') || urgency.includes('burst') || urgency.includes('flood')) {\n    action = 'dispatch_emergency';\n    cta = 'This sounds urgent. Our on-call plumber will respond ASAP.';\n    low = 350; high = 800; disclaimer = \"Emergency dispatch rates apply.\";\n}\nreturn { json: { ...input, estimate_low: low, estimate_high: high, estimate_range: \"$\" + low + \" - $\" + high, action, disclaimer, next_message: cta } };"
    },
    {
      name: "med_spa", title: "Med Spa",
      validationLogic: "let input = $input.first().json;\nif (input.input && typeof input.input === 'string') { try { input = JSON.parse(input.input); } catch(e) {} }\nconst errors = [];\nif (!input.session_key) errors.push('session_key required');\nif (!input.issue_type) errors.push('issue_type required');\nreturn { json: { ...input, niche: 'med_spa', valid: errors.length === 0, errors } };",
      pricingLogic: "const input = $input.first().json;\nconst issue = (input.issue_type || '').toLowerCase();\nlet low=150, high=400, action='book_appointment', cta='Would you like to check our availability for this treatment?';\nlet disclaimer = \"Pricing is based on standard units/sessions. Exact quotes provided at consultation.\";\n\nif (issue.includes('botox') || issue.includes('filler') || issue.includes('inject')) {\n    low = 300; high = 1200; action = 'book_appointment';\n    cta = 'We offer personalized consultations for all injectables.';\n} else if (issue.includes('laser') || issue.includes('sculpt')) {\n    low = 500; high = 2500; action = 'book_consultation';\n    cta = 'Let\\'s schedule a free consultation to map out a treatment plan.';\n}\nreturn { json: { ...input, estimate_low: low, estimate_high: high, estimate_range: \"$\" + low + \" - $\" + high, action, disclaimer, next_message: cta } };"
    },
    {
      name: "pest_control", title: "Pest Control",
      validationLogic: "let input = $input.first().json;\nif (input.input && typeof input.input === 'string') { try { input = JSON.parse(input.input); } catch(e) {} }\nconst errors = [];\nif (!input.session_key) errors.push('session_key required');\nif (!input.zip || !/^\\d{5}$/.test(input.zip)) errors.push('A valid 5-digit ZIP code is required.');\nif (!input.issue_type) errors.push('issue_type required');\nreturn { json: { ...input, niche: 'pest_control', valid: errors.length === 0, errors } };",
      pricingLogic: "const input = $input.first().json;\nconst issue = (input.issue_type || '').toLowerCase();\nlet low=150, high=300, action='book_service', cta='We can get a technician out to handle the initial treatment.';\nlet disclaimer = \"Pricing covers standard initial treatments. Severe infestations may vary.\";\n\nif (issue.includes('termite') || issue.includes('bed bug')) {\n    low = 1000; high = 3500; action = 'schedule_inspection';\n    cta = 'For this type of pest, we require a comprehensive on-site inspection first.';\n} else if (issue.includes('recurring') || issue.includes('plan')) {\n    low = 50; high = 100; action = 'book_consultation';\n    cta = 'Our preventative plans usually bill monthly or quarterly.';\n    disclaimer = \"Quoted as a monthly rate after initial service fee.\";\n}\nreturn { json: { ...input, estimate_low: low, estimate_high: high, estimate_range: \"$\" + low + \" - $\" + high, action, disclaimer, next_message: cta } };"
    },
    {
      name: "senior_care", title: "Senior Care",
      validationLogic: "let input = $input.first().json;\nif (input.input && typeof input.input === 'string') { try { input = JSON.parse(input.input); } catch(e) {} }\nconst errors = [];\nif (!input.session_key) errors.push('session_key required');\nif (!input.zip || !/^\\d{5}$/.test(input.zip)) errors.push('A valid 5-digit ZIP code is required.');\nif (!input.issue_type) errors.push('issue_type required');\nreturn { json: { ...input, niche: 'senior_care', valid: errors.length === 0, errors } };",
      pricingLogic: "const input = $input.first().json;\nconst issue = (input.issue_type || '').toLowerCase();\nlet low=25, high=45, action='schedule_assessment', cta='We always start with a free in-home care assessment.';\nlet disclaimer = \"Hourly rates. Minimum shift hours often apply.\";\n\nif (issue.includes('24') || issue.includes('live-in') || issue.includes('round the clock')) {\n    low = 15000; high = 25000; action = 'schedule_consultation';\n    cta = 'For round-the-clock care, let\\'s connect with our care coordinator.';\n    disclaimer = \"Monthly estimate for comprehensive full-time care.\";\n} else if (issue.includes('facility') || issue.includes('living')) {\n    low = 3500; high = 8000; action = 'schedule_tour';\n    cta = 'We would love to schedule a tour of the community for you.';\n    disclaimer = \"Monthly facility room and board + base care level.\";\n}\nreturn { json: { ...input, estimate_low: low, estimate_high: high, estimate_range: \"$\" + low + \" - $\" + high, action, disclaimer, next_message: cta } };"
    },
    {
      name: "personal_injury", title: "Personal Injury",
      validationLogic: "let input = $input.first().json;\nif (input.input && typeof input.input === 'string') { try { input = JSON.parse(input.input); } catch(e) {} }\nconst errors = [];\nif (!input.session_key) errors.push('session_key required');\nif (!input.issue_type) errors.push('issue_type required');\nreturn { json: { ...input, niche: 'personal_injury', valid: errors.length === 0, errors } };",
      pricingLogic: "const input = $input.first().json;\nreturn { \n    json: { \n        ...input, \n        estimate_low: 0, \n        estimate_high: 0, \n        estimate_range: \"Contingency Fee (No upfront costs)\", \n        action: 'schedule_consultation', \n        disclaimer: \"We only get paid if you win your case. Typical fee is a standard percentage of the settlement.\", \n        next_message: 'Let\\'s schedule a completely free, confidential case review with an attorney.' \n    } \n};"
    },
    {
      name: "estate_planning", title: "Estate Planning",
      validationLogic: "let input = $input.first().json;\nif (input.input && typeof input.input === 'string') { try { input = JSON.parse(input.input); } catch(e) {} }\nconst errors = [];\nif (!input.session_key) errors.push('session_key required');\nif (!input.issue_type) errors.push('issue_type required');\nreturn { json: { ...input, niche: 'estate_planning', valid: errors.length === 0, errors } };",
      pricingLogic: "const input = $input.first().json;\nconst issue = (input.issue_type || '').toLowerCase();\nlet low=500, high=1500, action='schedule_consultation', cta='We can map out a plan during an initial strategy session.';\nlet disclaimer = \"Flat-fee pricing based on standard documentation needs.\";\n\nif (issue.includes('trust') || issue.includes('living trust') || issue.includes('comprehensive')) {\n    low = 2500; high = 5000;\n    cta = 'A comprehensive trust package provides the best protection. Let\\'s schedule a consultation.';\n}\nreturn { json: { ...input, estimate_low: low, estimate_high: high, estimate_range: \"$\" + low + \" - $\" + high, action, disclaimer, next_message: cta } };"
    }
  ];

  const targetDir = 'C:/Users/Mother/Projects/flynerd-agency/public/n8n-niche-workflows';

  niches.forEach((niche, idx) => {
    let nicheStr = cleanedBaseStr;
    
    // String replaces for Name and ID
    nicheStr = nicheStr.replace(/"hvac_estimate_subworkflow"/g, '"' + niche.name + '_estimate_subworkflow"');
    nicheStr = nicheStr.replace(/"USaO1HV2RtKzUx39"/g, '"wkflw_' + niche.name + '_10' + idx + '"');

    // String replaces for node names
    nicheStr = nicheStr.replace(/"Validate HVAC Input"/g, '"Validate ' + niche.title + ' Input"');
    nicheStr = nicheStr.replace(/"Calculate HVAC Pricing \(Internal\)"/g, '"Calculate ' + niche.title + ' Pricing (Internal)"');

    // Parse it back to json to safely inject code blocks without quoting nightmares
    const newJson = JSON.parse(nicheStr);

    const validateNode = newJson.nodes.find(n => n.name === 'Validate ' + niche.title + ' Input');
    if (validateNode) {
      validateNode.parameters.jsCode = niche.validationLogic;
    }

    const calcNode = newJson.nodes.find(n => n.name === 'Calculate ' + niche.title + ' Pricing (Internal)');
    if (calcNode) {
      calcNode.parameters.jsCode = niche.pricingLogic;
    }

    const filename = path.join(targetDir, niche.name.toUpperCase() + '_ESTIMATE_SUBWORKFLOW.json');
    fs.writeFileSync(filename, JSON.stringify(newJson, null, 2));
  });

  console.log("Successfully generated " + niches.length + " subworkflows.");
} catch (e) {
  console.log("CRASHED:", e.message);
}
