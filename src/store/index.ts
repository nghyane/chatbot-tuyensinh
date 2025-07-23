import { create } from 'zustand'
import { RefObject } from 'react'
import { ComboboxAgent, PlaygroundChatMessage, SessionEntry } from '@/types/playground'

interface PlaygroundStore {
  // Chat input reference
  chatInputRef: RefObject<HTMLTextAreaElement> | null
  setChatInputRef: (ref: RefObject<HTMLTextAreaElement>) => void

  // Messages
  messages: PlaygroundChatMessage[]
  setMessages: (messages: PlaygroundChatMessage[] | ((prev: PlaygroundChatMessage[]) => PlaygroundChatMessage[])) => void

  // Endpoint configuration
  selectedEndpoint: string
  setSelectedEndpoint: (endpoint: string) => void

  // Endpoint status
  isEndpointActive: boolean
  setIsEndpointActive: (active: boolean) => void
  isEndpointLoading: boolean
  setIsEndpointLoading: (loading: boolean) => void

  // Agents
  agents: ComboboxAgent[]
  setAgents: (agents: ComboboxAgent[]) => void

  // Selected model
  selectedModel: string
  setSelectedModel: (model: string) => void

  // Streaming state
  isStreaming: boolean
  setIsStreaming: (streaming: boolean) => void
  streamingErrorMessage: string | null
  setStreamingErrorMessage: (message: string | null) => void

  // Sessions
  sessionsData: SessionEntry[] | null
  setSessionsData: (sessions: SessionEntry[] | null | ((prev: SessionEntry[] | null) => SessionEntry[] | null)) => void
  isSessionsLoading: boolean
  setIsSessionsLoading: (loading: boolean) => void

  // Storage capability
  hasStorage: boolean
  setHasStorage: (hasStorage: boolean) => void
}

export const usePlaygroundStore = create<PlaygroundStore>((set, get) => ({
  // Chat input reference
  chatInputRef: null,
  setChatInputRef: (ref) => set({ chatInputRef: ref }),

  // Messages
  messages: [],
  setMessages: (messages) => set((state) => ({
    messages: typeof messages === 'function' ? messages(state.messages) : messages
  })),

  // Endpoint configuration - use proxy in development, direct URL in production
  selectedEndpoint: import.meta.env.DEV
    ? '/api'
    : (import.meta.env.VITE_API_BASE_URL || 'https://agent-tuyensinh-production.up.railway.app'),
  setSelectedEndpoint: (endpoint) => set({ selectedEndpoint: endpoint }),

  // Endpoint status
  isEndpointActive: false,
  setIsEndpointActive: (active) => set({ isEndpointActive: active }),
  isEndpointLoading: false,
  setIsEndpointLoading: (loading) => set({ isEndpointLoading: loading }),

  // Agents
  agents: [],
  setAgents: (agents) => set({ agents }),

  // Selected model
  selectedModel: '',
  setSelectedModel: (model) => set({ selectedModel: model }),

  // Streaming state
  isStreaming: false,
  setIsStreaming: (streaming) => set({ isStreaming: streaming }),
  streamingErrorMessage: null,
  setStreamingErrorMessage: (message) => set({ streamingErrorMessage: message }),

  // Sessions
  sessionsData: null,
  setSessionsData: (sessions) => set((state) => ({
    sessionsData: typeof sessions === 'function' ? sessions(state.sessionsData) : sessions
  })),
  isSessionsLoading: false,
  setIsSessionsLoading: (loading) => set({ isSessionsLoading: loading }),

  // Storage capability
  hasStorage: false,
  setHasStorage: (hasStorage) => set({ hasStorage })
}))
