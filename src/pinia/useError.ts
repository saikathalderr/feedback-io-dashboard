import { AxiosError } from "axios"
import { defineStore } from "pinia"
import { useNotificationStore } from "./useNotification"

const storeKey = 'error'

type TErrorData = {
    code: string
    expected: string
    received: string
    path: string[]
    message: string
}
type TAxiosError = AxiosError<{ error: string | TErrorData[] }>

export const useErrorStore = defineStore(storeKey, {
    state: () => ({}),
    actions: {
        handleAxiosError(error: AxiosError): void {
            const { showError } = useNotificationStore()
            const errorObj = error as TAxiosError
            const errorData = errorObj.response?.data?.error
            console.log(errorData);
            
            if (Array.isArray(errorData)) {
                errorData.forEach((err) => showError(err.message))
            }
            else if (typeof errorData === 'string') {
                showError(errorData)
            }
        },
    },
})