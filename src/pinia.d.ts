import 'pinia'

declare module 'pinia' {
    export interface PiniaCustomProperties {
        $history: {
            type: string
            storeId: string
            timestamp: Date
        }[]
        $clearHistory: () => void
    }
}