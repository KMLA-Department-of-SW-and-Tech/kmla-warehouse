export default interface Item {
    _id: string; // Unique identifier for the item
    name: string; // Name of the item
    description: string; // Description of the item
    quantity: number; // Available quantity of the item
    location: string; // Location of the item
    imageUrl?: string; // Optional image URL for the item
    status?: "available" | "deleted"; // Availability status
  }