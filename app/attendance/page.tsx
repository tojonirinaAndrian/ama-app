"use client";

import { useAttendanceStore } from "../stores/attendance-store";
// import { Button } from "@/components/ui/button";
import DatePickerSection from "../components/attendance/datePickerSectionComponent";
import MembersListComponent from "../components/attendance/attendanceMembersListComponent";
import SearchComponent from "../components/attendance/attendanceSearchComponent";
import VoicePickerComponent from "../components/attendance/attendanceVoiceFilterComponent";
import { CaretDoubleUpIcon, CaretDoubleDownIcon } from "@phosphor-icons/react";
import { useState } from "react";
import AttendedFilterComponent from "../components/attendance/attendedFilterComponent";

import CancelAllMarksComponent from "../components/attendance/cancelAllMarksComponent";

const ACTIVE_STYLE = "text-blue-700! border-blue-700!";

export default function Attendance() {
  const { activeSection, setActiveSection } = useAttendanceStore();
  const [mainRise, setMainRise] = useState<boolean>(false);
  const [isCancelingAll, setIsCancelingAll] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full gap-3 xl:gap-5">
      <div className={`flex flex-col xl:gap-2 ${mainRise && "hidden"}`}>
        <h2 className="font-semibold xl:text-5xl text-2xl block py-2">
          Attendance
        </h2>
        <p className="text-gray-500">
          {`Confirm or verify choir members' attendance here.`}
        </p>
      </div>
      <div className="relative">
        <button className="bg-gray-50 border border-gray-200 rounded p-1.5 sm:px-2 absolute right-2 -top-1 xl:top-0 z-2 cursor-pointer hover:bg-gray-100 flex gap-1 text-gray-800"
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
          <div className="*:hover:cursor-pointer w-full flex *:w-full *:md:p-5 *:p-4 *:border-b-2 *:border-transparent text-gray-400">
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
            <div className="flex gap-2">
              <DatePickerSection />
              <VoicePickerComponent />
            </div>
            {(activeSection === "view") && <AttendedFilterComponent />}

            <div className="flex justify-between">
              <SearchComponent />

              {/* TODO: Only in Mark section */}
              {/* after the user starts to enter his first attendance mark, this button should appear, 
              if no marked user for the set date, no button */}
              {activeSection === "mark" && <div className="not-md:hidden flex">
                <CancelAllMarksComponent isCancelingAll={isCancelingAll} setIsCancelingAll={setIsCancelingAll} />
              </div>
              }

            </div>
            <MembersListComponent />
            {activeSection === "mark" && <div className="md:hidden flex *:w-full">
              <CancelAllMarksComponent isCancelingAll={isCancelingAll} setIsCancelingAll={setIsCancelingAll} />
            </div>
            }
          </div>
          {/* TODO: Add mock users */}
        </div>
      </div>
    </div>
  );
}
