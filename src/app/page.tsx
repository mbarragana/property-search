"use client";

import { CategorySelector } from "@/containers/CategoriesSelector";
import { Header } from "@/components/Header";
import { LocationSelector } from "@/containers/LocationSelector";
import { ToggleGroup } from "@/components/Toggle";
import { fetcher, SearchTypes } from "@/utils";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import qs from "qs";
import { Stats } from "@/components/Stats";
import { PriceRange } from "@/components/PriceRange";
import useSWR from "swr";

export default function Home() {
  const [category, setCategory] = useState<Category | undefined>();
  const [location, setLocation] = useState<string>();
  const [searchType, setSearchType] = useState<SearchTypes>(SearchTypes.rent);
  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: undefined,
    max: undefined,
  });
  const [countState, setCountState] = useState<{
    data?: number;
    isLoading: boolean;
  }>({ data: undefined, isLoading: true });

  const queryString = useMemo(
    () =>
      qs.stringify({
        category: category?.id,
        location,
        searchType,
      }),
    [category, location, searchType]
  );

  const {
    data: histogram,
    isLoading: histogramIsLoading,
    error: histogramError,
  } = useSWR(
    `/api/tenement/histogram?${queryString}`,
    fetcher<HistogramChartData>
  );

  const handleSearchClick = async () => {
    setCountState((value) => ({ ...value, isLoading: true }));
    const queryParams = qs.stringify({
      category: category?.id,
      location,
      searchType,
      priceRange,
    });
    const data = await fetcher<{ count: number }>(
      `/api/tenement/count?${queryParams}`
    );
    setCountState({ data: data.count, isLoading: false });
  };

  useEffect(() => {
    setCountState((value) => ({ ...value, isLoading: true }));
    handleSearchClick();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative min-h-screen w-full">
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
        {/* Overlay div with gradient */}
        <div className="absolute inset-0 bg-gradient-to-r from-black to-gray-500 to-transparent opacity-40" />
      </div>

      {/* Content */}
      <div className="relative min-h-screen px-4 flex flex-col items-center justify-center">
        <div className="w-full max-w-6xl">
          {/* Heading */}
          <h1 className="text-3xl md:text-5xl font-serif text-white mb-8 md:mb-14">
            Rent faster, Buy smarter
          </h1>

          <ToggleGroup onChange={setSearchType} value={searchType} />

          {/* Search Bar - Mobile: Stack vertically, Desktop: Single row */}
          <div className="flex flex-col md:flex-row bg-white rounded-2xl md:rounded-full py-2 px-4 shadow-lg gap-2 mt-6 items-center">
            <div className="w-full md:w-[40%]">
              <LocationSelector onSelect={setLocation} />
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200 flex-none" />
            <div className="w-full md:w-[25%]">
              <CategorySelector onSelect={setCategory} category={category} />
            </div>
            <div className="hidden md:block w-px h-10 bg-gray-200 flex-none" />
            <div className="w-full md:w-[25%]">
              <PriceRange
                onChange={setPriceRange}
                data={histogram}
                isLoading={histogramIsLoading}
                hasError={!!histogramError}
              />
            </div>
            <div className="flex flex-1 w-full justify-end">
              <button
                onClick={handleSearchClick}
                className="w-full md:w-auto bg-purple-600 text-white px-8 py-4 rounded-full font-medium hover:bg-purple-700 transition-colors"
              >
                Search
              </button>
            </div>
          </div>

          <Stats count={countState.data} isLoading={countState.isLoading} />
        </div>
      </div>
    </div>
  );
}
