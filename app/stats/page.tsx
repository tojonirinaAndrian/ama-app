"use client";

import MembersListComponent from "../components/attendance/attendanceMembersListComponent";
import StatsSearchComponent from "../components/stats/statsSearchComponent";

import {
  CaretDoubleUpIcon,
  CaretDoubleDownIcon,
  CaretDownIcon,
  CaretRightIcon,
  CaretLeftIcon,
  CalendarIcon,
} from "@phosphor-icons/react";
import { useState } from "react";

type StatCardProps = {
  title: string;
  value: string;
};

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

const summaryCards = [
  { title: "General attendance rate", value: "90%" },
  { title: "Session days number", value: "36" },
];

// const voiceStats = [
//   { title: "1, Soprano", value: "45%" },
//   { title: "2, Alto", value: "20%" },
//   { title: "3, Tenor", value: "80%" },
//   { title: "4, Bass", value: "95%" },
//   { title: "5, Musicians", value: "95%" },
// ];

function StatCard({ title, value }: StatCardProps) {
  return (
    <div className="w-full rounded border bg-white p-3 md:p-5 space-y-2 md:space-y-5">
      <p className="text-gray-600">{title}</p>
      <p className="text-3xl md:text-5xl font-semibold">{value}</p>
    </div>
  );
}

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
      <div className="flex justify-between items-start w-full">
        <div className={`flex flex-col xl:gap-2 ${mainRise && "hidden"}`}>
          <h2 className="font-semibold xl:text-5xl text-2xl block py-2">
            Stats
          </h2>
          <p className="text-gray-500">
            {`Check the choir's statistics here.`}
          </p>
        </div>
        <button className="p-2.5 px-4 cursor-pointer border-gray-500 rounded border flex gap-2 items-center ml-auto">
          <CalendarIcon size={18} />
          {pageConfig.dateRange}
        </button>
      </div>

      <div className={`space-y-2 bg-gray-50/20 border rounded p-2 ${mainRise ? "hidden" : ""}`}>
        <div className="w-full flex gap-2">
          {summaryCards.map((card) => (
            <StatCard key={card.title} title={card.title} value={card.value} />
          ))}
        </div>
        {/* <div className="*:min-w-35 overflow-auto w-full flex *:w-full *:bg-white *:rounded gap-2 *:border">
          {voiceStats.map((card) => (
            <StatCard key={card.title} title={card.title} value={card.value} />
          ))}
        </div> */}
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
          <div className="p-3 flex flex-col w-full h-full gap-3 overflow-auto">
            <StatsSearchComponent />
            <MembersListComponent />
            <PaginationControls currentPage={1} itemsPerPage={20} totalItems={120} />
          </div>
          {/* TODO: Add mock users */}
        </div>
      </div>
    </div>
  );
}

