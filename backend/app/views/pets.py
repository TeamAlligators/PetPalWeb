from rest_framework.pagination import PageNumberPagination
from rest_framework.exceptions import PermissionDenied
from rest_framework.filters import SearchFilter, OrderingFilter
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, \
    ListAPIView
from ..serializers import PetSerializer
from ..models import Pet, Application, ApplicationComment
from django.shortcuts import get_object_or_404

class PetCreateView(ListCreateAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer

class PetRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    serializer_class = PetSerializer

    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return Pet.objects.filter(id=pk)
    
    def perform_destroy(self, instance):
        if self.request.user.id != self.get_object().shelter.user.id:
            raise PermissionDenied()
        apps = Application.objects.filter(pet=instance)
        for app in apps:
            comments = ApplicationComment.objects.filter(application=app)
            for comment in comments:
                comment.delete()
        for app in apps:
            app.delete()
        instance.delete()

class PetSearchPagination(PageNumberPagination):
    page_size = 10  # 

class PetSearchView(ListAPIView):
    queryset = Pet.objects.all()
    serializer_class = PetSerializer
    pagination_class = PetSearchPagination

    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['status', 'shelterId', 'gender', 'breed']
    ordering_fields = ['name', 'age']

    def get_queryset(self):
        queryset = super().get_queryset()

        shelter_id = self.request.query_params.get('shelterId')
        status = self.request.query_params.get('status')
        gender = self.request.query_params.get('gender')
        breed = self.request.query_params.get('breed')

        order = self.request.query_params.getlist('order')
        
        # Filtering
        if shelter_id:
            # currShelter = get_object_or_404(Shelter, id=shelter_id)
            queryset = queryset.filter(shelter=shelter_id)
        
        if status:
            queryset = queryset.filter(status=status)
        
        if gender:
            queryset = queryset.filter(gender=gender)
        
        if breed:
            queryset = queryset.filter(breed=breed)

        if (not shelter_id) and (not status) and (not gender) and (not breed):
            queryset = queryset.filter(status='available')

        if len(order) == 2:
            queryset = queryset.order_by(order[0], order[1])
        elif len(order) == 1:
            queryset = queryset.order_by(order[0])

        return queryset