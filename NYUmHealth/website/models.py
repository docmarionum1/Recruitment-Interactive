from __future__ import unicode_literals

from django.db import models

# Create your models here.

class NYURespondents(models.Model):
	created = models.DateTimeField(auto_now=True)
	myNeighborhood = models.CharField(max_length=255, default='', blank=False, null=False)
	q1 = models.CharField(max_length=255, default='', blank=False, null=False)
	q2 = models.CharField(max_length=255, default='', blank=False, null=False)
	q3 = models.CharField(max_length=255, default='', blank=False, null=False)
	q4 = models.CharField(max_length=255, default='', blank=False, null=False)
	q5 = models.CharField(max_length=255, default='', blank=False, null=False)
	whereIGo = models.TextField(default='')
