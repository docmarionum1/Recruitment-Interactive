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
	myNeighborhood = models.ForeignKey(neighborhoodNYC, blank=True, null=True)
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
	whereIGo = models.TextField(default='')
