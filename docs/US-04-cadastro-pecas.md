# US-04 — Cadastro e gerenciamento de peças

## 1. Objetivo

Implementar o módulo de cadastro e gerenciamento de peças do sistema ERP para oficina mecânica, permitindo cadastrar, listar, consultar, atualizar e excluir peças.

## 2. Dados da peça

Cada peça possui os seguintes campos:

- `id`: identificador gerado automaticamente.
- `nome`: nome da peça.
- `codigo`: código único da peça.
- `fabricante`: fabricante da peça.
- `valorCompra`: valor de compra.
- `valorVenda`: valor de venda.
- `quantidade`: quantidade disponível em estoque.

## 3. Endpoints da API

Base: `/api/parts`

| Método | Endpoint | Funcionalidade |
|---|---|---|
| GET | `/api/parts` | Listar peças cadastradas |
| POST | `/api/parts` | Cadastrar uma peça |
| GET | `/api/parts/:id` | Consultar peça pelo ID |
| PUT | `/api/parts/:id` | Atualizar uma peça |
| DELETE | `/api/parts/:id` | Excluir uma peça |

## 4. Regras de negócio

### Cadastro

- Os dados devem ser enviados em um objeto válido.
- Nome, código e fabricante são obrigatórios.
- Os campos textuais têm os espaços no início e no final removidos durante o cadastro.
- O código não pode ser duplicado, independentemente de letras maiúsculas ou minúsculas.
- O valor de compra deve ser numérico e não negativo.
- O valor de venda deve ser numérico e não negativo.
- O valor de venda não pode ser inferior ao valor de compra.
- A quantidade deve ser um número inteiro não negativo.
- Valores iguais a zero são permitidos para compra, venda e quantidade.
- O identificador é gerado automaticamente, de forma sequencial.

### Consulta

- É possível listar todas as peças cadastradas.
- É possível consultar uma peça pelo ID.
- A consulta de uma peça inexistente retorna erro.

### Atualização

- Permite atualizar os dados de uma peça existente.
- Valida os campos informados na atualização.
- Não permite valores de compra ou venda negativos.
- Não permite que o valor de venda fique abaixo do valor de compra.
- Não permite quantidade negativa ou decimal.
- Não permite utilizar o código de outra peça já cadastrada.
- A atualização de uma peça inexistente retorna erro.

### Exclusão

- Permite excluir uma peça existente.
- A exclusão de uma peça inexistente é rejeitada.
- A exclusão de peças vinculadas a ordens de serviço ainda não está implementada nesta US.

## 5. Testes automatizados

Arquivo: `backend/tests/partService.test.js`

Os testes automatizados verificam:

- Rejeição de dados nulos e arrays.
- Validação dos campos obrigatórios.
- Rejeição de campos vazios ou compostos apenas por espaços.
- Validação dos valores de compra e venda.
- Aceitação de valores iguais a zero.
- Validação da quantidade inteira e não negativa.
- Remoção de espaços dos campos textuais no cadastro.
- Prevenção de códigos duplicados, inclusive com letras minúsculas.
- Rejeição de valor de venda inferior ao valor de compra, tanto no cadastro quanto na atualização.
- Cadastro de peças com dados válidos.
- Listagem e consulta por ID.
- Atualização de peças existentes.
- Tratamento de peças inexistentes.
- Exclusão de peças existentes e rejeição de exclusão de peças inexistentes.

## 6. Critérios de aceitação

A implementação atende aos critérios de cadastro, listagem, consulta, atualização, validação dos dados e exclusão de peças sem vínculos, conforme os cenários implementados e testados.

**CA10 — Pendente:** impedir a exclusão de peças vinculadas a ordens de serviço ou serviços. Essa regra será implementada na US-05, quando forem desenvolvidos os vínculos entre peças e ordens de serviço.

## 7. Estrutura do módulo

O módulo segue a arquitetura em camadas do projeto:

- **Routes:** `backend/src/routes/parts.routes.js`
- **Controller:** `backend/src/controllers/partController.js`
- **Service:** `backend/src/services/partService.js`
- **Repository:** `backend/src/repositories/partRepo.js`
- **Tests:** `backend/tests/partService.test.js`

Os dados são armazenados em memória por meio do repositório mock.

## 8. Resultado

O módulo de cadastro e gerenciamento de peças foi implementado e testado. O critério CA10 permanece pendente para integração com as ordens de serviço na US-05.

A documentação registra o comportamento implementado nesta etapa, sem antecipar funcionalidades ainda não desenvolvidas.