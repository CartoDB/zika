select AddGeometryColumn('nerikcarto','flights','org_geom',4326,'POINT',2)
select AddGeometryColumn('nerikcarto','flights','dst_geom',4326,'POINT',2)

-- airports geoms
update flights set org_geom=(SELECT the_geom from airports_iata where iata_code=org limit 1)
update flights set dst_geom=(SELECT the_geom from airports_iata where iata_code=dst limit 1)

-- org country centyroid
alter table flights add org_country_name character varying
alter table flights add dst_country_name character varying
update flights set org_country_name=( select name from airport_countries where code=org_country limit 1)
update flights set dst_country_name=( select name from airport_countries where code=dst_country limit 1)

alter table flights add column org_country_centroid__geom geometry('POINT',4326)
update flights set org_country_centroid__geom=( select st_pointonsurface(the_geom) from world_borders where name=org_country_name limit 1)

alter table flights add column org_country_centroid_to_dst_geom geometry('MULTILINESTRING',4326)
update flights set org_country_centroid_to_dst_geom = ST_Multi(CDB_GreatCircle(org_country_centroid__geom, dst_geom))

alter table flights_centralam add column dst_municipality character varying
update flights set dst_municipality=(select municipality from airports where iata_code=dst limit 1)

  SELECT
  cartodb_id,
  org,
  org_country_name,

  st_transform(org_country_centroid__geom, 3857) the_geom_webmercator

  FROM nerikcarto.flights
