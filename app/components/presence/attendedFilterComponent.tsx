import { usePresenceStore } from "@/app/stores/presence-store";

const ACTIVE_STYLE = "bg-white !text-black"
const INACTIVE_STYLE = "hover:bg-gray-50/50";

export default function AttendedFilterComponent () {
    const { activeSeeSectionFilter, setActiveSeeSectionFilter } = usePresenceStore()
    
    return <>
    <div className="w-full xl:w-[45%] md:w-[60%]  p-1 bg-gray-200/50 gap-1 *:cursor-pointer text-gray-600 font-semibold rounded *:w-full flex *:p-2 *:rounded-md">
        <button 
        onClick={() => {
            if (activeSeeSectionFilter !== "tous") setActiveSeeSectionFilter("tous")
        }}
        className={(activeSeeSectionFilter === "tous") ? ACTIVE_STYLE : INACTIVE_STYLE}
        >Tous</button>
        <button 
        onClick={() => {
            if (activeSeeSectionFilter !== "presents") setActiveSeeSectionFilter("presents")
        }}
        className={(activeSeeSectionFilter === "presents") ? ACTIVE_STYLE : INACTIVE_STYLE}
        >Presents</button>
        <button 
        onClick={() => {
            if (activeSeeSectionFilter !== "absents") setActiveSeeSectionFilter("absents")
        }}
        className={(activeSeeSectionFilter === "absents") ? ACTIVE_STYLE : INACTIVE_STYLE}
        >Absents</button>
    </div>
    </>
}