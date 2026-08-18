# MetricForge — Analytics SaaS

Projeto demonstrativo de portfólio com **React + Vite**, simulando uma aplicação SaaS full-stack.

## O diferencial

O front-end não usa apenas arrays hardcoded dentro dos componentes. Ele conversa com uma **Mock REST API** através de uma camada `api/client.js`.

### Fluxo

React → API Client → Mock REST API → Mock Database → LocalStorage

Isso simula:

- autenticação
- GET/POST/PUT/PATCH/DELETE
- loading
- tratamento de erros
- CRUD de clientes
- criação/exclusão de relatórios
- criação/ativação/exclusão de alertas
- conexão/desconexão de integrações
- dashboard e métricas
- persistência local

## Endpoints demonstrativos

- `POST /auth/login`
- `GET /dashboard`
- `GET /customers`
- `POST /customers`
- `PUT /customers/:id`
- `DELETE /customers/:id`
- `GET /reports`
- `POST /reports`
- `DELETE /reports/:id`
- `GET /alerts`
- `POST /alerts`
- `PATCH /alerts/:id`
- `DELETE /alerts/:id`
- `GET /integrations`
- `PATCH /integrations/:id`

## Login demo

E-mail: `admin@metricforge.com`

Senha: `123456`

## Tecnologias

React, Vite, React Router, Recharts, Lucide React, LocalStorage e uma camada de Mock REST API.

## Rodar localmente

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

## Deploy

Compatível com Vercel como projeto Vite.

> A API é propositalmente simulada para fins de portfólio. Não há backend ou banco de dados externo.
