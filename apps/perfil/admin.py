from django.contrib import admin
from .models import Perfil


@admin.register(Perfil)
class PerfilAdmin(admin.ModelAdmin):
    list_display = ['id', 'user', 'nome', 'telefone', 'tipo']
    list_filter = ['tipo']
    search_fields = ['nome', 'telefone', 'user__username', 'user__email']
    ordering = ['nome']