insert into public.niches (key, display_name)
values
  ('water_damage_restoration', 'Water Damage Restoration'),
  ('senior_home_care', 'Senior Home Care'),
  ('personal_injury_law', 'Personal Injury Law'),
  ('hvac', 'HVAC'),
  ('plumbing', 'Plumbing')
on conflict (key) do update
set display_name = excluded.display_name,
    is_active = true,
    updated_at = now();
