/* eslint-disable import/prefer-default-export */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface InnovationCompeRoles {
  isJudge: boolean;
  isMentor: boolean;
  isAdminRegional: boolean;
  isManager: boolean;
}
interface NotifState {
  roles: InnovationCompeRoles;
  setRoles: (newRoles: InnovationCompeRoles) => void;
}

export const useInnovationCompeRolesStore = create<NotifState>(
  (set) => ({
    roles: {
      isJudge: false,
      isMentor: false,
      isAdminRegional: false,
      isManager: false,
    },
    setRoles: (newRoles) =>
      set((state) => ({ ...state, roles: newRoles })),
  })
);

interface InnovationDraftState {
  innovationId: number | null;
  setInnovationId: (newId: number | null) => void;
}

export const useInnovationDraftStore = create<InnovationDraftState>()(
  persist(
    (set) => ({
      innovationId: null,
      setInnovationId: (newId) =>
        set((state) => ({ ...state, innovationId: newId })),
    }),
    {
      name: 'innovation-form-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
