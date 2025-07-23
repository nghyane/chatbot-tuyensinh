import { toast } from 'sonner'

import { APIRoutes } from './routes'

import { Agent, ComboboxAgent, SessionEntry, ChatHistoryResponse } from '@/types/playground'

export const getPlaygroundAgentsAPI = async (
  endpoint: string
): Promise<ComboboxAgent[]> => {
  const url = APIRoutes.GetPlaygroundAgents(endpoint)
  try {
    const response = await fetch(url, { method: 'GET' })
    if (!response.ok) {
      toast.error(`Failed to fetch playground agents: ${response.statusText}`)
      return []
    }
    const data = await response.json()
    // Transform the API response into the expected shape.
    const agents: ComboboxAgent[] = data.map((item: Agent) => ({
      value: item.agent_id || '',
      label: item.name || '',
      model: item.model || '',
      storage: item.storage || false
    }))
    return agents
  } catch {
    toast.error('Error fetching playground agents')
    return []
  }
}

export const getPlaygroundStatusAPI = async (base: string): Promise<number> => {
  try {
    const response = await fetch(APIRoutes.PlaygroundStatus(base), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response.status
  } catch (error) {
    console.error('Error checking playground status:', error)
    return 503
  }
}

export const getAllPlaygroundSessionsAPI = async (
  base: string,
  agentId: string,
  userId?: string | null
): Promise<SessionEntry[]> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    // Add user ID to headers if provided
    if (userId) {
      headers['X-User-ID'] = userId
    }

    const response = await fetch(
      APIRoutes.GetPlaygroundSessions(base, agentId),
      {
        method: 'GET',
        headers
      }
    )
    if (!response.ok) {
      if (response.status === 404) {
        // Return empty array when storage is not enabled
        return []
      }
      throw new Error(`Failed to fetch sessions: ${response.statusText}`)
    }
    return response.json()
  } catch {
    return []
  }
}

export const getPlaygroundSessionAPI = async (
  base: string,
  agentId: string,
  sessionId: string,
  userId?: string | null
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  // Add user ID to headers if provided
  if (userId) {
    headers['X-User-ID'] = userId
  }

  const response = await fetch(
    APIRoutes.GetPlaygroundSession(base, agentId, sessionId),
    {
      method: 'GET',
      headers
    }
  )
  return response.json()
}

export const deletePlaygroundSessionAPI = async (
  base: string,
  agentId: string,
  sessionId: string,
  userId?: string | null
) => {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  }

  // Add user ID to headers if provided
  if (userId) {
    headers['X-User-ID'] = userId
  }

  const response = await fetch(
    APIRoutes.DeletePlaygroundSession(base, agentId, sessionId),
    {
      method: 'DELETE',
      headers
    }
  )
  return response
}

export const getChatHistoryAPI = async (
  base: string,
  sessionId: string,
  userId?: string | null
): Promise<ChatHistoryResponse | null> => {
  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }

    // Add user ID to headers if provided
    if (userId) {
      headers['X-User-ID'] = userId
    }

    const response = await fetch(
      APIRoutes.GetChatHistory(base, sessionId),
      {
        method: 'GET',
        headers
      }
    )

    if (!response.ok) {
      if (response.status === 404) {
        return null
      }
      throw new Error(`Failed to fetch chat history: ${response.statusText}`)
    }

    return response.json()
  } catch (error) {
    console.error('Error fetching chat history:', error)
    toast.error('Failed to load chat history')
    return null
  }
}
