"use client";

import React, { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Magnifier, MapPin } from "../components/Icons";
import { fetcher } from "@/utils";
import useSWR from "swr";
import Image from "next/image";
import { Dropdown } from "@/components/Dropdown";
import { AddressAutoComplete } from "@/components/AddressAutoComplete";

function ItemMapPin() {
  return (
    <div className="w-12 h-12 bg-[#F7F7FD] rounded-full flex items-center justify-center">
      <MapPin />
    </div>
  );
}
function parseDistrictName(name: string) {
  if (name.match("-")) return name.split("-")[1].trim();
  return name;
}

type LocationSelectorProps = {
  onSelect: (location: string) => void;
};

const classes = {
  overlay: "flex flex-col md:flex-row",
};

function formatLabel(
  address: string,
  handleAddressChange: (e: ChangeEvent<HTMLInputElement>) => void
) {
  function innerFormat(place: City | District | null) {
    if (place) {
      return parseDistrictName(place.name);
    }
    return (
      <AddressAutoComplete
        onChange={handleAddressChange}
        value={address}
        placeholder="Search address, neighbourhood, city, or ZIP code"
      />
    );
  }
  return innerFormat;
}

export const LocationSelector = ({ onSelect }: LocationSelectorProps) => {
  const [selectedLocation, setSelectedLocation] = useState<City | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [place, setPlace] = useState<City | District | null>(null);
  const [address, setAddress] = useState<string>("");

  const handleAddressChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>): void => {
      const text = e.target.value;
      if (isOpen && text) setIsOpen(false);
      if (!isOpen && !text) setIsOpen(true);
      setAddress(text);
    },
    [setAddress, setIsOpen, isOpen]
  );

  const recentSearchesState = useSWR(
    "/api/search/recent",
    fetcher<RecentSearch[]>
  );
  const popularCitiesState = useSWR("/api/boundary/popular", fetcher<City[]>);

  const handleLocationSelect = (location: City) => {
    if (location.id === selectedLocation?.id) {
      setSelectedLocation(null);
      return;
    }
    setSelectedLocation(location);
  };

  const handleDistrictSelect = (district?: District) => {
    if (!selectedLocation) return;
    setPlace(district || selectedLocation);
    setIsOpen(false);
    onSelect?.(district?.id || selectedLocation.id);
  };

  const handleOpenClose = useCallback(
    (value: boolean) => {
      if (value && address) return;
      setIsOpen(value);
    },
    [address]
  );

  const labelProps = useMemo(
    () => ({
      Icon: Magnifier,
      name: "Location",
      formatLabel: formatLabel(address, handleAddressChange),
    }),
    [address, handleAddressChange]
  );

  return (
    <Dropdown
      label={labelProps}
      classes={classes}
      isOpen={isOpen}
      onOpenClose={handleOpenClose}
      value={place}
    >
      <>
        {/* Left Panel */}
        <div className="w-72 border-r border-gray-100">
          {/* Popular Locations */}
          <div className="px-4 py-4">
            <h3 className="text-sm text-gray-500 mb-2">Popular Locations</h3>
            <div className="space-y-2">
              {popularCitiesState.data?.map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationSelect(location)}
                  className={`flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50 ${
                    selectedLocation?.id === location.id ? "bg-gray-50" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {location?.image ? (
                      <Image
                        src={location.image}
                        alt={location.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : null}
                    <span className="text-sm font-medium text-gray-900">
                      {location.name}
                    </span>
                  </div>
                  {/** TODO: change this to icon */}
                  {">"}
                </button>
              ))}
            </div>
          </div>

          {/* Recent Searches */}
          <div className="px-4 pb-4">
            <h3 className="text-sm text-gray-500 mb-2">Recent Searches</h3>
            <div className="space-y-2">
              {recentSearchesState.data?.map((search) => (
                <button
                  key={search.mapboxId}
                  /** TODO: Fix this */
                  onClick={() =>
                    handleDistrictSelect(search as unknown as District)
                  }
                  className="flex items-center gap-2 w-full p-2 rounded-lg hover:bg-gray-50"
                >
                  <ItemMapPin />
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      {search.name}
                    </div>
                    <div className="text-xs text-gray-500">
                      {/** TODO: Change this */}
                      Address description name
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Panel (Districts) */}
        {selectedLocation?.id && (
          <div className="w-72 p-4">
            <h3 className="text-sm text-gray-500 mb-4">
              Districts in {selectedLocation.name}
            </h3>
            <div className="space-y-2 max-h-[240px] overflow-y-auto custom-scrollbar">
              <button
                key="all"
                onClick={() => handleDistrictSelect()}
                className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50"
              >
                <div className="flex items-center gap-2">
                  <ItemMapPin />
                  <div className="text-left">
                    <div className="text-sm font-medium text-gray-900">
                      All Districts
                    </div>
                    <div className="text-xs text-gray-500">
                      {selectedLocation.children.length} Districs
                    </div>
                  </div>
                </div>
              </button>
              {selectedLocation.children.map((district) => (
                <button
                  key={district.id}
                  onClick={() => handleDistrictSelect(district)}
                  className="flex items-center justify-between w-full p-2 rounded-lg hover:bg-gray-50"
                >
                  <div className="flex items-center gap-2">
                    <ItemMapPin />
                    <div className="text-left">
                      <div className="text-sm font-medium text-gray-900">
                        {parseDistrictName(district.name)}
                      </div>
                      <div className="text-xs text-gray-500">
                        {district.postal_code}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </>
    </Dropdown>
  );
};
