import type { ECurrency } from "@/types/domain.enums";
import type { IMemberBalance } from "@/types/domain.interfaces";

export interface IMembersPanelProps {
  balances: IMemberBalance[];
  currency: ECurrency;
  onAddMember: () => void;
}
