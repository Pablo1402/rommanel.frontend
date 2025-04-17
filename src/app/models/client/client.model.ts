export interface CreateClientRequestModel {
    name: string
    type: number
    document: string
    bitrhDate: string
    phone: string
    email: string
    freeStateRegistration: boolean
    stateRegistration: string
}
export interface CreateClientResponseModel {
    message: string
    id: string
}
export interface DeleteClientRequestModel {
    id: string
}
export interface UpdateClientRequestModel {
    id: string
    name: string
    type: number
    document: string
    bitrhDate: string
    phone: string
    email: string
    freeStateRegistration: boolean
    stateRegistration: string
}
export interface UpdateClientResponseModel {
    message: string
    id: string
}
export interface SearchClientResponseModel {
    id: string
    name: string
    document: string
    bitrhDate: string
    personType: number
    phone: string
    email: string
    freeStateRegistration: boolean
    stateRegistration: string
}
export interface ClientResponseModel {
    id: string
    name: string
    document: string
    bitrhDate: string
    personType: number
    phone: string
    email: string
    freeStateRegistration: boolean
    stateRegistration: string
    addresses: AddressClientResonseModel[]
}
export interface AddressClientResonseModel {
    id: string
    zipCode: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
}
