export type BalanceStatus = "gets" | "owes" | "settled";

export interface MemberBalance {
    id : string;
    name: string;
    amount: number;
    status: BalanceStatus;
}

export interface Expense {
    id: string;
    title: string;
    date: string;
    amount: number;
    paidBy: string;
    participantCount: number;

}


