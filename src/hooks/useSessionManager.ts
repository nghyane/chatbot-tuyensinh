import { useCallback } from 'react'
import { toast } from 'sonner'
import { deletePlaygroundSessionAPI } from '@/services/api/playground'
import { usePlaygroundStore } from '@/store'

/**
 * Hook for managing session operations like deletion
 */
const useSessionManager = () => {
  const selectedEndpoint = usePlaygroundStore((state) => state.selectedEndpoint)
  const userId = usePlaygroundStore((state) => state.userId)
  const setSessionsData = usePlaygroundStore((state) => state.setSessionsData)

  /**
   * Delete a session by ID
   * @param agentId - The agent ID
   * @param sessionId - The session ID to delete
   * @returns Promise<boolean> - Success status
   */
  const deleteSession = useCallback(
    async (agentId: string, sessionId: string): Promise<boolean> => {
      if (!agentId || !sessionId || !selectedEndpoint) {
        toast.error('Missing required parameters for session deletion')
        return false
      }

      try {
        const response = await deletePlaygroundSessionAPI(
          selectedEndpoint,
          agentId,
          sessionId,
          userId
        )

        if (response.ok) {
          // Remove the deleted session from local state
          setSessionsData((prevSessions) => 
            prevSessions?.filter(session => session.session_id !== sessionId) ?? null
          )
          
          toast.success('Session deleted successfully')
          return true
        } else {
          throw new Error(`Failed to delete session: ${response.statusText}`)
        }
      } catch (error) {
        console.error('Error deleting session:', error)
        toast.error('Failed to delete session')
        return false
      }
    },
    [selectedEndpoint, userId, setSessionsData]
  )

  /**
   * Delete multiple sessions
   * @param agentId - The agent ID
   * @param sessionIds - Array of session IDs to delete
   * @returns Promise<number> - Number of successfully deleted sessions
   */
  const deleteSessions = useCallback(
    async (agentId: string, sessionIds: string[]): Promise<number> => {
      if (!agentId || !sessionIds.length || !selectedEndpoint) {
        toast.error('Missing required parameters for bulk session deletion')
        return 0
      }

      let successCount = 0
      const promises = sessionIds.map(async (sessionId) => {
        try {
          const response = await deletePlaygroundSessionAPI(
            selectedEndpoint,
            agentId,
            sessionId,
            userId
          )
          
          if (response.ok) {
            successCount++
            return sessionId
          }
          return null
        } catch (error) {
          console.error(`Error deleting session ${sessionId}:`, error)
          return null
        }
      })

      const results = await Promise.all(promises)
      const deletedSessionIds = results.filter(Boolean) as string[]

      if (deletedSessionIds.length > 0) {
        // Remove deleted sessions from local state
        setSessionsData((prevSessions) => 
          prevSessions?.filter(session => 
            !deletedSessionIds.includes(session.session_id)
          ) ?? null
        )
      }

      if (successCount === sessionIds.length) {
        toast.success(`Successfully deleted ${successCount} sessions`)
      } else if (successCount > 0) {
        toast.warning(`Deleted ${successCount} out of ${sessionIds.length} sessions`)
      } else {
        toast.error('Failed to delete any sessions')
      }

      return successCount
    },
    [selectedEndpoint, userId, setSessionsData]
  )

  return {
    deleteSession,
    deleteSessions
  }
}

export default useSessionManager
