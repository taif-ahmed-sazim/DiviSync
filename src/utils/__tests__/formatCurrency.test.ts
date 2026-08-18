import { describe, expect, it } from "vitest";

import { ECurrency } from "@/types/domain.enums";
import { formatCurrency } from "@/utils/formatCurrency";

describe("formatCurrency", () => {
  it("should format an amount with the taka symbol", () => {
    expect(formatCurrency(1234.5, ECurrency.BDT)).toBe("৳1,234.50");
  });

  it("should format an amount with the dollar symbol", () => {
    expect(formatCurrency(1234.5, ECurrency.USD)).toBe("$1,234.50");
  });

  it("should format an amount with the euro symbol", () => {
    expect(formatCurrency(1234.5, ECurrency.EUR)).toBe("€1,234.50");
  });

  it("should always show two decimal places", () => {
    expect(formatCurrency(0, ECurrency.BDT)).toBe("৳0.00");
  });

  it("should group thousands with commas", () => {
    expect(formatCurrency(1000000, ECurrency.USD)).toBe("$1,000,000.00");
  });
});
