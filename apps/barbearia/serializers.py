from rest_framework import serializers
from .models import Servico, Agendamento
from django.utils import timezone

class ServicoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Servico
        fields = '__all__'
        read_only_fields = ['cliente']

class AgendamentoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agendamento
        fields = '__all__'
        read_only_fields = ['cliente']

    def validate_data_hora(self, value):
        if value < timezone.now():
            raise serializers.ValidationError(
                "Não é possível criar agendamento para uma data ou hora no passado."
            )

        return value    
