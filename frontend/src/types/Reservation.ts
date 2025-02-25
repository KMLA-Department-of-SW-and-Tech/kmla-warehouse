import Item from "./Item";

export default interface Reservation {
  _id: string;
  item: Item;
  quantity: number;
  type: "borrow" | "return";
  user: string;
  timestamp: string;
  status: string;
}