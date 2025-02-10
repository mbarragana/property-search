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
  const [category, setCategory] = useState<number | string>();
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
        category,
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
      category,
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
        <div className="w-full max-w-6xl">
          {/* Heading */}
          <h1 className="text-5xl font-serif text-white mb-16">
            Rent faster, Buy smarter
          </h1>
          <ToggleGroup onChange={setSearchType} value={searchType} />
          {/* Search Bar */}
          <div className="bg-white rounded-full py-2 px-4 shadow-lg flex items-center gap-2 mt-6 w-full">
            <LocationSelector onSelect={setLocation} />
            <div className="w-px h-10 bg-gray-200" />
            <CategorySelector onSelect={setCategory} />
            <div className="w-px h-10 bg-gray-200" />
            <PriceRange
              key={JSON.stringify(histogram?.range)}
              onChange={setPriceRange}
              data={histogram}
              isLoading={histogramIsLoading}
              hasError={!!histogramError}
            />
            {/** Search Button */}
            <button
              onClick={handleSearchClick}
              className="ml-auto bg-purple-600 text-white px-8 py-5 rounded-full font-medium hover:bg-purple-700 transition-colors bg-purple-600 hover:bg-purple-700 active:scale-95"
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
