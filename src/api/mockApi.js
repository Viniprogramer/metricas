import { loadDb, saveDb } from './mockDb'

const delay = (ms=450) => new Promise(resolve => setTimeout(resolve, ms))

function ok(data) {
  return { ok:true, data }
}

function fail(message, status=400) {
  const error = new Error(message)
  error.status = status
  throw error
}

export async function apiRequest(method, endpoint, body=null) {
  await delay()

  const db = loadDb()
  const [resource, id] = endpoint.replace(/^\//,'').split('/')

  if (method === 'POST' && endpoint === '/auth/login') {
    const user = db.users.find(
      u => u.email.toLowerCase() === body.email.toLowerCase() && u.password === body.password
    )
    if (!user) fail('E-mail ou senha inválidos.', 401)

    return ok({
      token: 'mock_jwt_metricforge_demo',
      user: { id:user.id, name:user.name, email:user.email, role:user.role }
    })
  }

  if (method === 'GET' && endpoint === '/dashboard') {
    return ok({
      metrics: db.metrics,
      events: db.events.slice(0,5),
      generatedAt: new Date().toISOString()
    })
  }

  if (method === 'GET' && resource === 'customers') {
    return ok(db.customers)
  }

  if (method === 'POST' && resource === 'customers') {
    if (!body?.name || !body?.email) fail('Nome e e-mail são obrigatórios.')
    const customer = {
      id: `cus_${Date.now()}`,
      name: body.name,
      email: body.email,
      value: Number(body.value || 0),
      status: 'Ativo',
      activity: 'Agora'
    }
    db.customers.unshift(customer)
    db.events.unshift({
      id:`evt_${Date.now()}`,
      time:'Agora',
      title:'Novo cliente criado',
      detail:customer.email,
      type:'success'
    })
    saveDb(db)
    return ok(customer)
  }

  if (method === 'PUT' && resource === 'customers' && id) {
    const customer = db.customers.find(c => c.id === id)
    if (!customer) fail('Cliente não encontrado.',404)
    Object.assign(customer, body)
    customer.activity = 'Agora'
    saveDb(db)
    return ok(customer)
  }

  if (method === 'DELETE' && resource === 'customers' && id) {
    const before = db.customers.length
    db.customers = db.customers.filter(c => c.id !== id)
    if (db.customers.length === before) fail('Cliente não encontrado.',404)
    saveDb(db)
    return ok({ id })
  }

  if (method === 'GET' && resource === 'reports') {
    return ok(db.reports)
  }

  if (method === 'POST' && resource === 'reports') {
    const report = {
      id:`rep_${Date.now()}`,
      name:body?.name || 'Novo relatório',
      updated:'Agora'
    }
    db.reports.unshift(report)
    saveDb(db)
    return ok(report)
  }

  if (method === 'DELETE' && resource === 'reports' && id) {
    db.reports = db.reports.filter(r => r.id !== id)
    saveDb(db)
    return ok({id})
  }

  if (method === 'GET' && resource === 'alerts') {
    return ok(db.alerts)
  }

  if (method === 'POST' && resource === 'alerts') {
    const alert = {
      id:`alt_${Date.now()}`,
      title:body.title,
      description:body.description,
      priority:body.priority || 'Média',
      active:true
    }
    db.alerts.unshift(alert)
    saveDb(db)
    return ok(alert)
  }

  if (method === 'PATCH' && resource === 'alerts' && id) {
    const alert = db.alerts.find(a => a.id === id)
    if (!alert) fail('Alerta não encontrado.',404)
    Object.assign(alert, body)
    saveDb(db)
    return ok(alert)
  }

  if (method === 'DELETE' && resource === 'alerts' && id) {
    db.alerts = db.alerts.filter(a => a.id !== id)
    saveDb(db)
    return ok({id})
  }

  if (method === 'GET' && resource === 'integrations') {
    return ok(db.integrations)
  }

  if (method === 'PATCH' && resource === 'integrations' && id) {
    const integration = db.integrations.find(i => i.id === id)
    if (!integration) fail('Integração não encontrada.',404)
    integration.connected = !integration.connected
    saveDb(db)
    return ok(integration)
  }

  fail('Endpoint não encontrado.',404)
}
