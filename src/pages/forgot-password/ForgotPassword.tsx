import AuthLayout from '@components/Layouts/AuthLayout';
import { Icon } from '@iconify/react';
import { Button, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { z } from 'zod';

export default function ForgotPassword() {
  const isLoading = false;
  const [fetchError, setFetchError] = useState('');

  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: zodResolver(
      z.object({
        email: z.string().min(1, 'Silahkan isi email'),
      })
    ),
  });

  const navigate = useNavigate();

  const handleSubmit = form.onSubmit(() => {
    setFetchError('');

    // Accommodate super login
    // const [userEmail, targetUID] = values.email.split('-$$-');

    // TODO: Hit login EP
  });

  return (
    <AuthLayout>
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
          <h1 className="text-3xl font-semibold">Forgot Password</h1>
          <p className="font-medium text-base-darkGray">
            Masukan email untuk mendapatkan kode OTP
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <TextInput
            label="Email"
            radius="md"
            placeholder="Masukan email"
            size="md"
            name="email"
            classNames={{
              root: 'w-full',
              label: 'mb-2',
            }}
            {...form.getInputProps('email')}
          />

          <p className="mt-2 text-center text-sm text-danger-main">
            {fetchError}
          </p>

          <Button
            loading={isLoading}
            type="submit"
            className="mt-6 w-full"
          >
            Kirim Kode OTP
          </Button>
        </form>
      </div>
    </AuthLayout>
  );
}
