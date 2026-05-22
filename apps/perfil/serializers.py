from rest_framework import serializers
from django.contrib.auth.models import User
from django.db import transaction
from .models import Perfil

from django.contrib.auth import authenticate
from rest_framework_simplejwt.exceptions import AuthenticationFailed
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class PerfilSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source='user.email', read_only=True)

    class Meta:
        model = Perfil
        fields = ['id', 'nome', 'telefone', 'tipo', 'email']
        read_only_fields = ['id']

class RegistroSerializer(serializers.Serializer):
    nome = serializers.CharField()
    telefone = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        email = value.lower()

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Não foi possível realizar o cadastro")
        
        return email

    @transaction.atomic
    def create(self, validated_data):
        email = validated_data['email'].lower()
        password = validated_data['password']

        username_base = email.split('@')[0]
        username = username_base
        counter = 1
        while User.objects.filter(username=username).exists():
            username = f"{username_base}{counter}"
            counter += 1

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password
        )

        perfil = Perfil.objects.create(
            user=user,
            nome=validated_data['nome'],
            telefone=validated_data['telefone'],
            tipo="cliente"
        )

        return {
            'id': perfil.id,
            'nome': perfil.nome,
            'telefone': perfil.telefone,
            'tipo': perfil.tipo,
            'email': user.email
        }

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        email = attrs.get('email', '').strip().lower()
        password = attrs.get('password')

        user_obj = User.objects.filter(email__iexact=email).first()

        if user_obj is None:
            raise AuthenticationFailed("Email ou senha inválidos.")

        user = authenticate(
            request=self.context.get('request'),
            username=user_obj.username,
            password=password
        )

        if user is None:
            raise AuthenticationFailed("Email ou senha inválidos.")

        refresh = self.get_token(user)

        return {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user': {
                'id': user.id,
                'email': user.email,
                'nome': user.perfil.nome,
                'telefone': user.perfil.telefone,
                'tipo': user.perfil.tipo,
            }
        }
