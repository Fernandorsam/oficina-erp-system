# ERP para Oficina Automotiva

Sistema ERP para gerenciamento de uma oficina automotiva, desenvolvido para centralizar cadastros, ordens de serviço, serviços, peças e etapas do atendimento.

## Objetivo

Representar o fluxo de trabalho de uma oficina, desde o cadastro do cliente e do veículo até o gerenciamento da ordem de serviço e dos serviços e peças envolvidos.

O projeto está sendo desenvolvido de forma incremental, por meio de User Stories (US), com implementação e testes a cada etapa.

## Tecnologias

- Node.js
- Express
- JavaScript com ES Modules
- Vitest
- Supertest

## Arquitetura

O backend utiliza uma arquitetura em camadas, com separação de responsabilidades:

```text
Routes
  ↓
Controllers
  ↓
Services
  ↓
Repositories
  ↓
Persistência
```

- **Routes:** definem os endpoints da API.
- **Controllers:** recebem as requisições e organizam as respostas HTTP.
- **Services:** concentram as regras de negócio.
- **Repositories:** gerenciam o acesso aos dados.

Atualmente, os repositórios utilizam dados em memória (mock). A integração com banco de dados será desenvolvida posteriormente.

## Estrutura do projeto

```text
oficina-erp-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── repositories/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── tests/
│   └── package.json
│
├── frontend/
│
├── docs/
│   ├── US-01-vinculo-os-servicos.md
│   ├── US-02-autorizacao-servicos.md
│   ├── US-03-calculo-totais-os.md
│   └── US-04-cadastro-pecas.md
│
└── README/
    └── requeriments.md
```

## Funcionalidades implementadas

| User Story | Funcionalidade |
|---|---|
| US-01 | Vínculo entre ordens de serviço e serviços |
| US-02 | Autorização individual de serviços |
| US-03 | Cálculo dos totais da ordem de serviço |
| US-04 | Cadastro e gerenciamento de peças |

### Detalhes

- Associação de serviços a ordens de serviço.
- Controle individual de autorização dos serviços.
- Cálculo do total orçado e do total autorizado.
- Cadastro, consulta, atualização e exclusão de peças.
- Validação de dados e prevenção de códigos duplicados.

## Testes automatizados

Os testes são executados com Vitest e Supertest.

Para executar a suíte:

```bash
cd backend
npm test
```

Último resultado registrado após a implementação da US-04:

- 3 arquivos de teste aprovados.
- 62 testes aprovados.

## Executando o backend

Entre na pasta `backend`:

```bash
cd backend
npm install
npm run dev
```

O servidor é iniciado em:

```text
http://localhost:3000
```

## Documentação

Os documentos individuais das User Stories estão na pasta `docs/`.

O levantamento original de requisitos está em:

```text
README/requeriments.md
```

## Próximas etapas

O desenvolvimento continuará por User Stories, ampliando a integração entre peças e ordens de serviço, incluindo as regras de vínculo e proteção contra exclusões indevidas.

## Diretrizes do projeto

- Desenvolvimento incremental.
- Separação de responsabilidades por camadas.
- Testes antes de avançar para novas funcionalidades.
- Validação das regras de negócio.
- Preservação das informações importantes do processo da oficina.