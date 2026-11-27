# US-03 — Cálculo dos Totais da Ordem de Serviço

## 1. Objetivo

Implementar o cálculo automático dos valores totais dos serviços vinculados a uma Ordem de Serviço (OS), diferenciando o valor total orçado do valor correspondente aos serviços autorizados pelo cliente.

## 2. Requisitos e critérios de aceitação

- Calcular o total orçado considerando todos os serviços vinculados à OS.
- Calcular o total autorizado considerando somente os serviços com autorização.
- Permitir o cálculo com todos os serviços não autorizados.
- Permitir o cálculo com todos os serviços autorizados.
- Permitir o cálculo com autorização parcial.
- Retornar valores iguais a zero quando a OS não possuir serviços vinculados.
- Retornar erro 404 quando a OS não existir.

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

### 4.1 Total orçado

Representa a soma dos valores de todos os serviços vinculados à OS, independentemente de estarem autorizados ou não.

### 4.2 Total autorizado

Representa a soma exclusivamente dos valores dos serviços que possuem:

`autorizado: true`

### 4.3 Inicialização dos totais

Os dois valores são inicializados com zero:

```javascript
let totalOrcado = 0;
let totalAutorizado = 0;
```

### 4.4 Processamento dos serviços

O sistema percorre os serviços vinculados à OS.

Para cada serviço:

- Adiciona seu valor ao total orçado.
- Verifica se está autorizado.
- Se estiver autorizado, adiciona seu valor ao total autorizado.

### 4.5 OS sem serviços

Quando não existem serviços vinculados, os dois totais permanecem em zero.

### 4.6 OS inexistente

O sistema verifica a existência da OS.

Caso não encontre o registro, lança um erro que resulta em resposta HTTP 404.

## 5. Endpoint

**Método:** GET

**Rota:** `/api/os-service/:id/totals`

### Exemplo de resposta

**HTTP 200 — OK**

```json
{
  "totalOrcado": 300,
  "totalAutorizado": 100
}
```

O exemplo representa uma OS com R$ 300,00 em serviços orçados, dos quais R$ 100,00 foram autorizados.

### Respostas HTTP

| Situação | HTTP |
|---|---|
| Totais calculados com sucesso | 200 |
| OS inexistente | 404 |

## 6. Testes automatizados

Arquivo: `backend/tests/osService.test.js`

Foram implementados cinco cenários de integração:

1. Calcular o total orçado e retornar zero quando nenhum serviço estiver autorizado.
2. Calcular o total orçado e autorizado quando todos os serviços estiverem autorizados.
3. Calcular corretamente os totais quando apenas alguns serviços estiverem autorizados.
4. Retornar zero nos totais quando a OS não possuir serviços vinculados.
5. Retornar erro 404 ao consultar os totais de uma OS inexistente.

Os testes verificam os valores retornados pela API, além dos códigos HTTP.

Tecnologias utilizadas:

- Vitest.
- Supertest.

## 7. Integração com as US anteriores

A US-03 utiliza as funcionalidades desenvolvidas anteriormente:

- US-01: criação e armazenamento dos vínculos entre OS e serviços.
- US-02: autorização e revogação individual dos serviços.

O cálculo utiliza o campo `valor` armazenado em cada vínculo e o estado de autorização correspondente.

## 8. Armazenamento

Os vínculos permanecem armazenados em memória no Repository.

O cálculo é realizado pela camada Service, sem modificar os registros existentes.

Não há persistência em banco de dados nesta etapa.

## 9. Histórico e status

**Implementação:** concluída.

**Testes de integração:** cinco cenários.

**Pull Request:** #6 — `test: adiciona cenarios de calculo dos totais da OS`.

**Status:** concluída e integrada à branch principal.