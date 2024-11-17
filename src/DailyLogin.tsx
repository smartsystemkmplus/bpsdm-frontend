import useIsAuthenticated from '@hooks/useIsAuthenticated';
import useNetworks from '@hooks/useNetworks';
import {
  BASE_PROXY,
  GAMIFICATION_ENDPOINT,
} from '@services/api/endpoint';
import Cookies from 'js-cookie';
import { useCallback, useEffect } from 'react';

import './index.css';

export default function DailyLogin() {
  const { mutation } = useNetworks(BASE_PROXY.gamification);
  const { mutate } = mutation('post');
  const isAuthorized = useIsAuthenticated();

  const postDailyLogin = useCallback(() => {
    if (isAuthorized) {
      const lastDailyLogin = Cookies.get('lastLogin');
      const lastLoginDate = lastDailyLogin
        ? new Date(lastDailyLogin).getDate()
        : null;
      const currDate = new Date().getDate();

      if (!lastDailyLogin || lastLoginDate !== currDate) {
        mutate({ endpoint: GAMIFICATION_ENDPOINT.POST.dailyLogin });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthorized]);

  useEffect(() => {
    postDailyLogin();
  }, [postDailyLogin]);
  return null;
}
