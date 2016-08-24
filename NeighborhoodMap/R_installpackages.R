repos= "http://cran.us.r-project.org"
packages<- c('rgdal','raster','jsonlite','rJava','foreach',
             'doParallel','rgeos','geojsonio','httr','Hmisc',
             'ggplot2','lubridate','plyr','sp')

for (i in packages){
  tryCatch({
    install.packages(i,repos=repos)
  }, error=function(e){stop(paste0("Package",i,"fails to install."))})
}

# 
# install.packages('rgdal',repos=repos)
# install.packages('raster',repos=repos)
# install.packages('jsonlite',repos=repos)
# #dyn.load('/install.packages/Java/JavaVirtualMachines/jdk1.8.0_91.jdk/Contents/Home/jre/lib/server/libjvm.dylib')
# install.packages('rJava',repos=repos)
# install.packages('foreach',repos=repos)
# install.packages('doParallel',repos=repos)
# install.packages('rgeos',repos=repos)
# install.packages('geojsonio',repos=repos)
# install.packages('httr',repos=repos)
# install.packages('Hmisc',repos=repos)
# install.packages('ggplot2',repos=repos)
# install.packages('lubridate',repos=repos)
# install.packages('plyr',repos=repos)
# install.packages('sp',repos=repos)
