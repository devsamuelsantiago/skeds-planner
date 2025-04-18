"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { Data } from "@/types/data";
import { useState } from "react";
import { PlusIcon } from "lucide-react";

const formSchema = z.object({
  title: z.string().max(100, {
    message: "Título pode ter no máximo 100 caractéres.",
  }),
  description: z.string().max(1000, {
    message: "Descrição pode ter no máximo 1000 caractéres.",
  }),
  schedules: z.array(z.string()),
});

export default function NewPlanView() {
  const [schedules, setSchedules] = useState<Data[]>([
    { id: 1, title: "", time: "", subjects: [] },
  ]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      schedules: [],
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    console.log(values);
  }

  return (
    <main className="flex justify-center items-center p-8 h-full w-full">
      <div className="w-[30%] space-y-4">
        <h1 className="flex w-full text-3xl font-bold">Novo Plano</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Título</FormLabel> */}
                  <FormControl>
                    <Input placeholder="Título" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel>Título</FormLabel> */}
                  <FormControl>
                    <Textarea placeholder="Descrição" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="schedules"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <div className="flex flex-row items-center justify-between w-full">
                      <h1 className="text-xl">Horários</h1>
                      <Button
                        className="w-5 h-5"
                        onClick={() =>
                          setSchedules([
                            ...schedules,
                            {
                              id: schedules.length + 1,
                              title: "",
                              time: "",
                              subjects: [],
                            },
                          ])
                        }
                      >
                        <PlusIcon />
                      </Button>
                    </div>
                  </FormLabel>
                  <div className="flex flex-col items-center gap-2 w-full">
                    {schedules.map((schedule, index) => (
                      <div
                        key={index}
                        className="flex flex-row justify-stretch gap-2 w-full"
                      >
                        <FormField
                          name={`schedules.${index}.title`}
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Título do horário</FormLabel> */}
                              <FormControl>
                                <Input
                                  placeholder="Ex: Manhã, Tarde"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name={`schedules.${index}.time`}
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Hora</FormLabel> */}
                              <FormControl>
                                <Input type="time" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          name={`schedules.${index}.subjects`}
                          
                          render={({ field }) => (
                            <FormItem>
                              {/* <FormLabel>Hora</FormLabel> */}
                              <FormControl>
                                <Textarea {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
