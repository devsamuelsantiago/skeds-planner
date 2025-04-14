"use client";
import "./globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Menu } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
// import { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./page";
import type { Plan } from "@/types/plan";

type Props = {
  plans: Plan[];
};

export default function LayoutView({ plans }: Props) {
  // const [open, setOpen] = useState(false);

  return (
    <>
      <BrowserRouter>
        <div className="flex items-center justify-between px-8 top-0 w-full h-16">
          <div className="flex items-center justify-content-start gap-10">
            <Menu />
            <Popover>
              <PopoverTrigger asChild>
                <Button role="combobox" className="h-7">
                  <p>Plano de estudos para o ENEM</p>
                  <ChevronDown size={20} />
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <Command>
                  <CommandInput placeholder="Procurar..." />
                  <CommandList>
                    <CommandEmpty>...</CommandEmpty>
                    <CommandGroup>
                      {plans.map((plan) => (
                        <Link key={plan.id} to={`/plan/${plan.id}`}>
                          <CommandItem
                            value={plan.title}
                            // onSelect={() => {
                            //   setOpen(false);
                            // }}
                          >
                            {plan.title}
                          </CommandItem>
                        </Link>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            [alguma coisa]
          </div>
          <div className="flex items-center justify-content-start gap-10">
            [alguma coisa]
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
        </div>
        <Routes>
          {plans.map((plan) => (
            <Route
              key={plan.id}
              path={`/plan/${plan.id}`}
              element={<div><Home data={plan.data}/></div>}
            />
          ))}
        </Routes>
      </BrowserRouter>
    </>
  );
}
