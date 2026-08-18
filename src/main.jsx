import React,{useEffect,useState} from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter,NavLink,Route,Routes,useLocation} from 'react-router-dom'
import {AreaChart,Area,BarChart,Bar,XAxis,YAxis,CartesianGrid,Tooltip,ResponsiveContainer} from 'recharts'
import {Activity,ArrowUpRight,ArrowDownRight,Bell,Check,ChevronDown,ChevronRight,CircleDollarSign,Cloud,Download,Eye,FileText,Filter,Globe2,LayoutDashboard,LogOut,Menu,MoreHorizontal,Plus,RefreshCw,Search,Settings,ShieldCheck,SlidersHorizontal,TrendingUp,UserPlus,Users,Wallet,Zap,Trash2,Power} from 'lucide-react'
import './styles.css'
import {api} from './api/client'
import {resetDb} from './api/mockDb'
import {Loading,ErrorState,Toast,Modal} from './components/UI'

const fmt=n=>new Intl.NumberFormat('pt-BR').format(n)
const money=n=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(n)

function Brand(){return <div className="brand"><span className="brand-mark"><Activity size={17}/></span><span>METRIC<span>FORGE</span></span></div>}

function Login({onLogin}) {
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
    }catch(err){setError(err.message)}finally{setLoading(false)}
  }

  return <div className="login-screen">
    <div className="login-visual"><div className="login-copy"><Brand/><h1>Decisões melhores começam com <em>dados melhores.</em></h1><p>Uma plataforma analítica para transformar dados em clareza, velocidade e crescimento.</p><div className="login-stats"><span><b>+18,4%</b><small>receita mensal</small></span><span><b>4,82%</b><small>conversão média</small></span><span><b>99,9%</b><small>uptime</small></span></div></div></div>
    <div className="login-form"><form className="login-form-inner" onSubmit={submit}><div className="mobile-brand"><Brand/></div><span className="eyebrow"><i/> API DEMO · AUTH</span><h2>Entrar no workspace</h2><p>Autenticação simulada com endpoint REST.</p><label>E-mail<input value={email} onChange={e=>setEmail(e.target.value)} type="email"/></label><label>Senha<input value={password} onChange={e=>setPassword(e.target.value)} type="password"/></label>{error&&<div className="form-error">{error}</div>}<button className="primary login-submit" disabled={loading}>{loading?<><RefreshCw className="spin" size={15}/> Autenticando...</>:<>Entrar no dashboard <ChevronRight size={16}/></>}</button><div className="demo-login"><Zap size={14}/><span><b>Credenciais demo</b><small>admin@metricforge.com · 123456</small></span></div><small className="copyright">© 2026 MetricForge · Projeto demonstrativo de portfólio</small></form></div>
  </div>
}

function Layout({user,setUser}){
  const [side,setSide]=useState(false),[dark,setDark]=useState(localStorage.getItem('mf-theme')!=='light'),[toast,setToast]=useState(''),loc=useLocation()
  useEffect(()=>{document.body.dataset.theme=dark?'dark':'light';localStorage.setItem('mf-theme',dark?'dark':'light')},[dark])
  const notify=x=>{setToast(x);setTimeout(()=>setToast(''),2200)}
  function logout(){localStorage.removeItem('mf-session');setUser(null)}
  return <div className="app">
    <aside className={'sidebar '+(side?'show':'')}><Brand/><div className="workspace"><div className="workspace-icon">A</div><div><b>Acme Analytics</b><small>Pro workspace · Mock API</small></div><ChevronDown size={14}/></div>
      <nav><p>VISÃO GERAL</p><NavLink to="/"><LayoutDashboard/>Dashboard</NavLink><NavLink to="/metricas"><TrendingUp/>Métricas</NavLink><NavLink to="/relatorios"><FileText/>Relatórios</NavLink><p>GESTÃO</p><NavLink to="/clientes"><Users/>Clientes</NavLink><NavLink to="/integracoes"><Cloud/>Integrações</NavLink><NavLink to="/alertas"><Bell/>Alertas</NavLink><p>CONFIGURAÇÕES</p><NavLink to="/configuracoes"><Settings/>Configurações</NavLink></nav>
      <div className="sidebar-bottom"><div className="plan"><b>Plano Pro</b><small>8.420 / 10.000 eventos</small><div className="progress"><i/></div></div><button onClick={logout}><LogOut size={15}/> Sair</button></div>
    </aside>
    <div className="mobile-top"><button onClick={()=>setSide(!side)}><Menu/></button><span>METRIC<span>FORGE</span></span><button onClick={()=>notify('Nenhuma nova notificação')}><Bell size={19}/></button></div>
    <div className="main"><header><div className="header-left"><button className="icon-btn menu-desktop" onClick={()=>setSide(!side)}><Menu size={19}/></button><div><span className="crumb">WORKSPACE /</span><b>{loc.pathname==='/'?'Dashboard':loc.pathname.slice(1)}</b></div></div><div className="header-right"><div className="date-select"><span>Período</span><select><option>Últimos 30 dias</option><option>Últimos 7 dias</option><option>Hoje</option></select></div><button className="icon-btn" onClick={()=>notify('Dados atualizados agora')}><RefreshCw size={17}/></button><button className="icon-btn notification" onClick={()=>notify('Você tem alertas pendentes')}><Bell size={17}/><i/></button><div className="user-mini"><div>{user.name[0].toUpperCase()}</div><span>{user.name}<small>{user.role}</small></span></div></div></header>
      <main className="content"><Routes><Route path="/" element={<Dashboard notify={notify}/>} /><Route path="/metricas" element={<Metrics notify={notify}/>} /><Route path="/relatorios" element={<Reports notify={notify}/>} /><Route path="/clientes" element={<Customers notify={notify}/>} /><Route path="/integracoes" element={<Integrations notify={notify}/>} /><Route path="/alertas" element={<Alerts notify={notify}/>} /><Route path="/configuracoes" element={<SettingsPage dark={dark} setDark={setDark} notify={notify}/>} /></Routes></main>
    </div><Toast message={toast} onClose={()=>setToast('')}/></div>
}

function Title({eyebrow,title,text,children}){return <div className="page-title"><div><span className="eyebrow"><i/> {eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{children}</div>}

function Dashboard({notify}){
  const [state,setState]=useState({loading:true,error:'',data:null})
  async function load(){setState({loading:true,error:'',data:null});try{const r=await api.dashboard();setState({loading:false,error:'',data:r.data})}catch(e){setState({loading:false,error:e.message,data:null})}}
  useEffect(()=>{load()},[])
  if(state.loading)return <><Title eyebrow="VISÃO GERAL" title="Dashboard" text="Acompanhe o desempenho do seu negócio em tempo real."/><Loading/></>
  if(state.error)return <><Title eyebrow="VISÃO GERAL" title="Dashboard" text="Acompanhe o desempenho do seu negócio em tempo real."/><ErrorState message={state.error} onRetry={load}/></>
  const {metrics,events}=state.data
  const revenue=metrics.revenue.map(([month,value])=>({month,value}))
  const traffic=metrics.traffic.map(([day,value])=>({day,value}))
  const cards=metrics.cards
  return <>
    <Title eyebrow="VISÃO GERAL" title="Dashboard" text="Dados carregados através da Mock REST API."><div className="title-actions"><button className="outline" onClick={()=>notify('Exportação preparada')}><Download size={15}/> Exportar</button><button className="primary" onClick={()=>notify('Relatório criado')}><Plus size={16}/> Novo relatório</button></div></Title>
    <div className="live-bar"><span><i/> API conectada</span><span>Última atualização: agora</span><button onClick={load}>Sincronizar <RefreshCw size={12}/></button></div>
    <div className="metric-grid">{cards.map((m,i)=>{const Icon=[CircleDollarSign,Users,TrendingUp,Wallet][i];return <div className="metric-card" key={m.label}><div className="metric-top"><span><Icon size={18}/></span><MoreHorizontal size={16}/></div><small>{m.label}</small><strong>{m.value}</strong><div className={m.type}>{m.type==='up'?<ArrowUpRight size={13}/>:<ArrowDownRight size={13}/>} {m.change}<em>vs. período anterior</em></div></div>})}</div>
    <div className="grid-2"><div className="panel chart-panel"><div className="panel-head"><div><h2>Receita</h2><p>Dados retornados pelo endpoint /dashboard</p></div><div className="api-chip">GET /dashboard</div></div><div className="chart"><ResponsiveContainer width="100%" height="100%"><AreaChart data={revenue}><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#756cff" stopOpacity=".3"/><stop offset="100%" stopColor="#756cff" stopOpacity="0"/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="month" stroke="var(--muted)" fontSize={11} tickLine={false} axisLine={false}/><YAxis stroke="var(--muted)" fontSize={11} tickLine={false} axisLine={false} tickFormatter={v=>`R$${Math.round(v/1000)}k`}/><Tooltip contentStyle={{background:'var(--tooltip)',border:'1px solid var(--border)',borderRadius:8,color:'var(--text)'}} formatter={v=>[`R$ ${fmt(v)}`,'Receita']}/><Area type="monotone" dataKey="value" stroke="#8078ff" strokeWidth={2.5} fill="url(#g)"/></AreaChart></ResponsiveContainer></div><div className="chart-foot"><span>● Receita atual</span><b>+18,4% ↗</b></div></div>
      <div className="panel"><div className="panel-head"><div><h2>Origem do tráfego</h2><p>Distribuição de sessões</p></div><span className="api-chip">REST</span></div><div className="source-chart"><div className="donut"><div><strong>18.2k</strong><small>sessões</small></div></div><div className="source-list">{metrics.sources.map((s,i)=><div key={s[0]}><span><i className={'source-dot s'+i}/>{s[0]}</span><b>{s[1]}%</b></div>)}</div></div><div className="panel-note"><Globe2 size={15}/> Orgânico cresceu <b>6,2%</b> no período.</div></div>
    </div>
    <div className="grid-2"><div className="panel"><div className="panel-head"><div><h2>Atividade recente</h2><p>Eventos retornados pela API</p></div><button className="text-btn" onClick={()=>notify('Eventos carregados')}>Ver todos <ChevronRight size={13}/></button></div><div className="activity-list">{events.map(e=><div className="activity" key={e.id}><span className={'activity-icon '+e.type}>{e.type==='success'?<Check size={14}/>:e.type==='warning'?<Zap size={14}/>:<Users size={14}/>}</span><div><b>{e.title}</b><small>{e.detail}</small></div><time>{e.time}</time></div>)}</div></div>
      <div className="panel"><div className="panel-head"><div><h2>Usuários ativos</h2><p>Últimos 7 dias</p></div><span className="live-tag">LIVE</span></div><div className="mini-chart"><ResponsiveContainer width="100%" height="100%"><BarChart data={traffic}><XAxis dataKey="day" hide/><YAxis hide/><Bar dataKey="value" fill="#6c63ff" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div><div className="active-total"><strong>18.294</strong><span>↗ 12,8% <small>vs. período anterior</small></span></div></div></div>
  </>
}

function Metrics({notify}){
  const [loading,setLoading]=useState(true),[data,setData]=useState(null)
  async function load(){setLoading(true);const r=await api.dashboard();setData(r.data.metrics);setLoading(false)}
  useEffect(()=>{load()},[])
  if(loading)return <><Title eyebrow="EXPLORADOR" title="Métricas" text="Explore indicadores e tendências com filtros personalizados."/><Loading/></>
  return <><Title eyebrow="EXPLORADOR" title="Métricas" text="Explore indicadores e tendências com filtros personalizados."><button className="outline" onClick={()=>notify('Dashboard personalizado salvo')}><SlidersHorizontal size={15}/> Personalizar</button></Title><div className="metric-selector">{[['Receita','R$ 248k'],['Usuários','18,2k'],['Conversão','4,82%'],['Sessões','42,8k'],['Pedidos','1.332'],['CAC','R$ 42,10']].map(x=><button key={x[0]}><span>{x[0]}</span><b>{x[1]}</b></button>)}</div><div className="panel large-chart"><div className="panel-head"><div><h2>Receita</h2><p>GET /dashboard · últimos 30 dias</p></div><span className="api-chip">200 OK</span></div><ResponsiveContainer width="100%" height={390}><AreaChart data={data.revenue.map(([m,v])=>({m,v}))}><CartesianGrid strokeDasharray="3 3" stroke="var(--grid)"/><XAxis dataKey="m" stroke="var(--muted)" tickLine={false} axisLine={false}/><YAxis stroke="var(--muted)" tickLine={false} axisLine={false}/><Tooltip contentStyle={{background:'var(--tooltip)',border:'1px solid var(--border)',borderRadius:8}}/><Area type="monotone" dataKey="v" stroke="#7c73ff" fill="#756cff22" strokeWidth={3}/></AreaChart></ResponsiveContainer></div><div className="two-small"><div className="panel"><h2>Principais insights</h2>{['Receita acelerou 18,4% no período.','Conversão atingiu o maior nível dos últimos 90 dias.','Tráfego orgânico representa 38% das sessões.','Ticket médio caiu 2,1% e merece atenção.'].map(x=><div className="insight" key={x}>✦ {x}<ChevronRight size={13}/></div>)}</div><div className="panel"><h2>Metas do mês</h2>{[['Receita',82],['Novos usuários',73],['Conversão',80]].map(x=><div className="goal" key={x[0]}><div><span>{x[0]}</span><b>{x[1]}%</b></div><div className="goal-bar"><i style={{width:x[1]+'%'}}/></div></div>)}</div></div></>
}

function Reports({notify}){
  const [loading,setLoading]=useState(true),[reports,setReports]=useState([]),[modal,setModal]=useState(false),[name,setName]=useState('')
  async function load(){setLoading(true);try{const r=await api.reports.list();setReports(r.data)}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  async function create(){if(!name.trim())return;await api.reports.create({name});setName('');setModal(false);await load();notify('Relatório criado pela API')}
  async function remove(id){await api.reports.remove(id);await load();notify('Relatório excluído')}
  return <><Title eyebrow="CENTRAL DE DADOS" title="Relatórios" text="Crie, exporte e compartilhe análises com sua equipe."><button className="primary" onClick={()=>setModal(true)}><Plus size={16}/> Criar relatório</button></Title>{loading?<Loading/>:<div className="report-grid">{reports.map(r=><div className="report-card" key={r.id}><div className="report-icon"><FileText/></div><div><h2>{r.name}</h2><p>Dashboard completo</p><small>{r.updated}</small></div><button className="ghost-icon" onClick={()=>remove(r.id)}><Trash2 size={15}/></button><div className="report-actions"><button onClick={()=>notify('Relatório exportado')}><Download size={14}/> Exportar</button><button onClick={()=>notify('Relatório aberto')}><Eye size={14}/> Visualizar</button></div></div>)}</div>}{modal&&<Modal title="Criar relatório" onClose={()=>setModal(false)}><label>Nome do relatório<input autoFocus value={name} onChange={e=>setName(e.target.value)} placeholder="Ex.: Performance semanal"/></label><button className="primary full" onClick={create}>Criar via API</button></Modal>}</>
}

function Customers({notify}){
  const [loading,setLoading]=useState(true),[customers,setCustomers]=useState([]),[q,setQ]=useState(''),[modal,setModal]=useState(false),[form,setForm]=useState({name:'',email:'',value:''})
  async function load(){setLoading(true);try{const r=await api.customers.list();setCustomers(r.data)}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  async function create(){if(!form.name||!form.email)return;await api.customers.create(form);setForm({name:'',email:'',value:''});setModal(false);await load();notify('Cliente criado pela API')}
  async function remove(id){await api.customers.remove(id);await load();notify('Cliente removido')}
  const list=customers.filter(c=>c.name.toLowerCase().includes(q.toLowerCase())||c.email.toLowerCase().includes(q.toLowerCase()))
  return <><Title eyebrow="CRM" title="Clientes" text="CRUD completo conectado à Mock REST API."><button className="primary" onClick={()=>setModal(true)}><UserPlus size={16}/> Adicionar cliente</button></Title>{loading?<Loading/>:<div className="panel table-panel"><div className="table-toolbar"><div className="search"><Search size={15}/><input value={q} onChange={e=>setQ(e.target.value)} placeholder="Buscar cliente..."/></div><span className="api-chip">GET /customers</span><button className="outline" onClick={()=>notify('Exportação preparada')}><Download size={14}/> Exportar</button></div><div className="table-wrap"><table><thead><tr><th>CLIENTE</th><th>VALOR TOTAL</th><th>STATUS</th><th>ÚLTIMA ATIVIDADE</th><th>AÇÃO</th></tr></thead><tbody>{list.map(c=><tr key={c.id}><td><div className="customer"><span>{c.name[0]}</span><div><b>{c.name}</b><small>{c.email}</small></div></div></td><td><b>{money(c.value)}</b></td><td><span className="status green">{c.status}</span></td><td>{c.activity}</td><td><button className="ghost-icon danger" onClick={()=>remove(c.id)}><Trash2 size={14}/></button></td></tr>)}</tbody></table></div></div>}{modal&&<Modal title="Novo cliente" onClose={()=>setModal(false)}><label>Nome<input value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="Nome completo"/></label><label>E-mail<input value={form.email} onChange={e=>setForm({...form,email:e.target.value})} placeholder="email@empresa.com"/></label><label>Valor total<input value={form.value} onChange={e=>setForm({...form,value:e.target.value})} type="number" placeholder="0"/></label><button className="primary full" onClick={create}>Salvar via API</button></Modal>}</>
}

function Integrations({notify}){
  const [loading,setLoading]=useState(true),[items,setItems]=useState([])
  async function load(){setLoading(true);try{const r=await api.integrations.list();setItems(r.data)}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  async function toggle(id){await api.integrations.toggle(id);await load();notify('Integração atualizada pela API')}
  return <><Title eyebrow="CONEXÕES" title="Integrações" text="Conecte suas principais ferramentas em poucos cliques."><button className="outline" onClick={()=>notify('Catálogo de integrações aberto')}><Plus size={15}/> Explorar</button></Title>{loading?<Loading/>:<div className="integration-grid">{items.map(x=><div className="integration-card" key={x.id}><div className="integration-logo">{x.logo}</div><div><h2>{x.name}</h2><p>{x.description}</p><span className={x.connected?'connected':''}>● {x.connected?'Conectado':'Não conectado'}</span></div><button className={x.connected?'connected-btn':'primary'} onClick={()=>toggle(x.id)}><Power size={13}/>{x.connected?'Desconectar':'Conectar'}</button></div>)}</div>}</>
}

function Alerts({notify}){
  const [loading,setLoading]=useState(true),[alerts,setAlerts]=useState([]),[modal,setModal]=useState(false),[form,setForm]=useState({title:'',description:'',priority:'Média'})
  async function load(){setLoading(true);try{const r=await api.alerts.list();setAlerts(r.data)}finally{setLoading(false)}}
  useEffect(()=>{load()},[])
  async function create(){if(!form.title||!form.description)return;await api.alerts.create(form);setForm({title:'',description:'',priority:'Média'});setModal(false);await load();notify('Alerta criado pela API')}
  async function toggle(a){await api.alerts.update(a.id,{active:!a.active});await load();notify('Status do alerta atualizado')}
  async function remove(id){await api.alerts.remove(id);await load();notify('Alerta removido')}
  return <><Title eyebrow="MONITORAMENTO" title="Alertas" text="Regras persistidas na Mock REST API."><button className="primary" onClick={()=>setModal(true)}><Plus size={16}/> Novo alerta</button></Title>{loading?<Loading/>:<div className="alert-grid">{alerts.map((a,i)=><div className="alert-card" key={a.id}><div className="alert-title"><span className={'alert-dot a'+(i%3)}/><div><h2>{a.title}</h2><p>{a.description}</p></div><button className="ghost-icon danger" onClick={()=>remove(a.id)}><Trash2 size={15}/></button></div><div className="alert-foot"><span className={a.active?'status green':'status off'}>{a.active?'Ativo':'Pausado'}</span><small>Prioridade {a.priority}</small><button className={'switch '+(a.active?'on':'')} onClick={()=>toggle(a)}><i/></button></div></div>)}</div>}{modal&&<Modal title="Novo alerta" onClose={()=>setModal(false)}><label>Título<input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="Ex.: Receita abaixo da meta"/></label><label>Condição<input value={form.description} onChange={e=>setForm({...form,description:e.target.value})} placeholder="Ex.: Receita diária abaixo de R$ 8.000"/></label><label>Prioridade<select value={form.priority} onChange={e=>setForm({...form,priority:e.target.value})}><option>Alta</option><option>Média</option><option>Baixa</option></select></label><button className="primary full" onClick={create}>Criar via API</button></Modal>}</>
}

function SettingsPage({dark,setDark,notify}){
  function reset(){resetDb();notify('Dados demonstrativos restaurados')}
  return <><Title eyebrow="PREFERÊNCIAS" title="Configurações" text="Gerencie sua conta e o ambiente demonstrativo."/><div className="settings-grid"><div className="panel settings-nav"><b>Workspace</b><span className="active">Geral</span><span>Equipe</span><span>Plano e cobrança</span><span>Segurança</span><b>Preferências</b><span>Notificações</span><span>Integrações</span></div><div className="panel settings-content"><h2>Preferências gerais</h2><p>O estado da aplicação é persistido no LocalStorage.</p><div className="setting-row"><span><b>Tema escuro</b><small>Ideal para monitoramento contínuo.</small></span><button className={'switch '+(dark?'on':'')} onClick={()=>setDark(!dark)}><i/></button></div><div className="setting-row"><span><b>Atualização em tempo real</b><small>Sincronização simulada com a API.</small></span><span className="switch on"><i/></span></div><div className="setting-row"><span><b>Alertas por e-mail</b><small>Preferência visual demonstrativa.</small></span><span className="switch on"><i/></span></div><div className="security-row"><ShieldCheck/><div><b>Ambiente seguro</b><small>Autenticação e sessão demonstrativas.</small></div><span>Ativo</span></div><div className="danger-zone"><b>Dados de demonstração</b><p>Apaga alterações locais e restaura os dados iniciais.</p><button className="danger-btn" onClick={reset}>Restaurar dados</button></div></div></div></>
}

function App(){
  const [user,setUser]=useState(()=>{
    try{return JSON.parse(localStorage.getItem('mf-session')||'null')?.user||null}catch{return null}
  })
  return user?<Layout user={user} setUser={setUser}/>:<Login onLogin={setUser}/>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </React.StrictMode>
)
