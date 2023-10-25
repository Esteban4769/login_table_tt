import { useEffect, useState } from 'react';

export const usePageError = (initialError: string): [string, (error: string) => void] => {
  const [error, setError] = useState(initialError);

  useEffect(() => {
    if (!error) {
      return;
    }

    const timerId = setTimeout(() => {
      setError('');
    }, 3000);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(timerId);
  }, [error]);

  return [error, setError];
};
