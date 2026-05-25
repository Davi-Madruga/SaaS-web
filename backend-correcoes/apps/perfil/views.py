from rest_framework import viewsets, mixins
from rest_framework.permissions import AllowAny, IsAuthenticated, BasePermission
from .serializers import CadastroClienteSerializer, PerfilSerializer, UsuarioAdminSerializer
from .models import Perfil
from django.contrib.auth import get_user_model

User = get_user_model()


class IsAdmin(BasePermission):
    message = "Apenas administradores podem acessar este recurso."

    def has_permission(self, request, view):
        user = request.user

        if not user or not user.is_authenticated:
            return False

        if user.is_superuser:
            return True

        perfil = getattr(user, "perfil", None)
        return perfil is not None and perfil.tipo == "admin"


class CadastroClienteViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    serializer_class = CadastroClienteSerializer
    permission_classes = [AllowAny]


class PerfilViewSet(
    mixins.ListModelMixin,
    mixins.UpdateModelMixin,
    mixins.RetrieveModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = PerfilSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        perfil = self.request.user.perfil
        queryset = Perfil.objects.all().select_related("user")
        tipo = self.request.query_params.get("tipo")

        if perfil.tipo == "admin":
            if tipo:
                return queryset.filter(tipo=tipo)
            return queryset

        if tipo == "barbeiro":
            return queryset.filter(tipo="barbeiro")

        return Perfil.objects.filter(user=self.request.user).select_related("user")


class UsuarioAdminViewSet(
    mixins.CreateModelMixin,
    mixins.ListModelMixin,
    mixins.RetrieveModelMixin,
    mixins.UpdateModelMixin,
    viewsets.GenericViewSet,
):
    serializer_class = UsuarioAdminSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_queryset(self):
        return User.objects.all().select_related("perfil")
