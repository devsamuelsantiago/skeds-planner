"use client";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plan } from "@/types/plan";
import { auth, db } from "@/utils/firestore";
import { signInAnonymously } from "@firebase/auth";
import { collection, getDocs, query, where } from "@firebase/firestore";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Layout({ children }: { children: React.ReactNode }) {
  const [plans, setPlans] = useState<Plan[] | undefined>();
  const router = useRouter();

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
    <main className="flex flex-col items-center justify-between p-8">
      <div className="grid grid-cols-3 w-[70%]">
        {/* Lista de planos */}
        <div className="col-start-1 p-4 m-2 border-2 rounded-lg h-fit">
          <div>
            <h1 className="text-2xl font-bold">Planos</h1>
          </div>
          <Separator />
          <div className="flex flex-col gap-4 p-2">
            {plans &&
              plans.map((item) => (
                <div key={item.id}>
                  <Button
                    className="flex justify-between p-3 bg-primary text-black w-full rounded-lg"
                    onClick={() => {
                      // Usando push do useRouter para navegação sem recarregar a página
                      router.push(`/plan/${item.id}`);
                    }}
                  >
                    <p>{item.prompt}</p>
                    <ChevronRight color="black" />
                  </Button>
                </div>
              ))}
          </div>
        </div>

        {children}
      </div>
    </main>
  );
}
