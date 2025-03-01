type BaseItem = {
    name: string; // Name of the item
    description: string; // Description of the item
    quantity: number; // Available quantity of the item
    location: string; // Location of the item
};

export type GetItem = BaseItem & {
    _id: string; // Unique identifier for the item
    totalQuantity: number;
    status: "valid" | "deleted"; // Availability status
    imageUrl: string; // image URL for the item
    imageKey: string;
};

export type PostItem = BaseItem & {
    image?: File;
};

export type PatchItem = Partial<GetItem>;