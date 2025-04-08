import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import Users from '../Users.vue'
import axios from 'axios'
import { User } from "../../types/user";
import { nextTick } from "vue";

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
        component = mount(Users, {
            // props: {
            //     title: 'Mon App'
            // }
        })
        await flushPromises()
    })

    test('Vérifier la balise article', async () => {
        const elements = component.findAll('article')
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