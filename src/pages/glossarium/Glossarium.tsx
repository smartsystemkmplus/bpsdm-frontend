import HomeLayout from '@components/Layouts/HomeLayout';
import Footer from '@components/Layouts/HomeLayout/Footer';
import { Divider, Group, Stack } from '@mantine/core';
import { DataTable } from 'mantine-datatable';

import GlosaArrow from '/GlosaArrow.png';
import GlosaCMS from '/GlosaCMS.png';
import GlosaDefinition from '/GlosaDefinition.png';
import GlosaHyperlink from '/GlosaHyperlink.png';
import GlosaKMS from '/GlosaKMS.png';
import LogoKM2 from '/Logo_KM2.png';

type DataItem = {
  no: string;
  istilah: string;
  definisi: string;
};

const hyperlinkURL =
  'https://drive.google.com/drive/folders/1_40Fo5YR6v0vDUPwpqDgIk6MV22mxLnL';

export default function Glossarium() {
  const dataCMS: DataItem[] = [
    {
      no: '01',
      istilah: 'CMS (Content Management System)',
      definisi:
        'Sebuah sistem yang dirancang untuk membantu pegawai dalam mengelola dan mendistribusikan aset pengetahuan secara efektif di lingkungan kerja. Sistem ini mengelola berbagai menu seperti Home, Glosarium, Berita KM, Knowledge Center, dan Simfoni.',
    },
    {
      no: '02',
      istilah: 'Home',
      definisi:
        'Menu tampilan utama Portal KM yang berisikan artikel Berita dan Aset Pengetahuan terbaru, series pengembangan kompetensi yang diselenggarakan oleh Perangkat Daerah, serta link terkait yang dapat diakses.',
    },
    {
      no: '03',
      istilah: 'Glosarium',
      definisi:
        'Menu yang memuat daftar definisi dasar yang perlu diketahui untuk memudahkan penggunaan Portal KM.',
    },
    {
      no: '04',
      istilah: 'Pembelajaran Mandiri',
      definisi:
        'Series pengembangan kompetensi berbentuk podcast atau webinar yang diselenggarakan oleh berbagai Perangkat Daerah dan dapat diakses oleh seluruh pengguna.',
    },
    {
      no: '05',
      istilah: 'Berita KM',
      definisi:
        'Menu yang berfungsi sebagai pusat distribusi berita dan informasi terkini terkait Knowledge Management (KM).',
    },
    {
      no: '06',
      istilah: 'Knowledge Center',
      definisi:
        'Menu yang berfungsi sebagai repository utama untuk menyimpan dan mengelola berbagai aset pengetahuan, seperti panduan, manual, dan dokumentasi yang dapat diakses oleh seluruh pengguna.',
    },
    {
      no: '07',
      istilah: 'Aset Pengetahuan',
      definisi:
        'Kekayaan organisasi berbentuk pengetahuan eksplisit yang disimpan dan dimanfaatkan terus menerus.',
    },
    {
      no: '08',
      istilah: 'Simfoni',
      definisi:
        'Merupakan Sistem Informasi Inovasi yang berisikan hasil Pelatihan Dasar (Latsar), Pelatihan Kepemimpinan Pengawas (PKP), Pelatihan Kepemimpinan Administrator (PKA), yang dapat diakses oleh ASN Pemerintah Provinsi DKI Jakarta.',
    },
  ];

  const dataKMS: DataItem[] = [
    {
      no: '01',
      istilah: 'KMS (Knowledge Management System)',
      definisi:
        'Sistem yang dirancang untuk membantu pegawai Pemerintah Provinsi DKI Jakarta dalam mengelola program dan kebijakan pemerintahan dengan lebih efektif. Sistem ini mencakup pengelolaan dokumen kebijakan, prosedur, serta informasi penting terkait tugas pemerintahan daerah.',
    },
    {
      no: '02',
      istilah: 'Dashboard KMS',
      definisi:
        'Menu utama pada Menu KMS yang dapat diakses oleh seluruh pekerja mengenai profil pengguna, gamification leaderboard dan kalender.',
    },
    {
      no: '03',
      istilah: 'Gamification Leaderboard',
      definisi:
        'Tabel peringkat yang menunjukkan pencapaian KM Point dalam sistem gamifikasi.',
    },
    {
      no: '04',
      istilah: 'Kalender KM',
      definisi:
        'Jadwal kalender yang berisi agenda-agenda komunitas yang telah diikuti oleh pegawai.',
    },
    {
      no: '05',
      istilah: 'Community',
      definisi:
        'Menu untuk mengakses Komunitas Pembelajar (CoP) dan Komunitas Minat & Hobi (CoI) yang bertujuan untuk berinteraksi, dan berkolaborasi untuk bertukar pengetahuan, pengalaman dan keterampilan.',
    },
    {
      no: '06',
      istilah: 'Komunitas Saya',
      definisi:
        'Sub Menu berisi komunitas yang telah diikuti oleh pegawai.',
    },
    {
      no: '07',
      istilah: 'Komunitas Pembelajar (CoP)',
      definisi:
        'Merupakan kelompok individu yang memiliki kebutuhan, pengetahuan serta penugasan tertentu, dan secara reguler bertemu untuk mendiskusikan hal-hal terkait dengan bidang tertentu untuk memberikan kontribusi dalam mengembangkan pengetahuan. Komunitas Pembelajar dikelola oleh Perangkat Daerah.',
    },
    {
      no: '08',
      istilah: 'Komunitas Minat & Hobi (CoI)',
      definisi:
        'Sistem yang dirancang untuk membantu pegawai Pemerintah Provinsi DKI Jakarta dalam mengelola program dan kebijakan pemerintahan dengan lebih efektif. Sistem ini mencakup pengelolaan dokumen kebijakan, prosedur, serta informasi penting terkait tugas pemerintahan daerah.',
    },
    {
      no: '09',
      istilah: 'Pengurus Inti Komunitas',
      definisi:
        'Merupakan Narasumber Ahli yang bertugas sebagai pengurus komunitas baik itu Komunitas Pembelajar maupun Komunitas Minat.',
    },
    {
      no: '10',
      istilah: 'Anggota Komunitas',
      definisi:
        'Merupakan anggota yang bergabung ke komunitas dan tidak menjadi Pengurus Inti dari komunitas tersebut.',
    },
    {
      no: '11',
      istilah: 'Agenda',
      definisi:
        'Kegiatan rutin yang diadakan oleh Komunitas dalam upaya berbagi pengetahuan, pengalaman, keterampilan berdasarkan praktisi atau keahlian para anggota atau menjalankan minat dan hobi bersama.',
    },
    {
      no: '12',
      istilah: 'Ask The Expert',
      definisi:
        'Menu yang berfungsi sebagai wadah interaksi antar pegawai dengan Narasumber.',
    },
    {
      no: '13',
      istilah: 'Subject Matter Expert (SME)',
      definisi:
        'Merupakan individu yang memiliki keahlian khusus dan keterampilan mendalam pada bidang atau disiplin ilmu tertentu. Keahlian bisa didapat melalui pendidikan formal, pengalaman kerja, atau kombinasi.',
    },
    {
      no: '14',
      istilah: 'Analytics',
      definisi:
        'Dashboard untuk menganalisis data dan informasi dalam sistem. Analytics memberikan wawasan tentang penggunaan sistem, performa komunitas, aktivitas pengguna, serta penyebaran dan penerapan pengetahuan di dalam organisasi.',
    },
    {
      no: '15',
      istilah: 'Submit Artikel',
      definisi:
        'Merupakan sub menu yang hanya dapat diakses oleh akun Admin Perangkat Daerah untuk mengunggah artikel aset pengetahuan yang dimiliki oleh Perangkat Daerah masing-masing.',
    },
  ];

  const columns = [
    {
      title: 'Istilah/Menu',
      accessor: 'istilah',
      width: 300,
      render: (item: DataItem) => (
        <Group gap="xs">
          <img alt="arrow" src={GlosaArrow} className="size-[24px]" />
          <p>{item.istilah}</p>
        </Group>
      ),
    },
    {
      accessor: 'definisi',
    },
  ];

  return (
    <HomeLayout
      className="flex flex-col gap-5"
      footer={
        <>
          <div className="relative">
            <a
              href={hyperlinkURL}
              target="_blank"
              className="absolute right-[11.75vw] top-[38%] h-[4.5vw] w-[22.5vw] opacity-0"
              rel="noreferrer"
            >
              x
            </a>
            <img
              alt="km-logo"
              src={GlosaHyperlink}
              className="w-full"
            />
          </div>
          <Footer />
        </>
      }
    >
      <Stack gap="lg">
        <h1 className="text-4xl font-bold text-primary-main">
          Mengenal Knowledge Management
        </h1>

        <Group wrap="nowrap">
          <img alt="km-logo" src={LogoKM2} className="h-[40px]" />
          <Divider orientation="vertical" />
          <p className="text-sm">
            Knowledge Management atau Manajemen Pengetahuan merupakan
            upaya terstruktur dan sistematis dalam mengembangkan dan
            menggunakan pengetahuan yang dimiliki untuk membantu
            proses pengambilan keputusan bagi peningkatan kinerja
            organisasi.
          </p>
        </Group>

        <Group align="start" gap="xs">
          <img
            alt="logo"
            src={GlosaDefinition}
            className="size-[48px]"
          />
          <Stack gap={2}>
            <p className="font-semibold text-primary-main">
              Definisi dasar yang perlu dipahami
            </p>
            <p className="text-sm">
              Baca definisi dibawah ini untuk mempermudah Anda dalam
              mengakses Portal KM Provinsi DKI Jakarta
            </p>
          </Stack>
        </Group>

        <Stack gap="lg" className="ml-14 mt-2">
          <Group wrap="nowrap" gap="xs">
            <img alt="logo" src={GlosaCMS} className="size-[24px]" />
            <h2 className="text-base font-semibold text-primary-main">
              Content Management System (CMS)
            </h2>
          </Group>
          <DataTable
            className="border-t"
            records={dataCMS}
            idAccessor="no"
            columns={columns}
          />

          <Group wrap="nowrap" gap="xs">
            <img alt="logo" src={GlosaKMS} className="size-[36px]" />
            <h2 className="text-base font-semibold text-primary-main">
              Knowledge Management System (KMS)
            </h2>
          </Group>
          <DataTable
            className="border-t"
            records={dataKMS}
            idAccessor="no"
            columns={columns}
          />
        </Stack>
      </Stack>
    </HomeLayout>
  );
}
