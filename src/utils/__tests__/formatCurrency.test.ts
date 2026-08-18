import { describe, expect, it } from "vitest";

import { formatCurrency } from "@/utils/formatCurrency";

describe("formatCurrency", () => {
  it("should format an amount with the taka symbol", () => {
    expect(formatCurrency(1234.5)).toBe("৳1,234.50");
  });

  it("should always show two decimal places", () => {
    expect(formatCurrency(0)).toBe("৳0.00");
  });

  it("should group thousands with commas", () => {
    expect(formatCurrency(1000000)).toBe("৳1,000,000.00");
  });
});
