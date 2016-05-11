SELECT
cartodb_id,
state_name,
value,
the_geom_webmercator

FROM nerikcarto.zika_env2_clean where country_name = 'United States' or country_name = 'Puerto Rico'

-- Add us state column + projected geometry to cases table
UPDATE zika_env2_clean SET state_name=( SELECT name FROM us_states WHERE ST_Within(zika_env2_clean.the_geom, us_states.the_geom_4326) limit 1 ) WHERE country_name = 'United States' OR country_name = 'Puerto Rico'
SELECT AddGeometryColumn('nerikcarto', 'zika_env2_clean', 'the_geom_us', 4326, 'POINT',2)

UPDATE zika_env2_clean SET the_geom_us=CDB_AlbersUSA(the_geom, state_name) WHERE country_name = 'United States' OR country_name = 'Puerto Rico'

SELECT
st_transform(the_geom_us, 3857) the_geom_webmercator
FROM nerikcarto.zika_env2_clean
where state_name is not null
