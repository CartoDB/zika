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
	ST_Centroid(the_geom_webmercator) the_geom_webmercator
  FROM
 	wikipedia
),

cases AS (
  SELECT
	generate_series(0, total-1) case_index,
  	country_name,
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
		THEN 'deaths'
	WHEN case_index
		BETWEEN deaths
		AND deaths+autochtonous_confirmed-1
		THEN 'autochtonous_confirmed'
	WHEN case_index
		BETWEEN deaths+autochtonous_confirmed
		AND deaths+autochtonous_confirmed+imported_confirmed-1
		THEN 'imported_confirmed'
    ELSE 'other'
  END,
  ST_Translate(
    cases.the_geom_webmercator,
    (cases.case_index%50)*15000,
    (floor(cases.case_index/50))*15000
  ) the_geom_webmercator
FROM
cases

--)


--select distinct on(country_name) * from cases
--select count(*) from cases
