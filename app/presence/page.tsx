"use client";

import { usePresenceStore } from "../stores/presence-store";
// import { Button } from "@/components/ui/button";
import DatePickerSection from "../components/presence/datePickerSectionComponent";
import SearchComponent from "../components/presence/searchComponent";
import VoicePickerComponent from "../components/presence/voiceFilterComponent";
import { CaretDoubleUpIcon, CaretDoubleDownIcon } from "@phosphor-icons/react";
import { useState } from "react";

const ACTIVE_STYLE = "text-black! border-black!";

export default function Presence() {
  const { activeSection, setActiveSection } = usePresenceStore();
  const [mainRise, setMainRise] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full gap-3 xl:gap-5">
      <div className={`flex flex-col gap-3 xl:gap-5 ${mainRise && "hidden"}`}>
        <div className="flex flex-col gap-3">
          <h2 className="font-semibold text-5xl hidden xl:block py-2">
            Présence
          </h2>
          <p className="text-gray-500">
            Confirmez ou vérifiez la présence des membres de la Chorale ici.
          </p>
        </div>
        <div className="w-full h-px bg-gray-100 not-xl:hidden"></div>
        <div className="flex gap-2 items-center text-gray-700">
          <DatePickerSection />
        </div>
      </div>
      <div className="relative h-full">
        <button className="bg-gray-100 border border-gray-200 rounded p-1.5 absolute -right-1 -top-3.5 z-2"
        onClick={() => {
          setMainRise(!mainRise)
        }}
        >
          {mainRise ? <CaretDoubleDownIcon />
            : <CaretDoubleUpIcon />}
        </button>
        <div className="h-full overflow-y-auto flex flex-col border rounded-md border-gray-100 relative">
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
          <div className="p-2 flex flex-col w-full">
            <div className="flex not-md:flex-col gap-1 w-full">
              <VoicePickerComponent />
              <SearchComponent />
            </div>
          </div>
          {/* TODO: Add mock users */}
        </div>
      </div>
    </div>
  );
}
