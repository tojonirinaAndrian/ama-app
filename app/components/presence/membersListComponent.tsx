'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
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
        `/api/users?limit=20&skip=${pageParam}&search=${encodeURIComponent(search)}`
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
                <p className="font-semibold">{member.name}</p>
                <p className="text-gray-500 text-sm">@{member.username}</p>
                <p className="text-gray-500 capitalize text-sm">
                    {member.voiceNumber}, {member.voiceAppellation}
                </p>
            </div>
        </div>
    );
}

export default function MembersListComponent() {
    const { searchInput } = usePresenceStore();

    // 1. Debounce the search input to limit API calls while typing
    const [debouncedSearch] = useDebounce(searchInput, 500);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        // Query relies on the debounced value, preventing immediate spam
        queryKey: ['members', debouncedSearch],

        initialPageParam: 0,

        queryFn: ({ pageParam }) => {
            return getMembers({ pageParam, search: debouncedSearch });
        },

        // 2. Robust page verification logic to hide "Voir plus" precisely
        getNextPageParam: (lastPage) => {
            // Guard: If we receive an empty array or fewer items than the limit, we are at the end
            if (!lastPage.members || lastPage.members.length < lastPage.limit) {
                return undefined;
            }

            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? nextSkip : undefined;
        },

        staleTime: 1000 * 60 * 5,
    });

    const members = data?.pages.flatMap((page) => page.members) ?? [];

    if (isLoading) {
        return <p>Chargement...</p>;
    }

    if (error) {
        return <p>Erreur de chargement</p>;
    }

    return (
        <div className="h-full border rounded overflow-auto flex flex-col gap-2 p-2.5 md:p-3">
            {members.map((member) => (
                <MemberComponent key={member.id} member={member} />
            ))}

            {/* 3. Conditional rendering check ensures list contains items before showing the button */}
            {hasNextPage && members.length > 0 && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="w-full p-3 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                    {isFetchingNextPage ? 'Chargement...' : 'Voir plus'}
                </button>
            )}
        </div>
    );
}