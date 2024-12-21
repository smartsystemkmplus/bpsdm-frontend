import Layout from '@components/Layouts';
import CheckEmail from '@pages/check-email/CheckEmail';
import ForgotPassword from '@pages/forgot-password/ForgotPassword';
import Home from '@pages/home/Home';
import KMNews from '@pages/km-news/KMNews';
import NewsDetail from '@pages/km-news/news-detail/NewsDetail';
import Login from '@pages/login/Login';
import NewsAndAssets from '@pages/news-and-assets/NewsAndAssets';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import './index.css';

import AuthRoute from './AuthRoute';
import DailyLogin from './DailyLogin';
import NotFoundPage from './pages/NotFoundPage';

dayjs.extend(relativeTime);
dayjs.locale('id');

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFoundPage />,
    children: [
      {
        index: true,
        element: <Navigate to="/home" />,
      },
      {
        element: <AuthRoute />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/forgot-password',
            element: <ForgotPassword />,
          },
          {
            path: '/check-email',
            element: <CheckEmail />,
          },
        ],
      },
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/km-news',
        element: <KMNews category="Berita KM" />,
      },
      {
        path: '/km-news/:slug',
        element: <NewsDetail category="Berita KM" />,
      },
      {
        path: '/knowledge-center',
        element: <KMNews />,
      },
      {
        path: '/knowledge-center/:slug',
        element: <NewsDetail />,
      },
      {
        path: '/news-and-assets',
        element: <NewsAndAssets />,
      },
    ],
  },
]);
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <DailyLogin />
    <RouterProvider router={router} />
  </QueryClientProvider>
  // </React.StrictMode>
);
