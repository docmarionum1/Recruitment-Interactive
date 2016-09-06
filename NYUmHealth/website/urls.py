from django.conf.urls import include, url
from website import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^(?P<id>\d+)/$', views.index, name='index'),
    url(r'^nextPickNeighborhood/$', views.pickNeighborhood, name='pickNeighborhood'),
    url(r'^nextDrawNeighborhood/$', views.drawNeighborhood, name='drawNeighborhood'),
    url(r'^getdrawngeojson/$', views.getdrawngeojson, name='getdrawngeojson'),
    url(r'^getdrawngeojsons/(?P<nameNeighborhood>[\w|\W]+)/$', views.getdrawngeojsons, name='getdrawngeojsons'),
    url(r'^getneighborhoodnames/$', views.getneighborhoodnames, name='getneighborhoodnames'),
    url(r'^nextNameNeighborhood/$', views.nameNeighborhood, name='nameNeighborhood'),
    #url(r'^nextSurveyQuestions/(?P<id>\d+)/$', views.surveyQuestions, name='surveyQuestions'),
    #url(r'^nextKnowBestNeighborhood/(?P<id>\d+)/$', views.knowBestNeighborhood, name='knowBestNeighborhood'),
    url(r'^nextKnowBestPlaces/$', views.knowBestPlaces, name='knowBestPlaces'),
    url(r'^getknowbestplaces/$', views.getknowbestplaces, name='getknowbestplaces'),
    url(r'^nextKnowBestSurveyQuestions/$', views.knowBestSurveyQuestions, name='knowBestSurveyQuestions'),
    url(r'^results/$', views.results, name='results'),
    url(r'^dashboard/$', views.dashboard, name='dashboard'),

]
