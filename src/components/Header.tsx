import Image from 'next/image';
import Link from 'next/link';

const Header = () => {
  return (
    <header className="w-full h-20 bg-black">
      <div className="max-w-[1440px] mx-auto px-32 h-full flex items-center justify-center">
        <Link href="/" className="relative w-28 h-10">
          <Image
            src="/logo.svg"
            alt="Logo"
            width={120}
            height={42}
            className="object-contain"
            priority
          />
        </Link>
        
        {/* Navigation items can be added here */}
        <nav className="flex items-center gap-8">
          {/* Add your navigation items here */}
        </nav>
      </div>
    </header>
  );
};

export default Header; 