export interface LoginResponseModel {
    token: string
    user: User
  }
  
  export interface User {
    id: number
    name: string
    login: string
    email: string
    profile: string
    active: boolean
    image: string
    store: string
    storeImage: string
  }
  