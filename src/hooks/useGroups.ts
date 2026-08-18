import { useMemo, useState } from "react";

import { groups as initialGroups } from "@/data/mockData";
import type { IGroup, IPerson } from "@/types/domain.interfaces";
import { findGroupById, resolveGroupMembers } from "@/utils/group.helpers";

export function useGroups(people: IPerson[]) {
  const [groups] = useState<IGroup[]>(initialGroups);
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

  return { groups, activeGroup, activeMembers, selectGroup };
}
