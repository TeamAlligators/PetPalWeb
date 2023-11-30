from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView
from ..serializers import UserShelterSerializer, UserSeekerSerializer
from ..models import Shelter, Seeker, CustomUser, Application, Pet, Notification
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import PermissionDenied

# Create your views here.
class UserShelterCreate(CreateAPIView):
    serializer_class = UserShelterSerializer

    def perform_create(self, serializer):
        password = serializer.validated_data.get('password', None)
        first_name = serializer.validated_data.get('first_name', None)
        last_name = serializer.validated_data.get('last_name', None)
        email = serializer.validated_data.get('email', None)
        account_type = serializer.validated_data.get('account_type', None)
        is_active = True
        hashed_password = make_password(password)
        new_user = CustomUser.objects.create(
            password=hashed_password,
            first_name=first_name,
            last_name=last_name,
            email=email,
            account_type=account_type,
            is_active=is_active
        )
        shelter = serializer.validated_data.get('shelter', tuple())
        Shelter.objects.create(**shelter, user=new_user)

class UserSeekerCreate(CreateAPIView):
    serializer_class = UserSeekerSerializer

    def perform_create(self, serializer):
        password = serializer.validated_data.get('password', None)
        first_name = serializer.validated_data.get('first_name', None)
        last_name = serializer.validated_data.get('last_name', None)
        email = serializer.validated_data.get('email', None)
        account_type = serializer.validated_data.get('account_type', None)
        is_active = True
        hashed_password = make_password(password)
        new_user = CustomUser.objects.create(
            password=hashed_password,
            first_name=first_name,
            last_name=last_name,
            email=email,
            account_type=account_type,
            is_active=is_active
        )
        seeker = serializer.validated_data.get('seeker', tuple())
        Seeker.objects.create(**seeker, user=new_user)

class UserShelterList(ListAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = UserShelterSerializer
    queryset = CustomUser.objects.filter(account_type="shelter")

# class UserSeekerList(ListAPIView):
#     permission_classes = [IsAuthenticated] 
#     serializer_class = UserSeekerSerializer
#     queryset = CustomUser.objects.filter(account_type="seeker")

class UserShelterRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = UserShelterSerializer
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        return CustomUser.objects.get(pk=pk)
    
    def perform_update(self, serializer):
        if self.request.user.id != self.get_object().id:
            raise PermissionDenied()
        shelter = serializer.validated_data.get('shelter', {})
        shelter = Shelter.objects.filter(user=self.request.user).update(**shelter)
        first_name = serializer.validated_data.get('first_name', None)
        last_name = serializer.validated_data.get('last_name', None)
        email = serializer.validated_data.get('email', None)
        hashed_password = make_password(serializer.validated_data.get('password', None))
        CustomUser.objects.filter(id=self.request.user.id).update(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=hashed_password
        )
    
    def perform_destroy(self, instance):
        if self.request.user.id != self.get_object().id:
            raise PermissionDenied()
        pets = Pet.objects.filter(shelter=self.request.user.shelter.id)
        for pet in pets:
            pet.delete()
        notifs = Notification.objects.filter(user=self.request.user.id)
        for notif in notifs:
            notif.delete()
        shelter = Shelter.objects.get(user=self.request.user.id)
        shelter.delete()
        instance.delete()

class UserSeekerRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = UserSeekerSerializer
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        # check that if the user is a shelter, the seeker has an active application with the shelter
        if self.request.user.account_type == "shelter":
            seeker = CustomUser.objects.get(pk=pk).seeker
            if not Application.objects.filter(shelter=self.request.user.shelter.id, seeker=seeker.id).exists():
                raise PermissionDenied()
        elif self.request.user.account_type == "seeker":
            if self.request.user.id != pk:
                raise PermissionDenied()
        return CustomUser.objects.get(pk=pk)

    def perform_update(self, serializer):
        if self.request.user.id != self.get_object().id:
            raise PermissionDenied()
        seeker = serializer.validated_data.get('seeker', {})
        seeker = Seeker.objects.filter(user=self.request.user).update(**seeker)
        first_name = serializer.validated_data.get('first_name', None)
        last_name = serializer.validated_data.get('last_name', None)
        email = serializer.validated_data.get('email', None)
        hashed_password = make_password(serializer.validated_data.get('password', None))
        CustomUser.objects.filter(id=self.request.user.id).update(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=hashed_password
        )

    def perform_destroy(self, instance):
        if self.request.user.id != self.get_object().id:
            raise PermissionDenied()
        apps = Application.objects.filter(seeker=self.request.user.seeker.id)
        for app in apps:
            app.delete()
        notifs = Notification.objects.filter(user=self.request.user.id)
        for notif in notifs:
            notif.delete()
        seeker = Seeker.objects.get(user=self.request.user.id)
        seeker.delete()
        instance.delete()