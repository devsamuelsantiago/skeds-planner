"use client";
import "../globals.css";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Home } from "lucide-react";
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
  CommandItem,
  CommandList,
} from "@/components/ui/command";
// import { useState } from "react";
import type { Plan } from "@/types/plan";
import { useEffect, useState } from "react";
import { signInAnonymously } from "@firebase/auth";
import { auth, db } from "@/utils/firestore";
import { collection, getDocs, query, where } from "@firebase/firestore";
import Link from "next/link";

export default function LayoutView() {
  const [open, setOpen] = useState(false);
  // const [loading, setLoading] = useState(true);
  const [plans, setPlans] = useState<Plan[]>();

  // useEffect(() => {
  //   const authenticate = async () => {
  //     onAuthStateChanged(auth, async (user) => {
  //       if (!user) {
  //         const cred = await signInAnonymously(auth);
  //         setUserId(cred.user.uid);
  //       } else {
  //         setUserId(user.uid);
  //       }
  //     });
  //   };
  //   authenticate();
  // }, []);

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
      // setLoading(false);
    };
    fetchPlans();
  }, []);

  return (
    <div className="flex items-center justify-between px-8 top-0 w-full h-16">
      <div className="flex items-center justify-content-start gap-10">
        <div>
          <Link href="/">
            <Button>
              <Home />
            </Button>
          </Link>
        </div>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-[200px] justify-between"
            >
              Selecionar planos...
              <ChevronDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0">
            <Command>
              <CommandList>
                <CommandEmpty>...</CommandEmpty>
                <CommandGroup>
                  {plans &&
                    plans.map((plan) => (
                      <CommandItem
                        key={plan.id}
                        value={plan.prompt}
                        onSelect={() => {
                          setOpen(false);
                        }}
                      >
                        <a href={"/plan/" + plan.id}>{plan.prompt}</a>
                      </CommandItem>
                    ))}
                  <CommandItem>
                    <a href="/dashboard">Gerenciar planos</a>
                  </CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      <div className="flex items-center justify-content-start gap-10">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}
