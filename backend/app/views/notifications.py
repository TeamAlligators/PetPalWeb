from django.shortcuts import render
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import RetrieveUpdateDestroyAPIView, ListAPIView
from ..serializers import NotificationSerializer, NotificationUpdateRetrieveSerializer
from ..models import Notification
from rest_framework.exceptions import PermissionDenied
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.http import JsonResponse
from django.shortcuts import get_object_or_404

class NotifPagination(PageNumberPagination):
    page_size = 3  

class NotificationList(ListAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = NotificationSerializer
    pagination_class = NotifPagination

    def get_queryset(self):
        user = self.request.user
        new_user_id = user.id
        queryset = Notification.objects.filter(user=new_user_id).order_by('-created_at')
        # filter notif by read/unread
        is_read = self.request.query_params.get('read')
        # print('isread', is_read, is_read == False)

        if is_read is not None:
          print('isread', is_read)
          queryset = queryset.filter(is_read=is_read)

        return queryset

class NotificationDetail(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated] 
    serializer_class = NotificationUpdateRetrieveSerializer

    def get_object(self):
        notification_id = self.kwargs.get('pk')
        notification = get_object_or_404(Notification, id=notification_id)
        if not notification.is_read:
            notification.is_read = True
            notification.save()
        return Notification.objects.filter(id=notification_id).values('url').first()


    def perform_destroy(self, instance):
        notification_id = self.kwargs.get('pk')
        user = self.request.user
        notification = Notification.objects.filter(id=notification_id).first()
        if notification and notification.user != user:
            raise PermissionDenied("You do not have permission to delete this object.")
        if notification:
            notification.delete()
            print('delte notif')