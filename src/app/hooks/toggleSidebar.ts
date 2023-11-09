import { ESidebarExpandVariant } from 'app/context/ui/enum';
import create from 'zustand';

interface ToggleSidebar {
  sidebarExpandVariant: ESidebarExpandVariant;
  updateToggle: (data: ESidebarExpandVariant) => void;
}

export const useToggleSidebar = create<ToggleSidebar>((set) => ({
  sidebarExpandVariant: ESidebarExpandVariant.EXPAND_MORE,
  updateToggle: (payload: ESidebarExpandVariant) => set(() => ({ sidebarExpandVariant: payload })),
}));
