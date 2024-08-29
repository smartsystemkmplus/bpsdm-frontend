import AuthLayout from '@components/Layouts/AuthLayout';
import axiosMainClient from '@configs/axios';
import { Icon } from '@iconify/react';
import {
  Button,
  Checkbox,
  PasswordInput,
  TextInput,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import {
  AUTH_ENDPOINT,
  BASE_PROXY,
  GAMIFICATION_ENDPOINT,
} from '@services/api/endpoint';
import baseURL from '@utils/baseURL';
import { login } from '@utils/firebaseAuth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

export function OnToggleVisibility({ reveal }: { reveal: boolean }) {
  return reveal ? (
    <Icon icon="mdi:eye-outline" />
  ) : (
    <Icon icon="mdi:eye-off-outline" width={20} />
  );
}

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [fetchError, setFetchError] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
      is_remember: false,
    },
    validate: zodResolver(
      z.object({
        email: z.string().min(1, 'Silahkan isi email'),
        password: z.string().min(1, 'Silahkan isi password'),
      })
    ),
  });

  const navigate = useNavigate();

  const handleSubmit = form.onSubmit((values) => {
    setFetchError('');
    setIsLoading(true);

    // Accommodate super login
    const isNotEmail = !z.string().email().safeParse(values.email)
      .success;
    const nrkEmail = `${values.email}-bpsdm@gmail.com`;

    const [userEmail, targetUID] = isNotEmail
      ? [nrkEmail, null]
      : values.email.split('-$$-');

    login(userEmail.toLowerCase().trim(), values.password)
      .then(async (userCredential) => {
        const { user } = userCredential;
        const data = {
          isRemember: values.is_remember,
          targetUID,
        };
        const token = await user.getIdToken();
        axiosMainClient(baseURL(BASE_PROXY.auth))
          .post(AUTH_ENDPOINT.POST.login, data, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then(() => {
            axiosMainClient(baseURL(BASE_PROXY.gamification))
              .post(GAMIFICATION_ENDPOINT.POST.dailyLogin, {
                headers: { Authorization: `Bearer ${token}` },
              })
              .then(() => navigate('/home'));
          })
          .catch((err) => {
            if (err.name === 'FirebaseError') {
              setFetchError('Email or Password is incorrect');
            } else {
              setFetchError('Something went wrong');
            }
            setIsLoading(false);
          });
      })
      .catch((err) => {
        if (err.name === 'FirebaseError') {
          setFetchError('Email or Password is incorrect');
        } else {
          setFetchError('Something went wrong');
        }
        setIsLoading(false);
      });
  });

  return (
    <AuthLayout>
      <div className="flex w-full flex-col gap-16">
        <div className="flex flex-col items-start gap-2">
          <Link to="/home">
            <img
              src="/Logo_KM.png"
              alt="company_logo"
              className="h-[60px] object-contain"
            />
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center">
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col gap-4"
          >
            <TextInput
              radius="md"
              label="Email"
              placeholder="Masukan email"
              size="md"
              name="email"
              classNames={{
                root: 'w-full',
                label: 'mb-2',
              }}
              {...form.getInputProps('email')}
            />

            <div>
              <PasswordInput
                radius="md"
                label="Password"
                placeholder="Masukan password"
                size="md"
                name="password"
                classNames={{
                  root: 'w-full',
                  label: 'mb-2',
                }}
                visibilityToggleIcon={OnToggleVisibility}
                {...form.getInputProps('password')}
              />

              <p className="mt-2 text-center text-sm text-danger-main">
                {fetchError}
              </p>
            </div>

            <div className="flex items-center justify-between">
              <Link
                to="/forgot-password"
                className="text-base font-semibold text-primary-main"
              >
                Forgot password?
              </Link>
              <Checkbox
                size="md"
                label="Remember me"
                classNames={{ label: 'secondary' }}
                {...form.getInputProps('is_remember')}
              />
            </div>

            <Button loading={isLoading} type="submit">
              Sign In
            </Button>
          </form>

          <a
            className="mt-7 flex items-center font-semibold text-base-darkGray"
            href="http://wa.me/+628113117698"
          >
            <Icon
              icon="mingcute:service-fill"
              className="mr-2 inline"
              width={20}
            />
            Helpdesk
          </a>
        </div>
      </div>
    </AuthLayout>
  );
}
