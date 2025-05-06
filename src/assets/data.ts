import shirt from "../assets/shirt.jpg";

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  countInStock: number;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description:
      "Premium wireless headphones with noise cancellation technology for an immersive audio experience. Enjoy up to 30 hours of battery life and comfortable ear cushions for extended listening sessions.",
    price: 129.99,
    image: shirt,
    category: "Electronics",
    countInStock: 20,
  },
  {
    id: "2",
    name: "Smart Watch",
    description:
      "Track your fitness goals, receive notifications, and more with this sleek smart watch. Features include heart rate monitoring, sleep tracking, and water resistance up to 50 meters.",
    price: 199.99,
    image: shirt,
    category: "Electronics",
    countInStock: 20,
  },
  {
    id: "3",
    name: "Portable Bluetooth Speaker",
    description:
      "Take your music anywhere with this compact yet powerful Bluetooth speaker. Enjoy rich, clear sound and up to 12 hours of playtime on a single charge.",
    price: 79.99,
    image: shirt,
    category: "Electronics",
    countInStock: 20,
  },
  {
    id: "4",
    name: "Cotton T-Shirt",
    description:
      "Classic fit cotton t-shirt made from 100% organic cotton. Soft, comfortable, and perfect for everyday wear.",
    price: 24.99,
    image: shirt,
    category: "Clothing",
    countInStock: 20,
  },
  {
    id: "5",
    name: "Denim Jeans",
    description:
      "Premium quality denim jeans with a modern fit. Made from sustainable materials and designed to last.",
    price: 59.99,
    image: shirt,
    category: "Clothing",
    countInStock: 20,
  },
  {
    id: "6",
    name: "Running Shoes",
    description:
      "Lightweight and responsive running shoes designed for comfort and performance. Features include cushioned soles and breathable mesh upper.",
    price: 89.99,
    image: shirt,
    category: "Clothing",
    countInStock: 20,
  },
  {
    id: "7",
    name: "Coffee Maker",
    description:
      "Programmable coffee maker with 12-cup capacity. Features include auto shut-off, brew strength control, and a reusable filter.",
    price: 49.99,
    image: shirt,
    category: "Home & Kitchen",
    countInStock: 20,
  },
  {
    id: "8",
    name: "Non-Stick Cookware Set",
    description:
      "10-piece non-stick cookware set including pans, pots, and utensils. Dishwasher safe and suitable for all stovetops.",
    price: 129.99,
    image: shirt,
    category: "Home & Kitchen",
    countInStock: 20,
  },
  {
    id: "9",
    name: "Bestselling Novel",
    description:
      "The latest bestselling novel from a renowned author. Immerse yourself in a captivating story of adventure and discovery.",
    price: 19.99,
    image: shirt,
    category: "Books",
    countInStock: 20,
  },
];
