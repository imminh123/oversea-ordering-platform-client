import React from 'react';

import { useTranslation } from 'react-i18next';

import { UIContext } from 'app/context/ui';

export function useUI() {
  const { i18n } = useTranslation();
  const context = React.useContext(UIContext);

  const handleSwitchLanguage = React.useCallback((lng: string) => {
    i18n
      .changeLanguage(lng)
      .then(() => {
        // do nothing
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  React.useEffect(() => {
    if (context.activeLanguage) {
      handleSwitchLanguage(context.activeLanguage);
    }
  }, [context.activeLanguage]);

  return { ...context, handleSwitchLanguage };
}
