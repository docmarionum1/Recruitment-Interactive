library(rgdal)
library(raster)
library(jsonlite)
#dyn.load('/Library/Java/JavaVirtualMachines/jdk1.8.0_91.jdk/Contents/Home/jre/lib/server/libjvm.dylib')
require(rJava)
#library(ggmap)
library(foreach)
library(doParallel)
library(rgeos)
library(geojsonio)
library(httr)

neighb_name<- GET("https://recruit.mapmob.com/getneighborhoodnames/")
neighb_name<- fromJSON(rawToChar(neighb_name$content))
neighb_name<- gsub("[^[:alpha:][:blank:]\\-]", "", neighb_name)
neighb_name_api<- gsub(" ", "%20", neighb_name)

# capitalize the first letter of neighborhood name for plotting
simpleCap <- function(x) {
  s <- strsplit(x, " ")[[1]]
  paste(toupper(substring(s, 1,1)), substring(s, 2),
        sep="", collapse=" ")
}
# read in a raster for New York
ras<- raster("newyork_raster.tif")
values(ras)<- 1:ncell(ras)
ras@data@names<- 1:ncell(ras)

# set up API
api<- "https://recruit.mapmob.com/getdrawngeojsons/"

# Loop through all the APIs to produce maps
# set up parallel
#registerDoParallel(cores=4)
#foreach (i=neighb_name) %dopar% {
for (i in neighb_name_api){
file_name<- gsub("%20", "-", i)
  if (i!=""){
    # setup api
    api_neighb<- paste0(api, i)
  # get all the geojson of this neighborhood
  neighb_json<- GET(api_neighb)
  neighb_json<- fromJSON(rawToChar(neighb_json$content))
  
  if (length(neighb_json)==0){
    tryCatch({
      stop()
    }, error=function(e){})
  } else {
    if (length(neighb_json)==1){
    # generate boundary polygon
    poli<- fromJSON(neighb_json)
    c<- poli$features$geometry$coordinates[[1]]
    cx<- c[1:(length(c)/2)]
    cy<- c[(length(c)/2+1):length(c)]
    coo<- cbind(cx,cy)
    neighb<- SpatialPolygons(list(Polygons(list(Polygon(coo)), ID=i)), proj4string = CRS("+proj=longlat +datum=WGS84"))
    
    # extract norms answers
    d<- data.frame(poli$features$properties)
    d$ID<- i
    d[4:ncol(d)]<- as.numeric(d[4:ncol(d)])
    neighb_d<- neighb
    neighb_d$data<- d
    neighb_d<- spChFIDs(neighb_d, i)
  } else {
    # initiate a neighborhodd polygon with the first polygon in the list
  poli<- fromJSON(neighb_json[1])
  c<- poli$features$geometry$coordinates[[1]]
  cx<- c[1:(length(c)/2)]
  cy<- c[(length(c)/2+1):length(c)]
  coo<- cbind(cx,cy)
  neighb<- SpatialPolygons(list(Polygons(list(Polygon(coo)), ID=paste0(i,"1"))), proj4string = CRS("+proj=longlat +datum=WGS84"))
  
  # extract data out
  d<- data.frame(poli$features$properties)
  d$ID<- paste0(i,"1")
  d[4:ncol(d)]<- as.numeric(d[4:ncol(d)])
  neighb_d<- neighb
  neighb_d$data<- d
  neighb_d<- spChFIDs(neighb_d, i)
  
  # read in all the neighborhoods and combine to a polygon
  for (j in 2:length(neighb_json)){
    poli<- try(fromJSON(neighb_json[j]))
    c<- poli$features$geometry$coordinates[[1]]
    cx<- c[1:(length(c)/2)]
    cy<- c[(length(c)/2+1):length(c)]
    coo<- cbind(cx,cy)
    sp_poly<- SpatialPolygons(list(Polygons(list(Polygon(coo)), ID=j)), proj4string = CRS("+proj=longlat +datum=WGS84"))
    #sp_poly<- list(sp_poly)
    # extract data and transfer sp_poly to spatial polygon data frame
    d<- data.frame(poli$features$properties)
    ID<- paste0(i,j)
    d$ID<- ID
    d[4:ncol(d)]<- as.numeric(d[4:ncol(d)])
    sp_poly_d<- sp_poly
    sp_poly_d$data<- d
    sp_poly_d<- spChFIDs(sp_poly_d, ID)
    # combine sp polygon and sp polygon data frame together
    neighb<- rbind(neighb, sp_poly)
    neighb_d<- rbind(neighb_d, sp_poly_d)
  }
  }
  
  # join neighborhood polygon to new york raster, count the number of polygon falling in each cell of the raster
  neighb_count <- rasterize(neighb, ras, fun='count')
  neighb_count@data@values<- neighb_count@data@values/length(neighb_json)
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
  
  
  
  # loop through norms answers and get maps
  questions<- names(neighb_d@data)
  for (k in questions[5:length(questions)]){
    neighb_d@data[[k]]<- as.numeric(neighb_d@data[[k]])
    normras<- rasterize(neighb_d, ras, field = neighb_d@data[[k]], fun = "mean")
    # crop raster to polygon boundary
    normras<- raster::mask(normras, boundary)
    # delete NA cells
    normras<- trim(normras)
    # convert raster to polygon
    normrasp<- rasterToPolygons(normras)
    #normrasp@data$ID<- i
    # convert polygon to json
    # normjson<- geojson_json(normrasp)
    # send to server
    #POST(url=url, body = normjson, encode = "json")
    writeOGR(normrasp, paste0("../NYUmHealth/NYUmHealth/media/",file_name,"_norm_",k,".geojson"), layer="layer", driver="GeoJSON", check_exists = F)
  }
  
  # export neighborhood count polygon
  neighb_countp<- rasterToPolygons(neighb_count)
  #neighb_countjson<- geojson_json(neighb_countp)
  # send to server
  
  writeOGR(neighb_countp, paste0("../NYUmHealth/NYUmHealth/media/",file_name,"_agreement.geojson"), layer="layer", driver="GeoJSON", check_exists = F)
  } 
  } else if (i==""){
    tryCatch({
      stop()
    }, error=function(e){})
  }
}
