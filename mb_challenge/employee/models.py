from django.db import models
from datetime import datetime, timedelta

# Create your models here.
# Employee Data  Model..
class EmployeeData(models.Model):
    #id, email, firstname, lastname, password, address, dob , company, mobile, city.

    firstname = models.CharField(max_length=255)
    lastname = models.CharField(max_length=255, null=True)
    email = models.CharField(max_length=50, null=True, unique = True)
    password = models.CharField(max_length=255, null=True)
    address = models.TextField(null=True, max_length=300)
    dob = models.DateField()
    company = models.CharField(max_length=30)
    mobile = models.CharField(max_length=10)
    city = models.CharField(max_length=30)
    
    def __str__(self):
        return self.firstname
    