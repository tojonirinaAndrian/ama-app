'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useEffect } from 'react'; // NEW
import { useInView } from 'react-intersection-observer'; // NEW
import Image from 'next/image';
import { usePresenceStore } from '@/app/stores/presence-store';

type MemberType = {
    id: number;
    name: string;
    username: string;
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
];

type MembersResponse = {
    members: MemberType[];
    total: number;
    skip: number;
    limit: number;
};

async function getMembers({
    pageParam,
    search
}: {
    pageParam: number,
    search: string
}): Promise<MembersResponse> {

    const response = await fetch(
        `/api/users?limit=20&skip=${pageParam}&search=${search}`
    );

    if (!response.ok) {
        throw new Error('Failed to fetch members');
    }

    const data = await response.json();

    return {
        members: data.users.map((user: DummyUser, index: number) => ({
            id: user.id,
            name: `${user.firstName} ${user.lastName}`,
            username: user.username,
            image: user.image,
            ...voiceTypes[index % voiceTypes.length],
        })),

        total: data.total,
        skip: data.skip,
        limit: data.limit,
    };
}

function MemberComponent({ member }: { member: MemberType }) {
    return (
        <div className="w-full border rounded p-3 flex gap-2 items-center">
            <Image
                src={member.image}
                alt={member.name}
                width={100}
                height={100}
                className="w-14 h-14 rounded-full object-cover"
            />

            <div className="flex flex-col">
                <p className="font-semibold">
                    {member.name}
                </p>

                <p className="text-gray-500 text-sm">
                    @{member.username}
                </p>

                <p className="text-gray-500 capitalize text-sm">
                    {member.voiceNumber}, {member.voiceAppellation}
                </p>
            </div>
        </div>
    );
}


export default function MembersListComponent() {
    const { searchInput } = usePresenceStore();

    // NEW: create a watcher element
    const {
        ref,
        inView,
    } = useInView({
        threshold: 0,
    });

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        queryKey: ['members', searchInput],

        initialPageParam: 0,

        queryFn: ({pageParam}) => {
            return getMembers({pageParam, search: searchInput})
        },

        getNextPageParam: (lastPage) => {
            const nextSkip =
                lastPage.skip + lastPage.limit;

            return nextSkip < lastPage.total
                ? nextSkip
                : undefined;
        },

        staleTime: 1000 * 60 * 5,
    });

    // NEW: trigger loading when bottom is visible
    useEffect(() => {
        if (inView && hasNextPage && !isFetchingNextPage) {
            fetchNextPage();
        }
    }, [
        inView,
        hasNextPage,
        isFetchingNextPage,
        fetchNextPage,
    ]);

    const members =
        data?.pages.flatMap(
            page => page.members
        ) ?? [];

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Erreur de chargement</p>;
    }

    return (
        <div className="h-full border rounded overflow-auto flex flex-col gap-2 p-2.5 md:p-3">
            
            {/* {searchInput} */}
            
            {members.map((member) => (
                <MemberComponent
                    key={member.id}
                    member={member}
                />
            ))}


            {/* NEW: invisible trigger at the bottom */}
            <div ref={ref} className="h-5">
                {isFetchingNextPage && (
                    <p>
                        Chargement...
                    </p>
                )}
            </div>

        </div>
    );
}