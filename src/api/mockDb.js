const seed = {
  users: [
    {
      id: 'usr_001',
      name: 'Admin',
      email: 'admin@metricforge.com',
      role: 'Administrador',
      password: '123456'
    }
  ],
  customers: [
    { id:'cus_001', name:'Marina Silva', email:'marina.silva@email.com', value:1840, status:'Ativo', activity:'Hoje' },
    { id:'cus_002', name:'Lucas Mendes', email:'lucas.mendes@email.com', value:920, status:'Ativo', activity:'Hoje' },
    { id:'cus_003', name:'Ana Costa', email:'ana.costa@email.com', value:2340, status:'Ativo', activity:'Ontem' },
    { id:'cus_004', name:'Rafael Souza', email:'rafael.souza@email.com', value:680, status:'Inativo', activity:'Ontem' },
    { id:'cus_005', name:'João Oliveira', email:'joao.oliveira@email.com', value:3120, status:'Ativo', activity:'12 Ago' }
  ],
  reports: [
    { id:'rep_001', name:'Performance mensal', updated:'Atualizado hoje' },
    { id:'rep_002', name:'Aquisição de clientes', updated:'Atualizado ontem' },
    { id:'rep_003', name:'Financeiro Q3', updated:'12 Ago 2026' }
  ],
  alerts: [
    { id:'alt_001', title:'Receita abaixo da meta', description:'Receita diária abaixo de R$ 8.000', priority:'Alta', active:true },
    { id:'alt_002', title:'Conversão caiu', description:'Conversão abaixo de 4%', priority:'Média', active:true },
    { id:'alt_003', title:'Pico de tráfego', description:'Sessões acima de 10.000/dia', priority:'Baixa', active:true }
  ],
  integrations: [
    { id:'int_001', name:'Google Analytics', description:'Métricas de tráfego', connected:true, logo:'GA' },
    { id:'int_002', name:'Meta Ads', description:'Campanhas e investimento', connected:true, logo:'M' },
    { id:'int_003', name:'Stripe', description:'Receita e assinaturas', connected:true, logo:'S' },
    { id:'int_004', name:'PostgreSQL', description:'Banco principal', connected:false, logo:'PG' },
    { id:'int_005', name:'Slack', description:'Alertas da equipe', connected:true, logo:'S' },
    { id:'int_006', name:'HubSpot', description:'CRM e clientes', connected:false, logo:'H' }
  ],
  metrics: {
    revenue: [
      ['Jan',148200],['Fev',161800],['Mar',174300],['Abr',181900],
      ['Mai',202500],['Jun',218300],['Jul',209800],['Ago',248420]
    ],
    traffic: [
      ['Seg',4820],['Ter',6110],['Qua',5740],['Qui',7320],
      ['Sex',8150],['Sáb',6380],['Dom',4210]
    ],
    cards: [
      { label:'Receita', value:'R$ 248.420', change:'+18,4%', type:'up' },
      { label:'Usuários ativos', value:'18.294', change:'+12,8%', type:'up' },
      { label:'Conversão', value:'4,82%', change:'+0,74%', type:'up' },
      { label:'Ticket médio', value:'R$ 186,40', change:'-2,1%', type:'down' }
    ],
    sources: [
      ['Orgânico',38],['Direto',27],['Social',19],['Indicação',10],['Outros',6]
    ]
  },
  events: [
    { id:'evt_001', time:'Hoje, 14:32', title:'Compra aprovada', detail:'pedido #MF-84291', type:'success' },
    { id:'evt_002', time:'Hoje, 14:26', title:'Novo usuário', detail:'marina.silva@email.com', type:'info' },
    { id:'evt_003', time:'Hoje, 14:18', title:'API sincronizada', detail:'Google Analytics · 1.240 eventos', type:'success' },
    { id:'evt_004', time:'Hoje, 13:54', title:'Meta Ads atualizado', detail:'R$ 2.840 de investimento', type:'warning' },
    { id:'evt_005', time:'Hoje, 13:41', title:'Login detectado', detail:'São Paulo, BR · Chrome', type:'info' }
  ]
}

const KEY = 'metricforge-mock-db-v2'

export function loadDb() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : structuredClone(seed)
  } catch {
    return structuredClone(seed)
  }
}

export function saveDb(db) {
  localStorage.setItem(KEY, JSON.stringify(db))
}

export function resetDb() {
  localStorage.setItem(KEY, JSON.stringify(structuredClone(seed)))
}
