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
        fields = ('nameNeighborhood', 'howLongLivedNeighborhood', )
        labels = {
            'nameNeighborhood': '',
            'howLongLivedNeighborhood': '',
        }

# class surveyQuestionsForm(forms.ModelForm):
#     class Meta:
#         model = NYURespondents
#         fields = ('q1','q2','q3','q4','q5','q6','q7','q8','q9','q10',)

class knowBestNeighborhoodForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('knowBestNeighborhood',)
        labels = {
            'knowBestNeighborhood': '',
        }
        widgets = {
            'knowBestNeighborhood': Select2Widget,
        }

class knowBestSurveyQuestionsForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('q1','q2','q3','q4','q5','q6','q7','q8','q9','q10','q11','q12','q13','q14','q15','q16','q17','q18','q19','q20','circleq1','circleq2','circleq3','circleq4','circleq5','circleq6','circleq7','circleq8','circleq9','circleq10','circleq11','circleq12','circleq13','circleq14','circleq15','circleq16','circleq17','circleq18','circleq19','circleq20',)

class knowBestPlacesForm(forms.ModelForm):
    class Meta:
        model = NYURespondents
        fields = ('knowBestPlaces',)

