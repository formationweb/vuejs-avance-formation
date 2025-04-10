<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th v-for="column in columns" :key="column.key">
                        {{  column.label }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in items">
                    <td v-for="column in columns" :key="column.key">
                        <slot :name="column.key" :item="item" :index="index">
                            {{ item[column.key] }}
                        </slot>
                    </td>
                </tr>
            </tbody>
            <tfoot v-if="slots.footer">
                <tr>
                    <td>
                        <slot name="footer" :item="{}" :index="0"></slot>
                    </td>
                </tr>
            </tfoot>
        </table>
        <div v-if="items.length == 0">
            <slot name="empty" :columns="columns">
                Pas de données
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">

type Column = { key: string, label: string }

defineProps<{
    columns: Column[],
    items: any[]
}>()

type SlotProps = {
    empty: (props: { columns: Column[] }) => void
    footer: (props: { item: any; index: number }) => void
 }

const slots = defineSlots<SlotProps & {
    [key: string]: (props: { item: any; index: number }) => void
}>()
</script>