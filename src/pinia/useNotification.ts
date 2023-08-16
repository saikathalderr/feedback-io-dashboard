import { defineStore } from "pinia"
import { notification } from 'ant-design-vue';

const storeKey = 'notification'

export const useNotificationStore = defineStore(storeKey, {
    state: () => ({}),
    actions: {
        showError(message: string): void {
            notification.error({
                message,
              });
        },
        showSuccess(message: string): void {
            notification.success({
                message,
              });
        },
    },
})