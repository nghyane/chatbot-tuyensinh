// Utility functions for user management

/**
 * Generate a unique user ID for anonymous users
 * This creates a UUID-like string for session identification
 */
export const generateAnonymousUserId = (): string => {
  return 'user_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now().toString(36)
}

/**
 * Get user ID from localStorage or generate a new one
 * This ensures consistent user identification across sessions
 */
export const getOrCreateUserId = (): string => {
  const STORAGE_KEY = 'playground_user_id'
  
  try {
    // Try to get existing user ID from localStorage
    const existingUserId = localStorage.getItem(STORAGE_KEY)
    
    if (existingUserId) {
      return existingUserId
    }
    
    // Generate new user ID if none exists
    const newUserId = generateAnonymousUserId()
    localStorage.setItem(STORAGE_KEY, newUserId)
    
    return newUserId
  } catch (error) {
    // Fallback if localStorage is not available
    console.warn('localStorage not available, using session-only user ID:', error)
    return generateAnonymousUserId()
  }
}

/**
 * Clear user ID from localStorage
 * Useful for logout or reset functionality
 */
export const clearUserId = (): void => {
  const STORAGE_KEY = 'playground_user_id'
  
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch (error) {
    console.warn('Failed to clear user ID from localStorage:', error)
  }
}

/**
 * Validate user ID format
 * Ensures the user ID follows expected format
 */
export const isValidUserId = (userId: string | null): boolean => {
  if (!userId) return false
  
  // Check if it's our generated format or a valid custom format
  const anonymousPattern = /^user_[a-z0-9]{9}_[a-z0-9]+$/
  const customPattern = /^[a-zA-Z0-9_-]{3,50}$/
  
  return anonymousPattern.test(userId) || customPattern.test(userId)
}
