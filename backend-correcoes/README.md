# Correções necessárias no backend Django

Copie estes arquivos para o seu backend, mantendo os mesmos caminhos:

```txt
backend-correcoes/apps/perfil/serializers.py -> apps/perfil/serializers.py
backend-correcoes/apps/perfil/views.py       -> apps/perfil/views.py
backend-correcoes/apps/perfil/urls.py        -> apps/perfil/urls.py
```

Depois rode o backend normalmente.

## O que foi alterado

- Adicionado endpoint `POST /api/usuario/` para criar usuário + perfil de barbeiro.
- Adicionado endpoint `PATCH /api/usuario/{id}/` para atualizar nome, telefone, email e senha.
- O endpoint `/api/perfis/` continua servindo para listar, detalhar e atualizar dados simples de perfil.
- O `PerfilSerializer` agora retorna `usuario_id`, que o front usa para saber qual usuário atualizar quando estiver editando um barbeiro.

## Exemplo para criar barbeiro

```json
{
  "nome": "João Barbeiro",
  "telefone": "83999999999",
  "email": "joao@barbearia.com",
  "password": "12345678",
  "tipo": "barbeiro"
}
```

## Exemplo para atualizar barbeiro

```json
{
  "nome": "João Silva",
  "telefone": "83988888888",
  "email": "joao.silva@barbearia.com",
  "password": "novaSenha123"
}
```

Se não quiser trocar a senha, envie a atualização sem o campo `password`.
