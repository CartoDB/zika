
-- add column that has env index > 0
--alter table us_census add column has_risk bool


-- update us_census set has_risk = (select ST_Contains(the_geom_4326, zika_env2_clean.the_geom) from zika_env2_clean limit 1) where cartodb_id >= 20000 and cartodb_id < 35000

-- with census_risk as (
--   SELECT
--     us_census.cartodb_id
--   FROM us_census, zika_env2_clean
--   where
--     ST_Contains (us_census.the_geom_4326, zika_env2_clean.the_geom)
-- )
--
-- update us_census set has_risk = EXISTS (SELECT 1 from census_risk where us_census.cartodb_id =  census_risk.cartodb_id  )

-- with zika_us_counties_at_risk2 AS (
--   SELECT
--     ST_Union (
--       ST_MakeValid (
--         st_buffer(
--           the_geom,
--           .2
--         )
--       )
--     )
--     the_geom
--   FROM nerikcarto.zika_env2_clean
--   where state_name is not null
-- )
--
-- update us_census set has_risk = st_intersects(us_census.the_geom, (select the_geom from zika_atrisk_us_zone))
--   WHERE
--   st_geometrytype(us_census.the_geom) = 'ST_MultiPolygon'


UPDATE us_census a
SET has_risk = st_intersects(a.the_geom, b.the_geom)
FROM zika_atrisk_us_zone b
WHERE
  st_geometrytype(a.the_geom) = 'ST_MultiPolygon'
