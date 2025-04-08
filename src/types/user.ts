export interface Address {
    street: string,
    geo: {
        lat: number
        lng: number
    }
}

export interface User {
    id: number
    email: string
    name: string,
    address: Address
}
