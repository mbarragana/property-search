"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import * as Icons from "../components/Icons";
import { useState } from "react";
import { Dropdown } from "@/components/Dropdown";

type CategorySelectorProps = {
  onSelect: (category: number | string) => void;
};

const ALL_OPTION: Category = {
  id: "all",
  name: "All Categories",
};

const labelProps = {
  Icon: Icons.HouseBuilding,
  name: "Category",
  formatLabel: (value: Category | null) =>
    value ? value.name : "Select Category",
};

const classes = {
  container: "min-w-64",
  overlay: "w-full",
};

export function CategorySelector({ onSelect }: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data = [] } = useSWR("/api/categories", fetcher<Category[]>);

  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );

  const handleCategorySelect = (category: Category) => {
    setSelectedCategory(category);
    onSelect?.(category.id === "all" ? "" : category.id);
    setIsOpen(false);
  };

  return (
    <Dropdown
      value={selectedCategory}
      label={labelProps}
      classes={classes}
      isOpen={isOpen}
      onOpenClose={setIsOpen}
    >
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
    </Dropdown>
  );
}
