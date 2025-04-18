"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Plan } from "@/types/plan";
import { auth, db } from "@/utils/firestore";
import { signInAnonymously } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function PlanView() {
  const { plan_id } = useParams();
  const [plans, setPlans] = useState<Plan[] | undefined>();

  // Usando useMemo para memorizar a seleção do plano
  const selectedPlan = useMemo(
    () => plans?.find((p) => p.id === plan_id),
    [plan_id, plans]
  );

  // Fetch das informações de plano
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
    };
    fetchPlans();
  }, []);

  return (
    <div className="col-span-2 p-4 m-2 border-2 rounded-lg">
      {selectedPlan ? (
        <>
          <div className="flex items-center justify-between">
            <h1 className="text-3xl">{selectedPlan.prompt}</h1>
          </div>
          <Separator />
          <div className="flex flex-col gap-4 p-2">
            {selectedPlan.schedule.map((item, i) => (
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
                          checked={selectedPlan.schedule[i].subjects[j].done}
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
          <h1 className="text-2xl">Carregando...</h1>
        </div>
      )}
    </div>
  );
}
