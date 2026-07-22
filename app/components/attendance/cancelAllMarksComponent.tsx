import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react";

import {
    DialogTrigger,
    DialogContent,
    DialogTitle,
    Dialog,
    DialogHeader,
    DialogDescription,
} from "@/components/ui/dialog";

import { useAttendanceStore } from "@/app/stores/attendance-store";

export default function CancelAllMarksComponent({ isCancelingAll, setIsCancelingAll }: {
    isCancelingAll: boolean, setIsCancelingAll: (value: boolean) => void
}) {
    const { actualDateMark } = useAttendanceStore();

    return <Dialog open={isCancelingAll} onOpenChange={setIsCancelingAll}>
        <DialogTrigger>
            <p
                className="cursor-pointer hover:bg-yellow-300/65 bg-yellow-200 rounded-md text-yellow-700 border border-yellow-500 flex gap-1 items-center px-3 p-2 not-md:p-3"
            >
                <ArrowCounterClockwiseIcon />
                <span>
                    Cancel All
                </span>
            </p>
        </DialogTrigger>
        <DialogContent className={"md:text-base!"}>
            <DialogHeader className="text-left">
                <DialogTitle className="font-bold text-red-500">
                    Cancel all marks ?
                </DialogTitle>
                <DialogDescription>
                    You will lose all markings for <span className="font-medium">{new Date(actualDateMark).toLocaleDateString("en-GB")}</span>
                </DialogDescription>
            </DialogHeader>
            <div className="gap-2 flex *:p-3 *:w-full *:border *:rounded-md *:cursor-pointer">
                <button className="border-gray-500 hover:bg-gray-50/80"
                    onClick={() => setIsCancelingAll(false)}
                >Keep progress</button>
                <button className="text-red-700 hover:bg-red-300/80 bg-red-200 border-red-500">Reset</button>
            </div>
        </DialogContent>
    </Dialog>
}