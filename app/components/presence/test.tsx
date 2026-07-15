'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce'; // New dependency
import Image from 'next/image';
import { usePresenceStore } from '@/app/stores/presence-store';

// ... (Types remain the same) ...

export default function MembersListComponent() {
    const { searchInput } = usePresenceStore();
    
    // 1. Debounce the input: Only updates when user stops typing for 500ms
    const [debouncedSearch] = useDebounce(searchInput, 500);

    const {
        data,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        error,
    } = useInfiniteQuery({
        // 2. QueryKey now watches the debounced value, preventing spam
        queryKey: ['members', debouncedSearch], 

        initialPageParam: 0,

        queryFn: ({ pageParam }) => {
            return getMembers({ pageParam, search: debouncedSearch })
        },

        getNextPageParam: (lastPage) => {
            const nextSkip = lastPage.skip + lastPage.limit;
            return nextSkip < lastPage.total ? nextSkip : undefined;
        },

        staleTime: 1000 * 60 * 5,
    });

    const members = data?.pages.flatMap(page => page.members) ?? [];

    if (isLoading) return <p>Chargement...</p>;
    if (error) return <p>Erreur de chargement</p>;

    return (
        <div className="h-full border rounded overflow-auto flex flex-col gap-2 p-2.5 md:p-3">
            
            {members.map((member) => (
                <MemberComponent
                    key={member.id}
                    member={member}
                />
            ))}

            {/* 3. Replaced infinite scroll trigger with a manual button */}
            {hasNextPage && (
                <button
                    onClick={() => fetchNextPage()}
                    disabled={isFetchingNextPage}
                    className="w-full p-3 mt-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
                >
                    {isFetchingNextPage ? 'Chargement...' : 'Voir plus'}
                </button>
            )}
        </div>
    );
}