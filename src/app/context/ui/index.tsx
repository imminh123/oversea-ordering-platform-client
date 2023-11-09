import * as React from 'react';

import { AlertProps } from '@mui/material/Alert';
import { SwipeableDrawerProps } from '@mui/material/SwipeableDrawer';
import { ISidebarItem } from 'app/types/sidebar';
import queryString from 'query-string';
import { useHistory } from 'react-router';
import { EDrawerType, EModalType, ESidebarExpandVariant } from './enum';
import { useToggleSidebar } from 'app/hooks/toggleSidebar';
import { useModalType } from 'app/hooks/useModalType';

interface IModalComponent<T> {
  open: boolean;
  type: T | null;
  props: any | null;
}

interface IAlertState {
  open: boolean;
  status: AlertProps['color'] | null;
  message: string;
}

type TAlertActions = 'success' | 'info' | 'warning' | 'error';

type LanguageUnion = 'en' | 'vi';

interface UIState {
  modal: IModalComponent<EModalType>;
  drawer: IModalComponent<EDrawerType> & {
    position: SwipeableDrawerProps['anchor'] | null;
  };
  alert: IAlertState;
  sidebarActive: ISidebarItem | null;
  sidebarExpandKey: string | null;
  listDense: boolean;
  sidebarExpandVariant: ESidebarExpandVariant | null;
  setSidebarActive: React.Dispatch<React.SetStateAction<ISidebarItem | null>>;
  setSidebarExpandKey: React.Dispatch<React.SetStateAction<string | null>>;
  setListDense: React.Dispatch<React.SetStateAction<boolean>>;
  setSidebarExpandVariant: React.Dispatch<React.SetStateAction<ESidebarExpandVariant | null>>;
  openModal: (type: EModalType, props?: object) => void;
  closeModal: () => void;
  openDrawer: (type: EDrawerType, position: SwipeableDrawerProps['anchor'], props?: object) => void;
  closeDrawer: () => void;
  checkOpen: (variant: 'modal' | 'drawer', type: EModalType | EDrawerType) => boolean;
  setAlert: (act: TAlertActions, message: string) => void;
  clearAlert: () => void;
  activeLanguage: LanguageUnion | undefined;
  setActiveLanguage: React.Dispatch<React.SetStateAction<LanguageUnion | undefined>>;
}

export const UIContext = React.createContext<UIState>({
  modal: {
    open: false,
    type: null,
    props: null,
  },
  drawer: {
    open: false,
    position: null,
    type: null,
    props: null,
  },
  alert: {
    open: false,
    status: null,
    message: '',
  },
  sidebarActive: null,
  sidebarExpandKey: null,
  listDense: false,
  sidebarExpandVariant: null,
  setSidebarActive: () => {},
  setSidebarExpandKey: () => {},
  setListDense: () => {},
  setSidebarExpandVariant: () => {},
  openModal: () => {},
  closeModal: () => {},
  openDrawer: () => {},
  closeDrawer: () => {},
  checkOpen: () => false,
  setAlert: () => {},
  clearAlert: () => {},
  activeLanguage: undefined,
  setActiveLanguage: () => {},
});

function isModalType(type: any): type is EModalType {
  return Object.values(EModalType).includes(type);
}

function isDrawerType(type: any): type is EDrawerType {
  return Object.values(EDrawerType).includes(type);
}

function isDrawerPosition(position: any): position is SwipeableDrawerProps['anchor'] {
  const anchors = ['left', 'top', 'right', 'bottom'];
  return anchors.includes(position);
}

function isSidebarExpandVariant(variant: any): variant is ESidebarExpandVariant {
  const variants = [ESidebarExpandVariant.EXPAND_LESS, ESidebarExpandVariant.EXPAND_MORE];
  return variants.includes(variant);
}

export const UIProvider: React.FC = ({ children }) => {
  const history = useHistory();
  const { variant } = useToggleSidebar();
  const { modalObject, changeType } = useModalType();
  const [sidebarActive, setSidebarActive] = React.useState<ISidebarItem | null>(null);
  const [sidebarExpandKey, setSidebarExpandKey] = React.useState<string | null>(null);
  const [listDense, setListDense] = React.useState(true);
  const [sidebarExpandVariant, setSidebarExpandVariant] = React.useState<ESidebarExpandVariant | null>(() => {
    return isSidebarExpandVariant(variant) ? variant : ESidebarExpandVariant.EXPAND_MORE;
  });
  const [modal, setModal] = React.useState<IModalComponent<EModalType>>(() => {

    const open = !!modalObject.openModal;
    const type: EModalType | null = isModalType(modalObject.type) ? modalObject.type : null;
    const props = modalObject && modalObject.props && typeof modalObject.props === 'object' ? modalObject.props : null;

    return { open, type, props };
  });
  const [drawer, setDrawer] = React.useState<
    IModalComponent<EDrawerType> & {
      position: SwipeableDrawerProps['anchor'] | null;
    }
  >(() => {
    const locationSearch = history.location.search;
    const queryObject = queryString.parse(locationSearch);
    const open = !!(queryObject && queryObject.drawerType);
    const type = isDrawerType(queryObject.drawerType) ? queryObject.drawerType : null;
    const position = isDrawerPosition(queryObject.drawerPosition) ? queryObject.drawerPosition : 'left';
    const props =
      queryObject && queryObject.modalProps && typeof queryObject.modalProps === 'object'
        ? queryObject.modalProps
        : null;

    return { open, type, props, position };
  });
  const [activeLanguage, setActiveLanguage] = React.useState<LanguageUnion | undefined>('en');
  const [alert, setAlert] = React.useState<IAlertState>({
    open: false,
    status: null,
    message: '',
  });

  const openModal = (modalType: EModalType, modalProps?: object) => {
    setModal({
      open: true,
      type: modalType,
      props: modalProps ? modalProps : null,
    });
    changeType({ openModal: true, type: modalType, props: modalProps });
  };
  const closeModal = () => {
    setModal({
      open: false,
      type: null,
      props: null,
    });
  };

  const openDrawer = (
    drawerType: EDrawerType,
    position: SwipeableDrawerProps['anchor'] = 'left',
    drawerProps?: object,
  ) => {
    setDrawer((prev) => ({
      open: true,
      type: drawerType,
      props: drawerProps ? drawerProps : null,
      position,
    }));
    const search = queryString.stringify({
      drawerType,
      drawerProps,
      drawerPosition: position,
    });
    history.push({ search });
  };
  const closeDrawer = () => {
    setDrawer({
      open: false,
      type: null,
      props: null,
      position: drawer.position,
    });

    const locationSearch = history.location.search;
    const queryObject = queryString.parse(locationSearch);
    delete queryObject.drawerType;
    delete queryObject.drawerProps;
    delete queryObject.drawerPosition;

    history.push({ search: queryString.stringify(queryObject) });
  };

  const checkOpen = (variant: 'modal' | 'drawer', type: EModalType | EDrawerType): boolean => {
    if (variant === 'modal' && (type as EModalType)) {
      return modal.type === type && modal.open;
    }
    if (variant === 'drawer' && (type as EDrawerType)) {
      return drawer.type === type;
    }

    return false;
  };

  const handleSetAlert = (act: TAlertActions, message: string) => {
    setAlert({
      open: true,
      status: act,
      message,
    });
  };

  const handleClearAlert = () => {
    setAlert({
      open: false,
      status: null,
      message: '',
    });
  };

  return (
    <UIContext.Provider
      value={{
        modal,
        alert,
        drawer,
        sidebarActive,
        sidebarExpandKey,
        listDense,
        sidebarExpandVariant: sidebarExpandVariant,
        setSidebarActive,
        setSidebarExpandKey,
        setListDense,
        setSidebarExpandVariant,
        openModal,
        closeModal,
        openDrawer,
        closeDrawer,
        checkOpen,
        setAlert: handleSetAlert,
        clearAlert: handleClearAlert,
        activeLanguage,
        setActiveLanguage,
      }}
    >
      {children}
    </UIContext.Provider>
  );
};
