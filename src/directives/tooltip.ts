type Binding = string

interface TooltipElement extends HTMLElement {
    __tooltip: {
        element: HTMLElement,
        visible: boolean
    }
}


export const tooltip = {
    mounted(el: TooltipElement, binding: { value: Binding }) {
        const tooltip = document.createElement('tooltip')
        tooltip.className = 'v-tooltip'
        tooltip.style.position = 'absolute'
        tooltip.textContent = binding.value

        el.__tooltip = {
            element: tooltip,
            visible: false
        }

        el.addEventListener('mouseenter', () => {
            if (tooltip) {
                const rect = el.getBoundingClientRect()
                tooltip.style.opacity = '1'
                tooltip.style.left = `${rect.left}px`
                tooltip.style.top = `${rect.top}px`
                el.__tooltip.visible = true
            }
        })

        el.addEventListener('mouseleave', () => {
            if (tooltip) {
                tooltip.style.opacity = '0'
                el.__tooltip.visible = false
            }
        })

        document.body.appendChild(tooltip)
    },
    updated(el: TooltipElement, binding: { value: Binding }) {
        const tooltip = el.__tooltip?.element
        if (tooltip) {
            tooltip.textContent = binding.value
        }
    },
    unmounted(el: TooltipElement) {
        document.body.removeChild(el.__tooltip.element)
        Reflect.deleteProperty(el, '__tooltip')
    }
}