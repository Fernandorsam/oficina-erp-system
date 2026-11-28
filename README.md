# ERP para Oficina Automotiva (`oficina-erp-system`)

Sistema ERP voltado ao gerenciamento de uma oficina automotiva, modelado a partir do fluxo real de atendimento: do cadastro de clientes e veículos à abertura de Ordem de Serviço (OS), diagnóstico, orçamento com aprovação parcial, execução de serviços, peças/estoque e histórico de alterações.

> **Documentação detalhada de requisitos:** [README/requeriments.md](README/requeriments.md)

---

## Visão geral e fluxo do processo

O sistema busca representar o ciclo operacional da oficina preservando o histórico das decisões e alterações:

```text
Cliente + Veículo ──▶ Recepção ──▶ Ordem de Serviço (OS)
                                        │
                                        ▼
                                   Diagnóstico
                                        │
                                        ▼
                                    Orçamento
                                        │
                        ┌───────────────┴───────────────┐
                        ▼                               ▼
                 Aprovação / Parcial               Pendentes / Recusa
                        │
                        ▼
               Execução (Mecânico)
                        │
                        ▼
               Conclusão e Entrega

```

## Principais regras de negócio e requisitos
* Abertura de OS sem agendamento prévio (RN003): Permite registrar atendimentos imediatos quando o cliente chega sem agendamento.

* Aprovação parcial e itens pendentes (RN006, RN007): O cliente pode autorizar apenas parte dos serviços do orçamento, mantendo itens pendentes ou não autorizados para acompanhamento posterior sem perder a OS.

* Execução restrita a serviços autorizados (RN009): O mecânico executa apenas os serviços aprovados e registra início, término, observações e status.

* Preservação de histórico (RN008, RN012): Alterações relevantes na OS e no orçamento não devem apagar informações anteriores, mantendo rastreabilidade do processo.

* Escopo e módulos previstos: Cliente, Veículo, Ordem de Serviço, Diagnóstico, Orçamento, Serviço, Peça, Estoque, Mecânico, Fornecedor, Recepção e Administração.

## Arquitetura e estado atual da implementação
* O projeto segue uma evolução incremental com separação de responsabilidades:
```text
Route ──▶ Controller ──▶ Service ──▶ Repository ──▶ Database
```
Backend (backend): Construído com Node.js, Express e ES Modules, com separação entre aplicação (app.js) e inicialização do servidor (server.js). Atualmente conta com fluxo funcional para clientes (GET /api/clientes passando por routes, controllers e services com dados temporários), em evolução para a camada de repositories e persistência em banco de dados.

Frontend (frontend): Estrutura inicial criada para acompanhar a evolução das interfaces.

Requisitos e análise (README): Documento completo com perfis (Recepção, Mecânico, Administração), regras de negócio (RN001–RN012), requisitos funcionais (RF001–RF012) e requisitos não funcionais (RNF001–RNF006).

## Como executar localmente
1 Clone o repositório:
```
git clone [https://github.com/Fernandorsam/oficina-erp-system.git](https://github.com/Fernandorsam/oficina-erp-system.git)
cd oficina-erp-system
```
2 Instale as dependências e rode o backend:
```
cd backend
npm install
npm start
```
3 Execute os testes (quando configurados no package.json do backend):
```
npm test
```
