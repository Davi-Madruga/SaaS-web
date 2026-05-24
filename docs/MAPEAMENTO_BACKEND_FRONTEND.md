# Mapeamento do Front com o Backend Django

## Autenticação

### Login

Arquivo do front:

```txt
src/services/api/authService.js
```

Endpoint esperado:

```txt
POST /api/token/
```

Payload padrão do backend enviado:

```json
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

Isso acontece porque o model `Usuario` remove `username` e usa `USERNAME_FIELD = "email"`.

## Cadastro

Endpoint esperado nos fontes enviados:

```txt
POST /api/clientes/
```

Payload:

```json
{
  "nome": "Cliente Teste",
  "telefone": "83999999999",
  "email": "cliente@email.com",
  "password": "12345678"
}
```

## Perfil

Endpoint esperado:

```txt
GET /api/perfis/
PATCH /api/perfis/:id/
```

Campos esperados:

```json
{
  "id": 1,
  "nome": "Luis",
  "telefone": "83999999999",
  "tipo": "cliente",
  "email": "email@teste.com"
}
```

Tipos usados no front:

```txt
cliente
barbeiro
admin
```

## Serviços

Endpoint esperado:

```txt
GET    /api/servicos/
POST   /api/servicos/
PATCH  /api/servicos/:id/
DELETE /api/servicos/:id/
```

Campos esperados:

```json
{
  "id": 1,
  "nome": "Corte social",
  "valor": 35.0,
  "duracao_minutos": 40
}
```

## Agendamentos

Endpoint esperado:

```txt
GET    /api/agendamentos/
POST   /api/agendamentos/
PATCH  /api/agendamentos/:id/
DELETE /api/agendamentos/:id/
```

Payload de criação enviado pelo front:

```json
{
  "barbeiro": 2,
  "servicos": [1, 3],
  "data_hora": "2026-05-30T14:00"
}
```

O cliente não é enviado porque o backend define pelo token JWT em `perform_create()`.

## Regras feitas no front

- Tela separada por perfil do usuário.
- Cliente acessa agendamento, meus agendamentos e histórico.
- Barbeiro acessa agenda e bloqueios.
- Admin acessa serviços, funcionários, horários e agenda geral.
- A criação de funcionários e horários fica preparada para endpoints futuros, porque os fontes enviados só trazem cadastro de clientes e atualização de perfil.
- Cancelamento valida 24 horas no front antes de chamar o backend.

A regra de 24 horas também deve ficar no backend, porque validação apenas no front pode ser burlada.
