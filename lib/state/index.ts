import { create } from 'zustand'

type Store = {
  pageTitle: string
  setPageTitle: (pageTitle: string) => void
}

const useStore = create<Store>()((set) => ({
  pageTitle: "Audio del día",
  setPageTitle: (pageTitle: string) => set({ pageTitle }),
}))


export default useStore