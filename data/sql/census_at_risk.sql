
-- add column that has env index > 0
--alter table us_census add column has_risk bool


-- update us_census set has_risk = (select ST_Contains(the_geom_4326, zika_env2_clean.the_geom) from zika_env2_clean limit 1) where cartodb_id >= 20000 and cartodb_id < 35000

with census_risk as (
  SELECT
    us_census.cartodb_id
  FROM us_census, zika_env2_clean
  where
    ST_Contains (us_census.the_geom_4326, zika_env2_clean.the_geom)
)

update us_census set has_risk = EXISTS (SELECT 1 from census_risk where us_census.cartodb_id =  census_risk.cartodb_id  )
