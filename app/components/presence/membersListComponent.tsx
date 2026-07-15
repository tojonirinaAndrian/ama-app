'use client';

import { useQuery } from '@tanstack/react-query';

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

async function getMembers(): Promise<MemberType[]> {
  const response = await fetch('https://dummyjson.com/users?limit=30');

  if (!response.ok) {
    throw new Error('Failed to fetch members');
  }

  const data = await response.json();

  return data.users.map((user: DummyUser, index: number) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
    username: user.username,
    image: user.image,
    ...voiceTypes[index % voiceTypes.length],
  }));
}

type MemberComponentProps = {
  member: MemberType;
};

function MemberComponent({ member }: MemberComponentProps) {
  return (
    <div className="w-full border rounded p-3 flex gap-2 items-center">
      <img
        src={member.image}
        alt={member.name}
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
  const {
    data: members = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['members'],
    queryFn: getMembers,
    staleTime: 1000 * 60 * 5,
  });

  if (isLoading) {
    return (
      <div className="p-4">
        Chargement...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        Impossible de charger les membres.
      </div>
    );
  }

  return (
    <div className="h-full border rounded overflow-auto flex flex-col gap-2 p-2.5 md:p-3">
      {members.map((member) => (
        <MemberComponent
          key={member.id}
          member={member}
        />
      ))}
    </div>
  );
}