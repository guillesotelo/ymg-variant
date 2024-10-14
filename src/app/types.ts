export type AppContextType = {
    isMobile: boolean
    isLoggedIn: boolean | null
    setIsLoggedIn: (value: boolean) => void
    darkMode: boolean
    setDarkMode: (value: boolean) => void
    lang: string
    setLang: (value: string) => void
}

export type onChangeEventType = React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>

export type dataObj<T = any> = Record<string | number, T>

export type userType = {
    _id?: string
    username?: string
    email?: string
    password?: string
    newData?: { [key: string]: string }
    token?: string
}

export type editionType = {
    _id?: string
    title?: string
    spaTitle?: string
    name?: string
    subtitle?: string
    spaSubtitle?: string
    description?: string
    spaDescription?: string
    author?: string
    link?: string
    category?: string
    tags?: string
    image?: string
    html?: string
    spaHtml?: string
    published?: boolean
    removed?: boolean
    articles?: string
    spaArticles?: string
    createdAt?: Date | string
    updatedAt?: Date | string
}

export type subscriptionType = {
    _id?: string
    email?: string
    fullname?: string
    isActive?: boolean
    language?: string
    age?: number
    removed?: boolean
    userData?: string
    location?: string
    createdAt?: Date | string
    updatedAt?: Date | string
}

export type articleType = {
    title?: string
    content?: string
    link?: string
    slug?: string
    isAdvertisement?: boolean
    edit?: boolean
    image?: string
    lang?: string
    date?: string | number | Date
    editionTitle?: string
    categories?: string[]
}

export type sourceType = {
    title?: string
    link?: string
    category?: string
    notes?: string
}

export type logType = {
    _id?: string
    username?: string
    email?: string
    details?: string
    module?: string
    newData?: logType
}