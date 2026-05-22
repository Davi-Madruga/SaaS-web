from django.contrib import admin
from .models import Servico, Agendamento


@admin.register(Servico)
class ServicoAdmin(admin.ModelAdmin):
    list_display = ['id', 'nome', 'valor']
    search_fields = ['nome']
    ordering = ['nome']


@admin.register(Agendamento)
class AgendamentoAdmin(admin.ModelAdmin):
    list_display = ['id', 'cliente', 'barbeiro', 'servico', 'data_hora']
    list_filter = ['servico', 'barbeiro', 'data_hora']
    search_fields = [
        'cliente__nome',
        'barbeiro__nome',
        'servico__nome',
    ]
    ordering = ['-data_hora']