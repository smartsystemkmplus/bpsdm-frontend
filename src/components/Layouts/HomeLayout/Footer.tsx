import color from '@constants/color';
import { Icon } from '@iconify/react/dist/iconify.js';
import { Button, Divider, Group, TextInput } from '@mantine/core';

export default function Footer() {
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
          />
          <Button
            variant="outline"
            color="white"
            className="shrink-0"
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
            <p className="w-[323px] text-sm">
              Gedung Dinas Teknis Lantai 8 Jln. Abdul Muis No. 66 Kode
              Pos 10160 Jakarta Pusat, Indonesia
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Icon
                icon="ic:baseline-phone"
                width={16}
                color={color.base.darkGray}
              />
              <p>021-3865580 / 021-3865581</p>
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
                bpsdmdkijakarta@gmail.com
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
