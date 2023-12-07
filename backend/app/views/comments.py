from django.shortcuts import get_object_or_404
from rest_framework.generics import ListCreateAPIView
from rest_framework.permissions import IsAuthenticated
from ..models import Comment, ShelterComment, ApplicationComment, Shelter, Application, Notification
from ..serializers import ShelterCommentSerializer, ApplicationCommentSerializer
from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied

class CommentListPagination(PageNumberPagination):
    page_size = 10 

class ShelterCommentCreateView(ListCreateAPIView):
    serializer_class = ShelterCommentSerializer
    # permission_classes = [IsAuthenticated]
    pagination_class = CommentListPagination

    def get_queryset(self):
        shelter_id = self.kwargs.get('pk')
        shelter = get_object_or_404(Shelter, id=shelter_id)
        return Comment.objects.filter(sheltercomment__shelter=shelter).order_by('-creation_time')

    def perform_create(self, serializer):
        shelter_id = self.kwargs.get('pk')
        shelter = get_object_or_404(Shelter, id=shelter_id)
        content = serializer.validated_data.get('content', None)
        rating = serializer.validated_data.get('rating', None)
        new_comment = Comment.objects.create(user=self.request.user, 
                                             user_name=self.request.user.first_name + ' ' + self.request.user.last_name,
                                             user_type=self.request.user.account_type,
                                             rating=rating,
                                             comment_type='shelter', 
                                             content=content)
        shelter_comment = ShelterComment.objects.create(comment=new_comment, 
                                                        shelter=shelter)
        # create notification to shelter if the user isnt the shelter itself
        if self.request.user.account_type == 'seeker':
            Notification.objects.create(
                user=shelter.user,
                notification_type='shelter_comment', 
                shelter_comment = shelter_comment,
                url = f'/shelters/{shelter.id}/comment/',
                content=f'{self.request.user.first_name} {self.request.user.last_name} commented on your shelter page.'
            )

class ApplicationCommentCreateView(ListCreateAPIView):
    serializer_class = ApplicationCommentSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CommentListPagination

    def get_queryset(self):
        application_id = self.kwargs.get('pk')
        application = get_object_or_404(Application, id=application_id)
        if self.request.user.account_type == 'shelter':
            if application.shelter != self.request.user.shelter:
                raise PermissionDenied()
        elif self.request.user.account_type == 'seeker':
            if application.seeker != self.request.user.seeker:
                raise PermissionDenied()
        return Comment.objects.filter(applicationcomment__application=application).order_by('-creation_time')

    def perform_create(self, serializer):
        application_id = self.kwargs.get('pk')
        application = get_object_or_404(Application, id=application_id)
        # Only the specific shelter and pet seeker can comment on their application.
        if self.request.user.account_type == 'shelter':
            if application.shelter != self.request.user.shelter:
                raise PermissionDenied()
        elif self.request.user.account_type == 'seeker':
            if application.seeker != self.request.user.seeker:
                raise PermissionDenied()
        content = serializer.validated_data.get('content', None)
        new_comment = Comment.objects.create(user=self.request.user,
                                             user_name=self.request.user.first_name + ' ' + self.request.user.last_name,
                                             user_type=self.request.user.account_type, 
                                             comment_type='application', 
                                             content=content)
        application_comment = ApplicationComment.objects.create(comment=new_comment, application=application)
        application.last_updated = new_comment.creation_time
        # if the user is a seeker, create notification to shelter
        if self.request.user.account_type == 'seeker':
            Notification.objects.create(
                user=application.shelter.user,
                notification_type='application_comment', 
                application_comment = application_comment,
                url = f'/applications/{application.id}/comment/',
                content=f'{self.request.user.first_name} {self.request.user.last_name} commented on their application for {application.pet.name}.'
            )
        # if the user is a shelter, create notification to seeker
        elif self.request.user.account_type == 'shelter':
            Notification.objects.create(
                user=application.seeker.user,
                notification_type='application_comment', 
                application_comment = application_comment,
                url = f'/applications/{application.id}/comment/',
                content=f'{self.request.user.first_name} {self.request.user.last_name} commented on your application for {application.pet.name}.'
            )
        application.save()