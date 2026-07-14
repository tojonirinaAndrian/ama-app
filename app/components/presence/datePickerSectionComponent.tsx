'use client';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import CustomCalendar from "../customCalendar";
// import { Button } from "@/components/ui/button";

import {
  DialogTrigger,
  DialogContent,
  DialogTitle,
  Dialog,
  DialogHeader,
  DialogDescription,
} from "@/components/ui/dialog";
import { CalendarIcon } from "@phosphor-icons/react";
import { useState } from "react";

// type MembreType = {
//   id: number;
//   cheminImage: string;
//   nom: string;
//   prenoms: string;
//   pourcentage: number;
// };

export default function DatePickerSection() {
  const [actualDateFaire, setActualDateFaire] = useState<Date>(new Date());
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  return (
    <div className="flex gap-4 w-full items-center">
      <p className="text-gray-500">
        {"Le "}
        <span className="xl:font-semibold font-bold">
          {actualDateFaire.toLocaleDateString("en-GB")}
        </span>
      </p>
      <div className="not-xl:hidden">
        <Popover>
          <PopoverTrigger 
          // disabled={membresPresents.length > 0}
          >
            <p
              className="p-2 border-gray-600 text-black border flex gap-2 items-center rounded-md cursor-pointer"
            >
              <CalendarIcon size={18} />
              Modifier la date
            </p>
          </PopoverTrigger>
          <PopoverContent align="end" className="p-0 border-0">
            <CustomCalendar
              
              currentlyChosenDate={actualDateFaire}
              setCurrentlyChosenDate={setActualDateFaire}
            />

          </PopoverContent>
        </Popover>
      </div>
      <div className="xl:hidden">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger 
          // disabled={membresPresents.length > 0}
          >
            <span
              className="p-2 border-gray-600 border text-black flex gap-2 items-center rounded-md cursor-pointer"
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
              closeDialog={() => setDialogOpen(false)}
              currentlyChosenDate={actualDateFaire}
              setCurrentlyChosenDate={setActualDateFaire}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}