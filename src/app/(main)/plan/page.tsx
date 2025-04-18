import { plans } from "@/app/(main)/layout";
import PlanView from "./plan.view";

const data = plans[0].data;

export default function Plan() {

  return (
    <PlanView data={data} />
  );
}
