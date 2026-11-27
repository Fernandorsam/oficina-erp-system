# US-01 — Vínculo entre Ordens de Serviço e Serviços

## 1. Objetivo

Implementar a funcionalidade de associação de serviços cadastrados a ordens de serviço existentes, garantindo a integridade dos dados e preservando as informações originais do serviço.

## 2. Requisitos e critérios de aceitação

- Permitir vincular um serviço existente a uma OS existente.
- Impedir vínculos com serviços inexistentes.
- Impedir vínculos com ordens de serviço inexistentes.
- Obter automaticamente a descrição e o valor do serviço cadastrado.
- Criar o vínculo inicialmente com autorização desativada.

## 3. Arquitetura e organização

A funcionalidade utiliza arquitetura em camadas:

**Routes → Controller → Service → Repository**

Arquivos envolvidos:

| Camada | Arquivo |
|---|---|
| Routes | `backend/src/routes/osService.routes.js` |
| Controller | `backend/src/controllers/osServiceController.js` |
| Service | `backend/src/services/osServiceService.js` |
| Repository | `backend/src/repositories/osServiceRepo.js` |
| Testes | `backend/tests/osService.test.js` |

## 4. Regras de negócio

### 4.1 Validação da ordem de serviço

O sistema verifica se a OS informada existe antes de criar o vínculo.

### 4.2 Validação do serviço

O sistema verifica se o serviço informado está cadastrado.

### 4.3 Integridade dos dados

A descrição e o valor são obtidos diretamente do cadastro do serviço.

O sistema não utiliza os valores de descrição e preço eventualmente enviados pelo cliente na requisição.

### 4.4 Autorização inicial

Todo novo vínculo é criado com:

`autorizado: false`

A autorização individual é tratada posteriormente pela US-02.

### 4.5 Identificação

O identificador do vínculo é gerado utilizando `Date.now()`.

## 5. Endpoint de criação

**Método:** POST

**Rota:** `/api/os-service`

### Exemplo de requisição

```json
{
  "osId": 1,
  "serviceId": 1
}
```

### Resposta esperada

**HTTP 201 — Created**

A resposta contém os dados do vínculo criado, incluindo:

- id
- osId
- serviceId
- descricao
- valor
- autorizado

### Tratamento de erros

| Situação | HTTP |
|---|---|
| OS inexistente | 400 |
| Serviço inexistente | 400 |

## 6. Testes automatizados

Arquivo: `backend/tests/osService.test.js`

Foram implementados cinco cenários de integração com Vitest e Supertest:

1. Vincular um serviço existente a uma OS existente.
2. Rejeitar serviço inexistente.
3. Rejeitar OS inexistente.
4. Rejeitar serviço e OS inexistentes.
5. Impedir adulteração da descrição, valor e autorização enviados pelo cliente.

**Resultado esperado:** os cinco cenários devem passar.

## 7. Armazenamento dos dados

O Repository utiliza um array JavaScript em memória para armazenar os vínculos.

Operações implementadas:

- Listagem de vínculos.
- Consulta por OS.
- Consulta por identificador.
- Criação de vínculo.
- Atualização de vínculo.

**Limitação:** os dados são temporários e não possuem persistência em banco de dados.

## 8. Evolução e integração

A US-01 estabeleceu a base para as funcionalidades posteriores:

- US-02: autorização individual de serviços.
- US-03: cálculo dos totais da ordem de serviço.
- US-05: futura integração de peças às ordens de serviço.

## 9. Status

**Implementação:** concluída.

**Testes de integração:** cinco cenários registrados.

**Pull Request:** #1 — integrado à branch principal.

**Observação:** esta documentação registra a implementação da US-01, sem incorporar as funcionalidades específicas das unidades posteriores.