# US-02 — Autorização Individual de Serviços

## 1. Objetivo

Implementar a funcionalidade de autorização e revogação individual dos serviços vinculados a uma Ordem de Serviço (OS), permitindo controlar quais serviços foram aprovados pelo cliente.

## 2. Requisitos e critérios de aceitação

- Permitir autorizar um serviço vinculado a uma OS.
- Permitir revogar a autorização de um serviço.
- Alterar somente o campo de autorização, preservando os demais dados do vínculo.
- Aceitar exclusivamente valores booleanos (`true` ou `false`).
- Retornar erro quando o vínculo informado não existir.

## 3. Arquitetura e organização

A funcionalidade utiliza a arquitetura em camadas:

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

### 4.1 Autorizar serviço

O sistema permite alterar o campo `autorizado` para `true` em um vínculo existente.

### 4.2 Revogar autorização

O sistema permite alterar o campo `autorizado` para `false`, revogando uma autorização anteriormente concedida.

### 4.3 Validação do tipo de dado

O campo `autorizado` deve receber exclusivamente um valor booleano.

São aceitos:

- `true`
- `false`

São rejeitados:

- Texto, como `"true"`.
- Número, como `1`.
- Valor nulo (`null`).
- Campo ausente.

As requisições com valores inválidos retornam HTTP 400.

### 4.4 Integridade dos dados

A atualização modifica somente o campo `autorizado`, preservando os demais dados do vínculo, como:

- `id`
- `osId`
- `serviceId`
- `descricao`
- `valor`

### 4.5 Verificação de existência

Antes de atualizar a autorização, o sistema verifica se o vínculo informado existe.

Caso não exista, retorna HTTP 404.

## 5. Endpoint

**Método:** PUT

**Rota:** `/api/os-service/:id/authorization`

### Exemplo de requisição para autorizar

```json
{
  "autorizado": true
}
```

### Exemplo de requisição para revogar

```json
{
  "autorizado": false
}
```

### Respostas HTTP

| Situação | HTTP |
|---|---|
| Autorização atualizada | 200 |
| Valor inválido ou ausente | 400 |
| Vínculo inexistente | 404 |

## 6. Testes automatizados

Arquivo: `backend/tests/osService.test.js`

Foram implementados cinco cenários principais de integração:

1. Autorizar um serviço vinculado a uma OS.
2. Revogar a autorização de um serviço.
3. Alterar somente a autorização, preservando os demais dados.
4. Rejeitar valores inválidos de autorização.
5. Retornar 404 ao tentar autorizar um vínculo inexistente.

O quarto cenário utiliza testes parametrizados (`it.each`), verificando quatro situações:

- Texto.
- Número.
- Nulo.
- Campo ausente.

**Total: 8 verificações individuais**, considerando as quatro variações do teste parametrizado.

Tecnologias utilizadas:

- Vitest.
- Supertest.

## 7. Integração com a US-01

A US-02 utiliza a estrutura de vínculos criada na US-01.

Todo vínculo nasce com `autorizado: false`.

A US-02 acrescenta a possibilidade de modificar esse estado individualmente, sem alterar os dados originais do serviço vinculado.

## 8. Armazenamento

Os vínculos continuam armazenados no repositório em memória implementado na US-01.

A atualização é realizada pela função `updateOsService()`, que combina os dados existentes com o campo atualizado.

Não há persistência em banco de dados nesta etapa.

## 9. Histórico e status

**Implementação:** concluída.

**Testes de integração:** cinco cenários principais, incluindo quatro variações de valores inválidos.

**Pull Request:** #4 — `test: automatiza autorização individual de serviços`.

**Branch:** `test/us-02-autorizacao-servicos`.

**Status:** concluída e integrada à branch principal.