
-- 'compress' geometries of the census obs table (2gb -> 200mb), then re-import
select
st_simplify(the_geom,0.0001) the_geom,income_below_poverty_level,per_capita_income,total_pop,hispanic_or_latino_pop,"30_to_34_years_female_pop","25_to_29_years_female_pop","22_to_24_years_female_pop","21_years_female_pop","20_years_female_pop","18_and_19_years_female_pop","15_to_17_years_female_pop" from observatory.us_census_acs2013_5yr_census_tract_clipped

alter table us_census add column women_childbearing decimal
alter table us_census add column women_childbearing_ratio decimal
alter table us_census add column income_below_poverty_level_ratio decimal
alter table us_census add column hispanic_or_latino_pop_ratio decimal

update us_census set women_childbearing=_15_to_17_years_female_pop+_18_and_19_years_female_pop+_20_years_female_pop+_21_years_female_pop+_22_to_24_years_female_pop+_25_to_29_years_female_pop+_30_to_34_years_female_pop

update us_census set women_childbearing_ratio=women_childbearing/total_pop where total_pop>0

-- prepare for CDB_Albers
update us_census set state = 'Alaska' where st_y(st_centroid(the_geom)) > 50.217337
  update us_census set state = 'Puerto Rico' where st_y(st_centroid(the_geom)) < 20 and st_x(st_centroid(the_geom)) > -70
    update us_census set state = 'Hawaii' where st_y(st_centroid(the_geom)) < 50.217337 and st_x(st_centroid(the_geom)) < -145

alter table us_census add column the_geom_us geometry('MULTIPOLYGON',4326)
update us_census set the_geom_us = st_multi(CDB_AlbersUSA(ST_CollectionExtract(the_geom,3),state))


-- cities name layer
  update populated_places_us set adm1name = 'Puerto Rico' where adm0name = 'Puerto Rico'
alter table populated_places_us add column the_geom_4326 geometry('POINT',4326)
update populated_places_us set the_geom_4326 = the_geom
  update populated_places_us set the_geom = CDB_AlbersUSA(the_geom_4326, adm1name)
