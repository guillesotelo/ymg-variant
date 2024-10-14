export const azx = () => { }

export const getDate = (dateString: Date | number | string | undefined) => {
    if (dateString) {
        const date = new Date(dateString)
        if (date.getHours() === 24) date.setHours(0)
        return date.toLocaleDateString('sv-SE', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })
    }
}

export const chunkArray = (arr: any[], chunkSize: number) => {
    const result = []
    for (let i = 0; i < arr.length; i += chunkSize) {
        result.push(arr.slice(i, i + chunkSize))
    }
    return result
}

export const sortArray = (arr: any[], key: string | number, order?: boolean) => {
    return arr.slice().sort((a: any, b: any) => {
        const aValue = a[key]
        const bValue = b[key]
        if (typeof aValue !== 'number' && !aValue) return 1
        if (typeof bValue !== 'number' && !bValue) return -1
        return order ? aValue < bValue ? 1 : -1 : aValue < bValue ? -1 : 1
    })
}

export const filterArray = (arr: any[], key: string | number, filter: string) => {
    if (key === 'name') return arr.filter(element => element.name?.toLocaleLowerCase().includes(filter))
    if (key === 'office') return arr.filter(element => element.office?.toLocaleLowerCase().includes(filter))
    return arr
}

export const goToUrl = (url: string) => {
    const anchor = document.createElement('a')
    anchor.target = '_blank'
    anchor.href = url
    anchor.click()
}

export const getTimeOption = (arr: any[], value: number) => {
    return arr.find(item => item.value === value) || { name: '', value: '' }
}

export const isTooBright = (color: string | undefined) => {
    color = color === 'gray' ? '#808080' :
        color === 'lightgray' ? '#d3d3d3' : color === 'black' ? '#000000' : color === 'white' ? '#ffffff' : color
    if (!color || !color.includes('#')) return false
    const hexToRgb = (hex: string) =>
        hex.match(/[A-Za-z0-9]{2}/g)?.map((v) => parseInt(v, 16))
    const [r, g, b] = hexToRgb(color) || []
    const luminance = 0.2126 * (r / 255) + 0.7152 * (g / 255) + 0.0722 * (b / 255)
    const threshold = 0.5
    return luminance > threshold
}

export const getLocation = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => position, (error) => { console.error("Error getting location:", error) }
        );
    } else {
        console.error("Geolocation is not supported by this browser")
    }
}

export const toHex = (str: string) => {
    var result = ''
    for (var i = 0; i < str.length; i++) {
        result += str.charCodeAt(i).toString(16)
    }
    return result
}

export const getUser = () => localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') || '{}') : {}

export const parseDateTime = (time: Date) => {
    const string = time ?
        getDate(time)
        : 'No data'
    return string ? string.split(' ').join(' - ') : ''
}

export const getDateWithGivenHour = (hour: number) => {
    /* Build dates with given hours passed */
    const today = new Date()
    today.setMinutes(0)
    today.setSeconds(0)
    today.setHours(today.getHours() - hour)
    return today.toLocaleString()
}

export const getDomain = (url: string) => {
    const match = url.match(/https?:\/\/(?:www\.)?(?:[a-zA-Z0-9]+\.)?([a-zA-Z0-9]+)\./);
    const domain = match ? match[1] : null
    return domain || ''
}

export const getCountryCode = async () => {
    try {
        const response = await fetch('https://ipapi.co/json/')
        if (!response.ok) throw new Error('Failed to fetch IP data')

        const data = await response.json()

        const countryCode = data.country_code.toLowerCase()
        const spanishSpeakingCountries = ['es', 'ar', 'bo', 'cl', 'co', 'cr', 'cu', 'do', 'ec', 'sv', 'gq', 'gt', 'hn', 'mx', 'ni', 'pa', 'py', 'pe', 'pr', 'uy', 've']

        if (spanishSpeakingCountries.includes(countryCode)) return 'es'
        return 'en'
    } catch (error) {
        console.error('Error fetching IP data:', error)
        return 'en'
    }
}

export const getOGImageUrl = async (url: string) => {
    try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`
        const response = await fetch(proxyUrl)

        if (!response.ok) return ''

        const htmlText = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlText, 'text/html')
        const ogImageTag = (doc as any).querySelector('meta[property="og:image"]')

        if (ogImageTag && ogImageTag.content) {
            return ogImageTag.content
        }
        return ''
    } catch (error) {
        console.error('Error fetching OG image URL:', error)
        return ''
    }
}

export const parseArticleDate = (date: Date | string | number | undefined, lang: string, showYear?: boolean) => {
    const newDate = new Date(date || new Date())
    const dayNumber = newDate.getDay()
    const dateNumber = newDate.getDate()
    const year = newDate.getFullYear()
    const month = newDate.getMonth()
    const dayNames: any = [
        { es: 'Domingo', en: 'Sun' },
        { es: 'Lunes', en: 'Mon' },
        { es: 'Martes', en: 'Tue' },
        { es: 'Miércoles', en: 'Wed' },
        { es: 'Jueves', en: 'Sun' },
        { es: 'Viernes', en: 'Fri' },
        { es: 'Sábado', en: 'Sat' },
    ]
    const monthNames: any = [
        { es: 'Enero', en: 'January' },
        { es: 'Febrero', en: 'February' },
        { es: 'Marzo', en: 'March' },
        { es: 'Abril', en: 'April' },
        { es: 'Mayo', en: 'May' },
        { es: 'Junio', en: 'June' },
        { es: 'Julio', en: 'July' },
        { es: 'Agosto', en: 'August' },
        { es: 'Septiembre', en: 'September' },
        { es: 'Octubre', en: 'October' },
        { es: 'Noviembre', en: 'November' },
        { es: 'Diciembre', en: 'December' }
    ];


    return `${monthNames[month][lang]} ${dateNumber}${showYear ? ', ' + year : ''}`
}

export const emailIsValid = (email: string) => {
    if (
        !email ||
        !email.includes('@') ||
        !email.split('@')[1].includes('.') ||
        email.split('@')[1][0] === '.' ||
        email.length < 5
    ) return false
    return true
}

export const removeTime = (title: string) => {
    let parsedTitle = title
    const mins = Array.from({ length: 50 }).map((_, i) => `(${i} min)`)

    for (let i = 0; i < mins.length; i++) {
        parsedTitle = parsedTitle.replace(mins[i], '')
    }
    return parsedTitle.trim()
}

export const getMinContent = (text: string, maxChars: number) => {
    if (!text) return ''
    const splits = text.split('. ')
    const splitsEnter = text.split('.\n')
    let minText = ''

    if (splits[0] < splitsEnter[0] || splitsEnter.length === 1) {
        splits.forEach(split => {
            if (split.trim() &&
                (minText.length < maxChars) ||
                // Case for abreviations e.g "U.S." or "P. Morgan"
                minText[minText.length - 3] === ' ' ||
                minText[minText.length - 3] === '.') minText += split + '. '
        })
    } else {
        splitsEnter.forEach(split => {
            if (split.trim() &&
                (minText.length < maxChars) ||
                // Case for abreviations e.g "U.S." or "P. Morgan"
                minText[minText.length - 3] === ' ' ||
                minText[minText.length - 3] === '.') minText += split + '. '
        })
    }
    return minText
}

export const retryWithDelay = async <T>(fn: () => Promise<T>, maxAttempts: number, delayMs = 1000): Promise<T> => {
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    let attempts = 0
    while (attempts < maxAttempts) {
        try {
            const result = await fn()
            if (result) {
                return result
            }
        } catch (err: any) {
            console.error(`Attempt ${attempts + 1} failed: ${err.message}`)
        }
        attempts++
        await delay(delayMs)
    }
    throw new Error(`Maximum retry attempts reached (${maxAttempts})`)
}

export const pause = (miliseconds?: number) => {
    return new Promise(resolve => setTimeout(resolve, miliseconds || 1000))
}

export const getUserData = async () => {
    try {
        const getBrowserInfo = () => {
            const ua = navigator.userAgent
            let browserName = "Unknown"
            if (ua.indexOf("Chrome") > -1) {
                browserName = "Chrome"
            } else if (ua.indexOf("Firefox") > -1) {
                browserName = "Firefox"
            } else if (ua.indexOf("Safari") > -1) {
                browserName = "Safari"
            } else if (ua.indexOf("MSIE") > -1 || !!(document as any).documentMode) {
                browserName = "Internet Explorer"
            }
            return browserName
        }

        const getOS = () => {
            const platform = navigator.platform.toLowerCase()
            let os = "Unknown"
            if (platform.includes("win")) {
                os = "Windows"
            } else if (platform.includes("mac")) {
                os = "MacOS"
            } else if (platform.includes("linux")) {
                os = "Linux"
            } else if (platform.includes("iphone") || platform.includes("ipad")) {
                os = "iOS"
            } else if (platform.includes("android")) {
                os = "Android"
            }
            return os
        }

        const ipResponse = await fetch('https://api64.ipify.org?format=json')
        const ipData = await ipResponse.json()
        const userAgent = navigator.userAgent
        const browserInfo = getBrowserInfo()
        const os = getOS()
        const referrer = document.referrer
        const screenResolution = `${window.screen.width}x${window.screen.height}`
        const timestamp = new Date().toISOString()


        return {
            ip: ipData.ip,
            userAgent,
            browser: browserInfo,
            os,
            referrer,
            screenResolution,
            timestamp
        }
    } catch (error) {
        console.error(error)
        return {}
    }
}

export const createSlug = (word: string) => {
    return removeTime(word)
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-zA-Z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
}