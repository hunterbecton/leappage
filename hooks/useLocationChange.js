import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import { usePrevious } from './usePrevious';

export const useLocationChange = (action) => {
  const location = useLocation();
  const prevLocation = usePrevious(location);

  useEffect(() => {
    action(location, prevLocation);
  }, [location]);
};
