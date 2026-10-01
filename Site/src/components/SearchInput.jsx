import { SearchIcon } from "./Icons";

function SearchInput({ value, onChange, placeholder, label, className = "" }) {
  return (
    <div className={`relative ${className}`}>
      <SearchIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-neutral-500" />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={label ?? placeholder}
        className="w-full rounded-full border border-neutral-700 bg-white py-2 pl-9 pr-4 text-sm placeholder:text-neutral-500"
      />
    </div>
  );
}

export default SearchInput;
