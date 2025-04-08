import { afterEach, describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import { useAuth } from "../useAuth";
import axios from 'axios'

vi.mock('axios')

const mockAuth = {
    token: 'test'
}

describe('useAuth', () => {
    test('Méthode login', async () => {
        const { login, emailForm, passwordForm, token } = useAuth();
        (axios.post as any).mockResolvedValue({
            data: mockAuth
        })
        emailForm.value = 'test@test.com'
        passwordForm.value = 'azerty'
        await login()
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