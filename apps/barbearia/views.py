from .models import Servico, Agendamento
from .serializers import ServicoSerializer, AgendamentoSerializer
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated, SAFE_METHODS
from rest_framework.exceptions import PermissionDenied
from .permissions import IsAdmin


class ServicoViewSet(viewsets.ModelViewSet):
    queryset = Servico.objects.all()
    serializer_class = ServicoSerializer
    permission_classes = [IsAuthenticated, IsAdmin]

    def get_permissions(self):
        if self.request.method in SAFE_METHODS:
            return[IsAuthenticated()]
        return[IsAuthenticated(),IsAdmin()]


class AgendamentoViewSet(viewsets.ModelViewSet):
    queryset = Agendamento.objects.all()
    serializer_class = AgendamentoSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        perfil = self.request.user.perfil

        if perfil.tipo == 'admin':
            return Agendamento.objects.all()

        if perfil.tipo == 'barbeiro':
            return Agendamento.objects.filter(barbeiro=perfil)

        return Agendamento.objects.filter(cliente=perfil)

    def perform_create(self, serializer):
        perfil = self.request.user.perfil

        if perfil.tipo != 'cliente':
            raise PermissionDenied(
                'Apenas clientes podem criar agendamentos.'
            )

        serializer.save(cliente=perfil)