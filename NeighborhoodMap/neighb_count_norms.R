library(rgdal)
library(raster)
library(jsonlite)
dyn.load('/Library/Java/JavaVirtualMachines/jdk1.8.0_91.jdk/Contents/Home/jre/lib/server/libjvm.dylib')
require(rJava)
library(rgeos)
library(geojsonio)
library(httr)

setwd("~/Documents/projects/DNAInfo/Draw-Your-Neighborhood/New_York")
neighb_name<- list.files()
# capitalize the first letter of neighborhood name for plotting
simpleCap <- function(x) {
  s <- strsplit(x, " ")[[1]]
  paste(toupper(substring(s, 1,1)), substring(s, 2),
        sep="", collapse=" ")
}
# create a raster for New York
ras<- raster(nybb2, nrow=1150, ncol=1500)
values(ras)<- 1:ncell(ras)
ras@data@names<- 1:ncell(ras)

# Loop through all the folders to produce maps
# set up parallel
#registerDoParallel(cores=4)
#foreach (i=neighb_name) %dopar% {
for (i in neighb_name){
  # go to the original folder
  setwd("~/Documents/projects/DNAInfo/Draw-Your-Neighborhood/New_York")
  # go into each neighborhood folder
  setwd(i)
  # get all the names of the geojson
  poly_name<- list.files()
  poly_name<- poly_name[grep(".geojson",poly_name, ignore.case=T)]
  # initiate a neighborhodd polygon with the first polygon in folder
  poli<- fromJSON(poly_name[1])
  c<- poli[[3]][[2]]
  cx<- c[1:(length(c)/2)]
  cy<- c[(length(c)/2+1):length(c)]
  coo<- cbind(cx,cy)
  a1<- SpatialPolygons(list(Polygons(list(Polygon(coo)), ID=i)), proj4string = CRS("+proj=longlat +datum=WGS84"))
  
  # read in all the neighborhoods and combine to a polygon
  neighb<- a1
  for (j in poly_name[2:length(poly_name)]){
    poli<- try(fromJSON(j))
    c<- poli[[3]][[2]]
    cx<- c[1:(length(c)/2)]
    cy<- c[(length(c)/2+1):length(c)]
    coo<- cbind(cx,cy)
    sp_poly<- SpatialPolygons(list(Polygons(list(Polygon(coo)), ID=j)), proj4string = CRS("+proj=longlat +datum=WGS84"))
    #sp_poly<- list(sp_poly)
    neighb<- rbind(neighb, sp_poly)
  }
  # join neighborhood polygon to new york raster, count the number of polygon falling in each cell of the raster
  neighb_count <- rasterize(neighb, ras, fun='count')
  neighb_count@data@values<- neighb_count@data@values/length(poly_name)
  neighb_count[neighb_count<0.25]<- NA
  neighb_count<- trim(neighb_count)
  # get the bounding box of merged neighborhood polygon and crop
  # boxny<- as(extent(as.vector(t(bbox(ras)))), "SpatialPolygons")
  # boxneigh<- as(extent(as.vector(t(bbox(neighb)))), "SpatialPolygons")
  # box<- bbox(gIntersection(boxny,boxneigh))
  box<- as(extent(as.vector(t(bbox(neighb_count)))), "SpatialPolygons")
  boundary<- rasterToPolygons(neighb_count)
  # out<- crop(neighb_count, box)
  # calculate the percentage agreement
  #out@data@values<- out@data@values/length(poly_name)
  
  # read in all the neighborhood geojson, extract norms data and combine to a spatial polygon data frame
  # transfer a1 to spatial polygon data frame
  poli<- fromJSON(poly_name[1])
  d<- data.frame(poli[[2]])
  d$ID<- poly_name[1]
  d<- d[,c(ncol(d),1:(ncol(d)-1))]
  d[5:ncol(d)]<- as.numeric(d[5:ncol(d)])
  a1$data<- d
  a1<- spChFIDs(a1, poly_name[1])
  neighb_d<- a1
  for (j in poly_name[2:length(poly_name)]){
    poli<- fromJSON(j)
    c<- poli[[3]][[2]]
    cx<- c[1:(length(c)/2)]
    cy<- c[(length(c)/2+1):length(c)]
    coo<- cbind(cx,cy)
    sp_poly<- SpatialPolygons(list(Polygons(list(Polygon(coo)), ID=j)), proj4string = CRS("+proj=longlat +datum=WGS84"))
    # extract data from geojson
    d<- data.frame(poli[[2]])
    d$ID<- j
    d<- d[,c(ncol(d),1:(ncol(d)-1))]
    d[5:ncol(d)]<- as.numeric(d[5:ncol(d)])
    # turn spatial polygon object to spatial polygon data frame
    sp_poly$data<- d
    sp_poly<- spChFIDs(sp_poly, j)
    neighb_d<- rbind(neighb_d, sp_poly)
  }
  
  # loop through norms answers and get maps
  questions<- names(neighb_d@data)
  for (k in questions[5:length(questions)]){
    neighb_d@data[[k]]<- as.numeric(neighb_d@data[[k]])
    normras<- rasterize(neighb_d, ras, field = neighb_d@data[[k]], fun = "mean")
    # crop raster to polygon boundary
    normras<- raster::mask(x1, boundary)
    # delete NA cells
    normras<- trim(normras)
    # convert raster to polygon
    normrasp<- rasterToPolygons(normras)
    #normrasp@data$ID<- i
    # convert polygon to json
    normjson<- geojson_json(normrasp)
    # send to server
    POST(url=url, body = normjson, encode = "json")
    # writeOGR(normrasp, "norm1", layer="layer", driver="GeoJSON")
  }
  
  # export neighborhood count polygon
  neighb_countp<- rasterToPolygons(neighb_count)
  neighb_countjson<- geojson_json(neighb_countp)
  # send to server
  
  writeOGR(neighb_countp, paste0(i,"_agreement"), layer="layer", driver="GeoJSON")
  
}
