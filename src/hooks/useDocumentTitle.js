import { useLayoutEffect } from 'react';

const useDocumentTitle = (title) => {
  useLayoutEffect(() => {
    if (title) {
      document.title = title;
    } else {
      document.title = 'Dolfino Tienda';
    }
  }, [title]);
};

export default useDocumentTitle;
