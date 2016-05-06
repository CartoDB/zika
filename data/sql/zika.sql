update nerikcarto.zika_env_supz set the_geom = st_translate(the_geom, 0, 1.35)

SELECT
string_agg(iata_code, ' ')
FROM nerikcarto.airports where type = 'large_airport'
and
iso_country = 'BR'



SELECT
a.iso_country,
a.municipality,
a.iata_code,
ac.name,
z.autochtonous_confirmed
FROM
nerikcarto.airports a,
nerikcarto.airport_countries ac,
zika_cases_worldwide_wikipedia z
where
a.iso_country = ac.code
and
ac.name = z.country_name
and
z.autochtonous_confirmed > 15
and
type in('large_airport','small_airport')
and
iata_code <> ''



update nerikcarto.flights
set org_geom = (
  SELECT the_geom
  from
	nerikcarto.airports
  where iata_code = org
  limit 1
)
