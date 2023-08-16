import { create } from 'zustand'

interface Player {
  ids: string[]
  activeId?: string
  setActiveId: (id: string) => void
  setIds: (ids: string[]) => void
  reset: () => void
}

const usePlayer = create<Player>((set) => ({
  ids: [],
  activeId: undefined,
  setActiveId(id) {
    set({ activeId: id })
  },
  setIds(ids) {
    set({ ids })
  },
  reset() {
    set({ ids: [], activeId: undefined })
  },
}))

export default usePlayer
