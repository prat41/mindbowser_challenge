from django.urls import path
from django.conf.urls import include
from employee import views
from django.conf.urls import url

urlpatterns = [
	path('data/', views.EmployeeViewSet.as_view()),
]