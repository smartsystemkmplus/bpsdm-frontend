import { Icon } from '@iconify/react';
import { Button } from '@mantine/core';
import { useEffect, useState } from 'react';
import {
  Link,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';

const countdown = 60; // in seconds

export default function CheckEmail() {
  const navigate = useNavigate();
  const [timer, setTimer] = useState(countdown);
  // const [isLoading, setIsLoading] = useState(false);
  // const [fetchError, setFetchError] = useState('');
  const isLoading = false;
  const fetchError = '';

  const { state } = useLocation();

  const handleOpenMail = () => {
    // choose one
    window.open('https://gmail.com', '_blank');
    // window.location = "mailto:{yourmail@domain.com}";
  };

  const handleResend = () => {
    // TODO: Hit forgot password
  };

  useEffect(() => {
    if (!isLoading) {
      setTimer(countdown);
    }
  }, [isLoading]);

  useEffect(() => {
    if (!timer) return undefined;

    const intervalId = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timer]);

  if (!state) return <Navigate to="/login" replace />;

  return (
    <div className="flex w-full flex-col gap-16">
      <div className="flex flex-col items-start gap-2">
        <Link to="/login" className="mb-5">
          <button
            type="button"
            className="flex items-center gap-1 text-base-darkGray"
          >
            <Icon icon="ic:round-chevron-left" width={24} />
            <p className="font-semibold">Sign In</p>
          </button>
        </Link>
        <h1 className="text-3xl font-semibold">Check Your Email</h1>
        <p className="font-medium text-base-darkGray">
          Kami telah mengirim link reset password ke {state.email}
        </p>
      </div>

      <div className="mt-[20%] w-full self-center">
        <button
          type="submit"
          className={
            'font-secondary w-full bg-primary-main font-medium hover:bg-primary4 text-white py-2 px-4 rounded my-1.5' +
            ' hidden'
          }
          onClick={handleOpenMail}
        >
          Open email app
        </button>

        <div className="my-3 flex flex-col items-center justify-center gap-4">
          <Button className="w-full" onClick={handleOpenMail}>
            Buka Email
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => navigate('/login')}
          >
            Kembali ke halaman login
          </Button>
          <p className="text-base-gray">
            {(() => {
              if (timer > 0 && fetchError.length === 0) {
                return (
                  <>
                    Resend in{' '}
                    <span className="font-semibold text-primary-main">
                      {timer} second
                    </span>
                  </>
                );
              }
              return (
                <>
                  {fetchError || 'Tidak menerima email?'}{' '}
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-semibold text-primary-main"
                  >
                    Kirim ulang
                  </button>
                </>
              );
            })()}
          </p>
        </div>
      </div>
    </div>
  );
}
