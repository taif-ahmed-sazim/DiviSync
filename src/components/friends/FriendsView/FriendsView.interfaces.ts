import type { ECurrency } from "@/types/domain.enums";
import type { IMemberBalance } from "@/types/domain.interfaces";

export interface IFriendsViewProps {
  balances: IMemberBalance[];
  currency: ECurrency;
}
