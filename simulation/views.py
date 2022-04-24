from django.http import request, HttpResponse, HttpResponseRedirect
from django.shortcuts import render
import simulation.static.lava.map as mp

# Create your views here.

def index(request):
	return HttpResponse("Landing page goes here")

def lavaSim(request):
	if request.method == 'POST':
		volume = int(request.POST.get('Volume'))
		viskositas = request.POST.get('Viskositas')
		res = doSimulation(volume, viskositas)
		return render(request, 'simulation\lava.html', {
			"map": res
		})
	else:
		return render(request, 'simulation\lava.html', {
			"map": None
		})

def doSimulation(volume, viskositas):
	res = mp.main(volume, viskositas)
	return res