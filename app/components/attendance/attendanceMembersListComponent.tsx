'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import Image from 'next/image';
import { useAttendanceStore } from '@/app/stores/attendance-store';
import { useRef, useEffect, useState } from 'react'; // 1. Import useRef and useEffect
import { ArrowCounterClockwiseIcon } from "@phosphor-icons/react"
import { Skeleton } from '@/components/ui/skeleton';

type MemberType = {
    id: number;
    name: string;
    voiceNumber: number;
    voiceAppellation: string;
    image: string;
};

type DummyUser = {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    image: string;
};

const voiceTypes = [
    { voiceNumber: 1, voiceAppellation: 'soprano' },
    { voiceNumber: 2, voiceAppellation: 'alto' },
    { voiceNumber: 3, voiceAppellation: 'tenor' },
    { voiceNumber: 4, voiceAppellation: 'bass' },
    { voiceNumber: 5, voiceAppellation: 'musician' },
];

type MembersResponse = {
    members: MemberType[];
    total: number;
    skip: number;
    limit: number;
};

async function getMembers({
    pageParam,
    search,
    voiceNumber
}: {
    pageParam: number,
    search: string,
    voiceNumber: number
}): Promise<MembersResponse> {

    const response = await fetch(
        `/api/users?limit=20&skip=${pageParam}&search=${encodeURIComponent(search)}&voiceNumber=${voiceNumber}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch members');
    }

    const data = await response.json();

    return {
        members: data.users.map((user: DummyUser, index: number) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            image: user.image,
            ...voiceTypes[index % voiceTypes.length],
        })),
        total: data.total,
        skip: data.skip,
        limit: data.limit,
    };
}

function MemberComponentSkeleton() {
    return <>
        <div className={`cursor-pointer w-full border-2 rounded p-3 flex gap-2 items-center`}
        >
            <Skeleton
                className="w-10 h-10 md:w-12 md:h-12 rounded-full"
            />
            <div className="flex flex-col w-full gap-2">
                <Skeleton className="w-[50%] h-4" />
                <Skeleton className="w-[20%] h-4" />
            </div>
        </div>
    </>
};

function MemberComponent({ member }: { member: MemberType }) {
    const [present, setPresent] = useState<boolean>(false);
    const { activeSection } = useAttendanceStore();

    const onComponentClick = () => {
        if (activeSection === "view") return
        if (!present) setPresent(true);
    };

    return (
        <div className="relative">
            {(present && activeSection === "mark") && <div
                onClick={() => { setPresent(false) }}
                className="z-1 text-sm cursor-pointer flex gap-1 right-2 top-2 items-center hover:bg-yellow-200/80 absolute p-2 bg-yellow-100 rounded-md text-yellow-700 border border-yellow-200">
                <ArrowCounterClockwiseIcon />
                <span className="not-md:hidden">Cancel</span>
            </div>}

            <div className={`${activeSection === "view" ? "cursor-default" : `${!present && "cursor-pointer hover:bg-gray-50"}`} w-full border rounded p-3 flex gap-2 items-center ${present ? "border-green-200 cursor-default bg-green-50" : "bg-white"}`}
                onClick={onComponentClick}
            >
                <Image
                    src={member.image}
                    alt={member.name}
                    width={100}
                    height={100}
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />
                <div className="flex flex-col">
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-gray-500 capitalize text-sm">
                        {member.voiceNumber}, {member.voiceAppellation}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function AttendanceMembersListComponent() {
    const { searchInput, voiceNumber } = useAttendanceStore();
    const [debouncedSearch] = useDebounce(searchInput, 500);

    // 2. Create a reference to the scrollable container
    const containerRef = useRef<HTMLDivElement>(null);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ['members', debouncedSearch, voiceNumber],
        initialPageParam: 0,
        queryFn: ({ pageParam }) => {
            return getMembers({ pageParam, search: debouncedSearch, voiceNumber });
        },
        getNextPageParam: (lastPage) => {
            if (!lastPage.members || lastPage.members.length < lastPage.limit) {
                return undefined;
            }
            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? nextSkip : undefined;
        },
        staleTime: 1000 * 60 * 5,
    });

    // 3. Reset scroll to top whenever the search query changes
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
    }, [debouncedSearch]);

    const members = data?.pages.flatMap((page) => page.members) ?? [];

    if (isLoading) {
        return <div
            className="h-full bg-gray-50/20 border rounded overflow-hidden flex flex-col gap-2 p-2.5 md:p-3"
        >
            {<MemberComponentSkeleton />}
            {<MemberComponentSkeleton />}
            {<MemberComponentSkeleton />}
            {<MemberComponentSkeleton />}
            {<MemberComponentSkeleton />}
            {<MemberComponentSkeleton />}
            {<MemberComponentSkeleton />}
            {<MemberComponentSkeleton />}
        </div>;
    }

    if (error) {
        return <p>Loading error</p>;
    }

    return (
        /* 4. Attach the ref to this overflow-auto element */
        <div
            ref={containerRef}
            className="h-full bg-gray-50/20 border rounded overflow-auto flex flex-col gap-2 p-2"
        >
            {members.length >= 1 ? <>
                {members.map((member) => (
                    <MemberComponent key={member.id} member={member} />
                ))}
            </> : <>
                <p className="p-2 text-gray-500">{"There's no one here."}</p>
            </>}
            {hasNextPage && members.length > 0 && (
                <button
                    onClick={() => fetchNextPage()}
                    className={` ${isFetchingNextPage && "hidden"} cursor-pointer w-full p-3 border border-gray-500 rounded-md hover:bg-gray-100 disabled:opacity-50`}
                >
                    {'See more'}
                </button>
            )}
            {isFetchingNextPage && <>
                {<MemberComponentSkeleton />}
                {<MemberComponentSkeleton />}
                {<MemberComponentSkeleton />}
            </>}
        </div>
    );
}