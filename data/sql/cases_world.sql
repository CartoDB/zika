-- country labels
select
	(autochtonous_confirmed is not null or    imported_confirmed is not null) has_cases,
	ST_PointOnSurface (the_geom_webmercator) the_geom_webmercator,
	country_name

from
nerikcarto.zika_cases_worldwide_wikipedia





-- cases

WITH
centroids AS (
  SELECT
  	country_name,
  	deaths,
  	autochtonous_confirmed,
  	imported_confirmed,
      coalesce(deaths,0)+
  	  coalesce(autochtonous_confirmed,0)+
	  coalesce(imported_confirmed,0)
    as total,
	ST_PointOnSurface (the_geom_webmercator) the_geom_webmercator
  FROM
 	nerikcarto.zika_cases_worldwide_wikipedia
),

cases AS (
  SELECT
	generate_series(0, total-1) case_index,
  	country_name,
    CASE
  		WHEN country_name IN ('Brazil','Colombia')
  		THEN 45
  		ELSE 15
  	END stack_width,
  	total,
  	deaths,
  	autochtonous_confirmed,
  	imported_confirmed,
	the_geom_webmercator
  FROM centroids
)

--,final AS (

SELECT
  country_name,
  total,
  case_index,
  CASE
	WHEN case_index
		BETWEEN	0
		AND deaths-1
		THEN '_deaths'
	WHEN case_index
		BETWEEN deaths
		AND deaths+autochtonous_confirmed-1
		THEN 'autochtonous_confirmed'
	WHEN case_index
		BETWEEN deaths+autochtonous_confirmed
		AND deaths+autochtonous_confirmed+imported_confirmed-1
		THEN 'imported_confirmed'
    ELSE 'other'
  END as type,
  ST_Translate(
    cases.the_geom_webmercator,
    ((cases.case_index%stack_width)-least(stack_width,total)/2)*18000,
    (floor(cases.case_index/stack_width))*18000
  ) the_geom_webmercator
FROM
cases
ORDER BY
type

--)


--select distinct on(country_name) * from cases
--select count(*) from cases










-- suspected cases
select
ST_Translate(
  ST_Expand(
    ST_PointOnSurface (the_geom_webmercator),
    sqrt(autochtonous_suspected)*4000
  ),
  0,
  -20000+sqrt(autochtonous_suspected)*4000
)
the_geom_webmercator
from nerikcarto.zika_cases_worldwide_wikipedia
where autochtonous_suspected > 0






-- countries
select
w.cartodb_id,
w.the_geom,
w.the_geom_webmercator,
w.name,
z.autochtonous_confirmed,
z.autochtonous_suspected,
z.imported_confirmed,
z.deaths,
(autochtonous_confirmed is not null or    imported_confirmed is not null or w.name = 'United States of America') has_cases
from
nerikcarto.world_borders w
left outer join
nerikcarto.zika_cases_worldwide_wikipedia z
on
z.country_name = w.name
