// const obj = {
//     _value: {
//         users: []
//     },
//     get value() {
//         return this._value
//     },
//     set value(val) {
//         console.log('render')
//         this._value = val
//     }
// }

// console.log(obj.value.users)

// obj.value = {
//     users: [{
//         id: 1
//     }]
// }

const obj = {
    users: [],
    age: 18
}

let objProxy = new Proxy(obj, {
    get(obj, prop) {
        return obj[prop]
    },
    set(obj, prop, value) {
        console.log('render')
        obj[prop] = value
        return  true
    }
})

objProxy = {
    users: [{ id: 1 }]
}

objProxy.age = 999