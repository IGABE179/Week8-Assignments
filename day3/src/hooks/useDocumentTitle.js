import { useEffect } from 'react';

// Returns nothing. Keeps the browser tab title equal to `title`.
export function useDocumentTitle(title) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}