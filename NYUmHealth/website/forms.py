from django.db import models
from django import forms

# import all website models
from website.models import *

#add select 2
from django_select2.forms import (
	Select2Widget
)

# website forms below
class myNeighborhoodForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('myNeighborhood',)
        labels = {
            'myNeighborhood': '',
        }
        widgets = {
            'myNeighborhood': Select2Widget,
        }


class drawNeighborhoodForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('drawnNeighborhood', )

class nameNeighborhoodForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('nameNeighborhood', )

class surveyQuestionsForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('q1','q2','q3','q4','q5','q6','q7','q8','q9','q10',)

class whereIGoForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('whereIGo',)

