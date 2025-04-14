import type { Data } from "./data";

export type Plan = {
  id: number;
  title: string;
  description: string;
  data: Data[];
};