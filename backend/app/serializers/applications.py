from rest_framework.serializers import ModelSerializer, DateTimeField, ListField, \
    PrimaryKeyRelatedField, HyperlinkedRelatedField
from ..models import Application

class ApplicationSerializer(ModelSerializer):
    class Meta:
        model = Application
        fields = '__all__'
        read_only_fields = ['application_date']

# class ApplicationUpdateSerializer(ModelSerializer):
#     class Meta:
#         model = Application
#         fields = ['status']