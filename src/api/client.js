import { apiRequest } from './mockApi'

export const api = {
  login: credentials => apiRequest('POST','/auth/login',credentials),
  dashboard: () => apiRequest('GET','/dashboard'),
  customers: {
    list: () => apiRequest('GET','/customers'),
    create: data => apiRequest('POST','/customers',data),
    update: (id,data) => apiRequest('PUT',`/customers/${id}`,data),
    remove: id => apiRequest('DELETE',`/customers/${id}`)
  },
  reports: {
    list: () => apiRequest('GET','/reports'),
    create: data => apiRequest('POST','/reports',data),
    remove: id => apiRequest('DELETE',`/reports/${id}`)
  },
  alerts: {
    list: () => apiRequest('GET','/alerts'),
    create: data => apiRequest('POST','/alerts',data),
    update: (id,data) => apiRequest('PATCH',`/alerts/${id}`,data),
    remove: id => apiRequest('DELETE',`/alerts/${id}`)
  },
  integrations: {
    list: () => apiRequest('GET','/integrations'),
    toggle: id => apiRequest('PATCH',`/integrations/${id}`)
  }
}
