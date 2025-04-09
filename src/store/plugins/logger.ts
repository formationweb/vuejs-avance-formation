import type { PiniaPluginContext } from "pinia";

export function piniaLogger(options = { max: 10 }) {
    return ({ store }: PiniaPluginContext) => {
        //console.log(store.$id) --> l'id du store

        const history: {
            type: string
            storeId: string
            timestamp: Date
        }[] = []

        store.$subscribe((mutation, state) => {
            history.push({
                type: mutation.type,
                storeId: mutation.storeId,
                timestamp: new Date()
            })

            if (history.length > options.max) {
                history.shift()
            }

            console.log(`[🍍 ${mutation.storeId}]: ${mutation.type}`, {
                state
            })
        })

        store.$onAction(({ name, args, store, after, onError }) => {
            const startTime = Date.now()
            console.log(`[🍍 ${store.$id}]: ${name} action started`, args)

            after((result) => {
                console.log(`[🍍 ${store.$id}]: ${name} completed in ${Date.now() - startTime}ms`, result)
            })

            onError((error) => {
                console.log(`[🍍 ${store.$id}]: ${name} failed`, error)
            })
        })

        return {
            $history: history,
            $clearHistory() {
                history.length = 0
                console.log(`[🍍 ${store.$id}]: History cleared`)
            }
        }
    }
}