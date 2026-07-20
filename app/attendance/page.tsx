"use client";

import { useAttendanceStore } from "../stores/attendance-store";
// import { Button } from "@/components/ui/button";
import DatePickerSection from "../components/attendance/datePickerSectionComponent";
import MembersListComponent from "../components/attendance/membersListComponent";
import SearchComponent from "../components/attendance/searchComponent";
import VoicePickerComponent from "../components/attendance/voiceFilterComponent";
import { CaretDoubleUpIcon, CaretDoubleDownIcon, WarningIcon } from "@phosphor-icons/react";
import { useState } from "react";
import AttendedFilterComponent from "../components/attendance/attendedFilterComponent";

const ACTIVE_STYLE = "text-black! border-black!";

export default function Attendance() {
  const { activeSection, setActiveSection } = useAttendanceStore();
  const [mainRise, setMainRise] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full gap-3 xl:gap-5">
      <div className={`flex flex-col gap-3 xl:gap-5 ${mainRise && "hidden"}`}>
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-5xl hidden xl:block py-2">
          Attendance
          </h2>
          <p className="text-gray-500">
            Confirm or verify choir members' attendance here.
          </p>
        </div>
        <div className="w-fit flex gap-3 items-center text-red-400 border-2 border-red-300 bg-red-50 p-3 rounded-md">
          <WarningIcon size={32} className="" weight="bold" />
          <div className="flex flex-col">
            <p className="font-bold">
              IMPORTANT !!!
            </p>
            <p>
            If you mark attendance here, the date will no longer be editable after your first save.
            </p>
          </div>
        </div>
      </div>
      <div className="relative">
        <button className="bg-gray-100 border border-gray-200 rounded p-1.5 absolute right-2 -top-1 xl:top-0 z-2 cursor-pointer hover:bg-gray-200 flex gap-1 text-gray-800"
          onClick={() => {
            setMainRise(!mainRise)
          }}
        >
          {mainRise ? <CaretDoubleDownIcon />
            : <CaretDoubleUpIcon />}
          <span className="not-md:hidden text-xs">
            {mainRise ? "Collapse"
              : "Expand"}
          </span>
        </button>
      </div>
      <div className="relative h-full flex flex-col overflow-auto">

        <div className="h-full flex flex-col border rounded-md border-gray-100 relative overflow-auto">
          <div className="*:hover:cursor-pointer w-full flex *:w-full *:p-5 *:border-b-2 *:border-transparent font-semibold text-gray-400">
            <button
            onClick={() => setActiveSection("mark")}
            className={`${activeSection === "mark" ? ACTIVE_STYLE : ""}`}
            >
            Mark attendance
            </button>
            <button
              onClick={() => setActiveSection("view")}
              className={`${activeSection === "view" ? ACTIVE_STYLE : ""}`}
            >
              View present members
            </button>
          </div>
          <div className="p-3 flex flex-col w-full h-full gap-3 overflow-auto">
            <div className="flex gap-2 w-full">
              <DatePickerSection />
              <VoicePickerComponent />
            </div>
            {(activeSection === "voir") && <AttendedFilterComponent />}
            <SearchComponent />
            <MembersListComponent />
          </div>
          {/* TODO: Add mock users */}
        </div>
      </div>
    </div>
  );
}
