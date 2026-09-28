import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,NavLink,Route,Routes,useLocation} from 'react-router-dom'
import {AreaChart,Area,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {Activity,ArrowUpRight,ArrowDownRight,Bell,Check,ChevronDown,ChevronRight,CircleDollarSign,Cloud,Download,Eye,FileText,Filter,Globe2,LayoutDashboard,LogOut,Menu,MoreHorizontal,Plus,RefreshCw,Search,Settings,ShieldCheck,SlidersHorizontal,TrendingUp,UserPlus,Users,Wallet,Zap,Trash2,Power,X} from 'lucide-react'
import './styles.css'
import {api} from './api/client'
import {resetDb} from './api/mockDb'
import {Loading,ErrorState,Toast,Modal} from './components/UI'

const LOCALE_KEY='mf-locale'

const copy={
  en:{
    language:'Language',
    english:'English',
    portuguese:'Portuguese',
    loginHeroTitleA:'Better decisions start with',
    loginHeroTitleB:'better data.',
    loginHeroText:'An analytics platform to turn data into clarity, speed, and growth.',
    monthlyRevenue:'monthly revenue',
    avgConversion:'avg conversion',
    loginWorkspace:'Sign in to workspace',
    loginApiDemo:'Demo API · Auth',
    loginSubtitle:'Simulated authentication with a REST endpoint.',
    email:'Email',
    password:'Password',
    authenticating:'Authenticating...',
    signInDashboard:'Sign in to dashboard',
    demoCredentials:'Demo credentials',
    copyright:'Portfolio demo project',
    overview:'OVERVIEW',
    management:'MANAGEMENT',
    settings:'SETTINGS',
    dashboard:'Dashboard',
    metrics:'Metrics',
    reports:'Reports',
    customers:'Customers',
    integrations:'Integrations',
    alerts:'Alerts',
    preferences:'Preferences',
    proPlan:'Pro plan',
    events:'events',
    logout:'Sign out',
    noNewNotifications:'No new notifications',
    workspaceCrumb:'WORKSPACE /',
    period:'Period',
    last30Days:'Last 30 days',
    last7Days:'Last 7 days',
    today:'Today',
    dataUpdatedNow:'Data updated just now',
    pendingAlerts:'You have pending alerts',
    dashboardText:'Track your business performance in real time.',
    dataFromApi:'Data loaded through the Mock REST API.',
    exportReady:'Export prepared',
    newReport:'New report',
    reportCreated:'Report created',
    export:'Export',
    apiConnected:'API connected',
    lastUpdateNow:'Last update: now',
    sync:'Sync',
    vsPreviousPeriod:'vs previous period',
    revenue:'Revenue',
    trafficSource:'Traffic source',
    sessionsDistribution:'Session distribution',
    sessions:'sessions',
    organicGrew:'Organic grew',
    duringPeriod:'in the period.',
    recentActivity:'Recent activity',
    eventsFromApi:'Events returned by API',
    viewAll:'View all',
    eventsLoaded:'Events loaded',
    activeUsers:'Active users',
    explorer:'EXPLORER',
    metricsText:'Explore indicators and trends with custom filters.',
    customDashboardSaved:'Custom dashboard saved',
    customize:'Customize',
    topInsights:'Top insights',
    monthlyGoals:'Monthly goals',
    dataHub:'DATA HUB',
    reportsText:'Create, export, and share analytics with your team.',
    createReport:'Create report',
    reportExported:'Report exported',
    reportOpened:'Report opened',
    reportDeleted:'Report deleted',
    reportCreatedApi:'Report created by API',
    fullDashboard:'Full dashboard',
    reportName:'Report name',
    reportPlaceholder:'e.g. Weekly performance',
    createViaApi:'Create via API',
    crm:'CRM',
    customersText:'Complete CRUD connected to Mock REST API.',
    addCustomer:'Add customer',
    searchCustomer:'Search customer...',
    totalValue:'TOTAL VALUE',
    status:'STATUS',
    latestActivity:'LATEST ACTIVITY',
    action:'ACTION',
    customerCreatedApi:'Customer created by API',
    customerRemoved:'Customer removed',
    newCustomer:'New customer',
    name:'Name',
    fullName:'Full name',
    totalAmount:'Total amount',
    saveViaApi:'Save via API',
    connections:'CONNECTIONS',
    integrationsText:'Connect your main tools in a few clicks.',
    browse:'Browse',
    integrationsCatalogOpened:'Integrations catalog opened',
    integrationUpdated:'Integration updated by API',
    connected:'Connected',
    notConnected:'Not connected',
    connect:'Connect',
    disconnect:'Disconnect',
    monitoring:'MONITORING',
    alertsText:'Rules persisted in the Mock REST API.',
    newAlert:'New alert',
    alertCreatedApi:'Alert created by API',
    alertStatusUpdated:'Alert status updated',
    alertRemoved:'Alert removed',
    active:'Active',
    paused:'Paused',
    priority:'Priority',
    title:'Title',
    condition:'Condition',
    high:'High',
    medium:'Medium',
    low:'Low',
    settingsTitle:'Settings',
    settingsText:'Manage your account and demo environment.',
    general:'General',
    team:'Team',
    billing:'Plan and billing',
    security:'Security',
    notifications:'Notifications',
    generalPrefs:'General preferences',
    appStatePersisted:'App state is persisted in LocalStorage.',
    darkTheme:'Dark theme',
    darkThemeText:'Ideal for continuous monitoring.',
    realTimeUpdate:'Real-time updates',
    realTimeUpdateText:'Simulated sync with API.',
    emailAlerts:'Email alerts',
    emailAlertsText:'Demo visual preference.',
    secureEnv:'Secure environment',
    secureEnvText:'Demo authentication and session.',
    demoData:'Demo data',
    demoDataText:'Delete local changes and restore seed data.',
    restoreData:'Restore data',
    demoDataRestored:'Demo data restored',
    loadingData:'Loading data...',
    retry:'Try again',
    invalidCreds:'Invalid email or password.',
    requiredNameEmail:'Name and email are required.',
    customerNotFound:'Customer not found.',
    alertNotFound:'Alert not found.',
    integrationNotFound:'Integration not found.',
    endpointNotFound:'Endpoint not found.',
    previous:'Previous',
    now:'Now',
    yesterday:'Yesterday',
    hostLocale:'en-US'
  },
  'pt-BR':{
    language:'Idioma',
    english:'Ingles',
    portuguese:'Portugues',
    loginHeroTitleA:'Decisoes melhores comecam com',
    loginHeroTitleB:'dados melhores.',
    loginHeroText:'Uma plataforma analitica para transformar dados em clareza, velocidade e crescimento.',
    monthlyRevenue:'receita mensal',
    avgConversion:'conversao media',
    loginWorkspace:'Entrar no workspace',
    loginApiDemo:'API DEMO · AUTH',
    loginSubtitle:'Autenticacao simulada com endpoint REST.',
    email:'E-mail',
    password:'Senha',
    authenticating:'Autenticando...',
    signInDashboard:'Entrar no dashboard',
    demoCredentials:'Credenciais demo',
    copyright:'Projeto demonstrativo de portfolio',
    overview:'VISAO GERAL',
    management:'GESTAO',
    settings:'CONFIGURACOES',
    dashboard:'Dashboard',
    metrics:'Metricas',
    reports:'Relatorios',
    customers:'Clientes',
    integrations:'Integracoes',
    alerts:'Alertas',
    preferences:'Preferencias',
    proPlan:'Plano Pro',
    events:'eventos',
    logout:'Sair',
    noNewNotifications:'Nenhuma nova notificacao',
    workspaceCrumb:'WORKSPACE /',
    period:'Periodo',
    last30Days:'Ultimos 30 dias',
    last7Days:'Ultimos 7 dias',
    today:'Hoje',
    dataUpdatedNow:'Dados atualizados agora',
    pendingAlerts:'Voce tem alertas pendentes',
    dashboardText:'Acompanhe o desempenho do seu negocio em tempo real.',
    dataFromApi:'Dados carregados atraves da Mock REST API.',
    exportReady:'Exportacao preparada',
    newReport:'Novo relatorio',
    reportCreated:'Relatorio criado',
    export:'Exportar',
    apiConnected:'API conectada',
    lastUpdateNow:'Ultima atualizacao: agora',
    sync:'Sincronizar',
    vsPreviousPeriod:'vs periodo anterior',
    revenue:'Receita',
    trafficSource:'Origem do trafego',
    sessionsDistribution:'Distribuicao de sessoes',
    sessions:'sessoes',
    organicGrew:'Organico cresceu',
    duringPeriod:'no periodo.',
    recentActivity:'Atividade recente',
    eventsFromApi:'Eventos retornados pela API',
    viewAll:'Ver todos',
    eventsLoaded:'Eventos carregados',
    activeUsers:'Usuarios ativos',
    explorer:'EXPLORADOR',
    metricsText:'Explore indicadores e tendencias com filtros personalizados.',
    customDashboardSaved:'Dashboard personalizado salvo',
    customize:'Personalizar',
    topInsights:'Principais insights',
    monthlyGoals:'Metas do mes',
    dataHub:'CENTRAL DE DADOS',
    reportsText:'Crie, exporte e compartilhe analises com sua equipe.',
    createReport:'Criar relatorio',
    reportExported:'Relatorio exportado',
    reportOpened:'Relatorio aberto',
    reportDeleted:'Relatorio excluido',
    reportCreatedApi:'Relatorio criado pela API',
    fullDashboard:'Dashboard completo',
    reportName:'Nome do relatorio',
    reportPlaceholder:'Ex.: Performance semanal',
    createViaApi:'Criar via API',
    crm:'CRM',
    customersText:'CRUD completo conectado a Mock REST API.',
    addCustomer:'Adicionar cliente',
    searchCustomer:'Buscar cliente...',
    totalValue:'VALOR TOTAL',
    status:'STATUS',
    latestActivity:'ULTIMA ATIVIDADE',
    action:'ACAO',
    customerCreatedApi:'Cliente criado pela API',
    customerRemoved:'Cliente removido',
    newCustomer:'Novo cliente',
    name:'Nome',
    fullName:'Nome completo',
    totalAmount:'Valor total',
    saveViaApi:'Salvar via API',
    connections:'CONEXOES',
    integrationsText:'Conecte suas principais ferramentas em poucos cliques.',
    browse:'Explorar',
    integrationsCatalogOpened:'Catalogo de integracoes aberto',
    integrationUpdated:'Integracao atualizada pela API',
    connected:'Conectado',
    notConnected:'Nao conectado',
    connect:'Conectar',
    disconnect:'Desconectar',
    monitoring:'MONITORAMENTO',
    alertsText:'Regras persistidas na Mock REST API.',
    newAlert:'Novo alerta',
    alertCreatedApi:'Alerta criado pela API',
    alertStatusUpdated:'Status do alerta atualizado',
    alertRemoved:'Alerta removido',
    active:'Ativo',
    paused:'Pausado',
    priority:'Prioridade',
    title:'Titulo',
    condition:'Condicao',
    high:'Alta',
    medium:'Media',
    low:'Baixa',
    settingsTitle:'Configuracoes',
    settingsText:'Gerencie sua conta e o ambiente demonstrativo.',
    general:'Geral',
    team:'Equipe',
    billing:'Plano e cobranca',
    security:'Seguranca',
    notifications:'Notificacoes',
    generalPrefs:'Preferencias gerais',
    appStatePersisted:'O estado da aplicacao e persistido no LocalStorage.',
    darkTheme:'Tema escuro',
    darkThemeText:'Ideal para monitoramento continuo.',
    realTimeUpdate:'Atualizacao em tempo real',
    realTimeUpdateText:'Sincronizacao simulada com a API.',
    emailAlerts:'Alertas por e-mail',
    emailAlertsText:'Preferencia visual demonstrativa.',
    secureEnv:'Ambiente seguro',
    secureEnvText:'Autenticacao e sessao demonstrativas.',
    demoData:'Dados de demonstracao',
    demoDataText:'Apaga alteracoes locais e restaura os dados iniciais.',
    restoreData:'Restaurar dados',
    demoDataRestored:'Dados demonstrativos restaurados',
    loadingData:'Carregando dados...',
    retry:'Tentar novamente',
    invalidCreds:'E-mail ou senha invalidos.',
    requiredNameEmail:'Nome e e-mail sao obrigatorios.',
    customerNotFound:'Cliente nao encontrado.',
    alertNotFound:'Alerta nao encontrado.',
    integrationNotFound:'Integracao nao encontrada.',
    endpointNotFound:'Endpoint nao encontrado.',
    previous:'Anterior',
    now:'Agora',
    yesterday:'Ontem',
    hostLocale:'pt-BR'
  }
}

const translations={
  month:{Jan:['Jan','Jan'],Fev:['Feb','Fev'],Mar:['Mar','Mar'],Abr:['Apr','Abr'],Mai:['May','Mai'],Jun:['Jun','Jun'],Jul:['Jul','Jul'],Ago:['Aug','Ago']},
  day:{Seg:['Mon','Seg'],Ter:['Tue','Ter'],Qua:['Wed','Qua'],Qui:['Thu','Qui'],Sex:['Fri','Sex'],Sab:['Sat','Sab'],Sáb:['Sat','Sab'],Dom:['Sun','Dom']},
  source:{Organico:['Organic','Organico'],Orgânico:['Organic','Organico'],Direto:['Direct','Direto'],Social:['Social','Social'],Indicacao:['Referral','Indicacao'],Indicação:['Referral','Indicacao'],Outros:['Others','Outros']},
  card:{Receita:['Revenue','Receita'],'Usuarios ativos':['Active users','Usuarios ativos'],'Usuários ativos':['Active users','Usuarios ativos'],Conversao:['Conversion','Conversao'],'Ticket medio':['Avg ticket','Ticket medio'],'Ticket médio':['Avg ticket','Ticket medio']},
  status:{Ativo:['Active','Ativo'],Inativo:['Inactive','Inativo']},
  activity:{Hoje:['Today','Hoje'],Ontem:['Yesterday','Ontem'],Agora:['Now','Agora']},
  reportUpdated:{'Atualizado hoje':['Updated today','Atualizado hoje'],'Atualizado ontem':['Updated yesterday','Atualizado ontem']},
  integrationDesc:{'Metricas de trafego':['Traffic metrics','Metricas de trafego'],'Métricas de tráfego':['Traffic metrics','Metricas de trafego'],'Campanhas e investimento':['Campaigns and spend','Campanhas e investimento'],'Receita e assinaturas':['Revenue and subscriptions','Receita e assinaturas'],'Banco principal':['Primary database','Banco principal'],'Alertas da equipe':['Team alerts','Alertas da equipe'],'CRM e clientes':['CRM and customers','CRM e clientes']},
  priority:{Alta:['High','Alta'],Media:['Medium','Media'],'Média':['Medium','Media'],Baixa:['Low','Baixa']}
}

const pick=(value,locale,map)=>{
  if(!value)return value
  const normalized=String(value)
  const entry=map[normalized]
  if(!entry)return normalized
  return locale==='en'?entry[0]:entry[1]
}

const normalizeError=(message,t)=>{
  if(!message)return ''
  if(message.includes('E-mail ou senha'))return t.invalidCreds
  if(message.includes('Nome e e-mail'))return t.requiredNameEmail
  if(message.includes('Cliente nao encontrado')||message.includes('Cliente não encontrado'))return t.customerNotFound
  if(message.includes('Alerta nao encontrado')||message.includes('Alerta não encontrado'))return t.alertNotFound
  if(message.includes('Integracao nao encontrada')||message.includes('Integração não encontrada'))return t.integrationNotFound
  if(message.includes('Endpoint nao encontrado')||message.includes('Endpoint não encontrado'))return t.endpointNotFound
  return message
}

const fmt=(n,locale)=>new Intl.NumberFormat(locale==='en'?'en-US':'pt-BR').format(n)
const money=(n,locale)=>new Intl.NumberFormat(locale==='en'?'en-US':'pt-BR',{style:'currency',currency:'BRL'}).format(n)

function Brand(){return <div className="brand"><span className="brand-mark"><Activity size={17}/></span><span>METRIC<span>FORGE</span></span></div>}

function Login({onLogin,locale,setLocale,t}) {
  const [email,setEmail]=useState('admin@metricforge.com')
  const [password,setPassword]=useState('123456')
  const [loading,setLoading]=useState(false)
  const [error,setError]=useState('')

  async function submit(e){
    e.preventDefault()
    setLoading(true);setError('')
    try{
      const response=await api.login({email,password})
      localStorage.setItem('mf-session',JSON.stringify(response.data))
      onLogin(response.data.user)
    }catch(err){setError(normalizeError(err.message,t))}finally{setLoading(false)}
  }

  return <div className="login-screen">
    <div className="login-visual"><div className="login-copy"><Brand/><h1>{t.loginHeroTitleA} <em>{t.loginHeroTitleB}</em></h1><p>{t.loginHeroText}</p><div className="login-stats"><span><b>+18,4%</b><small>{t.monthlyRevenue}</small></span><span><b>4,82%</b><small>{t.avgConversion}</small></span><span><b>99,9%</b><small>uptime</small></span></div></div></div>
    <div className="login-form"><form className="login-form-inner" onSubmit={submit}><div className="mobile-brand"><Brand/></div><div className="table-toolbar" style={{marginBottom:12}}><span className="api-chip">{t.language}</span><select value={locale} onChange={e=>setLocale(e.target.value)}><option value="en">{t.english}</option><option value="pt-BR">{t.portuguese}</option></select></div><span className="eyebrow"><i/> {t.loginApiDemo}</span><h2>{t.loginWorkspace}</h2><p>{t.loginSubtitle}</p><label>{t.email}<input value={email} onChange={e=>setEmail(e.target.value)} type="email"/></label><label>{t.password}<input value={password} onChange={e=>setPassword(e.target.value)} type="password"/></label>{error&&<div className="form-error">{error}</div>}<button className="primary login-submit" disabled={loading}>{loading?<><RefreshCw className="spin" size={15}/> {t.authenticating}</>:<>{t.signInDashboard} <ChevronRight size={16}/></>}</button><div className="demo-login"><Zap size={14}/><span><b>{t.demoCredentials}</b><small>admin@metricforge.com · 123456</small></span></div><small className="copyright">© 2026 MetricForge · {t.copyright}</small></form></div>
  </div>
}

function Layout({user,setUser,locale,setLocale,t}){
  const [side,setSide]=useState(false),[dark,setDark]=useState(localStorage.getItem('mf-theme')!=='light'),[toast,setToast]=useState(''),loc=useLocation()
  useEffect(()=>{document.body.dataset.theme=dark?'dark':'light';localStorage.setItem('mf-theme',dark?'dark':'light')},[dark])
  useEffect(()=>{setSide(false)},[loc.pathname])
  useEffect(()=>{
    if(!side)return
    const onEsc=e=>{if(e.key==='Escape')setSide(false)}
    const prevOverflow=document.body.style.overflow
    document.body.style.overflow='hidden'
    window.addEventListener('keydown',onEsc)
    return ()=>{
      document.body.style.overflow=prevOverflow
      window.removeEventListener('keydown',onEsc)
    }
  },[side])
  const notify=x=>{setToast(x);setTimeout(()=>setToast(''),2200)}
  function logout(){localStorage.removeItem('mf-session');setUser(null)}
  const routeNames={'/':t.dashboard,'/metricas':t.metrics,'/relatorios':t.reports,'/clientes':t.customers,'/integracoes':t.integrations,'/alertas':t.alerts,'/configuracoes':t.settingsTitle}
  return <div className="app">
    <aside className={'sidebar '+(side?'show':'')}><div className="sidebar-head"><Brand/><button className="sidebar-close" onClick={()=>setSide(false)} aria-label="Close menu"><X size={18}/></button></div><div className="workspace"><div className="workspace-icon">A</div><div><b>Acme Analytics</b><small>Pro workspace · Mock API</small></div><ChevronDown size={14}/></div>
      <nav><p>{t.overview}</p><NavLink to="/" onClick={()=>setSide(false)}><LayoutDashboard/>{t.dashboard}</NavLink><NavLink to="/metricas" onClick={()=>setSide(false)}><TrendingUp/>{t.metrics}</NavLink><NavLink to="/relatorios" onClick={()=>setSide(false)}><FileText/>{t.reports}</NavLink><p>{t.management}</p><NavLink to="/clientes" onClick={()=>setSide(false)}><Users/>{t.customers}</NavLink><NavLink to="/integracoes" onClick={()=>setSide(false)}><Cloud/>{t.integrations}</NavLink><NavLink to="/alertas" onClick={()=>setSide(false)}><Bell/>{t.alerts}</NavLink><p>{t.settings}</p><NavLink to="/configuracoes" onClick={()=>setSide(false)}><Settings/>{t.settingsTitle}</NavLink></nav>
      <div className="sidebar-bottom"><div className="plan"><b>{t.proPlan}</b><small>8.420 / 10.000 {t.events}</small><div className="progress"><i/></div></div><button onClick={logout}><LogOut size={15}/> {t.logout}</button></div>
    </aside>
    {side && <button className="sidebar-backdrop" onClick={()=>setSide(false)} aria-label="Close menu" />}
    <div className="mobile-top"><button onClick={()=>setSide(!side)}><Menu/></button><span>METRIC<span>FORGE</span></span><button onClick={()=>notify(t.noNewNotifications)}><Bell size={19}/></button></div>
    <div className="main"><header><div className="header-left"><button className="icon-btn menu-desktop" onClick={()=>setSide(!side)}><Menu size={19}/></button><div><span className="crumb">{t.workspaceCrumb}</span><b>{routeNames[loc.pathname]||t.dashboard}</b></div></div><div className="header-right"><div className="date-select"><span>{t.period}</span><select><option>{t.last30Days}</option><option>{t.last7Days}</option><option>{t.today}</option></select></div><select value={locale} onChange={e=>setLocale(e.target.value)}><option value="en">{t.english}</option><option value="pt-BR">{t.portuguese}</option></select><button className="icon-btn" onClick={()=>notify(t.dataUpdatedNow)}><RefreshCw size={17}/></button><button className="icon-btn notification" onClick={()=>notify(t.pendingAlerts)}><Bell size={17}/><i/></button><div className="user-mini"><div>{user.name[0].toUpperCase()}</div><span>{user.name}<small>{user.role}</small></span></div></div></header>
      <main className="content"><Routes><Route path="/" element={<Dashboard notify={notify} locale={locale} t={t}/>} /><Route path="/metricas" element={<Metrics notify={notify} locale={locale} t={t}/>} /><Route path="/relatorios" element={<Reports notify={notify} locale={locale} t={t}/>} /><Route path="/clientes" element={<Customers notify={notify} locale={locale} t={t}/>} /><Route path="/integracoes" element={<Integrations notify={notify} locale={locale} t={t}/>} /><Route path="/alertas" element={<Alerts notify={notify} locale={locale} t={t}/>} /><Route path="/configuracoes" element={<SettingsPage dark={dark} setDark={setDark} notify={notify} t={t}/>} /></Routes></main>
    </div><Toast message={toast} onClose={()=>setToast('')}/></div>
}

function Title({eyebrow,title,text,children}){return <div className="page-title"><div><span className="eyebrow"><i/> {eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{children}</div>}

function Dashboard({notify,locale,t}){
  const [state,setState]=useState({loading:true,error:'',data:null})
  async function load(){setState({loading:true,error:'',data:null});try{const r=await api.dashboard();setState({loading:false,error:'',data:r.data})}catch(e){setState({loading:false,error:normalizeError(e.message,t),data:null})}}
  useEffect(()=>{load()},[])
  if(state.loading)return <><Title eyebrow={t.overview} title={t.dashboard} text={t.dashboardText}/><Loading text={t.loadingData}/></>
  if(state.error)return <><Title eyebrow={t.overview} title={t.dashboard} text={t.dashboardText}/><ErrorState message={state.error} retryLabel={t.retry} onRetry={load}/></>
  const {metrics,events}=state.data
  const revenue=metrics.revenue.map(([month,value])=>({month:pick(month,locale,translations.month),value}))
  const traffic=metrics.traffic.map(([day,value])=>({day:pick(day,locale,translations.day),value}))
  const cards=metrics.cards.map(x=>({...x,label:pick(x.label,locale,translations.card)}))
  const sources=metrics.sources.map(([name,value])=>[pick(name,locale,translations.source),value])
  return <>
    <Title eyebrow={t.overview} title={t.dashboard} text={t.dataFromApi}><div className="title-actions"><button className="outline" onClick={()=>notify(t.exportReady)}><Download size={15}/> {t.export}</button><button className="primary" onClick={()=>notify(t.reportCreated)}><Plus size={16}/> {t.newReport}</button></div></Title>
    <div className="live-bar"><span><i/> {t.apiConnected}</span><span>{t.lastUpdateNow}</span><button onClick={load}>{t.sync} <RefreshCw size={12}/></button></div>
    <div className="metric-grid">{cards.map((m,i)=>{const Icon=[CircleDollarSign,Users,TrendingUp,Wallet][i];return <div className="metric-card" key={m.label}><div className="metric-top"><span><Icon size={18}/></span><MoreHorizontal size={16}/></div><small>{m.label}</small><strong>{m.value}</strong><div className={m.type}>{m.type==='up'?<ArrowUpRight size={13}/>:<ArrowDownRight size={13}/>} {m.change}<em>{t.vsPreviousPeriod}</em></div></div>})}</div>
    <div className="grid-2"><div className="panel chart-panel"><div className="panel-head"><div><h2>{t.revenue}</h2><p>GET /dashboard</p></div><div className="api-chip">GET /dashboard</div></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenue}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#756cff" stopOpacity=".3"/><stop offset="100%" stopColor="#756cff" stopOpacity="0"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="month" stroke="var(--muted)" fontSize={11} tickLine={false} axisLine={false}/><YAxis stroke="var(--muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v=>`${money(v,locale).replace(',00','')}`}/><Tooltip contentStyle={{background:'var(--tooltip)',border:'1px solid var(--border)',borderRadius:8,color:'var(--text)'}} formatter={v=>[money(v,locale),t.revenue]}/><Area type="monotone" dataKey="value" stroke="#8078ff" strokeWidth={2.5} fill="url(#g)"/></AreaChart></ResponsiveContainer></div><div className="chart-foot"><span>● {t.revenue}</span><b>+18,4% ↗</b></div></div>
      <div className="panel"><div className="panel-head"><div><h2>{t.trafficSource}</h2><p>{t.sessionsDistribution}</p></div><span className="api-chip">REST</span></div><div className="source-chart"><div className="donut"><div><strong>18.2k</strong><small>{t.sessions}</small></div></div><div className="source-list">{sources.map((s,i)=><div key={s[0]}><span><i className={'source-dot s'+i}/>{s[0]}</span><b>{s[1]}%</b></div>)}</div></div><div className="panel-note"><Globe2 size={15}/> {t.organicGrew} <b>6,2%</b> {t.duringPeriod}</div></div>
    </div>
    <div className="grid-2"><div className="panel"><div className="panel-head"><div><h2>{t.recentActivity}</h2><p>{t.eventsFromApi}</p></div><button className="text-btn" onClick={()=>notify(t.eventsLoaded)}>{t.viewAll} <ChevronRight size={13}/></button></div><div className="activity-list">{events.map(e=><div className="activity" key={e.id}><span className={'activity-icon '+e.type}>{e.type==='success'?<Check size={14}/>:e.type==='warning'?<Zap size={14}/>:<Users size={14}/>}</span><div><b>{e.title}</b><small>{e.detail}</small></div><time>{e.time.replace('Hoje',t.today)}</time></div>)}</div></div>
      <div className="panel"><div className="panel-head"><div><h2>{t.activeUsers}</h2><p>{t.last7Days}</p></div><span className="live-tag">LIVE</span></div><div className="mini-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={traffic}><XAxis dataKey="day" hide/><YAxis hide/><Bar dataKey="value" fill="#6c63ff" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div><div className="active-total"><strong>18.294</strong><span>↗ 12,8% <small>{t.vsPreviousPeriod}</small></span></div></div></div>
  </>
}

function Metrics({notify,locale,t}){
  const [loading,setLoading]=useState(true),[data,setData]=useState(null)
  async function load(){setLoading(true);const r=await api.dashboard();setData(r.data.metrics);setLoading(false)}
  useEffect(()=>{load()},[])
  if(loading)return <><Title eyebrow={t.explorer} title={t.metrics} text={t.metricsText}/><Loading text={t.loadingData}/></>
  const metricList=locale==='en'?
    [['Revenue','R$ 248k'],['Users','18.2k'],['Conversion','4.82%'],['Sessions','42.8k'],['Orders','1,332'],['CAC','R$ 42.10']]:
    [['Receita','R$ 248k'],['Usuarios','18,2k'],['Conversao','4,82%'],['Sessoes','42,8k'],['Pedidos','1.332'],['CAC','R$ 42,10']]
  const insights=locale==='en'?
    ['Revenue accelerated 18.4% in the period.','Conversion reached the highest level in the last 90 days.','Organic traffic represents 38% of sessions.','Average ticket dropped 2.1% and deserves attention.']:
    ['Receita acelerou 18,4% no periodo.','Conversao atingiu o maior nivel dos ultimos 90 dias.','Trafego organico representa 38% das sessoes.','Ticket medio caiu 2,1% e merece atencao.']
  const goals=locale==='en'?[['Revenue',82],['New users',73],['Conversion',80]]:[['Receita',82],['Novos usuarios',73],['Conversao',80]]
  return <><Title eyebrow={t.explorer} title={t.metrics} text={t.metricsText}><button className="outline" onClick={()=>notify(t.customDashboardSaved)}><SlidersHorizontal size={15}/> {t.customize}</button></Title><div className="metric-selector">{metricList.map(x=><button key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></button>)}</div><div className="panel large-chart"><div className="panel-head"><div><h2>{t.revenue}</h2><p>GET /dashboard · {t.last30Days.toLowerCase()}</p></div><span className="api-chip">200 OK</span></div><ResponsiveContainer width="100%" height={390}><AreaChart data={data.revenue.map(([m,v])=>({m:pick(m,locale,translations.month),v}))}><CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="m" stroke="var(--muted)" tickLine={false} axisLine={false}/><YAxis stroke="var(--muted)" tickLine={false} axisLine={false}/><Tooltip contentStyle={{background:'var(--tooltip)',border:'1px solid var(--border)',borderRadius:8}} formatter={v=>money(v,locale)}/><Area type="monotone" dataKey="v" stroke="#7c73ff" fill="#756cff22" strokeWidth={3}/></AreaChart></ResponsiveContainer></div><div className="two-small"><div className="panel"><h2>{t.topInsights}</h2>{insights.map(x=><div className="insight" key={x}>✦ {x}<ChevronRight size={13}/></div>)}</div><div className="panel"><h2>{t.monthlyGoals}</h2>{goals.map(x=><div className="goal" key={x[0]}><div><span>{x[0]}</span><b>{x[1]}%</b></div><div className="goal-bar"><i style={{width:x[1]+'%'}}/></div></div>)}</div></div></>
}

function Reports({notify,locale,t}){
  const [loading,setLoading]=useState(true),[reports,setReports]=useState([]),[modal,setModal]=useState(false),[name,setName]=useState('')
  async function load(){setLoading(true);try{const r=await api.reports.list();setReports(r.data)}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  async function create(){if(!name.trim())return;await api.reports.create({name});setName('');setModal(false);await load();notify(t.reportCreatedApi)}
  async function remove(id){await api.reports.remove(id);await load();notify(t.reportDeleted)}
  return <><Title eyebrow={t.dataHub} title={t.reports} text={t.reportsText}><button className="primary" onClick={()=>setModal(true)}><Plus size={16}/> {t.createReport}</button></Title>{loading?<Loading text={t.loadingData}/>:<div className="report-grid">{reports.map(r=><div className="report-card" key={r.id}><div className="report-icon"><FileText/></div><div><h2>{r.name}</h2><p>{t.fullDashboard}</p><small>{pick(r.updated,locale,translations.reportUpdated)}</small></div><button className="ghost-icon" onClick={()=>remove(r.id)}><Trash2 size={15}/></button><div className="report-actions"><button onClick={()=>notify(t.reportExported)}><Download size={14}/> {t.export}</button><button onClick={()=>notify(t.reportOpened)}><Eye size={14}/> {t.viewAll}</button></div></div>)}</div>}{modal&&<Modal title={t.createReport} onClose={()=>setModal(false)}><label>{t.reportName}<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder={t.reportPlaceholder}/></label><button className="primary full" onClick={create}>{t.createViaApi}</button></Modal>}</>
}

function Customers({notify,locale,t}){
  const [loading,setLoading]=useState(true),[customers,setCustomers]=useState([]),[q,setQ]=useState(''),[modal,setModal]=useState(false),[form,setForm]=useState({name:'',email:'',value:''})
  async function load(){setLoading(true);try{const r=await api.customers.list();setCustomers(r.data)}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  async function create(){if(!form.name||!form.email)return;await api.customers.create(form);setForm({name:'',email:'',value:''});setModal(false);await load();notify(t.customerCreatedApi)}
  async function remove(id){await api.customers.remove(id);await load();notify(t.customerRemoved)}
  const list=customers.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())||c.email.toLowerCase().includes(q.toLowerCase()))
  return <><Title eyebrow={t.crm} title={t.customers} text={t.customersText}><button className="primary" onClick={()=>setModal(true)}><UserPlus size={16}/> {t.addCustomer}</button></Title>{loading?<Loading text={t.loadingData}/>:<div className="panel table-panel"><div className="table-toolbar"><div className="search"><Search size={15}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder={t.searchCustomer}/></div><span className="api-chip">GET /customers</span><button className="outline" onClick={()=>notify(t.exportReady)}><Download size={14}/> {t.export}</button></div><div className="table-wrap"><table><thead><tr><th>{t.customers.toUpperCase()}</th><th>{t.totalValue}</th><th>{t.status}</th><th>{t.latestActivity}</th><th>{t.action}</th></tr></thead><tbody>{list.map(c=><tr key={c.id}><td><div className="customer"><span>{c.name[0]}</span><div><b>{c.name}</b><small>{c.email}</small></div></div></td><td><b>{money(c.value,locale)}</b></td><td><span className="status green">{pick(c.status,locale,translations.status)}</span></td><td>{pick(c.activity,locale,translations.activity)}</td><td><button className="ghost-icon danger" onClick={()=>remove(c.id)}><Trash2 size={14}/></button></td></tr>)}</tbody></table></div></div>}{modal&&<Modal title={t.newCustomer} onClose={()=>setModal(false)}><label>{t.name}<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder={t.fullName}/></label><label>{t.email}<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="email@company.com"/></label><label>{t.totalAmount}<input value={form.value} onChange={e=>setForm({...form,value:e.target.value})} type="number" placeholder="0"/></label><button className="primary full" onClick={create}>{t.saveViaApi}</button></Modal>}</>
}

function Integrations({notify,locale,t}){
  const [loading,setLoading]=useState(true),[items,setItems]=useState([])
  async function load(){setLoading(true);try{const r=await api.integrations.list();setItems(r.data)}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  async function toggle(id){await api.integrations.toggle(id);await load();notify(t.integrationUpdated)}
  return <><Title eyebrow={t.connections} title={t.integrations} text={t.integrationsText}><button className="outline" onClick={()=>notify(t.integrationsCatalogOpened)}><Plus size={15}/> {t.browse}</button></Title>{loading?<Loading text={t.loadingData}/>:<div className="integration-grid">{items.map(x=><div className="integration-card" key={x.id}><div className="integration-logo">{x.logo}</div><div><h2>{x.name}</h2><p>{pick(x.description,locale,translations.integrationDesc)}</p><span className={x.connected?'connected':''}>● {x.connected?t.connected:t.notConnected}</span></div><button className={x.connected?'connected-btn':'primary'} onClick={()=>toggle(x.id)}><Power size={13}/>{x.connected?t.disconnect:t.connect}</button></div>)}</div>}</>
}

function Alerts({notify,locale,t}){
  const [loading,setLoading]=useState(true),[alerts,setAlerts]=useState([]),[modal,setModal]=useState(false),[form,setForm]=useState({title:'',description:'',priority:'Media'})
  async function load(){setLoading(true);try{const r=await api.alerts.list();setAlerts(r.data)}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  async function create(){if(!form.title||!form.description)return;await api.alerts.create(form);setForm({title:'',description:'',priority:'Media'});setModal(false);await load();notify(t.alertCreatedApi)}
  async function toggle(a){await api.alerts.update(a.id,{active:!a.active});await load();notify(t.alertStatusUpdated)}
  async function remove(id){await api.alerts.remove(id);await load();notify(t.alertRemoved)}
  return <><Title eyebrow={t.monitoring} title={t.alerts} text={t.alertsText}><button className="primary" onClick={()=>setModal(true)}><Plus size={16}/> {t.newAlert}</button></Title>{loading?<Loading text={t.loadingData}/>:<div className="alert-grid">{alerts.map((a,i)=><div className="alert-card" key={a.id}><div className="alert-title"><span className={'alert-dot a'+(i%3)}/><div><h2>{a.title}</h2><p>{a.description}</p></div><button className="ghost-icon danger" onClick={()=>remove(a.id)}><Trash2 size={15}/></button></div><div className="alert-foot"><span className={a.active?'status green':'status off'}>{a.active?t.active:t.paused}</span><small>{t.priority} {pick(a.priority,locale,translations.priority)}</small><button className={'switch '+(a.active?'on':'')} onClick={()=>toggle(a)}><i/></button></div></div>)}</div>}{modal&&<Modal title={t.newAlert} onClose={()=>setModal(false)}><label>{t.title}<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder={locale==='en'?'e.g. Revenue below target':'Ex.: Receita abaixo da meta'}/></label><label>{t.condition}<input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder={locale==='en'?'e.g. Daily revenue below R$ 8,000':'Ex.: Receita diaria abaixo de R$ 8.000'}/></label><label>{t.priority}<select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>{t.high}</option><option>{t.medium}</option><option>{t.low}</option></select></label><button className="primary full" onClick={create}>{t.createViaApi}</button></Modal>}</>
}

function SettingsPage({dark,setDark,notify,t}){
  function reset(){resetDb();notify(t.demoDataRestored)}
  return <><Title eyebrow={t.preferences.toUpperCase()} title={t.settingsTitle} text={t.settingsText}/><div className="settings-grid"><div className="panel settings-nav"><b>Workspace</b><span className="active">{t.general}</span><span>{t.team}</span><span>{t.billing}</span><span>{t.security}</span><b>{t.preferences}</b><span>{t.notifications}</span><span>{t.integrations}</span></div><div className="panel settings-content"><h2>{t.generalPrefs}</h2><p>{t.appStatePersisted}</p><div className="setting-row"><span><b>{t.darkTheme}</b><small>{t.darkThemeText}</small></span><button className={'switch '+(dark?'on':'')} onClick={()=>setDark(!dark)}><i/></button></div><div className="setting-row"><span><b>{t.realTimeUpdate}</b><small>{t.realTimeUpdateText}</small></span><span className="switch on"><i/></span></div><div className="setting-row"><span><b>{t.emailAlerts}</b><small>{t.emailAlertsText}</small></span><span className="switch on"><i/></span></div><div className="security-row"><ShieldCheck/><div><b>{t.secureEnv}</b><small>{t.secureEnvText}</small></div><span>{t.active}</span></div><div className="danger-zone"><b>{t.demoData}</b><p>{t.demoDataText}</p><button className="danger-btn" onClick={reset}>{t.restoreData}</button></div></div></div></>
}

function App(){
  const [locale,setLocale]=useState(localStorage.getItem(LOCALE_KEY)==='pt-BR'?'pt-BR':'en')
  const t=copy[locale]
  const [user,setUser]=useState(()=>{
    try{return JSON.parse(localStorage.getItem('mf-session')||'null')?.user||null}catch{return null}
  })
  useEffect(()=>{localStorage.setItem(LOCALE_KEY,locale)},[locale])
  return user?<Layout user={user} setUser={setUser} locale={locale} setLocale={setLocale} t={t}/>:<Login onLogin={setUser} locale={locale} setLocale={setLocale} t={t}/>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
)
