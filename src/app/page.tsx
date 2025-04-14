import type { Data } from "@/types/data";
import HomeView from "./home.view";

type Props = {
  data: Data[];
};

export default function Home({ data }: Props) {

  return (
    <HomeView data={data} />
  );
}
