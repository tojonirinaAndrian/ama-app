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
import { useAttendanceStore } from "@/app/stores/attendance-store";
export default function DatePickerSection() {
  const { actualDateMark, setActualDateMark, actualDateView, setActualDateView } = useAttendanceStore();

  const [popoverOpen, setPopoverOpen] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const { activeSection } = useAttendanceStore()

  return (
    <div className="flex items-center">
      <div className="not-xl:hidden">
        <Popover open={popoverOpen}
          onOpenChange={setPopoverOpen}
        >
          <PopoverTrigger
          >
            <p
              className="p-2.5 px-4 border-gray-500 text-black border flex gap-2 items-center rounded-md cursor-pointer"
            >
              <CalendarIcon size={18} />
              {activeSection === "mark" ?
                <span>{new Date(actualDateMark).toLocaleDateString("en-GB")}</span>
                :
                <span>{new Date(actualDateView).toLocaleDateString("en-GB")}</span>
              }
            </p>
          </PopoverTrigger>
          <PopoverContent align="end" className="p-0 border-0">
            <CustomCalendar
              closeComponent={() => setPopoverOpen(false)}
              currentlyChosenDate={activeSection === "mark" ? new Date(actualDateMark) : new Date(actualDateView)}
              setCurrentlyChosenDate={activeSection === "mark" ? setActualDateMark : setActualDateView}
            />

          </PopoverContent>
        </Popover>
      </div>
      <div className="xl:hidden">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger
          // disabled={membresPresents.length > 0}
          >
            <p
              className="p-2.5 px-4 border-gray-500 text-black border flex gap-2 items-center rounded-md cursor-pointer"
            >
              <CalendarIcon size={18} />
                <span>{new Date(actualDateMark).toLocaleDateString("en-GB")}</span>
            </p>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="text-left">
              <DialogTitle className="font-bold">
                Choose a date
              </DialogTitle>
              <DialogDescription>
                {"Le "}
                <span className="xl:font-semibold font-bold">
                  {activeSection === "mark" ? new Date(actualDateMark).toLocaleDateString("en-GB") : new Date(actualDateView).toLocaleDateString("en-GB")}
                </span>
              </DialogDescription>
            </DialogHeader>
            <CustomCalendar
              closeComponent={() => setDialogOpen(false)}
              currentlyChosenDate={activeSection === "mark" ? new Date(actualDateMark) : new Date(actualDateView)}
              setCurrentlyChosenDate={activeSection === "mark" ? setActualDateMark : setActualDateView}
            />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}