# ERP para Oficina Automotiva — Documento de Requisitos

## 1. Visão Geral

### 1.1 Nome do projeto

**ERP para Oficina Automotiva**

### 1.2 Objetivo

Desenvolver um sistema ERP para gerenciamento de uma oficina automotiva, centralizando o atendimento ao cliente, veículos, ordens de serviço, diagnósticos, orçamentos, serviços, peças, estoque e execução dos serviços.

O sistema deverá permitir que a oficina acompanhe todo o ciclo de atendimento, desde a chegada do cliente até a entrega do veículo, mantendo histórico das informações e das alterações realizadas durante o processo.

### 1.3 Objetivos principais

O sistema deverá:

* Organizar o atendimento da recepção.
* Manter cadastro de clientes.
* Manter cadastro de veículos.
* Controlar ordens de serviço.
* Registrar diagnósticos realizados pelos mecânicos.
* Criar e controlar orçamentos.
* Permitir aprovação parcial ou total de serviços.
* Controlar serviços autorizados.
* Controlar peças utilizadas.
* Controlar estoque.
* Manter histórico das alterações realizadas na OS.
* Permitir acompanhamento da execução dos serviços.
* Facilitar a comunicação entre recepção e mecânicos.
* Manter o histórico dos atendimentos realizados para cada cliente e veículo.

---

# 2. Escopo Inicial

O sistema será desenvolvido inicialmente contemplando os seguintes módulos:

```text
Cliente
Veículo
Ordem de Serviço
Diagnóstico
Orçamento
Serviço
Peça
Estoque
Mecânico
Fornecedor
Recepção
Administração
```

A implementação desses módulos será feita gradualmente.

Novas funcionalidades poderão ser adicionadas posteriormente conforme as necessidades da oficina forem identificadas.

---

# 3. Perfis e Responsabilidades

## 3.1 Recepção

A recepção será o principal ponto de contato entre a oficina e o cliente.

Responsabilidades:

* Cadastrar clientes.
* Cadastrar veículos.
* Abrir ordens de serviço.
* Consultar histórico de clientes.
* Consultar histórico de veículos.
* Registrar informações do atendimento.
* Receber diagnósticos dos mecânicos.
* Elaborar ou atualizar orçamentos.
* Informar valores ao cliente.
* Solicitar autorização dos serviços.
* Registrar quais serviços foram autorizados.
* Registrar quais serviços ficaram pendentes.
* Entrar em contato com o cliente quando necessário.
* Atualizar a OS conforme novas autorizações.
* Acompanhar o andamento do atendimento.
* Registrar a entrega do veículo.

---

## 3.2 Mecânico

O mecânico será responsável principalmente pelo diagnóstico e execução técnica dos serviços.

Responsabilidades:

* Consultar a ordem de serviço.
* Realizar diagnóstico.
* Registrar problemas encontrados.
* Informar serviços necessários.
* Informar peças necessárias.
* Registrar observações técnicas.
* Executar somente serviços autorizados.
* Registrar início da execução.
* Registrar término da execução.
* Registrar observações sobre o serviço executado.

### Regra importante

O mecânico **não deve apagar informações anteriores da OS**.

Caso uma informação precise ser alterada ou complementada, o sistema deverá preservar o histórico da operação.

---

## 3.3 Administração

A administração terá responsabilidades relacionadas ao gerenciamento geral do sistema.

Exemplos:

* Gerenciar usuários.
* Gerenciar permissões.
* Gerenciar cadastros administrativos.
* Gerenciar fornecedores.
* Acompanhar informações gerais da oficina.

As funcionalidades administrativas poderão ser detalhadas posteriormente.

---

# 4. Entidades Principais

As principais entidades identificadas durante o levantamento são:

```text
Cliente
Veículo
Ordem de Serviço
Orçamento
Diagnóstico
Serviço
Peça
Estoque
Mecânico
Fornecedor
Usuário
```

---

# 5. Cliente

O cliente representa a pessoa responsável pelo atendimento do veículo.

## 5.1 Responsabilidades

O sistema deverá permitir:

* Cadastrar cliente.
* Alterar dados do cliente.
* Consultar cliente.
* Consultar histórico de atendimentos.
* Consultar veículos associados ao cliente.

## 5.2 Regra inicial

Um veículo será associado inicialmente a **um único cliente**.

Essa decisão poderá ser revista futuramente caso a necessidade do negócio exija múltiplos responsáveis por um veículo.

---

# 6. Veículo

O veículo representa o automóvel atendido pela oficina.

O cadastro deverá permitir armazenar informações suficientes para identificar o veículo e relacioná-lo ao cliente.

Exemplos de informações:

* Marca.
* Modelo.
* Ano.
* Placa.
* Quilometragem.
* Outras informações relevantes.

O conjunto definitivo de campos poderá ser definido durante a modelagem do banco de dados.

## 6.1 Histórico

O sistema deverá permitir consultar o histórico de atendimentos realizados para o veículo.

Exemplo:

```text
Veículo
   ↓
OS 001
   ↓
OS 015
   ↓
OS 032
```

Cada atendimento deverá permanecer registrado.

---

# 7. Ordem de Serviço

A Ordem de Serviço (OS) será uma das principais entidades do sistema.

Ela representa o atendimento realizado pela oficina.

## 7.1 Abertura

Uma OS poderá ser aberta mesmo que o cliente não tenha realizado agendamento anteriormente.

### Motivo

A oficina não deverá deixar de registrar um atendimento apenas porque não existia agendamento.

---

# 8. Fluxo da Ordem de Serviço

O fluxo inicialmente definido é:

```text
Aberta
   ↓
Em diagnóstico
   ↓
Aguardando autorização
   ↓
Autorizada
   ↓
Em andamento
   ↓
Concluída
   ↓
Entregue
```

Os estados poderão ser refinados durante a implementação.

---

# 9. Diagnóstico

O diagnóstico será realizado pelo mecânico.

O mecânico deverá registrar:

* Problemas identificados.
* Causas prováveis.
* Serviços recomendados.
* Peças necessárias.
* Observações técnicas.
* Outras informações relevantes.

O diagnóstico servirá como base para a elaboração do orçamento.

Fluxo:

```text
OS
 ↓
Mecânico
 ↓
Diagnóstico
 ↓
Serviços necessários
 ↓
Peças necessárias
 ↓
Orçamento
```

---

# 10. Orçamento

O orçamento representa os serviços e peças necessários para solucionar os problemas identificados no diagnóstico.

O orçamento poderá conter:

* Serviços.
* Peças.
* Quantidades.
* Valores.
* Observações.
* Total.

A definição detalhada dos cálculos financeiros será feita posteriormente.

---

# 11. Aprovação do Orçamento

O cliente poderá:

* Aprovar todo o orçamento.
* Aprovar apenas parte do orçamento.
* Não aprovar determinado serviço.
* Deixar serviços pendentes para decisão posterior.

### Exemplo

O orçamento possui:

```text
Troca de óleo
Troca de pastilhas
Troca de amortecedores
Alinhamento
```

O cliente pode autorizar somente:

```text
Troca de óleo
Troca de pastilhas
```

Os demais serviços deverão permanecer como pendentes ou não autorizados, conforme a regra definitiva de status que será definida durante a implementação.

---

# 12. Aprovação Parcial

A aprovação parcial é uma regra importante do sistema.

Quando o cliente não puder ou não quiser realizar todos os serviços naquele momento, a OS não deverá ser perdida ou recriada.

O sistema deverá:

1. Registrar quais itens foram autorizados.
2. Registrar quais itens não foram autorizados.
3. Manter os itens pendentes.
4. Registrar o motivo quando aplicável.
5. Manter o histórico da decisão.
6. Permitir que o cliente autorize posteriormente serviços pendentes.

---

# 13. Alteração da Ordem de Serviço

Uma OS poderá sofrer alterações durante o atendimento.

Exemplo:

```text
Diagnóstico
   ↓
Orçamento
   ↓
Cliente autoriza parcialmente
   ↓
Serviço começa
   ↓
Novo problema identificado
   ↓
Novo serviço/peça necessário
   ↓
Cliente é comunicado
   ↓
Nova autorização
   ↓
OS atualizada
```

### Regra fundamental

Uma alteração **não deve apagar o estado anterior**.

O sistema deverá manter histórico suficiente para saber:

* O que foi alterado.
* Quando foi alterado.
* Qual era a informação anterior.
* Qual passou a ser a nova informação.
* Quem realizou a alteração.
* Motivo da alteração, quando aplicável.

---

# 14. Execução dos Serviços

Depois que o cliente autorizar os serviços, o mecânico poderá iniciar a execução.

O fluxo será:

```text
Serviço autorizado
       ↓
Mecânico
       ↓
Início da execução
       ↓
Execução
       ↓
Finalização
       ↓
Observações
```

O sistema deverá registrar, quando aplicável:

* Data/hora de início.
* Data/hora de término.
* Mecânico responsável.
* Observações.
* Status do serviço.

---

# 15. Serviços Pendentes

Um serviço poderá ficar pendente quando:

* O cliente não autorizar.
* O cliente solicitar adiamento.
* Faltar alguma condição necessária para execução.
* For necessário entrar em contato novamente com o cliente.

Quando isso ocorrer, o sistema deverá preservar a informação.

A recepção deverá ser capaz de identificar que existe uma pendência e tomar as providências necessárias.

---

# 16. Peças

As peças poderão ser relacionadas aos serviços e às ordens de serviço.

O sistema deverá futuramente permitir:

* Consultar peças.
* Identificar peças utilizadas.
* Controlar quantidade.
* Relacionar peças ao serviço.
* Relacionar peças à OS.
* Controlar valores.
* Atualizar estoque.

---

# 17. Estoque

O estoque será responsável pelo controle das peças disponíveis na oficina.

Funcionalidades previstas:

* Cadastro de peças.
* Entrada de peças.
* Saída de peças.
* Consulta de quantidade disponível.
* Associação de peças às ordens de serviço.
* Histórico de movimentações.
* Controle de fornecedores.

As regras detalhadas de estoque serão definidas posteriormente.

---

# 18. Fornecedor

O fornecedor será responsável pelo fornecimento de peças e produtos utilizados pela oficina.

O sistema deverá futuramente permitir:

* Cadastro de fornecedor.
* Consulta de fornecedor.
* Associação de peças ao fornecedor.
* Histórico de compras.
* Informações comerciais.

---

# 19. Histórico

O histórico será um requisito importante do sistema.

O ERP deverá evitar a perda de informações importantes durante alterações.

O histórico deverá ser utilizado principalmente para:

* Alterações da OS.
* Alterações de orçamento.
* Aprovações.
* Recusas.
* Serviços executados.
* Serviços pendentes.
* Alterações realizadas por usuários.
* Atendimento do veículo.

### Princípio

> Informações importantes do processo não devem simplesmente desaparecer quando uma alteração for realizada.

---

# 20. Fluxo Geral da Oficina

O fluxo geral identificado durante o levantamento é:

```text
                    CLIENTE
                       │
                       ▼
                   RECEPÇÃO
                       │
             ┌─────────┴─────────┐
             ▼                   ▼
          CLIENTE             VEÍCULO
             │                   │
             └─────────┬─────────┘
                       ▼
                ORDEM DE SERVIÇO
                       │
                       ▼
                   MECÂNICO
                       │
                       ▼
                  DIAGNÓSTICO
                       │
                       ▼
                   ORÇAMENTO
                       │
                       ▼
               CLIENTE AUTORIZA
                       │
              ┌────────┴────────┐
              │                 │
              ▼                 ▼
          AUTORIZADO         PENDENTE
              │                 │
              ▼                 ▼
          EXECUÇÃO          RECEPÇÃO
              │                 │
              ▼                 │
          CONCLUÍDO             │
              │                 │
              └────────┬────────┘
                       ▼
                    ENTREGA
```

---

# 21. Regras de Negócio Identificadas

## RN001 — Cadastro do cliente

O sistema deverá permitir cadastrar clientes para utilização no atendimento da oficina.

## RN002 — Associação inicial do veículo

Um veículo será associado inicialmente a um único cliente.

## RN003 — Abertura sem agendamento

Uma OS poderá ser aberta sem que exista um agendamento anterior.

## RN004 — Diagnóstico

O diagnóstico deverá ser registrado pelo mecânico.

## RN005 — Autorização

Serviços que exigem autorização do cliente somente poderão ser executados após autorização.

## RN006 — Aprovação parcial

O cliente poderá autorizar apenas parte do orçamento.

## RN007 — Serviços pendentes

Serviços não autorizados ou adiados deverão permanecer registrados como pendentes, conforme a regra de status implementada.

## RN008 — Histórico

Alterações relevantes na OS deverão preservar o histórico.

## RN009 — Execução

O mecânico deverá executar somente os serviços autorizados.

## RN010 — Registro da execução

O sistema deverá registrar informações da execução dos serviços.

## RN011 — Comunicação

A recepção será responsável por entrar em contato com o cliente quando uma autorização ou decisão for necessária.

## RN012 — Não exclusão de histórico

Alterações não deverão eliminar informações históricas importantes.

---

# 22. Casos de Uso Principais

Os casos de uso identificados inicialmente são:

### Cliente

* Cadastrar cliente.
* Consultar cliente.
* Alterar cliente.
* Consultar histórico do cliente.

### Veículo

* Cadastrar veículo.
* Consultar veículo.
* Alterar veículo.
* Consultar histórico do veículo.

### Ordem de Serviço

* Abrir OS.
* Consultar OS.
* Alterar OS.
* Atualizar status da OS.
* Consultar histórico da OS.

### Diagnóstico

* Registrar diagnóstico.
* Atualizar diagnóstico.
* Consultar diagnóstico.

### Orçamento

* Criar orçamento.
* Alterar orçamento.
* Enviar orçamento para autorização.
* Registrar autorização.
* Registrar recusa.
* Registrar aprovação parcial.

### Execução

* Consultar serviços autorizados.
* Iniciar serviço.
* Finalizar serviço.
* Registrar observações.
* Registrar pendências.

### Estoque

* Cadastrar peça.
* Consultar peça.
* Registrar entrada.
* Registrar saída.
* Consultar estoque.
* Consultar movimentações.

### Fornecedor

* Cadastrar fornecedor.
* Consultar fornecedor.
* Alterar fornecedor.
* Relacionar peças ao fornecedor.

---

# 23. Requisitos Funcionais

## RF001 — Gerenciamento de clientes

O sistema deverá permitir cadastrar, consultar e alterar clientes.

## RF002 — Gerenciamento de veículos

O sistema deverá permitir cadastrar, consultar e alterar veículos.

## RF003 — Histórico do veículo

O sistema deverá permitir consultar os atendimentos anteriores de um veículo.

## RF004 — Abertura de OS

O sistema deverá permitir abrir uma Ordem de Serviço.

## RF005 — Diagnóstico

O sistema deverá permitir registrar diagnósticos.

## RF006 — Orçamento

O sistema deverá permitir criar e atualizar orçamentos.

## RF007 — Autorização parcial

O sistema deverá permitir registrar autorização parcial dos serviços.

## RF008 — Controle de serviços

O sistema deverá permitir controlar os serviços autorizados, pendentes, em execução e concluídos.

## RF009 — Controle de peças

O sistema deverá permitir relacionar peças às ordens de serviço.

## RF010 — Controle de estoque

O sistema deverá controlar a movimentação das peças.

## RF011 — Histórico

O sistema deverá manter histórico das alterações relevantes.

## RF012 — Controle de execução

O sistema deverá registrar início e término da execução dos serviços.

---

# 24. Requisitos Não Funcionais

Os requisitos não funcionais serão detalhados durante a implementação, mas os princípios iniciais são:

### RNF001 — Organização

O código deverá ser organizado em camadas e módulos.

### RNF002 — Manutenibilidade

O sistema deverá permitir inclusão de novas funcionalidades sem comprometer as existentes.

### RNF003 — Separação de responsabilidades

Cada camada deverá possuir uma responsabilidade bem definida.

Arquitetura inicial:

```text
Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Database
```

### RNF004 — Testabilidade

Cada etapa importante deverá ser testada antes de avançar para a próxima.

### RNF005 — Histórico

Informações importantes do processo não deverão ser perdidas.

### RNF006 — Evolução

A arquitetura deverá permitir que novos módulos sejam adicionados posteriormente.

---

# 25. Arquitetura Inicial do Backend

A estrutura arquitetural definida até o momento é:

```text
src/
│
├── app.js
├── server.js
│
├── routes/
│   └── cliente.routes.js
│
├── controllers/
│   └── cliente.controller.js
│
├── services/
│   └── cliente.service.js
│
└── repositories/
    └── ...
```

A camada `repositories` ainda será implementada.

---

# 26. Estado Atual da Implementação

Até o momento, o backend possui uma API funcional para clientes.

Fluxo implementado e testado:

```text
GET /api/clientes
        ↓
cliente.routes.js
        ↓
cliente.controller.js
        ↓
cliente.service.js
        ↓
dados temporários
        ↓
JSON
```

A resposta atualmente utiliza dados temporários porque o banco de dados ainda não foi implementado.

---

# 27. Estratégia de Desenvolvimento

O desenvolvimento seguirá um processo incremental.

Para cada funcionalidade:

```text
1. Definir o objetivo
       ↓
2. Implementar uma pequena parte
       ↓
3. Executar o sistema
       ↓
4. Testar
       ↓
5. Corrigir se necessário
       ↓
6. Validar
       ↓
7. Passar para a próxima etapa
```

Não serão implementadas várias camadas simultaneamente sem testes intermediários.

---

# 28. Próximas Etapas Técnicas

A sequência inicial prevista é:

```text
Route
   ↓
Controller
   ↓
Service
   ↓
Repository
   ↓
Banco de dados
```

O ponto atual do desenvolvimento está no:

```text
Service
```

A próxima etapa técnica será definir e implementar o **Repository de Cliente**, substituindo gradualmente os dados temporários por persistência real.

---

# 29. Decisões Arquiteturais Importantes

Até o momento, foram tomadas as seguintes decisões:

* O backend utilizará Node.js.
* O backend utilizará Express.
* O projeto utilizará ES Modules.
* A aplicação será separada do processo de inicialização do servidor.
* As rotas serão separadas por domínio.
* Controllers serão separados das rotas.
* Services serão responsáveis pelas regras de negócio.
* Repositories serão responsáveis pela persistência.
* O banco de dados ainda será definido/implementado posteriormente.
* O desenvolvimento será incremental.
* Cada etapa deverá ser testada antes da próxima.
* O histórico das operações importantes deverá ser preservado.
* Não será entregue código pronto durante o desenvolvimento; a implementação será realizada de forma guiada.

---

# 30. Princípio Geral do Projeto

O ERP deverá representar o processo real da oficina.

O sistema não deve apenas armazenar dados, mas representar o fluxo de trabalho:

```text
Cliente
   ↓
Veículo
   ↓
Recepção
   ↓
Ordem de Serviço
   ↓
Diagnóstico
   ↓
Orçamento
   ↓
Autorização
   ↓
Execução
   ↓
Conclusão
   ↓
Entrega
```

Todas as funcionalidades futuras deverão ser avaliadas considerando esse fluxo.

> **Regra de ouro do projeto:** antes de implementar uma funcionalidade, devemos entender qual problema do processo da oficina ela resolve, qual entidade é responsável por ela e em qual etapa do fluxo ela acontece.

---

# 31. Controle de Alterações do Documento

Este documento deverá ser atualizado sempre que uma regra de negócio ou decisão arquitetural importante for modificada.

| Versão | Descrição                                               |
| ------ | ------------------------------------------------------- |
| 1.0    | Documento inicial baseado no levantamento de requisitos |
| 1.1    | A ser atualizado conforme novas decisões forem tomadas  |

---

## Status atual

**Levantamento de requisitos:** concluído inicialmente
**Casos de uso:** definidos inicialmente
**Arquitetura:** definida inicialmente
**Backend:** em desenvolvimento
**Frontend:** estrutura inicial criada
**Banco de dados:** ainda não implementado
**Persistência:** ainda não implementada
**Próxima etapa:** Repository de Cliente
