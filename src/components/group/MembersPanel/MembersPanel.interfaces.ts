import type { ECurrency } from "@/types/domain.enums";
import type { IMemberRow } from "@/types/domain.interfaces";

export interface IMembersPanelProps {
  currency: ECurrency;
  onAddMember: () => void;
  onRemoveMember: (memberId: string) => void;
  rows: IMemberRow[];
}
