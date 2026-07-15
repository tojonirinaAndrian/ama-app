type MemberType = {
    id: string,
    name: string,
    username: string,
    voiceNumber: number,
    voiceAppellation: string
}

const mockMembers: MemberType[] = [{
    id: "1",
    name: "Andrianjafiniaina",
    username: "Misandratra",
    voiceAppellation: "tenor",
    "voiceNumber": 3,
}, {
    id: "2",
    name: "Andrianjafiniaina",
    voiceAppellation: "tenor",
    username: "Misandratriniavo Tojo",
    "voiceNumber": 3
}, {
    id: "3",
    voiceAppellation: "tenor",
    name: "Andrianjafiniaina",
    username: "Misandratra",
    "voiceNumber": 3
}]

type MemberComponentType = {
    member: MemberType
}

function MemberComponent({ member }: MemberComponentType) {
    return <div className="w-full border rounded p-3 flex gap-2 items-center">
        <div className="bg-black rounded-full p-5"></div>
        <div className="flex flex-col">
            <p className="text-pretty font-semibold">
                <span className="">
                    {member.name}
                </span> <span>
                    {member.username}
                </span></p>
            <p className="text-gray-500 capitalize md:text-sm text-xs">
                {member.voiceNumber}, {member.voiceAppellation}
            </p>
        </div>
    </div>
}

export default function MembersListComponent() {
    return <>
        <div className="h-full border rounded overflow-auto flex flex-col gap-2 p-2.5 md:p-3">
            {mockMembers.map((member, i) => {
                return <MemberComponent member={member} key={i} />
            })}
            {mockMembers.map((member, i) => {
                return <MemberComponent member={member} key={i} />
            })}
            {mockMembers.map((member, i) => {
                return <MemberComponent member={member} key={i} />
            })}
        </div>
    </>
}