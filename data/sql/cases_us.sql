--state labels
select
	(autochtonous_confirmed is not null or    imported_confirmed is not null) has_cases,
	ST_PointOnSurface (s.the_geom_webmercator) the_geom_webmercator,
	state_name
from
nerikcarto.zika_cases_us_cdc z
left outer JOIN
nerikcarto.us_states s
ON
z.state_name = s.name







WITH
centroids AS (

SELECT
  	state_name as country_name,
  	autochtonous_confirmed,
  	imported_confirmed,
  	0 deaths,
  	  coalesce(autochtonous_confirmed,0)+
	  coalesce(imported_confirmed,0)
    as total,
	ST_PointOnSurface (s.the_geom_webmercator) the_geom_webmercator
  FROM
 	nerikcarto.zika_cases_us_cdc z
  left outer JOIN
	nerikcarto.us_states s
  ON
	z.state_name = s.name
),

cases AS (
  SELECT
	generate_series(0, total-1) case_index,
  	country_name,
    15 stack_width,
  	total,
  	deaths,
  	autochtonous_confirmed,
  	imported_confirmed,
	the_geom_webmercator
  FROM centroids
)

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




--basemap
select
w.cartodb_id,
w.the_geom,
w.the_geom_webmercator,
w.name,
z.autochtonous_confirmed,
z.imported_confirmed,
(autochtonous_confirmed is not null or    imported_confirmed is not null) has_cases
from
nerikcarto.us_states w
left outer join
nerikcarto.zika_cases_us_cdc z
on
z.state_name = w.name
