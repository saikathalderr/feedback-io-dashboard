export const setAuthorizationHeaders = (token: string) => {
    return {
        'x-access-token': token
    }
}