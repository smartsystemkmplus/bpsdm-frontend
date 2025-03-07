import ProfilePicture from '@components/ProfilePicture';
import color from '@constants/color';
import useIsAuthenticated from '@hooks/useIsAuthenticated';
import useNetworks from '@hooks/useNetworks';
import { Icon } from '@iconify/react';
import { Button, Group, Loader, Menu, Stack } from '@mantine/core';
import { AUTH_ENDPOINT, BASE_PROXY } from '@services/api/endpoint';
import getUserCookie from '@utils/cookie';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const user = getUserCookie();
  const isAuthenticated = useIsAuthenticated();

  const authService = useNetworks(BASE_PROXY.auth);
  const { mutate, isPending } = authService.mutation('post', {
    onSuccess: () => {
      window.location.reload();
    },
  });

  const handleLogout = () => {
    mutate({
      endpoint: AUTH_ENDPOINT.POST.logout,
    });
  };

  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow-navbar">
      <div className="flex  items-center gap-4">
        <a href="/home" className="mr-2">
          <img
            src="/Logo_KM.png"
            alt="Logo"
            className="aspect-auto h-[50px] p-2"
          />
        </a>

        <Link
          to="/home"
          className="font-semibold text-secondary-pressed"
        >
          Home
        </Link>
        <Link
          to="/km-news"
          className="font-semibold text-secondary-pressed"
        >
          Berita KM
        </Link>
        <Link
          to="/knowledge-center"
          className="font-semibold text-secondary-pressed"
        >
          Knowledge Center
        </Link>
        <a
          href="https://simdiklat-bpsdm.jakarta.go.id/sim-diklat/auth/login/simfoni"
          className="font-semibold text-secondary-pressed"
        >
          Simfoni
        </a>
        {isAuthenticated && (
          <a
            href={`${import.meta.env.VITE_KMS_URL}/dashboard`}
            className="font-semibold text-secondary-pressed"
          >
            KMS
          </a>
        )}
        <Link
          to="/glossarium"
          className="font-semibold text-secondary-pressed"
        >
          Glossarium
        </Link>
      </div>

      {isAuthenticated ? (
        <Group align="center" gap="xs">
          <Stack gap={1} align="flex-end">
            <p className="text-sm font-semibold">
              {user?.employee?.name}
            </p>
            <p className="text-xs font-medium text-base-darkGray">
              {user?.email}
            </p>
          </Stack>
          <ProfilePicture
            alt="profile"
            imageUrl={user?.employee?.profile_picture}
            size="md"
            className="rounded-full border"
          />
          <Menu disabled={isPending}>
            <Menu.Target>
              {isPending ? (
                <Loader size="xs" />
              ) : (
                <Icon
                  icon="tabler:chevron-down"
                  width={20}
                  className="cursor-pointer"
                />
              )}
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                leftSection={
                  <Icon icon="iconamoon:exit-fill" width={20} />
                }
                className="font-semibold text-danger-main"
                disabled={isPending}
                onClick={handleLogout}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      ) : (
        <Link to="/login">
          <Button color={color.secondary.main}>Login</Button>
        </Link>
      )}
    </nav>
  );
}
