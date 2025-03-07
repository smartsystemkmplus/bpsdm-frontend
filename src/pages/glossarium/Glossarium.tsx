import HomeLayout from '@components/Layouts/HomeLayout';
import { Stack } from '@mantine/core';
import { DataTable } from 'mantine-datatable';

export default function Glossarium() {
  const dataCMS = [
    {
      no: '01',
      istilah: 'CMS (Content Management System)',
      definisi:
        'Sebuah sistem yang dirancang untuk membantu pegawai dalam mengelola dan mendistribusikan konten digital secara efektif di lingkungan kerja. Sistem ini mengelola berbagai jenis konten seperti artikel, informasi pengetahuan, berita terkait Knowledge Management (KM), serta materi pembelajaran mandiri yang dapat diakses oleh seluruh pegawai untuk mendukung peningkatan keterampilan dan pengetahuan.',
    },
    {
      no: '02',
      istilah: 'Berita KMS',
      definisi:
        'Wadah pembelajaran yang berfungsi sebagai pusat distribusi berita dan informasi terkini terkait Knowledge Management (KM) di organisasi yang dapat di distribusikan dalam bentuk artikel, video atau media pembelajaran lainnya.',
    },
    {
      no: '03',
      istilah: 'Knowledge Center',
      definisi:
        'Sebuah pusat pembelajaran yang berfungsi sebagai repository utama untuk menyimpan dan mengelola berbagai sumber pengetahuan, seperti panduan, manual, dokumentasi, dan berita terbaru yang dapat diakses oleh seluruh pengguna.',
    },
    {
      no: '04',
      istilah: 'Simfoni',
      definisi:
        'Sistem informasi inovasi yang dapat diakses oleh seluruh pekerja di pemerintah provinsi DKI Jakarta.',
    },
    {
      no: '05',
      istilah: 'Aset Pengetahuan',
      definisi:
        'Informasi atau pengalaman berharga yang dimiliki individu atau organisasi dan bisa digunakan untuk membantu kerja, membuat keputusan, atau berinovasi.',
    },
    {
      no: '06',
      istilah: 'Pembelajaran Mandiri',
      definisi:
        'Modul pembelajaran berbentuk podcast yang dapat didengar oleh seluruh pengguna sesuai dengan kategori pembelajaran masing-masing.',
    },
  ];

  const dataKMS = [
    {
      no: '01',
      istilah: 'Knowledge Management System (KMS)',
      definisi:
        'Sistem yang dirancang untuk membantu pegawai Pemerintah Provinsi DKI Jakarta dalam mengelola program dan kebijakan pemerintahan dengan lebih efektif. Sistem ini mencakup pengelolaan dokumen kebijakan, prosedur, serta informasi penting terkait tugas pemerintahan daerah.',
    },
    {
      no: '02',
      istilah: 'Dashboard KMS',
      definisi:
        'Dashboard utama yang dapat diakses oleh seluruh pekerja mengenai profil masing-masing yang berisi gamification leaderboard dan kalender.',
    },
    {
      no: '03',
      istilah: 'Gamification Leaderboard',
      definisi:
        'Tabel peringkat yang menunjukkan pencapaian pengguna dalam sistem gamifikasi.',
    },
    {
      no: '04',
      istilah: 'Calendar',
      definisi:
        'Jadwal kalender yang berisi agenda-agenda yang berkaitan dengan komunitas dan para pekerja.',
    },
    {
      no: '05',
      istilah: 'Community',
      definisi:
        'Kelompok pengguna yang berbagi minat atau tujuan yang sama dalam organisasi, berinteraksi, dan berkolaborasi untuk bertukar pengetahuan serta pengalaman.',
    },
    {
      no: '06',
      istilah: 'Komunitas Saya',
      definisi:
        'Merupakan wadah komunitas bagi para pekerja yang telah bergabung di komunitas tersebut.',
    },
    {
      no: '07',
      istilah: 'SKPD',
      definisi:
        'Unit kerja yang bertanggung jawab atas tugas-tugas pemerintahan di tingkat daerah. Modul ini berfungsi untuk mengelola, mengoordinasikan, dan berbagi informasi di antara anggota SKPD yang terkait.',
    },
    {
      no: '08',
      istilah: 'Komunitas Pembelajar (CoP)',
      definisi:
        'Sebuah wadah komunitas berfokus pada topik atau masalah tertentu yang relevan dengan anggota komunitas berdasarkan praktisi atau keahlian yang sesuai. Anggota CoP bekerja sama untuk berbagi pengetahuan, pengalaman, atau keahlian yang berkaitan dengan minat tersebut.',
    },
    {
      no: '09',
      istilah: 'Pengurus Inti CoP',
      definisi:
        'Narasumber ahli yang membentuk dan atau tergabung dalam komunitas pembelajar sesuai bidang praktisi atau keahliannya.',
    },
    {
      no: '10',
      istilah: 'Anggota CoP',
      definisi:
        'Pegawai yang hanya mengikuti Komunitas Pembelajar (CoP) tanpa menjadi Pengurus Inti Komunitas.',
    },
    {
      no: '11',
      istilah: 'Komunitas Minat Hobi (CoI)',
      definisi:
        'Sebuah wadah komunitas berfokus pada topik atau masalah tertentu yang relevan dengan anggota komunitas dengan dasar hobi atau minat yang sama. Anggota CoI bekerja sama untuk berbagi pengetahuan, pengalaman, atau keahlian yang berkaitan dengan minat tersebut.',
    },
    {
      no: '12',
      istilah: 'Ask The Expert',
      definisi:
        'Modul untuk mengajukan pertanyaan kepada para ahli dalam bidang tertentu. Para ahli (Subject Matter Experts/SME) akan memberikan jawaban atau saran sesuai dengan pertanyaan yang diajukan, mempercepat proses penyelesaian masalah atau memberikan wawasan yang lebih mendalam.',
    },
    {
      no: '13',
      istilah: 'Subject Matter Expert (SME)',
      definisi:
        'Pegawai yang memiliki pengalaman dan kemampuan dalam suatu bidang (expertise) dan bersedia membagikan pengetahuannya kepada rekan kerja lainnya.',
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
        'Wadah pembelajaran untuk mengelola publikasi artikel yang relevan dengan berbagai topik yang berhubungan dengan operasional, kebijakan, atau perkembangan terbaru di dalam organisasi.',
    },
  ];

  return (
    <HomeLayout className="flex flex-col gap-5">
      <Stack gap="lg">
        <h1 className="mb-3 text-4xl font-semibold text-primary-main">
          Glossarium
        </h1>

        <h2 className="text-2xl font-bold">
          Content Management System (CMS)
        </h2>
        <DataTable
          className="border-t"
          records={dataCMS}
          idAccessor="no"
          columns={[
            {
              accessor: 'no',
            },
            {
              accessor: 'istilah',
              width: 300,
            },
            {
              accessor: 'definisi',
            },
          ]}
        />

        <h2 className="text-2xl font-bold">
          Knowledge Management System (KMS)
        </h2>
        <DataTable
          className="border-t"
          records={dataKMS}
          idAccessor="no"
          columns={[
            {
              accessor: 'no',
            },
            {
              accessor: 'istilah',
              width: 300,
            },
            {
              accessor: 'definisi',
            },
          ]}
        />
      </Stack>
    </HomeLayout>
  );
}
