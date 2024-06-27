import axios from 'axios';

/**
 * Responsible to handle Zoom OAuth process (client-side).
 */
// ! Might need to refactor & move OAuth the process to server-side
export default function openZoomAuth() {
  const url =
    `https://zoom.us/oauth/authorize` +
    '?response_type=code' +
    `&client_id=${import.meta.env.VITE_ZOOM_CLIENT_ID}` +
    `&redirect_uri=${window.location.origin}/zoomauth`;

  const newWindow = window.open(
    url,
    '_blank',
    'location=yes,height=570,width=520,scrollbars=yes,status=yes'
  );

  newWindow?.addEventListener('message', (e) => {
    if (e?.data) {
      const base64Auth = btoa(
        `${import.meta.env.VITE_ZOOM_CLIENT_ID}:${import.meta.env.VITE_ZOOM_CLIENT_SECRET}`
      );
      axios.post(
        '/api/zoom-oauth/token',
        {
          grant_type: 'authorization_code',
        },
        {
          headers: {
            Authorization: `Basic ${base64Auth}`,
          },
        }
      );
    }
  });
}
