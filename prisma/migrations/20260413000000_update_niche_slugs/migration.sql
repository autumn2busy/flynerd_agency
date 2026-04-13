-- Insert missing niches into niche_config
INSERT INTO "niche_config" ("niche_key", "display_name", "category", "system_prompt", "interest_score", "is_active")
VALUES 
  ('workers-comp', 'Workers Compensation', 'Legal', 'Legal intake specialist. Collect incident and injury details.', 80, true),
  ('dental-implants', 'Dental Implants', 'Medical', 'Dental implant coordinator. Focus on missing teeth replacement solutions.', 75, false),
  ('plastic-surgery', 'Plastic Surgery', 'Medical', 'Plastic surgery consultant. Focus on cosmetic procedures and recovery.', 85, false),
  ('pool-builders', 'Pool Builders', 'Home High-Ticket', 'Custom pool builder and installation specialist.', 82, false),
  ('weight-loss', 'Medical Weight Loss', 'Medical', 'Medical weight loss clinic. Focus on GLP-1s and dietary management.', 88, false)
ON CONFLICT ("niche_key") DO UPDATE 
SET 
  "is_active" = EXCLUDED."is_active",
  "display_name" = EXCLUDED."display_name";

-- Update tables to use the new kebab-case slugs

UPDATE "AgencyLead" SET "niche" = 
  CASE "niche"
    WHEN 'personal_injury' THEN 'personal-injury'
    WHEN 'hormone_therapy_trt' THEN 'trt-clinic'
    WHEN 'solar_panel_installers' THEN 'solar'
    WHEN 'fertility_clinics' THEN 'fertility'
    WHEN 'divorce_law' THEN 'family-law'
    WHEN 'workers_comp' THEN 'workers-comp'
    WHEN 'dental_implants' THEN 'dental-implants'
    WHEN 'plastic_surgery' THEN 'plastic-surgery'
    WHEN 'pool_builders' THEN 'pool-builders'
    WHEN 'weight_loss' THEN 'weight-loss'
    ELSE "niche"
  END
WHERE "niche" IN ('personal_injury', 'hormone_therapy_trt', 'solar_panel_installers', 'fertility_clinics', 'divorce_law', 'workers_comp', 'dental_implants', 'plastic_surgery', 'pool_builders', 'weight_loss');

UPDATE "Client" SET "niche" = 
  CASE "niche"
    WHEN 'personal_injury' THEN 'personal-injury'
    WHEN 'hormone_therapy_trt' THEN 'trt-clinic'
    WHEN 'solar_panel_installers' THEN 'solar'
    WHEN 'fertility_clinics' THEN 'fertility'
    WHEN 'divorce_law' THEN 'family-law'
    WHEN 'workers_comp' THEN 'workers-comp'
    WHEN 'dental_implants' THEN 'dental-implants'
    WHEN 'plastic_surgery' THEN 'plastic-surgery'
    WHEN 'pool_builders' THEN 'pool-builders'
    WHEN 'weight_loss' THEN 'weight-loss'
    ELSE "niche"
  END
WHERE "niche" IN ('personal_injury', 'hormone_therapy_trt', 'solar_panel_installers', 'fertility_clinics', 'divorce_law', 'workers_comp', 'dental_implants', 'plastic_surgery', 'pool_builders', 'weight_loss');

UPDATE "estimate_photos" SET "niche" = 
  CASE "niche"
    WHEN 'personal_injury' THEN 'personal-injury'
    WHEN 'hormone_therapy_trt' THEN 'trt-clinic'
    WHEN 'solar_panel_installers' THEN 'solar'
    WHEN 'fertility_clinics' THEN 'fertility'
    WHEN 'divorce_law' THEN 'family-law'
    WHEN 'workers_comp' THEN 'workers-comp'
    WHEN 'dental_implants' THEN 'dental-implants'
    WHEN 'plastic_surgery' THEN 'plastic-surgery'
    WHEN 'pool_builders' THEN 'pool-builders'
    WHEN 'weight_loss' THEN 'weight-loss'
    ELSE "niche"
  END
WHERE "niche" IN ('personal_injury', 'hormone_therapy_trt', 'solar_panel_installers', 'fertility_clinics', 'divorce_law', 'workers_comp', 'dental_implants', 'plastic_surgery', 'pool_builders', 'weight_loss');

UPDATE "estimate_requests" SET "niche" = 
  CASE "niche"
    WHEN 'personal_injury' THEN 'personal-injury'
    WHEN 'hormone_therapy_trt' THEN 'trt-clinic'
    WHEN 'solar_panel_installers' THEN 'solar'
    WHEN 'fertility_clinics' THEN 'fertility'
    WHEN 'divorce_law' THEN 'family-law'
    WHEN 'workers_comp' THEN 'workers-comp'
    WHEN 'dental_implants' THEN 'dental-implants'
    WHEN 'plastic_surgery' THEN 'plastic-surgery'
    WHEN 'pool_builders' THEN 'pool-builders'
    WHEN 'weight_loss' THEN 'weight-loss'
    ELSE "niche"
  END
WHERE "niche" IN ('personal_injury', 'hormone_therapy_trt', 'solar_panel_installers', 'fertility_clinics', 'divorce_law', 'workers_comp', 'dental_implants', 'plastic_surgery', 'pool_builders', 'weight_loss');

UPDATE "estimate_results" SET "niche" = 
  CASE "niche"
    WHEN 'personal_injury' THEN 'personal-injury'
    WHEN 'hormone_therapy_trt' THEN 'trt-clinic'
    WHEN 'solar_panel_installers' THEN 'solar'
    WHEN 'fertility_clinics' THEN 'fertility'
    WHEN 'divorce_law' THEN 'family-law'
    WHEN 'workers_comp' THEN 'workers-comp'
    WHEN 'dental_implants' THEN 'dental-implants'
    WHEN 'plastic_surgery' THEN 'plastic-surgery'
    WHEN 'pool_builders' THEN 'pool-builders'
    WHEN 'weight_loss' THEN 'weight-loss'
    ELSE "niche"
  END
WHERE "niche" IN ('personal_injury', 'hormone_therapy_trt', 'solar_panel_installers', 'fertility_clinics', 'divorce_law', 'workers_comp', 'dental_implants', 'plastic_surgery', 'pool_builders', 'weight_loss');

UPDATE "kb_items" SET "niche" = 
  CASE "niche"
    WHEN 'personal_injury' THEN 'personal-injury'
    WHEN 'hormone_therapy_trt' THEN 'trt-clinic'
    WHEN 'solar_panel_installers' THEN 'solar'
    WHEN 'fertility_clinics' THEN 'fertility'
    WHEN 'divorce_law' THEN 'family-law'
    WHEN 'workers_comp' THEN 'workers-comp'
    WHEN 'dental_implants' THEN 'dental-implants'
    WHEN 'plastic_surgery' THEN 'plastic-surgery'
    WHEN 'pool_builders' THEN 'pool-builders'
    WHEN 'weight_loss' THEN 'weight-loss'
    ELSE "niche"
  END
WHERE "niche" IN ('personal_injury', 'hormone_therapy_trt', 'solar_panel_installers', 'fertility_clinics', 'divorce_law', 'workers_comp', 'dental_implants', 'plastic_surgery', 'pool_builders', 'weight_loss');

UPDATE "kb_source" SET "niche" = 
  CASE "niche"
    WHEN 'personal_injury' THEN 'personal-injury'
    WHEN 'hormone_therapy_trt' THEN 'trt-clinic'
    WHEN 'solar_panel_installers' THEN 'solar'
    WHEN 'fertility_clinics' THEN 'fertility'
    WHEN 'divorce_law' THEN 'family-law'
    WHEN 'workers_comp' THEN 'workers-comp'
    WHEN 'dental_implants' THEN 'dental-implants'
    WHEN 'plastic_surgery' THEN 'plastic-surgery'
    WHEN 'pool_builders' THEN 'pool-builders'
    WHEN 'weight_loss' THEN 'weight-loss'
    ELSE "niche"
  END
WHERE "niche" IN ('personal_injury', 'hormone_therapy_trt', 'solar_panel_installers', 'fertility_clinics', 'divorce_law', 'workers_comp', 'dental_implants', 'plastic_surgery', 'pool_builders', 'weight_loss');

UPDATE "niches" SET "key" = 
  CASE "key"
    WHEN 'personal_injury' THEN 'personal-injury'
    WHEN 'hormone_therapy_trt' THEN 'trt-clinic'
    WHEN 'solar_panel_installers' THEN 'solar'
    WHEN 'fertility_clinics' THEN 'fertility'
    WHEN 'divorce_law' THEN 'family-law'
    WHEN 'workers_comp' THEN 'workers-comp'
    WHEN 'dental_implants' THEN 'dental-implants'
    WHEN 'plastic_surgery' THEN 'plastic-surgery'
    WHEN 'pool_builders' THEN 'pool-builders'
    WHEN 'weight_loss' THEN 'weight-loss'
    ELSE "key"
  END
WHERE "key" IN ('personal_injury', 'hormone_therapy_trt', 'solar_panel_installers', 'fertility_clinics', 'divorce_law', 'workers_comp', 'dental_implants', 'plastic_surgery', 'pool_builders', 'weight_loss');
