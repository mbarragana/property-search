export function Stats({
  count,
  isLoading,
}: {
  count?: number;
  isLoading: boolean;
}) {
  return (
    <div className="mt-24 text-white/80 text-center">
      {isLoading ? (
        <div className="flex flex-col items-center gap-2 animate-pulse">
          {/* First line skeleton - numbers */}
          <div className="h-7 w-48 bg-white/20 rounded-full"></div>

          {/* Second line skeleton - description */}
          <div className="h-5 w-72 bg-white/20 rounded-full"></div>
        </div>
      ) : (
        <p className="text-lg">
          <span className="font-medium">{count} verified listings</span>
          <br />
          <span className="text-sm italic">
            for apartments, houses, offices and more
          </span>
        </p>
      )}
    </div>
  );
}
