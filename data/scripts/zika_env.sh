# raster to csv
python ../python/gdal2xyz.py -skip 3 -csv raw/zika_raster.tif zika_env.csv

# remove lines with zero values
sed '/\-1\.7e\+308/d' zika_env.csv | sed '/,0$/d' > zika_env_supz.csv

# add csv headers
echo 'lon,lat,value' | cat - zika_env_supz.csv > tmp && mv tmp zika_env_supz.csv
