'use client';
import { useAttendanceStore } from "@/app/stores/attendance-store";
import SearchComponent from "../searchComponent"

export default function AttendanceSearchComponent() {
    const { searchInput, setSearchInput } = useAttendanceStore();
    const props = {
        searchInput,
        setSearchInput
    };
    return <SearchComponent props={props}/>
}