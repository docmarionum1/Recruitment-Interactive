from __future__ import unicode_literals

from django.db import models

# Create your models here.

class neighborhoodNYC(models.Model):
	BoroCode = models.IntegerField(default=0, blank=False, null=False)
	BoroName = models.CharField(max_length=255, default='', blank=False, null=False)
	CountyFIPS = models.IntegerField(default=0, blank=False, null=False)
	NTACode = models.CharField(max_length=255, default='', blank=False, null=False)
	NTAName = models.CharField(max_length=255, default='', blank=False, null=False)

	def __unicode__(self):
		return self.NTAName

class NYURespondents(models.Model):
	created = models.DateTimeField(auto_now=True)
	myNeighborhood = models.ForeignKey(neighborhoodNYC, blank=True, null=True, related_name='myneighborhoods')
	drawnNeighborhood = models.TextField(default='')
	nameNeighborhood = models.CharField(max_length=255, default='', blank=False, null=False)
	howLongLivedNeighborhood = models.IntegerField(default=1, blank=False, null=False)
	q1 = models.CharField(max_length=255, default='', blank=False, null=False)
	q2 = models.CharField(max_length=255, default='', blank=False, null=False)
	q3 = models.CharField(max_length=255, default='', blank=False, null=False)
	q4 = models.CharField(max_length=255, default='', blank=False, null=False)
	q5 = models.CharField(max_length=255, default='', blank=False, null=False)
	q6 = models.CharField(max_length=255, default='', blank=False, null=False)
	q7 = models.CharField(max_length=255, default='', blank=False, null=False)
	q8 = models.CharField(max_length=255, default='', blank=False, null=False)
	q9 = models.CharField(max_length=255, default='', blank=False, null=False)
	q10 = models.CharField(max_length=255, default='', blank=False, null=False)
	q11 = models.CharField(max_length=255, default='', blank=False, null=False)
	q12 = models.CharField(max_length=255, default='', blank=False, null=False)
	q13 = models.CharField(max_length=255, default='', blank=False, null=False)
	q14 = models.CharField(max_length=255, default='', blank=False, null=False)
	q15 = models.CharField(max_length=255, default='', blank=False, null=False)
	q16 = models.CharField(max_length=255, default='', blank=False, null=False)
	q17 = models.CharField(max_length=255, default='', blank=False, null=False)
	q18 = models.CharField(max_length=255, default='', blank=False, null=False)
	q19 = models.CharField(max_length=255, default='', blank=False, null=False)
	q20 = models.CharField(max_length=255, default='', blank=False, null=False)
	knowBestNeighborhood = models.ForeignKey(neighborhoodNYC, blank=True, null=True, related_name='knowbestneighborhoods')
	knowBestPlaces = models.TextField(default='')
	circleq1 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq2 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq3 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq4 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq5 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq6 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq7 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq8 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq9 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq10 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq11 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq12 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq13 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq14 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq15 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq16 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq17 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq18 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq19 = models.CharField(max_length=255, default='', blank=False, null=False)
	circleq20 = models.CharField(max_length=255, default='', blank=False, null=False)
