import { useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';

export const InstallExtension = () => {
  const history = useHistory();
  const linkRef = useRef<any>(null);
  history.goBack();
  useEffect(() => {
    linkRef.current?.click();
  }, []);
  return (
    <>
      <a
        className='hidden'
        ref={linkRef}
        href='https://chromewebstore.google.com/detail/mby-logistics-%C4%91%E1%BA%B7t-h%C3%A0ng-tr/ighanfgjjmhhgmjadlokpaadhfnfpngo'
        target='_blank'
        rel='noopener noreferrer'
      ></a>
    </>
  );
};
