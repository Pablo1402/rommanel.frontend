export interface CreateAddressRequestModel{
    clientId: string
    zipCode: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
}
export interface CreateAddressResponseModel{
    message: string
    id: string
}

export interface UpdateAddressRequestModel {
    id: string
    zipCode: string
    street: string
    number: string
    neighborhood: string
    city: string
    state: string
  }
  

export interface UpdateAddressResponseModel{
    message: string
    id: string
}

export interface DeleteAddressRequestModel{
    id: string
}