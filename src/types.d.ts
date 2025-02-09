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
