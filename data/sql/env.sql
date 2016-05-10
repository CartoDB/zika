-- correct lat offset
update zika_env2_clean set the_geom = ST_Translate(the_geom, 0, 1.34) where cartodb_id >= 50000 and cartodb_id < 100000

--add country field to env index
update zika_env_supz set country_name=(SELECT name from world_borders WHERE ST_Within(zika_env_supz.the_geom, world_borders.the_geom) LIMIT 1) where cartodb_id >= 50000 and cartodb_id < 150000
