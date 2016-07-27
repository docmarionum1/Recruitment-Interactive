from django.shortcuts import render, redirect

from django.core.urlresolvers import reverse
from django.http import HttpResponseRedirect, JsonResponse

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
			return HttpResponseRedirect(reverse('drawNeighborhood', args=(lookupObject.pk,)))
		else:
			# The supplied form contained errors - just print them to the terminal.
			print form.errors
	else:
		# If the request was not a POST, display the form to enter details.
		form = myNeighborhoodForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/pickNeighborhoodMap.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


def drawNeighborhood(request, id=None):
	if id:
		NYURespondentsObject = NYURespondents.objects.get(pk=id)
	else:
		NYURespondentsObject = NYURespondents()

	# A HTTP POST?
	if request.method == 'POST':
		form = drawNeighborhoodForm(request.POST, instance=NYURespondentsObject)

		# Have we been provided with a valid form?
		if form.is_valid():
			# Save the new data to the database.
			f = form.save()
			lookupObject = NYURespondents.objects.get(pk=f.pk)
			return HttpResponseRedirect(reverse('nameNeighborhood', args=(lookupObject.pk,)))
		else:
			# The supplied form contained errors - just print them to the terminal.
			print form.errors
	else:
		# If the request was not a POST, display the form to enter details.
		form = drawNeighborhoodForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/drawNeighborhood.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


def getdrawngeojson(request, id=None):

	NYURespondentsObject = NYURespondents.objects.get(pk=id)

	return JsonResponse(NYURespondentsObject.drawnNeighborhood, safe=False)


def nameNeighborhood(request, id=None):
	if id:
		NYURespondentsObject = NYURespondents.objects.get(pk=id)
	else:
		NYURespondentsObject = NYURespondents()

	# A HTTP POST?
	if request.method == 'POST':
		form = nameNeighborhoodForm(request.POST, instance=NYURespondentsObject)

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
		form = nameNeighborhoodForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/nameNeighborhood.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})



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
			# go directly to knowBestPlaces bypassing knowBestNeighborhood
			return HttpResponseRedirect(reverse('knowBestPlaces', args=(lookupObject.pk,)))
		else:
			# The supplied form contained errors - just print them to the terminal.
			print form.errors
	else:
		# If the request was not a POST, display the form to enter details.
		form = surveyQuestionsForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/surveyQuestions.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


# not currently using this view, going straight to knowBestPlaces from first set of survey questions
def knowBestNeighborhood(request, id=None):
	if id:
		NYURespondentsObject = NYURespondents.objects.get(pk=id)
	else:
		NYURespondentsObject = NYURespondents()

	# A HTTP POST?
	if request.method == 'POST':
		form = knowBestNeighborhoodForm(request.POST, instance=NYURespondentsObject)

		# Have we been provided with a valid form?
		if form.is_valid():
			# Save the new data to the database.
			f = form.save()
			lookupObject = NYURespondents.objects.get(pk=f.pk)
			return HttpResponseRedirect(reverse('knowBestPlaces', args=(lookupObject.pk,)))
		else:
			# The supplied form contained errors - just print them to the terminal.
			print form.errors
	else:
		# If the request was not a POST, display the form to enter details.
		form = knowBestNeighborhoodForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/knowBestNeighborhoodMap.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


def knowBestPlaces(request, id=None):
	if id:
		NYURespondentsObject = NYURespondents.objects.get(pk=id)
	else:
		NYURespondentsObject = NYURespondents()

	# A HTTP POST?
	if request.method == 'POST':
		form = knowBestPlacesForm(request.POST, instance=NYURespondentsObject)

		# Have we been provided with a valid form?
		if form.is_valid():
			# Save the new data to the database.
			f = form.save()
			lookupObject = NYURespondents.objects.get(pk=f.pk)
			return HttpResponseRedirect(reverse('knowBestSurveyQuestions', args=(lookupObject.pk,)))
		else:
			# The supplied form contained errors - just print them to the terminal.
			print form.errors
	else:
		# If the request was not a POST, display the form to enter details.
		form = knowBestPlacesForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/knowBestPlaces.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


def getknowbestplaces(request, id=None):

	NYURespondentsObject = NYURespondents.objects.get(pk=id)

	return JsonResponse(NYURespondentsObject.knowBestPlaces, safe=False)


def knowBestSurveyQuestions(request, id=None):
	if id:
		NYURespondentsObject = NYURespondents.objects.get(pk=id)
	else:
		NYURespondentsObject = NYURespondents()

	# A HTTP POST?
	if request.method == 'POST':
		form = knowBestSurveyQuestionsForm(request.POST, instance=NYURespondentsObject)

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
		form = knowBestSurveyQuestionsForm(instance=NYURespondentsObject)

	# Bad form (or form details), no form supplied...
	# Render the form with error messages (if any).
	return render(request, 'website/knowBestSurveyQuestions.html', {'form':form, 'NYURespondentsObject': NYURespondentsObject})


def results(request, id=None):
	return render(request, 'website/results.html', {})
