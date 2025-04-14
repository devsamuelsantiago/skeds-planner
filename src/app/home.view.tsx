"use client";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import type { Data } from "@/types/data";
import { ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

type Props = {
  data: Data[];
};

export default function HomeView({ data }: Props) {
  const [selected, setSelected] = useState<Data | undefined>(undefined);

  useEffect(() => {
    if (data.length > 0) {
      setSelected(data[0]);
    }
  }, [data]);

  return (
    <main className="flex flex-col items-center justify-between p-8">
      <div className="grid grid-cols-3 w-[80%]">
        <div className="col-start-1 p-4 m-2 border-2 rounded-lg h-fit">
          <div>
            <h1 className="text-2xl font-bold">Hoje</h1>
          </div>
          <Separator />
          <div className="flex flex-col gap-4 p-2">
            {data.map((item) => (
              <div key={item.id}>
                <h2 className="text-xl mb-1">{item.time}</h2>
                <Button className="flex justify-between p-3 bg-primary text-black w-full rounded-lg" onClick={() => setSelected(data.filter((d) => d.id === item.id)[0])}>
                  <p>{item.title}</p>
                  <ChevronRight color="black" />
                </Button>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 p-4 m-2 border-2 rounded-lg">
          {selected ? (
            <>
              <div className="flex items-center justify-between">
                <h1 className="text-3xl">{selected.title}</h1>
                <h2 className="text-xl font-light">{selected.time}</h2>
              </div>
              <Separator />
              <div className="flex flex-col gap-4 p-2">
                {selected.subjects.map((subject) => (
                  <div className="space-y-2" key={subject.title}>
                    <h2 className="text-2xl"> {subject.title}</h2>
                    <ul className="space-y-1 list-inside">
                      {
                        subject.topics.map((topic) => (
                          <li key={topic.title}>
                            <Checkbox className="mr-2" /> {topic.title}
                          </li>
                        ))
                      }
                    </ul>
                  </div>
                ))}
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
