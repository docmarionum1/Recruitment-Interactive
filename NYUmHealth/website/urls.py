from django.conf.urls import include, url
from website import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^nextPickNeighborhood/$', views.pickNeighborhood, name='pickNeighborhood'),
    url(r'^nextPickNeighborhood/(?P<id>\d+)/$', views.pickNeighborhood, name='pickNeighborhood'),
    url(r'^nextDrawNeighborhood/(?P<id>\d+)/$', views.drawNeighborhood, name='drawNeighborhood'),
    url(r'^nextNameNeighborhood/(?P<id>\d+)/$', views.nameNeighborhood, name='nameNeighborhood'),
    url(r'^nextSurveyQuestions/(?P<id>\d+)/$', views.surveyQuestions, name='surveyQuestions'),
    url(r'^nextWhereIGo/(?P<id>\d+)/$', views.whereIGo, name='whereIGo'),
    url(r'^results/(?P<id>\d+)/$', views.results, name='results'),

]


