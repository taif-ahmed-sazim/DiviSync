import { useMemo, useState } from "react";

import { groups as initialGroups } from "@/data/mockData";
import type {
  ICreateGroupInput,
  IGroup,
  IPerson,
} from "@/types/domain.interfaces";
import {
  createGroup,
  findGroupById,
  resolveGroupMembers,
} from "@/utils/group.helpers";

export function useGroups(people: IPerson[]) {
  const [groups, setGroups] = useState<IGroup[]>(initialGroups);
  const [activeGroupId, setActiveGroupId] = useState<string>(
    initialGroups[0].id,
  );

  const activeGroup = useMemo(
    () => findGroupById(groups, activeGroupId),
    [groups, activeGroupId],
  );

  const activeMembers = useMemo(
    () => resolveGroupMembers(people, activeGroup),
    [people, activeGroup],
  );

  const selectGroup = (groupId: string) => {
    setActiveGroupId(groupId);
  };

  const addGroup = (input: ICreateGroupInput) => {
    const group = createGroup(input);

    setGroups((currentGroups) => [...currentGroups, group]);
    setActiveGroupId(group.id);
  };

  const addMember = (personId: string) => {
    setGroups((currentGroups) =>
      currentGroups.map((group) => {
        if (group.id !== activeGroupId) {
          return group;
        }

        return { ...group, memberIds: [...group.memberIds, personId] };
      }),
    );
  };

  const removeMember = (personId: string) => {
    setGroups((currentGroups) =>
      currentGroups.map((group) => {
        if (group.id !== activeGroupId) {
          return group;
        }

        return {
          ...group,
          memberIds: group.memberIds.filter(
            (memberId) => memberId !== personId,
          ),
        };
      }),
    );
  };

  return {
    groups,
    activeGroup,
    activeMembers,
    addGroup,
    addMember,
    removeMember,
    selectGroup,
  };
}
