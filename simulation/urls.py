from unicodedata import name
from django.urls import path
from . import views

app_name = "simulation"
urlpatterns = [
     path("", views.index, name="index"),
	 path("lava", views.lavaSim, name="lavaSim")
]