"use client";

import MembersListComponent from "../components/attendance/attendanceMembersListComponent";
import StatsSearchComponent from "../components/stats/statsSearchComponent";
import StatsVoiceFilter from "../components/stats/statsVoiceFilter";

import {
  CaretDoubleUpIcon,
  CaretDoubleDownIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretLeftIcon,
  CalendarIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

type PaginationControlsProps = {
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
};

const pageConfig = {
  title: "Stats",
  description: "Check the choir's statistics here.",
  dateRange: "01 Jan - 01 April",
};

const voiceStats = [
  { voiceNumber: 1, value: 90, voiceAppellation: "soprano" },
  { voiceNumber: 2, value: 65, voiceAppellation: "alto" },
  { voiceNumber: 3, value: 59, voiceAppellation: "tenor" },
  { voiceNumber: 4, value: 10, voiceAppellation: "bass" },
  { voiceNumber: 5, value: 100, voiceAppellation: "musician" },
];

function PaginationControls({
  currentPage,
  itemsPerPage,
  totalItems,
}: PaginationControlsProps) {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const visiblePages = Array.from({ length: Math.min(totalPages, 5) }, (_, index) => index + 1);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  return (
    <div className="not-md:flex-col gap-3 flex w-full justify-between text-gray-600 items-center">
      <div className="flex gap-10 items-center">
        <div className="flex gap-2 items-center">
          <span>Show</span>
          <button className="p-2 border border-gray-200 rounded text-black flex gap-2 items-center cursor-pointer">
            {itemsPerPage} <CaretDownIcon />
          </button>
          <span>per page</span>
        </div>
        <div>
          {startItem} - {endItem} of {totalItems}
        </div>
      </div>
      <div className="flex gap-5">
        <button className="w-10 py-2 flex justify-center items-center border border-gray-200 hover:bg-gray-100 cursor-pointer rounded">
          <CaretLeftIcon />
        </button>
        <div className="flex gap-2 *:border *:border-gray-200 *:hover:bg-gray-100 *:w-10 *:py-2 text-center *:rounded">
          {visiblePages.map((page) => (
            <button
              key={page}
              className={`cursor-pointer ${page === currentPage ? "bg-gray-100" : ""}`}
            >
              {page}
            </button>
          ))}
          {totalPages > 5 ? <button>...</button> : null}
          {totalPages > 5 ? (
            <button className="cursor-pointer">{totalPages}</button>
          ) : null}
        </div>
        <button className="w-10 py-2 flex justify-center items-center border border-gray-200 hover:bg-gray-100 cursor-pointer rounded">
          <CaretRightIcon />
        </button>
      </div>
    </div>
  );
}

export default function List() {
  const [mainRise, setMainRise] = useState<boolean>(false);

  return (
    <div className="flex flex-col h-full gap-3 xl:gap-5">
      <div className="flex justify-between items-center w-full">
        <div className={`${mainRise && "hidden"}`}>
          <h2 className="font-semibold xl:text-4xl text-2xl">
            Stats
          </h2>
        </div>
        <button className="p-2.5 px-4 cursor-pointer border-gray-500 rounded border flex gap-2 items-center ml-auto">
          <CalendarIcon size={18} />
          {pageConfig.dateRange}
        </button>
      </div>

      <div className={`space-y-2 bg-gray-50/20 border rounded p-2 ${mainRise ? "hidden" : ""}`}>
        <div className="w-full flex gap-2 flex-col">
          <div className="w-full rounded border bg-white p-3 md:p-5 space-y-2 md:space-y-5">
            <p className="text-gray-600">{"Overall rate"}</p>
            <p className="text-3xl md:text-5xl font-semibold">{90}%</p>
          </div>
          <div className="flex gap-2 not-md:flex-col">
            <div className="bg-white border w-full flex flex-col gap-1 *:p-2 *:px-3 rounded text-gray-500 *:last:border-b-0 *:border-b">
              {voiceStats.map((stat) => {
                return <div key={stat.voiceNumber} className="flex justify-between items-center">
                  <p className="capitalize">{stat.voiceAppellation}</p>
                  <p className={`p-1 px-2 rounded ${stat.value >= 60 && "bg-green-100 text-green-700"}
                    ${(stat.value < 60 && stat.value >= 30) && "bg-yellow-100 text-yellow-700"}
                    ${(stat.value < 30) && "bg-red-100 text-red-700"}
                    `}>{stat.value}%</p>
                </div>
              })}
            </div>
            <div className="w-full rounded border bg-white p-3 md:p-5 space-y-2 md:space-y-5">
              <p className="text-gray-600">{"Session days"}</p>
              <p className="text-3xl md:text-5xl font-semibold">{25} days</p>
            </div>
          </div>
        </div>
        {/* <div className="*:min-w-35 overflow-auto w-full flex *:w-full *:bg-white *:rounded gap-2 *:border">
          {voiceStats.map((card) => (
            <StatCard key={card.title} title={card.title} value={card.value} />
          ))}
        </div> */}
      </div>

      <div className="relative">
        <button className="bg-gray-50 border border-gray-200 rounded p-1.5 sm:px-2 absolute right-2 -top-2 xl:-top-1 z-2 cursor-pointer hover:bg-gray-100 flex gap-1 text-gray-800"
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
          <div className="p-3 flex flex-col w-full h-full gap-3 overflow-auto">
            <div className="flex gap-2 md:justify-between">
              <StatsSearchComponent />
              <StatsVoiceFilter />
            </div>
            <MembersListComponent />
            <PaginationControls currentPage={1} itemsPerPage={20} totalItems={120} />
          </div>
          {/* TODO: Add mock users */}
        </div>
      </div>
    </div>
  );
}

