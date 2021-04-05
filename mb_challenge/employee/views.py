from django.shortcuts import render
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from employee.serializers import UserSerializer, GroupSerializer, EmployeeDataSerializer
from rest_framework.generics import GenericAPIView
from employee.models import EmployeeData
from rest_framework.response import Response
from django.http import JsonResponse
from rest_framework import status
from django.utils.text import slugify
from rest_framework.exceptions import ParseError
from rest_framework.parsers import FileUploadParser
from rest_framework.parsers import FormParser, MultiPartParser
from rest_framework.decorators import api_view
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from rest_framework import status
import os
from django.conf import settings

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer


class GroupViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows groups to be viewed or edited.
    """
    queryset = Group.objects.all()
    serializer_class = GroupSerializer

class EmployeeViewSet(GenericAPIView):

    @classmethod
    def get(self,request):
        if request.GET.get('id'):
            employeeData = EmployeeData.objects.get(pk=request.GET.get('id'))
            SnippetSerializer = EmployeeDataSerializer(employeeData)

        elif request.GET.get('slug'):
            employeeData = EmployeeData.objects.get(slug=request.GET.get('slug'))
            SnippetSerializer = EmployeeDataSerializer(employeeData)

        else:
            employeeData = EmployeeData.objects.all()
            SnippetSerializer = EmployeeDataSerializer(employeeData,many="true")
        response={"status":1,"message":"Employee List","data":SnippetSerializer.data}

        return JsonResponse(response, safe=False)

    @classmethod
    def post(self,request):

        data = request.data
        # data['slug']= slugify(request.data['title'])
        serializerData=''
        saveProduct = EmployeeDataSerializer(data=data)

        if saveProduct.is_valid():
            saveProduct.save()
            serializerData=saveProduct.data
            statusResponse=status.HTTP_201_CREATED

        else:
            serializerData=saveProduct.errors
            statusResponse=status.HTTP_400_BAD_REQUEST
        response={"status":1,"message":"Employee Added Successfully","statusResponse":statusResponse,"serializerData":serializerData}

        return JsonResponse(response, safe=False)

    def put(self,request,id=None):
        data = request.data
        instance = EmployeeData.objects.filter(pk=request.data['id']).first()
        dataimage=data.copy()

        # if not dataimage['image']:
        #     dataimage.pop('image', None)
        serializer = EmployeeDataSerializer(instance,data=dataimage)

        if serializer.is_valid():
            serializer.save()

        if  serializer:     
            data={'status':1,'message':'List updated successfully.',"data":serializer.data}
            return JsonResponse(data,status=200,safe=False)

        else:
            data={'status':0,'message':'Oops. there was a problem.'}
            return JsonResponse(data,status=500,safe=False)

    @classmethod
    def delete(self,request,id=None):
        instance = EmployeeData.objects.filter(pk=request.GET.get('id')).first()

        # try:
        #     image_path = os.path.join(settings.MEDIA_ROOT, str(instance.image))
        #     os.unlink(image_path)

        # except:
        #     pass
        instance.delete()

        employeeData = EmployeeData.objects.all()
        SnippetSerializer = EmployeeDataSerializer(employeeData,many="true")
        data={'status':1,'message':'Employee deleted successfully.',"data":SnippetSerializer.data}

        return JsonResponse(data,safe=False)

    @api_view(['GET', 'POST'])
    def employee_list(request):
        """
    List  Employee Data, or create a new Employees.
    """
        if request.method == 'GET':
            data = []
            nextPage = 1
            previousPage = 1
            Employees = EmployeeData.objects.all()
            page = request.GET.get('page', 1)
            paginator = Paginator(Employees, 5)

            try:
                data = paginator.page(page)
            except PageNotAnInteger:
                data = paginator.page(1)
            except EmptyPage:
                data = paginator.page(paginator.num_pages)

            serializer = EmployeeDataSerializer(data,context={'request': request} ,many=True)
            if data.has_next():
                nextPage = data.next_page_number()
            if data.has_previous():
                previousPage = data.previous_page_number()
            
            return Response({'data': serializer.data , 'count': paginator.count, 'numpages' : paginator.num_pages, 'nextlink': '//employee/data/get/?page=' + str(nextPage), 'prevlink': '//employee/data/get/?page=' + str(previousPage)})

        elif request.method == 'POST':
            serializer = EmployeeDataSerializer(data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
