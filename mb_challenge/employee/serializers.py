from django.contrib.auth.models import User, Group
from rest_framework import serializers
from employee.models import *


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'firstname', 'lastname', 'email']


class GroupSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Group
        fields = ['url', 'name']

class EmployeeDataSerializer(serializers.ModelSerializer):
    class Meta:
        model= EmployeeData
        fields = '__all__' 