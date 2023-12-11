from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView, CreateAPIView, UpdateAPIView
from ..serializers import UserShelterSerializer, UserSeekerSerializer, PhotoUpdateSerializer
from ..models import Shelter, Seeker, CustomUser, Application, Pet, Notification
from django.contrib.auth.hashers import make_password
from rest_framework.exceptions import PermissionDenied
from rest_framework import status
from rest_framework.pagination import PageNumberPagination
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny

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
            is_active=is_active,
            photo=serializer.validated_data.get('photo', None)
        )
        shelter_data = serializer.validated_data.get('shelter', {})


        # if photo:
        #     shelter_data['photo'] = photo

        Shelter.objects.create(user=new_user, **shelter_data)

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
            is_active=is_active,
            photo=serializer.validated_data.get('photo', None)
        )
        seeker_data = serializer.validated_data.get('seeker', tuple())
        photo = self.request.FILES.get('photo')
        # print(photo)

        # if photo:
        #     seeker_data['photo'] = photo

        Seeker.objects.create(**seeker_data, user=new_user)

class ShelterListPagination(PageNumberPagination):
    page_size = 5 

class ShelterList(ListAPIView):
    serializer_class = UserShelterSerializer
    queryset = CustomUser.objects.filter(account_type="shelter")
    pagination_class = ShelterListPagination

class UserShelterList(ListAPIView):
    # permission_classes = [IsAuthenticated] 
    serializer_class = UserShelterSerializer
    queryset = CustomUser.objects.filter(account_type="shelter")

class UserSeekerList(ListAPIView):
    # permission_classes = [IsAuthenticated] 
    serializer_class = UserSeekerSerializer
    queryset = CustomUser.objects.filter(account_type="seeker")

class UserShelterRetrieveUpdateDestroy(RetrieveUpdateDestroyAPIView):
    # permission_classes = [IsAuthenticated] 
    serializer_class = UserShelterSerializer
    
    def get_object(self):
        pk = self.kwargs.get('pk')
        return CustomUser.objects.get(pk=pk)
    
    def perform_update(self, serializer):
        if self.request.user.id != self.get_object().id:
            raise PermissionDenied()

        shelter_data = serializer.validated_data.get('shelter', {})
        shelter_instance = Shelter.objects.get(user=self.request.user)

        # Update Shelter fields other than the photo
        for key, value in shelter_data.items():
            setattr(shelter_instance, key, value)
        shelter_instance.save()

        # Update CustomUser fields
        user_data = {
            'first_name': serializer.validated_data.get('first_name', None),
            'last_name': serializer.validated_data.get('last_name', None),
            'email': serializer.validated_data.get('email', None),
            'password': make_password(serializer.validated_data.get('password', None)),
            'photo': serializer.validated_data.get('photo', None),
        }
        CustomUser.objects.filter(id=self.request.user.id).update(**user_data)
    
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
    # permission_classes = [IsAuthenticated] 
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
        seeker_data = serializer.validated_data.get('seeker', {})
        seeker_instance = Seeker.objects.get(user=self.request.user)

        # Update Seeker fields other than the photo
        for key, value in seeker_data.items():
            setattr(seeker_instance, key, value)
        seeker_instance.save()

        # Handle photo upload separately
        # photo = self.request.FILES.get('photo')
        # print(photo)
        # if photo:
        #     seeker_instance['photo'] = photo
        #     seeker_instance.save()

        # Update CustomUser fields
        user_data = {
            'first_name': serializer.validated_data.get('first_name', None),
            'last_name': serializer.validated_data.get('last_name', None),
            'email': serializer.validated_data.get('email', None),
            'password': make_password(serializer.validated_data.get('password', None)),
            'photo': serializer.validated_data.get('photo', None),
        }
        CustomUser.objects.filter(id=self.request.user.id).update(**user_data)

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

class GoogleView(ListAPIView):
    permission_classes = [AllowAny]
    def get(self, request):
        email = self.request.query_params.get('email')

        user = CustomUser.objects.get(email=email)
 
        token = RefreshToken.for_user(user)  # generate token without username & password
        response = {}
        response['access_token'] = str(token.access_token)
        print(token.access_token)
        return Response(response)
    
from os.path import basename

class PhotoUpdateView(UpdateAPIView):
    queryset = CustomUser.objects.all()
    serializer_class = PhotoUpdateSerializer
    permission_classes = [IsAuthenticated]

    def update(self, request, *args, **kwargs):
        if self.request.user.id != self.get_object().id:
            raise PermissionDenied()
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        user = CustomUser.objects.get(pk=self.request.user.id)
        user.photo = "profile/" + basename(serializer.data['photo']) 
        user.save()
        print(user.photo, "help")

        return Response(serializer.data, status=status.HTTP_200_OK)
