import Item from "./Item";

export default interface Reservation {
  _id: string;
  item: Item;
  quantity: number;
  user: object;
  timestamp: Date;
}