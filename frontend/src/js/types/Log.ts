import {GetItem} from "./Item";

export type GetLog = {
  _id: string;
  user: string;
  item: GetItem;
  quantity: number;
  timestamp: string;
  type: "borrow" | "return";
  status: string;
}

export type PatchLog = Partial<GetLog>