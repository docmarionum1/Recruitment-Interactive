# -*- coding: utf-8 -*-
# Generated by Django 1.9.5 on 2016-06-23 20:20
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('website', '0002_auto_20160520_1752'),
    ]

    operations = [
        migrations.AddField(
            model_name='nyurespondents',
            name='drawnNeighborhood',
            field=models.TextField(default=''),
        ),
        migrations.AddField(
            model_name='nyurespondents',
            name='nameNeighborhood',
            field=models.CharField(default='', max_length=255),
        ),
    ]