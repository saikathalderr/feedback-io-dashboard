export const _apiUrl = import.meta.env.VITE_BACKEND_URL as string

// Auth API URL paths
export const _apiLoginUrl = `${_apiUrl}/dashboard/tenant/users/login`

// apiKey API URL paths
export const _apiGetTenantApiKeysUrl = `${_apiUrl}/dashboard/tenant/api-key/list`
export const _apiGetTenantDecryptedApiKeyUrl = `${_apiUrl}/dashboard/tenant/api-key/{{apiKey}}/decrypted`
export const _apiCreateTenantApiKeyUrl = `${_apiUrl}/dashboard/tenant/api-key/create`
export const _apiUpdateTenantApiKeyUrl = `${_apiUrl}/dashboard/tenant/api-key/{{apiKey}}/update`
export const _apiDeleteTenantApiKeyUrl = `${_apiUrl}/dashboard/tenant/api-key/{{apiKey}}/delete`