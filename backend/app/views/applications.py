from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView, UpdateAPIView
from rest_framework.permissions import IsAuthenticated

# from petpal.app import serializers
from ..models import Application, Pet, Seeker, Shelter, Notification
from ..serializers import ApplicationSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework import serializers

class ApplicationListPagination(PageNumberPagination):
    page_size = 10 

class ApplicationCreateView(ListCreateAPIView):
    queryset = Application.objects.all()
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = ApplicationListPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        status = self.request.query_params.get('status')

        if status:
            queryset = queryset.filter(status=status)

        user = self.request.user
        # randomUser = get_object_or_404(CustomUser, id=3)
        if user.account_type == 'shelter':
            shelter = get_object_or_404(Shelter, user=user)
            queryset = queryset.filter(shelter=shelter)
            # return Application.objects.filter(shelter=shelter)
        elif user.account_type == 'seeker':
            seeker = get_object_or_404(Seeker, user=user)
            queryset = queryset.filter(seeker=seeker)
            # return Application.objects.filter(seeker=seeker)
        return queryset.order_by('application_date', 'last_updated')

        # return Application.objects.none()  # Default to an empty queryset for other user

    def perform_create(self, serializer):
        pet_id = self.request.query_params.get('pet')
        shelter_id = self.request.query_params.get('shelter')

        pet = Pet.objects.get(id=pet_id)

        if pet.status == 'available':
            seeker = get_object_or_404(Seeker, user=self.request.user)
            shelter = get_object_or_404(Shelter, id=shelter_id)
            serializer.validated_data['seeker'] = seeker
            serializer.validated_data['shelter'] = shelter
            serializer.validated_data['pet'] = pet
            serializer.save()
            # make notification to the shelter 
            Notification.objects.create(
                user=shelter.user,
                notification_type='new_application', 
                application = serializer.instance,
                url = f'/applications/{serializer.instance.id}/',
                content=f'{seeker.user.first_name} {seeker.user.last_name} applied for your pet {pet.name}.'
            )
        else:
            raise serializers.ValidationError("Cannot create application for a non-available pet listing")

class ApplicationRetrieveUpdate(UpdateAPIView):
    queryset = Application.objects.all()
    permission_classes = [IsAuthenticated] 
    serializer_class = ApplicationSerializer
    pagination_class = ApplicationListPagination

    def get_queryset(self):
        queryset = super().get_queryset()
        id_to_work_on = self.kwargs.get('pk')
        return queryset.filter(id=id_to_work_on)

    def perform_update(self, serializer):
        serializer.validated_data.pop('pet', None)
        serializer.validated_data.pop('seeker', None)
        serializer.validated_data.pop('shelter', None)
        serializer.validated_data.pop('application_date', None)
        serializer.validated_data.pop('first_name', None)
        serializer.validated_data.pop('last_name', None)
        serializer.validated_data.pop('phone', None)
        serializer.validated_data.pop('email', None)
        serializer.validated_data.pop('address', None)
        serializer.validated_data.pop('country', None)
        serializer.validated_data.pop('provice', None)
        serializer.validated_data.pop('postal_code', None)
        serializer.validated_data.pop('last_updated', None)

        instance = self.get_object()
        shelter = instance.shelter
        seeker = instance.seeker

        new_status = self.request.data.get('status')

        if new_status:
            current_status = instance.status

            if shelter and shelter.user.id == self.request.user.id:
                # Shelter can only update from pending to accepted or denied
                if current_status == 'pending' and new_status in ['accepted', 'denied']:
                    # status = serializer.validated_data.get('status', None)
                    serializer.validated_data['status'] = new_status
                    serializer.save()
                    # make notification for status update
                    Notification.objects.create(
                        user=seeker.user,
                        notification_type='application_status_update', 
                        application = serializer.instance,
                        url = f'/applications/{serializer.instance.id}/',
                        content=f'The status for your application for pet {instance.pet.name} has been updated.'
                    )
            elif seeker and seeker.user.id == self.request.user.id:
                # Seeker can only update from pending or accepted to withdrawn
                if current_status in ['pending', 'accepted'] and new_status == 'withdrawn':
                    # status = serializer.validated_data.get('status', None)
                    serializer.validated_data['status'] = new_status
                    serializer.save()
                    # make notification for status update
                    Notification.objects.create(
                        user=shelter.user,
                        notification_type='application_status_update',
                        application = serializer.instance, 
                        url = f'/applications/{serializer.instance.id}/',
                        content=f'The status for your pet {instance.pet.name} has been updated.'
                    )
            else:
                raise serializers.ValidationError("No permissions")
            
        else:
            raise serializers.ValidationError("Invalid update operation.")
        