# MapMob Neighborhood Map

This folder includes files and scripts to generate neighborhood agreement level maps as well as neighborhood norms maps. To run the script, download all three files and put them in the same directory. 

[*R_installpackages.R*](R_installpackages.R) has all the installation commands for necessary R packages. 

[*newyork_raster.tif*](newyork_raster.tif) is a raster file with 1,725,000 30m * 30m grid cells over New York City. 

[*api_neighb_count_norms.R*](api_neighb_count_norms.R) generates all the map geojsons and output in the same directory. 

To run in command line: 

1. Navigate to the directory where the script is. 

2. Run:
```
Rscript R_installpackages.R
```
3. Run:
```
Rscript api_neighb_count_norms.R
```

## Neighborhood Map for Start Page

[*Map_file_circles*](Map_file_circles) has aggregated polygons for all the neighborhoods forked from DNAInfo. It also has some circles generated from OpenPaths dataset in NYC ([ny_circles.geojson](https://github.com/nyu-mhealth/Recruitment-Interactive/blob/master/NeighborhoodMap/Map_file_circles/nyc_circles.geojson)). These files might be helpful for the recruit start page. 

Some example for discussion: 

Astoria

<img src="/NeighborhoodMap/Images/astoria_poly.png"> 
