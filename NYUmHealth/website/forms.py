from django.db import models
from django import forms

# import all website models
from website.models import *

#add select 2
#from django_select2 import *

# website forms below
class myNeighborhoodForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('myNeighborhood',)

class surveyQuestionsForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('q1','q2','q3','q4','q5',)

class whereIGoForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('whereIGo',)

