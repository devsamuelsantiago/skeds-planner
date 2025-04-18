"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plan } from "@/types/plan";
import { auth, db } from "@/utils/firestore";
import { signInAnonymously } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { ChevronRight } from "lucide-react";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PlanView() {
  const { plan_id } = useParams();
  // const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<Plan | undefined>();
  const [plans, setPlans] = useState<Plan[] | undefined>();
  // const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    const fetchPlans = async () => {
      const user = auth.currentUser || (await signInAnonymously(auth)).user;
      const userId = user.uid;
      const q = query(collection(db, "plans"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const plansData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as Omit<Plan, "id">),
      }));
      setPlans(plansData);
      setSelected(plansData.filter((d) => d.id === plan_id)[0]);
    };
    fetchPlans();
  }, [plan_id]);

  // useEffect(() => {
  //   if (data.length > 0) {
  //     setSelected(data[0]);
  //   }
  // }, [data]);

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="grid grid-cols-3 w-[70%]">
        <div className="col-start-1 p-4 m-2 border-2 rounded-lg h-fit">
          <div>
            <h1 className="text-2xl font-bold">Planos</h1>
          </div>
          <Separator />
          <div className="flex flex-col gap-4 p-2">
            {plans &&
              plans.map((item) => (
                <div key={item.id}>
                  {/* <h2 className="text-xl mb-1">{item.time}</h2> */}
                  <Button
                    className="flex justify-between p-3 bg-primary text-black w-full rounded-lg"
                    // onClick={() =>
                    //   setSelected(plans.filter((d) => d.id === item.id)[0])
                    // }
                  >
                    <a href={`/plan/${item.id}`} className="flex items-center justify-between w-full">
                      <p>{item.prompt}</p>
                      <ChevronRight color="black" />
                    </a>
                  </Button>
                </div>
              ))}
          </div>
        </div>
        <div className="col-span-2 p-4 m-2 border-2 rounded-lg">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">{selected.prompt}</h1>
                {/* <h2 className="text-xl font-light">{selected.time}</h2> */}
              </div>
              <Separator />
              <div className="flex flex-col gap-4 p-2">
                {selected.schedule.map((item, i) => (
                  <div key={i}>
                    <strong className="text-lg">{item.day}</strong>
                    <ul className="list p-4 space-y-2">
                      {item.subjects.map((subject, j) => (
                        <li
                          key={j}
                          className="flex flex-row items-center gap-2 p-1 px-2 transition-all hover:bg-accent rounded-md"
                        >
                          <Label className="text-md">
                            <Checkbox
                              onCheckedChange={() => {}}
                              checked={selected.schedule[i].subjects[j].done}
                            />{" "}
                            {subject.subject}
                          </Label>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
                <div className="grid grid-cols-2 space-x-2">
                  <Button variant={"destructive"}>Descartar alterações</Button>
                  <Button>Salvar</Button>
                </div>
              </div>
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <h1 className="text-2xl">Selecione uma matéria</h1>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
