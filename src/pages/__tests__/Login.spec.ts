import { beforeEach, describe, expect, test, vi } from "vitest";
import { mount, flushPromises, VueWrapper } from '@vue/test-utils'
import axios from 'axios'
import Login from '../Login.vue'

vi.mock('axios')

describe('Login Component', () => {
    let component: VueWrapper

    beforeEach(async () => {
        (axios.post as any).mockResolvedValue({
            data: {
                token: 'test'
            }
        })
        component = mount(Login)
    })

    test('Vérifier que soumission est ok', async () => {
        await component.find('input[name="email"]').setValue('test@test.com')
        await component.find('input[name="password"]').setValue('azerty')

        await component.find('form').trigger('submit.prevent')

        expect(axios.post).toHaveBeenCalled()
    })
})