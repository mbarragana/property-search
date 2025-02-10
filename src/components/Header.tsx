import React from "react";
import Link from "next/link";
import Image from "next/image";

const linkClass =
  "text-base text-gray-900 hover:text-gray-600 transition-colors font-semibold";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm">
      <div className="px-4">
        <nav className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Lystio logo"
              priority
              sizes="auto"
              height={53}
              width={112}
            />
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6">
            <Link href="/rent-buy" className={linkClass}>
              Rent/Buy
            </Link>
            <Link href="/for-owners" className={linkClass}>
              For Owners
            </Link>
            <Link href="/for-brokers" className={linkClass}>
              For Brokers
            </Link>
            <Link href="/about-us" className={linkClass}>
              About Us
            </Link>
          </div>

          {/* Auth Buttons */}
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center justify-center px-8 py-2.5 text-base text-gray-900 border border-gray-500 hover:border-gray-900 rounded-full transition-colors h-[62px] w-[166px]"
            >
              Log-In
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center  px-8 py-2.5 text-base text-white bg-purple-600 hover:bg-purple-700 rounded-full transition-colors h-[62px] w-[195px]"
            >
              Register
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};
