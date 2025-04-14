import type { Subject } from "./subject";

export type Data = {
  id: number;
  title: string;
  time: string;
  subjects: Subject[];
}