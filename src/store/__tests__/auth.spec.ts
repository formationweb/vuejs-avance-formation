import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import axios from 'axios'
import { useAuthStore } from "../../store/auth";
import { createPinia, storeToRefs } from "pinia";
import { mount } from '@vue/test-utils'

vi.mock('axios')

const mockAuth = {
    token: 'test'
}

describe('useAuth', () => {
    beforeEach(() => {
        const pinia = createPinia()
        mount({
            template: 'none'
        }, {
            global: {
                plugins: [pinia]
            }
        })
    })

    test('Méthode login', async () => {
        const authStore = useAuthStore();
        const { emailForm, passwordForm, token } = storeToRefs(authStore);
        (axios.post as any).mockResolvedValue({
            data: mockAuth
        })
        emailForm.value = 'test@test.com'
        passwordForm.value = 'azerty'
        await authStore.login()
        expect(axios.post).toHaveBeenCalledWith(
            expect.stringContaining('/login'),
            {
                email: emailForm.value,
                password: passwordForm.value
            }
        )
        expect(token.value).toBe(mockAuth.token)
    })
})