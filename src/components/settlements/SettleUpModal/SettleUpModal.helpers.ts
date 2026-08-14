import { CURRENT_USER_ID } from "@/constants/group.constants";
import type { IGroupMember } from "@/types/domain.interfaces";

import type { ISettleUpFormValues } from "./SettleUpModal.interfaces";

export const settleUpFormInitialValues: ISettleUpFormValues = {
  fromMemberId: CURRENT_USER_ID,
  toMemberId: "",
  amount: "",
};

export function buildSettleUpFormInitialValues(
  members: IGroupMember[],
): ISettleUpFormValues {
  const receiver = members.find((member) => member.id !== CURRENT_USER_ID);

  return {
    ...settleUpFormInitialValues,
    toMemberId: receiver?.id ?? "",
  };
}
