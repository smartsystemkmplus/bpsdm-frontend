import { ReactNode } from 'react';

export default function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const activeIndex = 0;
  const slideProps = [
    {
      img: '/BannerKMS.png',
      title: 'Knowledge Management System',
      description:
        'Wadah bersosialisasi dan berkomunikasi sesama pegawai',
    },
  ];

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex w-5/12 flex-col items-center justify-between px-16 pb-5 pt-16">
        {children}
        <p className="font-semibold text-base-gray">
          Powered by Synergo Plus | 2022
        </p>
      </div>
      <div
        className="relative min-h-screen w-7/12"
        style={{
          background:
            'linear-gradient(156.04deg, #016DB2 0%, #003F80 100%)',
        }}
      >
        <div className="relative z-[2] flex h-full flex-col items-center justify-center gap-8 text-center text-base-white">
          <div className="relative items-center justify-between px-20">
            <img
              className="h-[50vh] w-full cursor-pointer rounded-lg object-contain"
              src={slideProps[activeIndex].img}
              alt={`slide-${slideProps[activeIndex].title}`}
              loading="lazy"
            />
          </div>
          <div>
            <p className="mb-1 text-3xl font-semibold">
              {slideProps[activeIndex].title}
            </p>
            <p className="text-lg">
              {slideProps[activeIndex].description}
            </p>
          </div>
        </div>
        <img
          src="/AuthPageOrnament.png"
          alt="ornament"
          className="absolute bottom-0 right-0 z-[1]"
        />
      </div>
    </div>
  );
}
