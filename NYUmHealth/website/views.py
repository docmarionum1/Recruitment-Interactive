from django.shortcuts import render, redirect

from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect

#import all website models and forms
from website.models import *
from website.forms import *


# views for NYU mHealth Recruitment tool site
def index(request):
	return render(request, 'website/index.html', {})

def pickNeighborhood(request, id=None):
	if id:
		NYURespondentsObject = NYURespondents.objects.get(pk=id)
	else:
		NYURespondentsObject = NYURespondents()

	# A HTTP POST?
	if request.method == 'POST':
		form = myNeighborhoodForm(request.POST, instance=NYURespondentsObject)

		# Have we been provided with a valid form?
		if form.is_valid():
			# Save the new data to the database.
			f = form.save()
			lookupObject = NYURespondents.objects.get(pk=f.pk)
			return HttpResponseRedirect(reverse('surveyQuestions', args=(lookupObject.pk,)))
		else:
			# The supplied form contained errors - just print them to the terminal.
			print form.errors
	else:
		# If the request was not a POST, display the form to enter details.
		form = myNeighborhoodForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/pickNeighborhoodMap.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


def surveyQuestions(request, id=None):
	if id:
		NYURespondentsObject = NYURespondents.objects.get(pk=id)
	else:
		NYURespondentsObject = NYURespondents()

	# A HTTP POST?
	if request.method == 'POST':
		form = surveyQuestionsForm(request.POST, instance=NYURespondentsObject)

		# Have we been provided with a valid form?
		if form.is_valid():
			# Save the new data to the database.
			f = form.save()
			lookupObject = NYURespondents.objects.get(pk=f.pk)
			return HttpResponseRedirect(reverse('whereIGo', args=(lookupObject.pk,)))
		else:
			# The supplied form contained errors - just print them to the terminal.
			print form.errors
	else:
		# If the request was not a POST, display the form to enter details.
		form = surveyQuestionsForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/surveyQuestions.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


def whereIGo(request, id=None):
	if id:
		NYURespondentsObject = NYURespondents.objects.get(pk=id)
	else:
		NYURespondentsObject = NYURespondents()

	# A HTTP POST?
	if request.method == 'POST':
		form = whereIGoForm(request.POST, instance=NYURespondentsObject)

		# Have we been provided with a valid form?
		if form.is_valid():
			# Save the new data to the database.
			f = form.save()
			lookupObject = NYURespondents.objects.get(pk=f.pk)
			return HttpResponseRedirect(reverse('results', args=(lookupObject.pk,)))
		else:
			# The supplied form contained errors - just print them to the terminal.
			print form.errors
	else:
		# If the request was not a POST, display the form to enter details.
		form = whereIGoForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/whereIGo.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


def results(request, id=None):
	return render(request, 'website/results.html', {})
