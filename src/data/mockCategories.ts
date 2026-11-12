import type { Category } from "../types/admin";

export const mockCategories: Category[] = [
  {
    id: "cat-1",
    name: "Tropical",
    description: "Exotic tropical plants for indoor spaces",
    image: "/src/assets/categories/img-1.png",
    productCount: 25,
    status: "Active",
  },
  {
    id: "cat-2",
    name: "Low Light",
    description: "Plants that thrive in low light conditions",
    image: "/src/assets/categories/img-2.png",
    productCount: 18,
    status: "Active",
  },
  {
    id: "cat-3",
    name: "Air Purifying",
    description: "Plants known for their air cleaning properties",
    image: "/src/assets/categories/img-3.png",
    productCount: 22,
    status: "Active",
  },
  {
    id: "cat-4",
    name: "Flowering",
    description: "Beautiful flowering plants for your home",
    image: "/src/assets/categories/img-4.png",
    productCount: 15,
    status: "Active",
  },
  {
    id: "cat-5",
    name: "Succulents",
    description: "Low-maintenance succulent plants",
    image: "/src/assets/categories/img-5.png",
    productCount: 30,
    status: "Active",
  },
  {
    id: "cat-6",
    name: "Outdoor",
    description: "Plants perfect for outdoor gardens",
    image: "/src/assets/categories/img-6.png",
    productCount: 20,
    status: "Active",
  },
];
