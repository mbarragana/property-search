type Category = {
  id: number | string;
  name: string;
  icon?: string;
};

type RecentSearch = {
  mapboxId: string;
  type: string;
  name: string;
  pt: [number, number];
};

type City = {
  image: string;
  name: string;
  id: string;
  postal_code: string;
  children: Array<District>;
};

type District = {
  name: string;
  id: string;
  postal_code: string;
};

type PriceRange = {
  min?: number;
  max?: number;
};

type HistogramData = {
  range: [number, number];
  histogram: Array<number>;
};

type HistogramChartData = {
  range: [number, number];
  histogram: Array<{ count: number; price: number }>;
};
