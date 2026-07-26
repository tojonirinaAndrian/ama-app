'use client';
import { useStatsStore } from "@/app/stores/stats-store";
import SearchComponent from "../searchComponent"

export default function StatsSearchComponent() {
    const { searchInput, setSearchInput } = useStatsStore();
    const props = {
        searchInput,
        setSearchInput
    };
    return <SearchComponent props={props}/>
}