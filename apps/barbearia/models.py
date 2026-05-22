from django.db import models
from django.utils import timezone
from apps.perfil.models import Perfil
from django.core.exceptions import ValidationError

class Servico(models.Model):
    nome = models.CharField(max_length=50)
    valor = models.DecimalField(max_digits=6,decimal_places=2)
 
    def __str__(self):
        return self.nome

class Agendamento(models.Model):
    data_hora = models.DateTimeField()
    cliente = models.ForeignKey(Perfil,on_delete=models.RESTRICT,related_name='agendamentos_cliente',limit_choices_to={'tipo': 'cliente'})
    barbeiro = models.ForeignKey(Perfil,on_delete=models.RESTRICT,related_name='agendamentos_barbeiro',limit_choices_to={'tipo': 'barbeiro'})
    servico = models.ForeignKey(Servico,on_delete=models.RESTRICT,related_name='agendamentos_servico')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['barbeiro', 'data_hora'],
                name='unique_agendamento_barbeiro_data_hora'
            )
        ]

    def clean(self):
        super().clean()

        if self.data_hora and self.data_hora < timezone.now():
            raise ValidationError({
                'data_hora': 'Não é possível agendar para uma data ou hora no passado.'
            })

        if self.cliente and self.cliente.tipo != 'cliente':
            raise ValidationError({
                'cliente': 'O perfil selecionado precisa ser do tipo cliente.'
            })

        if self.barbeiro and self.barbeiro.tipo != 'barbeiro':
            raise ValidationError({
                'barbeiro': 'O perfil selecionado precisa ser do tipo barbeiro.'
            })

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.cliente} - {self.barbeiro} - {self.data_hora}"
