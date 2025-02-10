import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const linkClass =
  "text-base text-gray-900 hover:text-gray-600 transition-colors font-semibold";

const mobileLinkClass = `py-2 ${linkClass}`;

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-sm">
      <div className="px-4">
        <nav className="flex items-center justify-between h-16 md:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.svg"
              alt="Lystio logo"
              priority
              sizes="(max-width: 768px) 80px, 112px"
              height={53}
              width={112}
              className="w-20 md:w-28"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  isMenuOpen
                    ? "M6 18L18 6M6 6l12 12"
                    : "M4 6h16M4 12h16M4 18h16"
                }
              />
            </svg>
          </button>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center gap-6">
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

          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/login"
              className="flex items-center justify-center px-6 md:px-8 py-2 text-sm md:text-base text-gray-900 border border-gray-500 hover:border-gray-900 rounded-full transition-colors h-12 md:h-[62px] w-32 md:w-[166px]"
            >
              Log-In
            </Link>
            <Link
              href="/register"
              className="flex items-center justify-center px-6 md:px-8 py-2 text-sm md:text-base text-white bg-purple-600 hover:bg-purple-700 rounded-full transition-colors h-12 md:h-[62px] w-32 md:w-[195px]"
            >
              Register
            </Link>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="absolute top-16 left-0 right-0 bg-white shadow-lg md:hidden">
              <div className="flex flex-col p-4">
                <Link href="/rent-buy" className={mobileLinkClass}>
                  Rent/Buy
                </Link>
                <Link href="/for-owners" className={mobileLinkClass}>
                  For Owners
                </Link>
                <Link href="/for-brokers" className={mobileLinkClass}>
                  For Brokers
                </Link>
                <Link href="/about-us" className={mobileLinkClass}>
                  About Us
                </Link>
                <div className="flex flex-col gap-2 mt-4">
                  <Link
                    href="/login"
                    className="flex items-center justify-center py-2 text-gray-900 border border-gray-500 rounded-full"
                  >
                    Log-In
                  </Link>
                  <Link
                    href="/register"
                    className="flex items-center justify-center py-2 text-white bg-purple-600 rounded-full"
                  >
                    Register
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
