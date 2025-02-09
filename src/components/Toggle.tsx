import React from "react";
import { SearchTypes } from "@/utils";

function selectedClass(isSelected: boolean) {
  return isSelected
    ? "bg-purple-600 text-white w-[142px]"
    : "text-gray-700 hover:bg-gray-50";
}

type ToggleGroupProps = {
  onChange: (type: SearchTypes) => void;
  value: SearchTypes;
};

export const ToggleGroup = ({ value, onChange }: ToggleGroupProps) => {
  return (
    <div className="inline-flex items-center bg-white rounded-full shadow-sm">
      <button
        onClick={() => onChange(SearchTypes.rent)}
        className={`w-[142px] py-5 rounded-full text-m transition-colors ${selectedClass(
          value === SearchTypes.rent
        )}`}
      >
        Rent
      </button>

      <button
        onClick={() => onChange(SearchTypes.buy)}
        className={`w-[142px] py-5 rounded-full text-m transition-colors ${selectedClass(
          value === SearchTypes.buy
        )}`}
      >
        Buy
      </button>

      <button
        disabled
        className="w-[142px] py-4 rounded-full text-m text-gray-400 cursor-not-allowed"
      >
        Lystio A.I
      </button>
    </div>
  );
};
