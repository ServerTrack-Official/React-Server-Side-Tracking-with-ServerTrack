// ServerTrack.io Configuration
const SERVERTRACK_CONFIG = {
  endpoint: 'some.website.com', // Replace with your ServerTrack endpoint
  authKey: 'AUTHENTICATION_KEY' // Replace with your authentication key
}

/**
 * Initialize ServerTrack SDK
 * This should be called once when the app loads
 */
export const initServerTrack = () => {
  if (window.ServerTrack) {
    console.log('ServerTrack already initialized')
    return
  }

  window.ServerTrack = window.ServerTrack || {}
  window.serverTrackQueue = []
  window.st = function() { 
    window.serverTrackQueue.push(arguments) 
  }

  const script = document.createElement('script')
  script.async = true
  const randomPath = Math.random().toString(36).substring(2, 15)
  script.src = `https://${SERVERTRACK_CONFIG.endpoint}/lib/${randomPath}?key=${SERVERTRACK_CONFIG.authKey}`
  
  const firstScript = document.getElementsByTagName('script')[0]
  firstScript.parentNode.insertBefore(script, firstScript)

  console.log('ServerTrack initialized')
}

/**
 * Track events using ServerTrack SDK
 * @param {string} eventName - The name of the event (e.g., 'ViewContent', 'AddToCart', 'Purchase')
 * @param {object} eventData - Event data object
 * @param {object} userData - Optional user data for advanced matching
 */
export const trackEvent = (eventName, eventData = {}, userData = null) => {
  if (!window.st) {
    console.error('ServerTrack not initialized. Call initServerTrack() first.')
    return
  }

  if (userData) {
    window.st('track', eventName, eventData, userData)
  } else {
    window.st('track', eventName, eventData)
  }
}
