import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function  () {
    return <>
    <div className="p-3 flex flex-col">
        <div className="border flex gap-2 items-center p-3 rounded border-gray-200 bg-gray-50">
        <MagnifyingGlassIcon />
        <input type="text" className="w-full" placeholder="
        Rechercher un membre..."/>
        
        </div>
    </div>
    </>
}