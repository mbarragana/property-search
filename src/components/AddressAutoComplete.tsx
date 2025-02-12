import React, { ChangeEvent } from "react";
import { AddressAutofill } from "@mapbox/search-js-react";

type AddressAutoCompleteProps = {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  value: string;
};
export function AddressAutoComplete({
  onChange,
  placeholder,
  value,
}: AddressAutoCompleteProps) {
  return (
    <form>
      {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
      {/* @ts-ignore */}
      <AddressAutofill accessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN || ""}>
        <input
          type="text"
          autoComplete="shipping address-line1"
          value={value}
          onChange={onChange}
          className="border-none outline-none bg-transparent focus:ring-0 w-full"
          placeholder={placeholder}
        />
      </AddressAutofill>
    </form>
  );
}
