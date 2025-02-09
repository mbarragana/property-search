const CATEGORIES: Category[] = [
  {
    id: 2,
    name: "Apartment",
    icon: "FlatApartment",
  },
  {
    id: 3,
    name: "House",
    icon: "House",
  },
  {
    id: 1,
    name: "Rooms/Co-Living",
    icon: "Apartment",
  },
  {
    id: 5,
    name: "Commercial propety",
    icon: "Farm",
  },
  {
    id: 12,
    name: "New construction projects",
    icon: "Hotel",
  },
  {
    id: 11,
    name: "Holiday Homes",
    icon: "Yurt",
  },
  {
    id: 13,
    name: "Parking",
    icon: "Campervan",
  },
];

// Simulate CATEGORIES are requested from an API/database
// Probably api/database would not return icons mapped
// Handle map icons here based on id
export async function GET() {
  try {
    return Response.json(CATEGORIES);
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
