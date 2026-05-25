# Barbearia Academy - Front-end em React

Este projeto é somente o front-end em React para o sistema de barbearia.
Ele foi organizado para consumir uma API Python/Django REST Framework com autenticação JWT.

A rota inicial `/` agora é uma home page pública com logo, slogan e botões para login/cadastro. As telas internas começam após o login, a partir de `/dashboard`.

## Tecnologias usadas

- React
- Vite
- React Router DOM
- Axios
- CSS puro organizado em um arquivo global

## Por que está organizado assim?

A estrutura separa responsabilidades:

- `services/api`: conexão com o backend Django.
- `services/storage`: persistência dos tokens JWT no navegador.
- `context/AuthContext.jsx`: estado global do usuário logado.
- `components`: componentes reutilizáveis.
- `pages`: telas do sistema.
- `routes`: controle de rotas protegidas por autenticação e tipo de usuário.

## Endpoints esperados no backend

Baseado nos fontes enviados, o front espera estes endpoints:

```txt
POST   /api/clientes/
POST   /api/token/
POST   /api/token/refresh/
GET    /api/perfis/
GET    /api/servicos/
POST   /api/servicos/
PATCH  /api/servicos/:id/
DELETE /api/servicos/:id/
GET    /api/agendamentos/
POST   /api/agendamentos/
PATCH  /api/agendamentos/:id/
DELETE /api/agendamentos/:id/
```

Você pode alterar os caminhos no arquivo `.env` sem precisar sair procurando no código.

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

No Windows PowerShell, caso não use `cp`, faça:

```powershell
copy .env.example .env
npm run dev
```

## Ajuste importante para login

No backend enviado, o Simple JWT usa o campo configurado no Usuario.USERNAME_FIELD. Como o model Usuario usa email, o login recebe:

```json
{
  "email": "usuario@email.com",
  "password": "senha"
}
```

Se você voltar para o User padrão do Django, mude no `.env`:

```env
VITE_LOGIN_FIELD=username
```

Assim o front passa a enviar:

```json
{
  "username": "usuario",
  "password": "senha"
}
```

## CORS no Django

Garanta que o backend permite o Vite:

```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]
```

## Observação sobre funcionalidades sem endpoint

Os requisitos falam sobre bloqueio de agenda, cadastro de funcionários e horário de funcionamento. Este front já tem telas para essas áreas, mas as ações que não existem nos fontes do backend ficam em modo visual/preparado. O código conectado de verdade usa os recursos existentes no backend atual: clientes, perfis, serviços, autenticação e agendamentos.
