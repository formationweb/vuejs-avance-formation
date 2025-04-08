import { mount, VueWrapper } from "@vue/test-utils"
import { beforeEach, describe, expect, test } from "vitest"
import UserCard from "../UserCard.vue"

const mockUser = {
    id: 1,
    name: 'ana',
    email: 'ana@gmail.com'
}

describe('Users Component', () => {
    let component: VueWrapper

    beforeEach(() => {
        component = mount(UserCard, {
            props: {
                user: mockUser
            }
        })
    })

    test('Vérifier que nom et email affichent dans la vue', () => {
        expect(component.text()).toContain(mockUser.name)
        expect(component.text()).toContain(mockUser.email)
    })
})