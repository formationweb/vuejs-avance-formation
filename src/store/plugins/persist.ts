import type { PiniaPluginContext } from "pinia";

interface PersistOptions {
    prefix?: string
    include?: string[]
    storage?: Storage
}

export function piniaPersist(options: PersistOptions = {}) {
    return ({ store }: PiniaPluginContext) => {
        const {
            include,
            prefix = 'pinia-',
            storage = localStorage
        } = options
        const storeId = store.$id

        if (include && !include.includes(storeId)) {
            return {}
        }

        const storageKey = `${prefix}${storeId}`
        const persistedState = storage.getItem(storageKey)
        if (persistedState) {
            store.$patch(JSON.parse(persistedState))
        }

        store.$subscribe((_, state) => {
            try {
                storage.setItem(storageKey, JSON.stringify(state))
            }
            catch (err) {
                console.log(err)
            }
        })

        return {
            $persistOptions: {
                enabled: true,
                storageKey
            },
            $clearPersistedState() {
                storage.removeItem(storageKey)
            }
        }
    }
}