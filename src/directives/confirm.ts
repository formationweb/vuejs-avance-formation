type Binding = {
    message: string,
    onConfirm: () => void
}

interface ConfirmButton extends HTMLElement {
    __callback: () => void
}

export const confirmDirective = {
    mounted(btn: ConfirmButton, binding: { value: Binding }) {
        btn.__callback = () => {
            const { message, onConfirm } = binding.value
            const bool = window.confirm(message)
            if (bool) onConfirm()
        }
        btn.addEventListener('click', btn.__callback)
    },
    beforeUnMount(btn: ConfirmButton) {
        btn.removeEventListener('click', btn.__callback)
    },
}