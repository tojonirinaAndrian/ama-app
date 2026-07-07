"use client";

import { CalendarIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { usePresenceStore } from "../stores/presence-store";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CustomCalendar from "../components/customCalendar";
import { Button } from "@/components/ui/button";
import {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";

type MembreType = {
  id: number;
  cheminImage: string;
  nom: string;
  prenoms: string;
  pourcentage: number;
};

const ACTIVE_STYLE = "text-black! border-black!";

export default function Presence() {
  const { activeSection, setActiveSection } = usePresenceStore();

  return (
    <div className="flex flex-col h-full gap-3 xl:gap-5">
      <div className="flex flex-col gap-3">
        <h2 className="font-semibold text-5xl hidden xl:block py-2">
          Présence
        </h2>
        <p className="text-gray-500">
          Confirmez ou vérifiez la présence des membres de la Chorale ici.
        </p>
      </div>
      <div className="w-full h-px bg-gray-100"></div>
      <div className="flex gap-2 items-center text-gray-700">
        <p>Pour la date du</p>
        <button className="font-semibold p-2 bg-gray-50/50 border-gray-100 rounded-md border hover:cursor-pointer">
          25/05/26
        </button>
      </div>
      <div className="h-full overflow-y-auto flex flex-col border rounded-md border-gray-100">
        <div className="*:hover:cursor-pointer w-full flex *:w-full *:p-5 *:border-b-2 *:border-transparent font-semibold text-gray-400">
          <button
            onClick={() => setActiveSection("faire")}
            className={`${activeSection === "faire" ? ACTIVE_STYLE : ""}`}
          >
            Faire la présence
          </button>
          <button
            onClick={() => setActiveSection("voir")}
            className={`${activeSection === "voir" ? ACTIVE_STYLE : ""}`}
          >
            Voir les présents
          </button>
        </div>
        <DatePickerSection />
      </div>
    </div>
  );
}

function DatePickerSection() {
  const [actualDateFaire, setActualDateFaire] = useState<Date>(new Date());
  const [membresPresents] = useState<MembreType[]>([]);

  return (
    <div className="flex justify-between w-full items-center">
      <p className="text-gray-500">
        {"Le "}
        <span className="xl:font-semibold font-bold">
          {actualDateFaire.toLocaleDateString("en-GB")}
        </span>
      </p>
      <div className="not-xl:hidden">
        <Popover>
          <PopoverTrigger disabled={membresPresents.length > 0}>
            <p
              className="font-normal p-2 border-black text-black flex gap-2 items-center rounded-md cursor-pointer"
            >
              <CalendarIcon size={18} />
              Modifier la date
            </p>
          </PopoverTrigger>
          <PopoverContent align="end" className="p-0 border-0">
            <CustomCalendar
              currentlyChoosedDate={actualDateFaire}
              setCurrentlyChoosedDate={setActualDateFaire}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="xl:hidden">
        <Dialog>
          <DialogTrigger disabled={membresPresents.length > 0}>
            <span
              className="font-normal p-2 border-black text-black flex gap-2 items-center rounded-md cursor-pointer"
            >
              <CalendarIcon size={18} />
              Modifier la date
            </span>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="text-left">
              <DialogTitle className="font-bold">
                Choisir une date
              </DialogTitle>
              <DialogDescription>
                {"Le "}
                <span className="xl:font-semibold font-bold">
                  {actualDateFaire.toLocaleDateString("en-GB")}
                </span>
              </DialogDescription>
            </DialogHeader>
            <CustomCalendar
              currentlyChoosedDate={actualDateFaire}
              setCurrentlyChoosedDate={setActualDateFaire}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}