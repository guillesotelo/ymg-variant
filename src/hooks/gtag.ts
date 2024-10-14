export const GA_TRACKING_ID = 'G-'

// Define types for pageview tracking
interface GTagPageview {
    path: string
    title: string
    fullUrl?: string  // Optional full URL to include query params
}

// Function to track pageviews with query parameters
export const pageview = ({ path, title, fullUrl }: GTagPageview) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('config', GA_TRACKING_ID, {
            page_path: path,
            page_title: title,
            page_location: fullUrl || window.location.href,  // Send the full URL if provided, or use the current location
        })
    } else {
        console.warn('Google Analytics is not available.')
    }
}

// Define the type for the event parameters
interface GTagEvent {
    action: string
    category: string
    label: string
    value?: number
}

// Function to track events
export const event = ({ action, category, label, value }: GTagEvent) => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', action, {
            event_category: category,
            event_label: label,
            value: value,
        })
    } else {
        console.warn('Google Analytics is not available.')
    }
}
