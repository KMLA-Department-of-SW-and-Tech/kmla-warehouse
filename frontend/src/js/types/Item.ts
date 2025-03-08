export type GetItem = {
    _id: string; // Unique identifier for the item
    name: string; // Name of the item
    description: string; // Description of the item
    totalQuantity: number; // Total quantity
    quantity: number; // Available quantity of the item

    location?: string; // Location of the item
    status?: "valid" | "deleted"; // Availability status
    imageUrl?: string; // image URL for the item
    imageKey?: string;
};

export type FormItem = {
    name: string; // Name of the item
    description: string; // Description of the item
    quantity: number; // Available quantity of the item
    location: string; // Location of the item
    imageUrl?: { file: File, fileList: any };
};

export type PatchItem = Partial<GetItem>; // needs fixation
