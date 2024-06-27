import { useEffect } from 'react';
import { isAndroid, isIOS, isMobile } from 'react-device-detect';

/**
 * Responsible for redirecting the user to the mobile app store if the user is using a mobile device.
 */

function MobileBanner() {
  useEffect(() => {
    if (isMobile && typeof window !== 'undefined') {
      let appStoreUrl = '';
      if (isAndroid) {
        appStoreUrl =
          'https://play.google.com/store/apps/details?id=com.kmplusapp';
      } else if (isIOS) {
        appStoreUrl =
          'https://apps.apple.com/id/app/portaverse-pelindo/id6444711716';
      }

      window.location.href = appStoreUrl;
    }
  }, []);

  return null;
}

export default MobileBanner;
