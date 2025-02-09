"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import * as Icons from "./Icons";
import { useState } from "react";

type CategorySelectorProps = {
  onSelect: (category: Category) => void;
};

const ALL_OPTION: Category = {
  id: "all",
  name: "All Categories",
};

const LoadingSkeleton = () => (
  <div className="py-2">
    {[...Array(5)].map((_, index) => (
      <div
        key={index}
        className="flex items-center gap-3 px-4 py-2 animate-pulse"
      >
        <div className="w-5 h-5 bg-gray-200 rounded" />
        <div className="h-4 bg-gray-200 rounded w-32" />
      </div>
    ))}
  </div>
);

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const {
    data = [],
    error,
    isLoading,
  } = useSWR("/api/categories", fetcher<Category[]>);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    setIsOpen(false);
    onSelect?.(category);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50 transition-colors"
      >
        <Icons.HouseBuilding />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-900">Category</span>
          <span className="text-sm text-gray-500">
            {selectedCategory ? selectedCategory.name : "Select Category"}
          </span>
        </div>
      </button>

      {isOpen &&
        (isLoading ? (
          <LoadingSkeleton />
        ) : (
          <div className="absolute z-10 w-64 mt-2 bg-white rounded-lg shadow-lg border border-gray-100">
            <div className="py-2">
              {[ALL_OPTION].concat(data).map((category) => {
                const Icon = Icons[category.icon as keyof typeof Icons];
                return (
                  <button
                    key={category.id}
                    onClick={() => handleCategorySelect(category)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    {/* <Icon className="w-5 h-5 text-purple-500" /> */}
                    {Icon ? <Icon /> : null}
                    <span
                      className={
                        category.id === "all"
                          ? "text-base font-semibold text-gray-900"
                          : ""
                      }
                    >
                      {category.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
    </div>
  );
}
