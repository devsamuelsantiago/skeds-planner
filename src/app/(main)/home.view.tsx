"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { auth, db } from "@/utils/firestore";
import { addDoc, collection, getDoc } from "@firebase/firestore";
import { signInAnonymously } from "@firebase/auth";
import { Plan } from "@/types/plan";
import { Textarea } from "@/components/ui/textarea";
import { ChevronRightIcon } from "lucide-react";

export default function HomeView() {
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<Plan>();

  const handleGenerate = async () => {
    setLoading(true);
    setPlan(undefined);
    try {
      const user = auth.currentUser || (await signInAnonymously(auth)).user;
      const res = await fetch("/api/generate-plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      const data = await res.json();
      console.log(data);
      const docRef = await addDoc(collection(db, "plans"), {
        userId: user.uid,
        prompt: prompt,
        schedule: data.plan.schedule,
      })
      const docSnap = await getDoc(docRef);
      const plan = docSnap.data() as Plan;
      setPlan(plan);
      
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <main className="max-w-2xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Gerar Plano</h1>
      <Textarea
        placeholder="Escreva seu objetivo (ex: aprender piano, entrar no shape...)"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <Button onClick={handleGenerate} disabled={loading}>
        {loading ? "Gerando..." : "Gerar Plano"}
      </Button>

      {plan && (
        <Card className="p-2 py-4 bg-background">
          <CardTitle className="flex justify-between px-4">
            <h1 className="text-2xl font-semibold">Seu Plano</h1>
            <a href={`/plan/${plan.id}`}><ChevronRightIcon /></a>
          </CardTitle>
          <CardContent className="px-5 space-y-3 ">
            {plan.schedule.map((item, i) => (
              <div key={i}>
                <strong className="text-lg">{item.day}</strong>
                <ul className="list p-4 space-y-2">
                  {item.subjects.map((subject, j) => (
                    <li key={j} className="flex flex-row items-center gap-2 p-1 px-2 transition-all hover:bg-accent rounded-md">
                      <h1 className="text-md"> {subject.subject}</h1>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </main>
  );
}
