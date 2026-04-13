const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: 'C:/Users/Mother/.env' });

// Try SUPABASE_PROJECT_URL first, fallback to SUPABASE_URL if that exists 
const url = process.env.SUPABASE_PROJECT_URL || process.env.SUPABASE_URL;

if (url.startsWith('postgres://')) {
  console.log('Error: URL is a postgres connection string! We need the API URL.');
  process.exit(1);
}

const supabase = createClient(process.env.SUPABASE_PROJECT_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

async function test() {
  const testId = 'test-refactor-' + Date.now();
  const { data, error } = await supabase.from('AgencyLead').insert({
    id: testId,
    businessName: 'Refactor Test',
    niche: 'test',
    status: 'DEMO_BUILT',
    leadSource: 'COLD',
    location: 'Atlanta, GA',
    updatedAt: new Date().toISOString(),
    contactEmail: 'autumn.s.williams+refactor-test@gmail.com'
  });

  if (error) {
    console.error('FAILED:', error);
    process.exit(1);
  }

  console.log('SUCCESS — DEMO_BUILT accepted by constraint');

  // Clean up
  await supabase.from('AgencyLead').delete().eq('id', testId);
  console.log('Test row cleaned up');
}

test();
