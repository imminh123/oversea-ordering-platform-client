import { ISidebarItem, ISidebarMenu } from 'app/types/sidebar';
import { SidebarKeysEnum } from 'configs/sidebar.config';

export const checkSidebarItemExpand = (sidebarItemLink: string, locationPathname: string): boolean => {
  if (locationPathname.includes(sidebarItemLink)) {
    return true;
  }

  return false;
};

export const randomIntFromInterval = (min: number, max: number): number => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const isEmpty = (str?: string | null): boolean => {
  if (!str) {
    return true;
  }
  return str.trim() === '';
};

export const mappingNumberToString = (number: number | null): number | null => {
  if (typeof number === 'number' && number > 0) {
    return number;
  }

  return null;
};

export const mappingBoolean = (
  status: number | boolean,
  type: 'boolean-to-number' | 'number-to-boolean' = 'number-to-boolean',
): boolean | number => {
  if (type === 'boolean-to-number') {
    if (status === true) {
      return 1;
    }

    return 0;
  }

  if (status === 1) {
    return true;
  }

  return false;
};

export const initSidebarActive = (menus: ISidebarMenu[], locationPathname: string): ISidebarItem | null => {
  let result: ISidebarItem | null = null;
  let sidebarItemList: ISidebarItem[] = [];

  for (const menu of menus) {
    for (const item of menu.sidebars) {
      if (item.child && item.child.length > 0) {
        sidebarItemList = [...sidebarItemList, ...item.child];
      }

      sidebarItemList = [...sidebarItemList, item];
    }
  }

  for (const item of sidebarItemList) {
    if (item.link.toString() === locationPathname) {
      result = item;
      break;
    }
  }

  return result;
};

export function initSidebarExpandKey(matchLink: string, sidebars: ISidebarItem[]): SidebarKeysEnum | null {
  let result: SidebarKeysEnum | null = null;

  for (const sidebar of sidebars) {
    if (!sidebar.child || sidebar.child.length === 0) {
      result = sidebar.link === matchLink ? sidebar.parentKey : null;
    } else {
      result = initSidebarExpandKey(matchLink, sidebar.child);
    }

    if (result) {
      break;
    }
  }

  return result;
}

export const formatMoneyToVND = (number: number) => {
  const formatter = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  });

  return formatter.format(number);
};

export const formatMoneyToCN = (number: number) => {
  const formatter = new Intl.NumberFormat('zh-CN', {
    style: 'currency',
    currency: 'CNY',
  });

  return formatter.format(number);
};

export const sendTokenToChromeExtension = ({ extensionId, jwt }: { extensionId: string; jwt: string }) => {
  console.log(`Attempt in sending message to ${extensionId}`);
  if (chrome.runtime && chrome.runtime.sendMessage) {
    chrome.runtime.sendMessage(extensionId, { jwt }, (response: any) => {
      if (!response?.success) {
        console.log(`Error sending message to ${extensionId}`, response);
        return response;
      }
      console.log(`Sucesss sending to ${extensionId}`, response.message);
    });
  }
};

export const fileToDataUri = (file: any) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event: any) => {
      resolve(event.target.result);
    };
    reader.readAsDataURL(file);
  });

export const base64ToFile = (base64String: string, fileName: string) => {
  const contentType = base64String.split(';')[0].split(':')[1];
  const byteCharacters = atob(base64String.split(',')[1]);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += 512) {
    const slice = byteCharacters.slice(offset, offset + 512);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  const file = new File([blob], fileName, { type: contentType });

  return file;
};

export const removeNullProperties = (obj: object) => {
  return Object.fromEntries(Object.entries(obj).filter(([key, value]) => value !== null && value !== ''));
};
