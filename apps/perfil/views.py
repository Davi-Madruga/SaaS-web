from rest_framework import viewsets, mixins
from .serializers import PerfilSerializer, RegistroSerializer, EmailTokenObtainPairSerializer
from rest_framework.permissions import AllowAny, IsAuthenticated
from .models import Perfil

from rest_framework_simplejwt.views import TokenObtainPairView

class RegistroViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = RegistroSerializer
    permission_classes = [AllowAny]

class PerfilViewSet(mixins.ListModelMixin,mixins.UpdateModelMixin,
mixins.RetrieveModelMixin,viewsets.GenericViewSet):
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Perfil.objects.filter(user=self.request.user)

class EmailTokenObtainPairView(TokenObtainPairView):
    serializer_class = EmailTokenObtainPairSerializer