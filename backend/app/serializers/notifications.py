from rest_framework.serializers import ModelSerializer
from ..models import Notification

class NotificationSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"
        read_only_fields = ['id', 'user', 'content', 'created_at', 'notification_type', 'application', 'application_comment', 'shelter_comment']

class NotificationUpdateRetrieveSerializer(ModelSerializer):
    class Meta:
        model = Notification
        fields = ['is_read', 'url', 'notification_type', 'application']
