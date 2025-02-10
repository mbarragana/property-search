"use client";

import { CategorySelector } from "@/components/CategoriesSelector";
import { Header } from "@/components/Header";
import { HandCoin } from "@/components/Icons";
import { LocationSelector } from "@/components/LocationSelector";
import { ToggleGroup } from "@/components/Toggle";
import { fetcher, SearchTypes } from "@/utils";
import Image from "next/image";
import { useEffect, useState } from "react";
import qs from "query-string";
import { Stats } from "@/components/Stats";

export default function Home() {
  const [category, setCategory] = useState<number | string>();
  const [location, setLocation] = useState<string>();
  const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.rent);
  const [countState, setCountState] = useState<{
    data?: number;
    isLoading: boolean;
  }>({ data: undefined, isLoading: true });

  const searchIsDisabled = !location;
  const searchClasses = searchIsDisabled
    ? " bg-purple-400 cursor-not-allowed opacity-50"
    : "bg-purple-600 hover:bg-purple-700 active:scale-95";

  const handleSearchClick = async () => {
    setCountState((value) => ({ ...value, isLoading: true }));
    const queryString = qs.stringify({
      category,
      location,
      searchType,
    });
    const data = await fetcher<{ count: number }>(
      `/api/tenement/count?${queryString}`
    );
    setCountState({ data: data.count, isLoading: false });
  };

  useEffect(() => {
    setCountState((value) => ({ ...value, isLoading: true }));
    handleSearchClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <ToggleGroup onChange={setSearchType} value={searchType} />
          {/* Search Bar */}
          <div className="bg-white rounded-full py-2 px-4 shadow-lg flex items-center gap-2 mt-6">
            <LocationSelector onSelect={setLocation} />
            <div className="w-px h-10 bg-gray-200" />
            <CategorySelector onSelect={setCategory} />
            <div className="w-px h-10 bg-gray-200" />
            {/** Search Button */}
            <button className="flex items-center gap-2 min-w-[200px] px-4 py-2 hover:bg-gray-50 rounded-full">
              <HandCoin />
              <div className="text-left">
                <div className="text-sm font-medium text-gray-900">Price</div>
                <div className="text-sm text-gray-500">Select Price Range</div>
              </div>
            </button>
            <button
              onClick={handleSearchClick}
              disabled={searchIsDisabled}
              className={`ml-auto bg-purple-600 text-white px-8 py-5 rounded-full font-medium hover:bg-purple-700 transition-colors ${searchClasses}`}
            >
              Search
            </button>
          </div>
          <Stats count={countState.data} isLoading={countState.isLoading} />
        </div>
      </div>
    </div>
  );
}
