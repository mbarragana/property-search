"use client";

import useSWR from "swr";
import { fetcher } from "@/utils";
import * as Icons from "../components/Icons";
import { useState } from "react";
import { Dropdown as TDropdown } from "@/components/Dropdown";

const Dropdown = TDropdown<Category | undefined>;

type CategorySelectorProps = {
  onSelect: (category: Category | undefined) => void;
  category?: Category;
};

const ALL_OPTION: Category = {
  id: "all",
  name: "All Categories",
};

const labelProps = {
  Icon: Icons.HouseBuilding,
  name: "Category",
  formatLabel: (value: Category | undefined) =>
    value ? value.name : "Select Category",
};

const classes = {
  overlay: "w-full",
};

export function CategorySelector({
  onSelect,
  category,
}: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data = [] } = useSWR("/api/categories", fetcher<Category[]>);

  const handleCategorySelect = (category: Category) => {
    onSelect?.(category.id === "all" ? undefined : category);
    setIsOpen(false);
  };

  return (
    <Dropdown
      value={category}
      label={labelProps}
      classes={classes}
      isOpen={isOpen}
      onOpenClose={setIsOpen}
    >
      <div className="py-2">
        {[ALL_OPTION].concat(data).map((categoryItem) => {
          const Icon = Icons[categoryItem.icon as keyof typeof Icons];
          return (
            <button
              key={categoryItem.id}
              onClick={() => handleCategorySelect(categoryItem)}
              className="w-full flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
            >
              {/* <Icon className="w-5 h-5 text-purple-500" /> */}
              {Icon ? <Icon /> : null}
              <span
                className={
                  categoryItem.id === "all"
                    ? "text-base font-semibold text-gray-900"
                    : ""
                }
              >
                {categoryItem.name}
              </span>
            </button>
          );
        })}
      </div>
    </Dropdown>
  );
}
