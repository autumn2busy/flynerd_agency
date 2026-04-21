# Stripe Catalog Mapping — LIVE mode

Generated: `2026-04-21T00:19:52.523Z`
Summary: 24 created
Payment methods allowed: card, link, us_bank_account
After-payment redirect: https://flynerd.tech/thanks?session_id={CHECKOUT_SESSION_ID}&lookup_key=%3Clookup_key%3E

| product_name | price_id | payment_link | file_field | lookup_key | amount | profile | action | drift |
|---|---|---|---|---|---|---|---|---|
| AI Website Quickstart (Underserved Local) - Deposit | `price_1TOS2GRVuKVVmtoDoqEHTqLK` | https://portal.flynerd.tech/b/6oU8wR1Tv2B2f2jbKybo40d | `stripeDepositPriceId / stripeDepositLink` | `flynerd_website_ul_deposit_v1` | $750 | underserved_local | created | - |
| AI Website Quickstart (Underserved Local) - Final | `price_1TOS2HRVuKVVmtoDsGmQyChm` | https://portal.flynerd.tech/b/fZu8wR7dP3F62fxg0Obo40e | `stripeFinalPriceId / stripeFinalLink` | `flynerd_website_ul_final_v1` | $750 | underserved_local | created | - |
| AI Website Concierge (Tech-Enabled Premium) - Deposit | `price_1TOS2IRVuKVVmtoDRaFgSq0O` | https://portal.flynerd.tech/b/00wdRbaq13F6f2j8ymbo40f | `STRIPE_PROFILE2_DEPOSIT_LINK (env) + stripeDepositPriceId/Link` | `flynerd_website_tp_deposit_v1` | $1750 | tech_enabled_premium | created | - |
| AI Website Concierge (Tech-Enabled Premium) - Final | `price_1TOS2JRVuKVVmtoDe0ONyehM` | https://portal.flynerd.tech/b/6oU8wR69L1wY9HZ7uibo40g | `stripeFinalPriceId / stripeFinalLink` | `flynerd_website_tp_final_v1` | $1750 | tech_enabled_premium | created | - |
| Automation Audit + Roadmap | `price_1TOS2LRVuKVVmtoDOuOiM0eY` | https://portal.flynerd.tech/b/6oU3cxeGh4JacUbcOCbo40h | `stripeDepositPriceId / stripeDepositLink` | `flynerd_audit_deposit_v1` | $495 | all | created | - |
| Automation Sprint Build - Deposit | `price_1TOS2MRVuKVVmtoDQGhi1jUT` | https://portal.flynerd.tech/b/6oUdRbbu5cbC6vN01Qbo40i | `stripeDepositPriceId / stripeDepositLink` | `flynerd_sprint_deposit_v1` | $750 | all | created | - |
| Automation Sprint Build - Final | `price_1TOS2NRVuKVVmtoDtsyWpyto` | https://portal.flynerd.tech/b/5kQcN78hTgrS1bt15Ubo40j | `stripeFinalPriceId / stripeFinalLink` | `flynerd_sprint_final_v1` | $750 | all | created | - |
| AI Concierge Launch - Deposit | `price_1TOS2ORVuKVVmtoDUlLySaPP` | https://portal.flynerd.tech/b/14AdRb69LgrS2fxbKybo40k | `stripeDepositPriceId / stripeDepositLink` | `flynerd_concierge_deposit_v1` | $1500 | all | created | - |
| AI Concierge Launch - Final | `price_1TOS2PRVuKVVmtoDm2aUsOAU` | https://portal.flynerd.tech/b/7sYfZjbu56RibQ77uibo40l | `stripeFinalPriceId / stripeFinalLink` | `flynerd_concierge_final_v1` | $1500 | all | created | - |
| Automation Care Plan | `price_1TOS2QRVuKVVmtoDfTR1O9SO` | https://portal.flynerd.tech/b/4gM9AVgOp6Ri4nF01Qbo40m | `stripeMonthlyPriceId / stripeMonthlyLink` | `flynerd_care_monthly_v1` | $997/mo | all | created | - |
| Growth Ops Partner | `price_1TOS2RRVuKVVmtoDFwiT1AHQ` | https://portal.flynerd.tech/b/14AbJ3aq14JabQ73e2bo40n | `stripeMonthlyPriceId / stripeMonthlyLink` | `flynerd_growthops_monthly_v1` | $1997/mo | all | created | - |
| Scale Ops Partner | `price_1TOS2SRVuKVVmtoDtdqXTmMS` | https://portal.flynerd.tech/b/6oU5kF8hT7Vm7zR01Qbo40o | `stripeMonthlyPriceId / stripeMonthlyLink` | `flynerd_scaleops_monthly_v1` | $3497/mo | all | created | - |
| Reputation Management Lite (Per Location) | `price_1TOS2TRVuKVVmtoDqQjipzyS` | https://portal.flynerd.tech/b/4gMaEZ55H3F64nF3e2bo40p | `addons[].stripeMonthlyPriceId / addons[].stripeMonthlyLink` | `flynerd_rep_lite_monthly_v1` | $299/mo | all | created | - |
| Reputation Management Growth (Per Location) | `price_1TOS2URVuKVVmtoDWmi8bkng` | https://portal.flynerd.tech/b/8x27sNaq1cbCg6n01Qbo40q | `addons[].stripeMonthlyPriceId / addons[].stripeMonthlyLink` | `flynerd_rep_growth_monthly_v1` | $599/mo | all | created | - |
| Local SEO Foundation | `price_1TOS2VRVuKVVmtoDSTUIWnt1` | https://portal.flynerd.tech/b/28EcN741D3F61bt3e2bo40r | `stripeMonthlyPriceId / stripeMonthlyLink` | `flynerd_localseo_monthly_v1` | $699/mo | all | created | - |
| Competitive SEO + Reputation | `price_1TOS2WRVuKVVmtoDkw3vMhIE` | https://portal.flynerd.tech/b/aFa00l2Xz1wYbQ76qebo40s | `stripeMonthlyPriceId / stripeMonthlyLink` | `flynerd_compseo_monthly_v1` | $1499/mo | all | created | - |
| Authority SEO + GEO | `price_1TOS2XRVuKVVmtoDFXw6iE12` | https://portal.flynerd.tech/b/bJefZj69L6Ri7zRbKybo40t | `stripeMonthlyPriceId / stripeMonthlyLink` | `flynerd_authoritygeo_monthly_v1` | $2499/mo | all | created | - |
| Automation Journey Build (Lite) | `price_1TOS2YRVuKVVmtoDbTWdXKtJ` | https://portal.flynerd.tech/b/fZu4gBgOpdfG07p6qebo40u | `addons[].stripeDepositPriceId / addons[].stripeDepositLink` | `flynerd_journey_lite_onetime_v1` | $1200 | all | created | - |
| Automation Journey Build (Pro) | `price_1TOS2ZRVuKVVmtoDSSUrKn1M` | https://portal.flynerd.tech/b/6oUaEZ0Pr7Vm8DV15Ubo40v | `addons[].stripeDepositPriceId / addons[].stripeDepositLink` | `flynerd_journey_pro_onetime_v1` | $2400 | all | created | - |
| Integration Pack (Standard) | `price_1TOS2aRVuKVVmtoDZgUNhA6n` | https://portal.flynerd.tech/b/cNi14p2Xz0sUg6ncOCbo40w | `addons[].stripeDepositPriceId / addons[].stripeDepositLink` | `flynerd_integration_std_onetime_v1` | $350 | all | created | - |
| Integration Pack (Advanced) | `price_1TOS2bRVuKVVmtoDhHN5uQdu` | https://portal.flynerd.tech/b/00w7sN69L6Ri3jB5mabo40x | `addons[].stripeDepositPriceId / addons[].stripeDepositLink` | `flynerd_integration_adv_onetime_v1` | $900 | all | created | - |
| Priority SLA Support Add-on | `price_1TOS2cRVuKVVmtoDHxJjVSED` | https://portal.flynerd.tech/b/bJebJ341DcbCbQ7cOCbo40y | `addons[].stripeMonthlyPriceId / addons[].stripeMonthlyLink` | `flynerd_sla_priority_monthly_v1` | $300/mo | all | created | - |
| Email Migration | `price_1TOS2dRVuKVVmtoDuf1yCJxm` | https://portal.flynerd.tech/b/eVq6oJ55Ha3u4nF8ymbo40z | `addons[].stripeDepositPriceId / addons[].stripeDepositLink` | `flynerd_email_migration_onetime_v1` | $995 | all | created | - |
| Historical Email Transfer | `price_1TOS2eRVuKVVmtoDPkxwguGu` | https://portal.flynerd.tech/b/aFa8wR69L2B2g6ndSGbo40A | `addons[].stripeDepositPriceId / addons[].stripeDepositLink` | `flynerd_email_historical_onetime_v1` | $495 | all | created | - |
