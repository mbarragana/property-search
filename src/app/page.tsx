"use client";

import { CategorySelector } from "@/components/CategoriesSelector";
import { Header } from "@/components/Header";
import { HandCoin } from "@/components/Icons";
import { LocationSelector } from "@/components/LocationSelector";
import { ToggleGroup } from "@/components/Toggle";
import { SearchTypes } from "@/utils";
import Image from "next/image";
import { useState } from "react";

export default function Home() {
  const [categories, setCategories] = useState("all");
  const [location, setLocation] = useState("");
  const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.rent);

  const handleSearchClick = () => {};

  const searchIsDisabled = !location;
  const searchClasses = searchIsDisabled
    ? " bg-purple-400 cursor-not-allowed opacity-50"
    : "bg-purple-600 hover:bg-purple-700 active:scale-95";

  return (
    <div className="relative h-screen min-h-[600px] w-full">
      <Header />
      {/* Background Image */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/50 to-gray-900/30">
        <Image
          src="/hero.webp"
          alt="Hero background"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center">
        {/* Search Container */}
        <div className="w-full max-w-4xl">
          {/* Heading */}
          <h1 className="text-5xl font-serif text-white mb-16">
            Rent faster, Buy smarter
          </h1>

          {/* Toggle Buttons */}
          <ToggleGroup onChange={setSearchType} value={searchType} />

          {/* Search Bar */}
          <div className="bg-white rounded-full py-2 px-4 shadow-lg flex items-center gap-2 mt-6">
            {/* Location */}
            <LocationSelector onSelect={() => {}} />

            {/* Divider */}
            <div className="w-px h-10 bg-gray-200" />

            {/* Category */}
            <CategorySelector onSelect={() => {}} />

            {/* Divider */}
            <div className="w-px h-10 bg-gray-200" />

            {/* Price */}
            <button className="flex items-center gap-2 min-w-[200px] px-4 py-2 hover:bg-gray-50 rounded-full">
              <HandCoin />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Price</div>
                <div className="text-sm text-gray-500">Select Price Range</div>
              </div>
            </button>

            {/* Search Button */}

            <button
              onClick={handleSearchClick}
              disabled={searchIsDisabled}
              className={`ml-auto bg-purple-600 text-white px-8 py-5 rounded-full font-medium hover:bg-purple-700 transition-colors ${searchClasses}`}
            >
              Search
            </button>
          </div>

          {/* Stats */}
          <div className="mt-24 text-white/80 text-center">
            <p className="text-lg">
              <span className="font-medium">73,273 verified listings</span>
              <br />
              <span className="text-sm italic">
                for apartments, houses, offices and more
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
