import type { ObjectDirective } from "vue";

interface LazyLoadOptions { src: string, effect?:string, placeholder?: string }

type Binding = {
    value: string | LazyLoadOptions
}

interface LazyLoadElement extends HTMLImageElement {
    __lazyload: {
        loaded: boolean,
        observer: IntersectionObserver,
        img: HTMLImageElement | null
    }
}

export const lazyLoad: ObjectDirective = {
    beforeMount(el: LazyLoadElement, binding: Binding) {
        const options: LazyLoadOptions = typeof binding.value === 'string' ? {
            src: binding.value
        } : binding.value

        if (options.placeholder) {
            el.src = options.placeholder
        }

        if (options.effect == 'blur') {
            el.style.filter = 'blur(5px)'
        }

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = new Image()
                    img.onload = () => {
                        el.__lazyload.loaded = true
                        if (options.effect == 'blur') {
                            el.style.filter = 'blur(0)'
                        }
                    }
                    img.src = options.src
                    el.src = img.src
                    el.__lazyload.img = img
                }
            })
        })

        el.__lazyload = {
            loaded: false,
            observer,
            img: null
        }

        observer.observe(el)
    },
    unmounted(el: LazyLoadElement) {
        const lazyLoad = el.__lazyload
        if (!lazyLoad) return
        lazyLoad.observer.disconnect()

    },
    updated(el: LazyLoadElement, binding: Binding) {
        const lazyLoad = el.__lazyload
        if (!lazyLoad) return
        const options: LazyLoadOptions = typeof binding.value === 'string' ? {
            src: binding.value
        } : binding.value
        if (lazyLoad.img) {
            lazyLoad.img.src = options.src
        }
    }
}