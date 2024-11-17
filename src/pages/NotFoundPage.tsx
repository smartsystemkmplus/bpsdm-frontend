import NotFoundSVG from '@components/svg/NotFound';
import { Button, UnstyledButton } from '@mantine/core';
import Providers from '@services/providers';
import { useNavigate } from 'react-router-dom';

/**
 * Responsible for rendering the 404 page.
 */

function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <Providers>
      <main className="flex min-h-screen flex-col bg-base-white px-20 py-12">
        <UnstyledButton>
          <a href="/">
            <img
              src="/Logo_KM.png"
              alt="Logo"
              className="aspect-auto w-24 p-2"
            />
          </a>
        </UnstyledButton>
        <div className="m-auto flex w-fit flex-col items-center gap-8">
          <NotFoundSVG />
          <div className="flex flex-col text-center">
            <h1 className="text-xl font-semibold">
              The page you&apos;re looking for is missing
            </h1>
            <p className="text-base-darkGray">
              Sorry we could not find your page
            </p>
          </div>
          <Button variant="primary" onClick={() => navigate(-1)}>
            Go Back
          </Button>
        </div>
        <footer className="text-center">
          <p className="text-base-darkGray">
            Powered by Synergo Plus | 2022
          </p>
        </footer>
      </main>
    </Providers>
  );
}

export default NotFoundPage;
