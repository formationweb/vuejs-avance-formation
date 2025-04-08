import { describe, expect, test } from 'vitest'
import { ref } from 'vue'
import { useExtensionFilter } from '../useExtensionFilter'
import { User } from '../../types/user'

describe('useExtensionFilter', () => {
    test('Filtre des utilisateurs', () => {
        const users = ref<User[]>([
            {
                id: 1,
                name: 'ana',
                email: 'ana@gmail.com'
            },
            {
                id: 2,
                name: 'ana',
                email: 'ana@gmail.biz'
            }
        ])
        const { usersFiltered, extSelected } = useExtensionFilter(users)
        extSelected.value = 'biz'
        expect(usersFiltered.value).toHaveLength(1)
        expect(usersFiltered.value[0]).toHaveProperty('id', 2)
    })
})