import color from '@constants/color';
import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-4 py-2 shadow-navbar">
      <div className="flex  items-center gap-4">
        <a href="/home" className="mr-2">
          <img
            src="/BPSDMLogo.webp"
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
      </div>

      <Link to="/login">
        <Button color={color.secondary.main}>Login</Button>
      </Link>
    </nav>
  );
}
