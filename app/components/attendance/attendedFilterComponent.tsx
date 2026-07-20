import { useAttendanceStore } from "@/app/stores/attendance-store";

const ACTIVE_STYLE = "bg-white !text-black"
const INACTIVE_STYLE = "hover:bg-gray-50/50";

export default function AttendedFilterComponent () {
    const { activeSeeSectionFilter, setActiveSeeSectionFilter } = useAttendanceStore()
    
    return <>
    <div className="w-full xl:w-[45%] md:w-[60%]  p-1 bg-gray-200/50 gap-1 *:cursor-pointer text-gray-400 font-semibold rounded *:w-full flex *:p-2 *:rounded-md">
        <button 
        onClick={() => {
            if (activeSeeSectionFilter !== "all") setActiveSeeSectionFilter("all")
        }}
        className={(activeSeeSectionFilter === "all") ? ACTIVE_STYLE : INACTIVE_STYLE}
        >All</button>
        <button 
        onClick={() => {
            if (activeSeeSectionFilter !== "present") setActiveSeeSectionFilter("present")
        }}
        className={(activeSeeSectionFilter === "present") ? ACTIVE_STYLE : INACTIVE_STYLE}
        >Present</button>
        <button 
        onClick={() => {
            if (activeSeeSectionFilter !== "absent") setActiveSeeSectionFilter("absent")
        }}
        className={(activeSeeSectionFilter === "absent") ? ACTIVE_STYLE : INACTIVE_STYLE}
        >Absent</button>
    </div>
    </>
}