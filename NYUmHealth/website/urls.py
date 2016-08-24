from django.conf.urls import include, url
from website import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^nextPickNeighborhood/$', views.pickNeighborhood, name='pickNeighborhood'),
    url(r'^nextPickNeighborhood/(?P<id>\d+)/$', views.pickNeighborhood, name='pickNeighborhood'),
    url(r'^nextDrawNeighborhood/(?P<id>\d+)/$', views.drawNeighborhood, name='drawNeighborhood'),
    url(r'^getdrawngeojson/(?P<id>\d+)/$', views.getdrawngeojson, name='getdrawngeojson'),
    url(r'^getdrawngeojsons/(?P<nameNeighborhood>[\w|\W]+)/$', views.getdrawngeojsons, name='getdrawngeojsons'),
    url(r'^getneighborhoodnames/$', views.getneighborhoodnames, name='getneighborhoodnames'),
    url(r'^nextNameNeighborhood/(?P<id>\d+)/$', views.nameNeighborhood, name='nameNeighborhood'),
    #url(r'^nextSurveyQuestions/(?P<id>\d+)/$', views.surveyQuestions, name='surveyQuestions'),
    #url(r'^nextKnowBestNeighborhood/(?P<id>\d+)/$', views.knowBestNeighborhood, name='knowBestNeighborhood'),
    url(r'^nextKnowBestPlaces/(?P<id>\d+)/$', views.knowBestPlaces, name='knowBestPlaces'),
    url(r'^getknowbestplaces/(?P<id>\d+)/$', views.getknowbestplaces, name='getknowbestplaces'),
    url(r'^nextKnowBestSurveyQuestions/(?P<id>\d+)/$', views.knowBestSurveyQuestions, name='knowBestSurveyQuestions'),
    url(r'^results/(?P<id>\d+)/$', views.results, name='results'),

]


