import color from '@constants/color';
import useNetworks, {
  GenericQueryResponse,
  StrapiData,
} from '@hooks/useNetworks';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Divider, Group, TextInput } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { BASE_PROXY, STRAPI_ENDPOINT } from '@services/api/endpoint';
import showErrorDialog from '@utils/showErrorDialog';
import showSuccessDialog from '@utils/showSuccessDialog';
import { z } from 'zod';

interface FooterAttribute {
  address: string;
  email: string;
  phoneNumber: string;
  /** Formatted in ISO String */
  createdAt: string;
  /** Formatted in ISO String */
  publishedAt: string;
  /** Formatted in ISO String */
  updatedAt: string;
}

export default function Footer() {
  const form = useForm({
    initialValues: {
      email: '',
    },
    validate: zodResolver(
      z.object({
        email: z.string().email('Format email tidak valid'),
      })
    ),
  });

  const { query, mutation } = useNetworks(BASE_PROXY.strapi);

  const { data } = query<
    GenericQueryResponse<StrapiData<FooterAttribute>>,
    FooterAttribute
  >(STRAPI_ENDPOINT.GET.footer, {
    queryKey: ['footer'],
    select: (res) => res?.data?.attributes,
  });

  const { mutate, isPending } = mutation('post');

  const handleRegisterEmail = () => {
    const reqBody = {
      data: { email: form.values.email },
    };
    mutate(
      {
        endpoint: STRAPI_ENDPOINT.POST.subscriberEmail,
        data: reqBody,
      },
      {
        onError: (err) => {
          if (
            err.response?.data?.error?.message ===
            'This attribute must be unique'
          ) {
            showErrorDialog('Email sudah terdaftar');
          } else {
            showErrorDialog(err);
          }
        },
        onSuccess: () =>
          showSuccessDialog({
            title: 'Berhasil',
            message: 'Email anda berhasil didaftarkan',
          }),
      }
    );
  };

  return (
    <footer className="flex flex-col">
      <section className="flex items-center justify-between gap-5 bg-primary-pressed px-12 py-6 text-base-white">
        <div className="flex flex-col gap-1">
          <p className="font-semibold">DAFTARKAN EMAIL ANDA</p>
          <p className="text-sm">
            Jadikan anda orang yang pertama tahu perkembangan KM di
            Pemerintah Provinsi DKI Jakarta
          </p>
        </div>

        <Group justify="end">
          <TextInput
            placeholder="Masukkan email Anda"
            size="md"
            className="w-[546px]"
            {...form.getInputProps('email')}
          />
          <Button
            variant="outline"
            color="white"
            className="shrink-0"
            disabled={!form.isValid()}
            loading={isPending}
            onClick={handleRegisterEmail}
          >
            DAFTAR SEKARANG
          </Button>
        </Group>
      </section>

      <section className="mt-12">
        <div className="flex items-end justify-between p-6">
          <div className="flex flex-col items-start gap-6">
            <img
              src="/BPSDMLogo.webp"
              alt="Logo"
              className="h-[38px] object-contain"
            />
            <p className="w-[323px] text-sm">{data?.address}</p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:baseline-phone"
                width={16}
                color={color.base.darkGray}
              />
              <p>{data?.phoneNumber}</p>
            </div>
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:outline-email"
                width={16}
                color={color.base.darkGray}
              />
              <a
                href="mailto:bpsdmdkijakarta@gmail.com"
                className="text-primary-main underline"
              >
                {data?.email}
              </a>
            </div>
          </div>
        </div>
        <Divider />
        <p className="my-4 text-center text-sm">BPSDM &copy; 2024</p>
      </section>
    </footer>
  );
}
