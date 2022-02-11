import create from 'zustand'

export const useStore = create((set) => ({
    firstNames: '',
    cellPhone: '',
    email: '',
    partyID: '',
    searchableDocuments: [],
    preferencesIds : [],
    setFirstNames: (firstNames) => set((state) => ({
        ...state.firstNames,
        firstNames: firstNames
    })),
    setSearchableDocuments: (preferences) => set((state) => ({
        ...state.searchableDocuments,
        searchableDocuments: preferences
    })),
    setCellPhone: (cellPhone) => set((state) => ({
        ...state.cellPhone,
        cellPhone
    })),
    setEmail: (email) => set((state) => ({
        ...state.email,
        email
    })),
    setPartyID: (partyId) => set((state) => ({
        ...state.party,
        partyID: partyId
    })),
    addPreferenceId: (id) => set((state) => ({
        preferencesIds: [...new Set([...state.preferencesIds, id])]
    })),
}))