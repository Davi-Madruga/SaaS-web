# Endpoints da API — SaaS de Barbearia

Documentação dos endpoints expostos pelo backend Django/DRF do sistema de barbearia.

- **Base URL:** `/api/`
- **Autenticação:** JWT com Simple JWT.
- **Header de autenticação:** `Authorization: Bearer <access>`
- **Formato:** Todas as requisições e respostas usam `application/json`.
- **Padrão de resposta:** A API usa o padrão do Django REST Framework. Em endpoints de cadastro, a resposta retorna os dados principais do perfil criado.

---

## Índice

### Autenticação e Perfil (`/api/`)

| Método | Rota                    | Autenticação | Descrição                                      |
| ------ | ----------------------- | ------------ | ---------------------------------------------- |
| POST   | `/api/registro/`        | Pública      | Cadastra um novo usuário como cliente          |
| POST   | `/api/token/`           | Pública      | Realiza login e retorna tokens JWT             |
| POST   | `/api/token/refresh/`   | Pública      | Renova o access token usando o refresh token   |
| GET    | `/admin/`               | Admin Django | Acessa o painel administrativo do Django       |

### Serviços (`/api/servicos/`)

| Método | Rota                    | Autenticação | Descrição                            |
| ------ | ----------------------- | ------------ | ------------------------------------ |
| GET    | `/api/servicos/`        | JWT          | Lista todos os serviços              |
| GET    | `/api/servicos/{id}/`   | JWT          | Detalha um serviço específico        |
| POST   | `/api/servicos/`        | JWT + admin  | Cria um novo serviço                 |
| PUT    | `/api/servicos/{id}/`   | JWT + admin  | Atualiza todos os dados do serviço   |
| PATCH  | `/api/servicos/{id}/`   | JWT + admin  | Atualiza parcialmente um serviço     |
| DELETE | `/api/servicos/{id}/`   | JWT + admin  | Remove um serviço                    |

### Agendamentos (`/api/agendamentos/`)

| Método | Rota                         | Autenticação | Descrição                                      |
| ------ | ---------------------------- | ------------ | ---------------------------------------------- |
| GET    | `/api/agendamentos/`         | JWT          | Lista agendamentos conforme o perfil logado    |
| GET    | `/api/agendamentos/{id}/`    | JWT          | Detalha um agendamento específico              |
| POST   | `/api/agendamentos/`         | JWT + cliente| Cria um novo agendamento                       |
| PUT    | `/api/agendamentos/{id}/`    | JWT          | Atualiza todos os dados de um agendamento      |
| PATCH  | `/api/agendamentos/{id}/`    | JWT          | Atualiza parcialmente um agendamento           |
| DELETE | `/api/agendamentos/{id}/`    | JWT          | Remove um agendamento                          |


-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=


## 11. Exemplos de JSON e respostas esperadas

Esta seção mostra exemplos de requisições e respostas esperadas para os principais endpoints da aplicação.

---

## 11.1. Cadastro de cliente

### `POST /api/registro/`

Cria um novo usuário e um perfil automaticamente com `tipo = "cliente"`.

**Body JSON:**

```json
{
  "nome": "João Silva",
  "telefone": "999999999",
  "email": "joao@email.com",
  "password": "12345678"
}

Resposta esperada 201 Created:

{
  "id": 1,
  "nome": "João Silva",
  "telefone": "999999999",
  "tipo": "cliente",
  "email": "joao@email.com"
}

Resposta esperada 400 Bad Request quando o email já existe:

{
  "email": [
    "Não foi possível realizar o cadastro com os dados informados."
  ]
}

Resposta esperada 400 Bad Request quando algum campo obrigatório não é enviado:

{
  "nome": [
    "Este campo é obrigatório."
  ],
  "telefone": [
    "Este campo é obrigatório."
  ],
  "email": [
    "Este campo é obrigatório."
  ],
  "password": [
    "Este campo é obrigatório."
  ]
}
11.2. Login
POST /api/token/

Realiza login e retorna os tokens JWT.

Se estiver usando o Simple JWT padrão, o campo esperado é username.

Body JSON:

{
  "username": "joao",
  "password": "12345678"
}

Resposta esperada 200 OK:

{
  "refresh": "refresh_token_aqui",
  "access": "access_token_aqui"
}

Caso o login tenha sido customizado para usar email, o body pode ser:

{
  "email": "joao@email.com",
  "password": "12345678"
}

Resposta esperada 401 Unauthorized para credenciais inválidas:

{
  "detail": "No active account found with the given credentials"
}
11.3. Refresh de token
POST /api/token/refresh/

Gera um novo access token a partir de um refresh token válido.

Body JSON:

{
  "refresh": "refresh_token_aqui"
}

Resposta esperada 200 OK:

{
  "access": "novo_access_token_aqui"
}

Resposta esperada 401 Unauthorized para refresh token inválido ou expirado:

{
  "detail": "Token is invalid or expired",
  "code": "token_not_valid"
}
11.4. Listar serviços
GET /api/servicos/

Lista todos os serviços cadastrados.

Headers:

Authorization: Bearer access_token_aqui

Resposta esperada 200 OK:

[
  {
    "id": 1,
    "nome": "Corte de cabelo",
    "valor": "25.00"
  },
  {
    "id": 2,
    "nome": "Barba",
    "valor": "15.00"
  },
  {
    "id": 3,
    "nome": "Sobrancelha",
    "valor": "10.00"
  }
]

Resposta esperada 401 Unauthorized quando o token não é enviado:

{
  "detail": "As credenciais de autenticação não foram fornecidas."
}
11.5. Detalhar serviço
GET /api/servicos/{id}/

Busca um serviço pelo ID.

Exemplo:

GET /api/servicos/1/

Headers:

Authorization: Bearer access_token_aqui

Resposta esperada 200 OK:

{
  "id": 1,
  "nome": "Corte de cabelo",
  "valor": "25.00"
}

Resposta esperada 404 Not Found quando o serviço não existe:

{
  "detail": "Não encontrado."
}
11.6. Criar serviço
POST /api/servicos/

Cria um novo serviço.

Apenas usuários com perfil admin podem criar serviços.

Headers:

Authorization: Bearer access_token_admin_aqui

Body JSON:

{
  "nome": "Corte de cabelo",
  "valor": "25.00"
}

Resposta esperada 201 Created:

{
  "id": 1,
  "nome": "Corte de cabelo",
  "valor": "25.00"
}

Resposta esperada 403 Forbidden quando o usuário não é admin:

{
  "detail": "Apenas administradores podem gerenciar serviços."
}

Resposta esperada 400 Bad Request quando algum campo obrigatório não é enviado:

{
  "nome": [
    "Este campo é obrigatório."
  ],
  "valor": [
    "Este campo é obrigatório."
  ]
}

Resposta esperada 400 Bad Request quando o valor é inválido:

{
  "valor": [
    "Um número válido é necessário."
  ]
}
11.7. Atualizar serviço completo
PUT /api/servicos/{id}/

Atualiza todos os campos de um serviço.

Apenas usuários com perfil admin podem atualizar serviços.

Exemplo:

PUT /api/servicos/1/

Headers:

Authorization: Bearer access_token_admin_aqui

Body JSON:

{
  "nome": "Corte completo",
  "valor": "30.00"
}

Resposta esperada 200 OK:

{
  "id": 1,
  "nome": "Corte completo",
  "valor": "30.00"
}

Resposta esperada 403 Forbidden quando o usuário não é admin:

{
  "detail": "Apenas administradores podem gerenciar serviços."
}

Resposta esperada 404 Not Found quando o serviço não existe:

{
  "detail": "Não encontrado."
}
11.8. Atualizar serviço parcialmente
PATCH /api/servicos/{id}/

Atualiza apenas alguns campos de um serviço.

Apenas usuários com perfil admin podem atualizar serviços.

Exemplo:

PATCH /api/servicos/1/

Headers:

Authorization: Bearer access_token_admin_aqui

Body JSON:

{
  "valor": "35.00"
}

Resposta esperada 200 OK:

{
  "id": 1,
  "nome": "Corte completo",
  "valor": "35.00"
}

Outro exemplo atualizando apenas o nome:

{
  "nome": "Corte masculino"
}

Resposta esperada 200 OK:

{
  "id": 1,
  "nome": "Corte masculino",
  "valor": "35.00"
}
11.9. Excluir serviço
DELETE /api/servicos/{id}/

Remove um serviço.

Apenas usuários com perfil admin podem excluir serviços.

Exemplo:

DELETE /api/servicos/1/

Headers:

Authorization: Bearer access_token_admin_aqui

Resposta esperada 204 No Content:

Normalmente, a resposta 204 No Content não possui corpo.

Resposta esperada 403 Forbidden quando o usuário não é admin:

{
  "detail": "Apenas administradores podem gerenciar serviços."
}

Resposta esperada se o serviço estiver vinculado a um agendamento:

{
  "detail": "Não é possível excluir este serviço porque ele está vinculado a um agendamento."
}

Observação: dependendo da configuração atual do projeto, essa mensagem pode aparecer como erro interno se o RestrictedError ainda não estiver tratado manualmente.

11.10. Listar agendamentos
GET /api/agendamentos/

Lista os agendamentos de acordo com o perfil do usuário logado.

Headers:

Authorization: Bearer access_token_aqui
Resposta esperada para usuário admin

O admin visualiza todos os agendamentos.

[
  {
    "id": 1,
    "data_hora": "2026-05-22T14:30:00Z",
    "cliente": 1,
    "barbeiro": 2,
    "servico": 1
  },
  {
    "id": 2,
    "data_hora": "2026-05-23T10:00:00Z",
    "cliente": 3,
    "barbeiro": 2,
    "servico": 2
  }
]
Resposta esperada para usuário barbeiro

O barbeiro visualiza apenas os agendamentos em que ele é o barbeiro.

[
  {
    "id": 1,
    "data_hora": "2026-05-22T14:30:00Z",
    "cliente": 1,
    "barbeiro": 2,
    "servico": 1
  }
]
Resposta esperada para usuário cliente

O cliente visualiza apenas os próprios agendamentos.

[
  {
    "id": 1,
    "data_hora": "2026-05-22T14:30:00Z",
    "cliente": 1,
    "barbeiro": 2,
    "servico": 1
  }
]

Resposta esperada quando não há agendamentos:

[]

Resposta esperada 401 Unauthorized quando o token não é enviado:

{
  "detail": "As credenciais de autenticação não foram fornecidas."
}
11.11. Detalhar agendamento
GET /api/agendamentos/{id}/

Busca um agendamento específico pelo ID.

Exemplo:

GET /api/agendamentos/1/

Headers:

Authorization: Bearer access_token_aqui

Resposta esperada 200 OK:

{
  "id": 1,
  "data_hora": "2026-05-22T14:30:00Z",
  "cliente": 1,
  "barbeiro": 2,
  "servico": 1
}

Resposta esperada 404 Not Found:

{
  "detail": "Não encontrado."
}

Essa resposta pode acontecer quando:

o agendamento não existe;
o agendamento existe, mas não pertence ao cliente logado;
o agendamento existe, mas não pertence ao barbeiro logado;
o usuário não tem acesso ao objeto pelo filtro do get_queryset.
11.12. Criar agendamento
POST /api/agendamentos/

Cria um novo agendamento.

Apenas usuários com perfil cliente podem criar agendamentos.

O campo cliente não deve ser enviado no JSON. Ele é definido automaticamente pelo backend usando request.user.perfil.

Headers:

Authorization: Bearer access_token_cliente_aqui

Body JSON:

{
  "data_hora": "2026-05-22T14:30:00Z",
  "barbeiro": 2,
  "servico": 1
}

Resposta esperada 201 Created:

{
  "id": 1,
  "data_hora": "2026-05-22T14:30:00Z",
  "cliente": 1,
  "barbeiro": 2,
  "servico": 1
}

Resposta esperada 403 Forbidden quando admin ou barbeiro tenta criar agendamento:

{
  "detail": "Apenas clientes podem criar agendamentos."
}

Resposta esperada 400 Bad Request quando a data está no passado:

{
  "data_hora": [
    "Não é possível criar agendamento para uma data ou hora no passado."
  ]
}

Resposta esperada 400 Bad Request quando o barbeiro não existe:

{
  "barbeiro": [
    "Pk inválido \"99\" - objeto não existe."
  ]
}

Resposta esperada 400 Bad Request quando o serviço não existe:

{
  "servico": [
    "Pk inválido \"99\" - objeto não existe."
  ]
}

Resposta esperada 400 Bad Request quando o barbeiro informado não tem tipo barbeiro:

{
  "barbeiro": [
    "O perfil selecionado precisa ser do tipo barbeiro."
  ]
}

Resposta esperada 400 Bad Request quando já existe agendamento para o mesmo barbeiro na mesma data e hora:

{
  "non_field_errors": [
    "Os campos barbeiro, data_hora devem criar um conjunto único."
  ]
}

Observação: a mensagem exata pode variar dependendo da versão do Django/DRF e da forma como a constraint foi tratada.

11.13. Atualizar agendamento completo
PUT /api/agendamentos/{id}/

Atualiza todos os campos editáveis de um agendamento.

Pelo código atual, o usuário só consegue atualizar agendamentos que aparecem no seu get_queryset.

Exemplo:

PUT /api/agendamentos/1/

Headers:

Authorization: Bearer access_token_aqui

Body JSON:

{
  "data_hora": "2026-05-23T10:00:00Z",
  "barbeiro": 2,
  "servico": 1
}

Resposta esperada 200 OK:

{
  "id": 1,
  "data_hora": "2026-05-23T10:00:00Z",
  "cliente": 1,
  "barbeiro": 2,
  "servico": 1
}

Resposta esperada 400 Bad Request quando a nova data está no passado:

{
  "data_hora": [
    "Não é possível criar agendamento para uma data ou hora no passado."
  ]
}

Resposta esperada 404 Not Found quando o agendamento não existe ou o usuário não tem acesso:

{
  "detail": "Não encontrado."
}
11.14. Atualizar agendamento parcialmente
PATCH /api/agendamentos/{id}/

Atualiza apenas alguns campos de um agendamento.

Exemplo atualizando apenas a data e hora:

PATCH /api/agendamentos/1/

Headers:

Authorization: Bearer access_token_aqui

Body JSON:

{
  "data_hora": "2026-05-23T11:00:00Z"
}

Resposta esperada 200 OK:

{
  "id": 1,
  "data_hora": "2026-05-23T11:00:00Z",
  "cliente": 1,
  "barbeiro": 2,
  "servico": 1
}

Exemplo atualizando apenas o serviço:

{
  "servico": 2
}

Resposta esperada 200 OK:

{
  "id": 1,
  "data_hora": "2026-05-23T11:00:00Z",
  "cliente": 1,
  "barbeiro": 2,
  "servico": 2
}

Exemplo atualizando apenas o barbeiro:

{
  "barbeiro": 4
}

Resposta esperada 200 OK:

{
  "id": 1,
  "data_hora": "2026-05-23T11:00:00Z",
  "cliente": 1,
  "barbeiro": 4,
  "servico": 2
}

Resposta esperada 400 Bad Request quando o novo barbeiro não é do tipo barbeiro:

{
  "barbeiro": [
    "O perfil selecionado precisa ser do tipo barbeiro."
  ]
}
11.15. Excluir agendamento
DELETE /api/agendamentos/{id}/

Remove um agendamento.

Pelo código atual, o usuário só consegue excluir agendamentos que aparecem no seu get_queryset.

Exemplo:

DELETE /api/agendamentos/1/

Headers:

Authorization: Bearer access_token_aqui

Resposta esperada 204 No Content:

Normalmente, a resposta 204 No Content não possui corpo.

Resposta esperada 404 Not Found quando o agendamento não existe ou o usuário não tem acesso:

{
  "detail": "Não encontrado."
}
11.16. Exemplos internos de Perfil

Os perfis normalmente não são criados diretamente por endpoint público.

O perfil cliente é criado automaticamente no cadastro.

Perfis admin e barbeiro devem ser criados pelo Django Admin ou por endpoint protegido no futuro.

Perfil cliente
{
  "id": 1,
  "user": 1,
  "nome": "João Silva",
  "telefone": "999999999",
  "tipo": "cliente"
}
Perfil barbeiro
{
  "id": 2,
  "user": 2,
  "nome": "Carlos Barbeiro",
  "telefone": "988887777",
  "tipo": "barbeiro"
}
Perfil admin
{
  "id": 3,
  "user": 3,
  "nome": "Administrador",
  "telefone": "000000000",
  "tipo": "admin"
}
11.17. Resumo rápido dos principais bodies
Cadastro
{
  "nome": "João Silva",
  "telefone": "999999999",
  "email": "joao@email.com",
  "password": "12345678"
}
Login com username
{
  "username": "joao",
  "password": "12345678"
}
Login com email, caso customizado
{
  "email": "joao@email.com",
  "password": "12345678"
}
Refresh token
{
  "refresh": "refresh_token_aqui"
}
Criar serviço
{
  "nome": "Corte de cabelo",
  "valor": "25.00"
}
Criar agendamento
{
  "data_hora": "2026-05-22T14:30:00Z",
  "barbeiro": 2,
  "servico": 1
}
11.18. Resumo rápido dos status HTTP esperados
Status	Significado
200 OK	Requisição bem-sucedida
201 Created	Recurso criado com sucesso
204 No Content	Recurso excluído com sucesso
400 Bad Request	Dados inválidos enviados na requisição
401 Unauthorized	Token ausente, inválido ou expirado
403 Forbidden	Usuário autenticado, mas sem permissão
404 Not Found	Recurso não encontrado ou sem acesso pelo queryset
500 Internal Server Error	Erro inesperado no servidor