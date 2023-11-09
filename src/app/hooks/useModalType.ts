import { EModalType } from 'app/context/ui/enum';
import create from 'zustand';

interface ToggleSidebar {
  modalObject: {
    openModal: boolean;
    type: EModalType;
    props: any;
  };
  changeType: (data: { openModal: boolean; type: EModalType; props: any }) => void;
}

export const useModalType = create<ToggleSidebar>((set) => ({
  modalObject: {
    openModal: false,
    type: EModalType.SAMPLE_MODAL,
    props: null,
  },
  changeType: ({ openModal, type, props }) => set(() => ({ modalObject: { openModal, type, props } })),
}));
