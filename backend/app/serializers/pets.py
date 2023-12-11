from rest_framework.serializers import ModelSerializer, PrimaryKeyRelatedField
from ..models import Pet

class PetSerializer(ModelSerializer):
    user = PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = Pet
        fields = "__all__"