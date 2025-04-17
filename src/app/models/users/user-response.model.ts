export interface UserResponseModel {
    id: number
    name: string
    login: string
    password: string
    email: string
    phone: string
    profile: string
    active: boolean
    image: string
    store: string
    storeImage: string
    userType: number | null
}

export interface UserRequestModel{
    name: string
    login: string
    password: string
    email: string
    phone: string
    image: string | null
    userType: number
}