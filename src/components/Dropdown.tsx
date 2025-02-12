"use client";

import { ComponentType, ReactNode, useEffect, useRef } from "react";

type BaseSelectorProps<T> = {
  label: {
    Icon: ComponentType;
    formatLabel: (value: T) => ReactNode;
    name: string;
  };
  value: T;
  children: React.ReactNode;
  classes?: {
    button?: string;
    overlay?: string;
    container?: string;
  };
  isOpen: boolean;
  onOpenClose: (value: boolean) => void;
  disabled?: boolean;
};

export function Dropdown<T>({
  classes = {},
  label,
  value,
  children,
  isOpen,
  onOpenClose,
  disabled = false,
}: BaseSelectorProps<T>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { button = "", overlay = "", container = "" } = classes;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onOpenClose(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onOpenClose]);

  return (
    <div className={`relative w-full ${container}`.trim()} ref={containerRef}>
      <button
        onClick={() => onOpenClose(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors w-full ${button}`.trim()}
        disabled={disabled}
      >
        <label.Icon />
        <div className="flex flex-col items-start text-left w-full">
          <span className="text-sm font-medium text-gray-900">
            {label.name}
          </span>
          <span className="text-sm text-gray-500 w-full">
            {label.formatLabel(value)}
          </span>
        </div>
      </button>
      {isOpen && (
        <div
          className={`absolute z-10 mt-2 bg-white rounded-lg shadow-lg border border-gray-100 ${overlay}`.trim()}
        >
          {children}
        </div>
      )}
    </div>
  );
}
