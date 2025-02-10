import React, { useState, useEffect, useRef, useMemo } from "react";
import { BarChart, Bar, Cell } from "recharts";
import { HandCoin } from "./Icons";

type PriceRangeProps = {
  onChange: (priceRange: PriceRange) => void;
  data?: HistogramChartData;
  isLoading: boolean;
  hasError: boolean;
};

function parseDataRange(data?: HistogramChartData) {
  return { min: data?.range[0] || 0, max: data?.range[1] || 0 };
}
export const PriceRange = ({
  data,
  onChange,
  hasError,
  isLoading,
}: PriceRangeProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [range, setRange] = useState(parseDataRange(data));
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRange(parseDataRange(data));
  }, [data]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        containerRef.current = null;
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const maxPrice = useMemo(() => data?.range[1], [data]);
  const dataIsInvalid = maxPrice === null || hasError;
  // Handle mouse movement for sliding
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const slider = document.getElementById("price-slider");
      if (!isDragging || !slider || !maxPrice) return;

      const rect = slider.getBoundingClientRect();
      // mouse position x
      const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      const percentage = x / rect.width;
      const value = Math.round(percentage * maxPrice);

      setRange((prev) => {
        const newRange = {
          ...prev,
          [isDragging]: value,
        };

        if (isDragging === "min" && value > prev.max) {
          newRange.min = prev.max;
        } else if (isDragging === "max" && value < prev.min) {
          newRange.max = prev.min;
        }

        return newRange;
      });
    };

    const handleMouseUp = () => {
      setIsDragging(null);
      onChange?.(range);
    };

    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, onChange, range, maxPrice]);

  // Get button label based on selected range
  const getButtonLabel = () => {
    if (dataIsInvalid) {
      return "Invalid histogram data";
    }
    if (range.min === 0 && range.max === 0) {
      return "Select Price Range";
    }
    if (isLoading) return "";

    return `€${range.min.toLocaleString()} - €${range.max.toLocaleString()}`;
  };

  // Calculate bar colors
  const getBarColor = (price: number) => {
    if (price >= range.min && price <= range.max) {
      return "#A855F7";
    }
    return "#EDE9FE";
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Button Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full ${
          dataIsInvalid ? "opacity-60" : ""
        }`}
        disabled={dataIsInvalid}
      >
        <HandCoin />
        <div className="flex flex-col items-start">
          <span className="text-sm font-medium text-gray-900">Price</span>
          <span
            className={`text-sm ${
              dataIsInvalid ? "text-red-500" : "text-gray-500"
            }`}
          >
            {getButtonLabel()}
          </span>
        </div>
      </button>

      {/* Dropdown Content */}
      {isOpen && data?.histogram && maxPrice && (
        <div className="absolute z-10 mt-2 right-0">
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 w-[560px]">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Price Range
            </h2>

            {/* Histogram with Range Slider */}
            <div className="relative mb-8" id="price-slider">
              <BarChart
                width={500}
                height={100}
                margin={{ top: 5, right: 0, left: 0, bottom: 5 }}
                data={data.histogram}
              >
                <Bar dataKey="count" radius={[2, 2, 0, 0]}>
                  {data.histogram.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getBarColor(data.histogram[index].price)}
                    />
                  ))}
                </Bar>
              </BarChart>

              {/* Custom Range Slider */}
              <div className="absolute inset-x-0 bottom-0 h-2 bg-transparent">
                <div className="absolute inset-y-0 bg-purple-100 rounded-full w-full" />
                <div
                  className="absolute inset-y-0 bg-purple-600"
                  style={{
                    left: `${(range.min / maxPrice) * 100}%`,
                    right: `${100 - (range.max / maxPrice) * 100}%`,
                  }}
                />
                <button
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-md border-2 border-purple-600 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                  style={{ left: `${(range.min / maxPrice) * 100}%` }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDragging("min");
                  }}
                />
                <button
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow-md border-2 border-purple-600 cursor-grab active:cursor-grabbing hover:scale-110 transition-transform"
                  style={{ left: `${(range.max / maxPrice) * 100}%` }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setIsDragging("max");
                  }}
                />
              </div>
            </div>

            {/* Input Fields */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Min
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={range.min.toFixed(2)}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setRange((prev) => ({ ...prev, min: value }));
                    }}
                    className="block w-full pl-3 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    €
                  </span>
                </div>
              </div>

              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={range.max.toFixed(2)}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setRange((prev) => ({ ...prev, max: value }));
                    }}
                    className="block w-full pl-3 pr-8 py-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                    placeholder="0.00"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
                    €
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
