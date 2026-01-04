export interface IProfile {
    id: string
    email: string
    password: string
    name: string
    role: string
    username: string
    avatar: string
    plan: string
    created_at: string
    updated_at: string
}

export interface IProfileData {
    message: string
    data: IProfile
}