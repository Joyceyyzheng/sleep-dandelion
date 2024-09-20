import create from "zustand"

export const useStore = create((set) => ({

    modelActive: false,
    setModelActive: () => set(state => ({ modelActive: !state.modelActive })),
    flowerActive: false,
    setFlowerActive: () => set(state => ({ flowerActive: !state.flowerActive })),
    globalControlsEnabled: false,
    setGlobalControlsEnabled: () =>
        set((state) => ({ globalControlsEnabled: !state.globalControlsEnabled })),

}))

export default useStore