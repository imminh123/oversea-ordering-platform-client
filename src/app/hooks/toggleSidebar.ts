import { ESidebarExpandVariant } from 'app/context/ui/enum';
import create from 'zustand';

interface ToggleSidebar {
  variant: ESidebarExpandVariant;
  updateToggle: (data: ESidebarExpandVariant) => void;
}

export const useToggleSidebar = create<ToggleSidebar>((set) => ({
  variant: ESidebarExpandVariant.EXPAND_MORE,
  updateToggle: (payload: ESidebarExpandVariant) => set(() => ({ variant: payload })),
}));
