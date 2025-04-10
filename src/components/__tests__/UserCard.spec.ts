import { mount, VueWrapper } from "@vue/test-utils"
import { beforeEach, describe, expect, test, vi } from "vitest"
import UserCard from "../UserCard.vue"
import { h } from "vue"

const mockUser = {
    id: 1,
    name: 'ana',
    email: 'ana@gmail.com'
}

describe('Users Component', () => {
    let component: VueWrapper
    let spy = vi.fn(({ isActive, name }) => h('div', `User ${name} is ${ isActive}`))

    beforeEach(() => {
        component = mount(UserCard, {
            props: {
                user: mockUser
            },
            slots: {
                header: `
                    <template #header>
                        <h1>Titre</h1>
                    </template>
                `,
                default: spy
            }
        })
    })

    test('Vérifier que nom et email affichent dans la vue', () => {
        expect(component.text()).toContain(mockUser.name)
        expect(component.text()).toContain(mockUser.email)
    })

    test('Tester le slot header', () => {
        expect(component.find('h1').text()).toContain('Titre')
    })
})