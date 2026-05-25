from .models import Perfil
from rest_framework import serializers
from django.db import transaction
from django.contrib.auth import get_user_model

User = get_user_model()


class PerfilSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(source="user.email", read_only=True)
    usuario_id = serializers.IntegerField(source="user.id", read_only=True)

    class Meta:
        model = Perfil
        fields = ["id", "usuario_id", "nome", "telefone", "tipo", "email"]
        read_only_fields = ["id", "usuario_id", "email", "tipo"]


class CadastroClienteSerializer(serializers.Serializer):
    nome = serializers.CharField()
    telefone = serializers.CharField()
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate_email(self, value):
        email = value.strip().lower()

        if User.objects.filter(email=email).exists():
            raise serializers.ValidationError("Não foi possível realizar o cadastro")

        return email

    @transaction.atomic
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
        )

        perfil = Perfil.objects.create(
            user=user,
            nome=validated_data["nome"],
            telefone=validated_data["telefone"],
            tipo="cliente",
        )

        return {
            "id": perfil.id,
            "usuario_id": user.id,
            "nome": perfil.nome,
            "telefone": perfil.telefone,
            "tipo": perfil.tipo,
            "email": user.email,
        }


class UsuarioAdminSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    perfil_id = serializers.IntegerField(source="perfil.id", read_only=True)
    nome = serializers.CharField()
    telefone = serializers.CharField()
    tipo = serializers.ChoiceField(
        choices=[("barbeiro", "Barbeiro"), ("cliente", "Cliente")],
        required=False,
        default="barbeiro",
    )
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True, required=False, allow_blank=True)

    def validate_email(self, value):
        email = value.strip().lower()
        queryset = User.objects.filter(email=email)

        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)

        if queryset.exists():
            raise serializers.ValidationError("Este email já está em uso.")

        return email

    def validate(self, attrs):
        if not self.instance and not attrs.get("password"):
            raise serializers.ValidationError({"password": "A senha é obrigatória."})

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        nome = validated_data.pop("nome")
        telefone = validated_data.pop("telefone")
        tipo = validated_data.pop("tipo", "barbeiro")
        email = validated_data.pop("email")
        password = validated_data.pop("password")

        user = User.objects.create_user(
            email=email,
            password=password,
        )

        Perfil.objects.create(
            user=user,
            nome=nome,
            telefone=telefone,
            tipo=tipo,
        )

        return user

    @transaction.atomic
    def update(self, instance, validated_data):
        perfil = instance.perfil

        if "email" in validated_data:
            instance.email = validated_data["email"]

        password = validated_data.get("password")
        if password:
            instance.set_password(password)

        instance.save()

        if "nome" in validated_data:
            perfil.nome = validated_data["nome"]

        if "telefone" in validated_data:
            perfil.telefone = validated_data["telefone"]

        if "tipo" in validated_data:
            perfil.tipo = validated_data["tipo"]

        perfil.save()

        return instance

    def to_representation(self, instance):
        perfil = instance.perfil

        return {
            "id": instance.id,
            "perfil_id": perfil.id,
            "nome": perfil.nome,
            "telefone": perfil.telefone,
            "tipo": perfil.tipo,
            "email": instance.email,
        }
