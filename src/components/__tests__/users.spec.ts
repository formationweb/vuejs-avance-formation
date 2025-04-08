import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import Users from '../Users.vue'
import axios from 'axios'
import { User } from "../../types/user";
import { nextTick } from "vue";
import UserCard from "../UserCard.vue";

vi.mock('axios')

const mockUsers: User[] = [{
    id: 1,
    name: 'ana',
    email: 'ana@gmail.biz'
}]

describe('Users Component', () => {
    let component: VueWrapper

    beforeEach(async () => {
        (axios.get as any).mockResolvedValue({
            data: mockUsers
        })
        component = mount(Users)
        await flushPromises()
    })

    test('Vérifier si UserCard est appliqué en boucle', () => {
        const elements = component.findAllComponents(UserCard)
        expect(elements).toHaveLength(1)
    })

    test('Filtre utilisateurs fonctionnent sur liste déroulante', async () => {
        const select = component.find('select')
        await select.setValue('tv')
        
        const elements = component.findAll('article')
        expect(elements).toHaveLength(0)

        await select.setValue('')

        expect(component.findAll('article')).toHaveLength(1)

    })
})