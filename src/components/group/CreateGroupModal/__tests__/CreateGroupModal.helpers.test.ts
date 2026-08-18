import { describe, expect, it } from "vitest";

import { ECurrency } from "@/types/domain.enums";

import {
  createGroupFormInitialValues,
  getGroupDescriptionError,
  getGroupMembersError,
  getGroupNameError,
  hasCreateGroupFormErrors,
  parseCurrency,
  toggleMemberId,
  validateCreateGroupForm,
} from "../CreateGroupModal.helpers";

describe("getGroupNameError", () => {
  it("should reject an empty name", () => {
    expect(getGroupNameError("")).toBe("Group name is required");
  });

  it("should reject a name that is only whitespace", () => {
    expect(getGroupNameError("   ")).toBe("Group name is required");
  });

  it("should reject a name shorter than the minimum length", () => {
    expect(getGroupNameError("ab")).toBe(
      "Group name must be at least 3 characters",
    );
  });

  it("should reject a name longer than the maximum length", () => {
    expect(getGroupNameError("a".repeat(51))).toBe(
      "Group name must be at most 50 characters",
    );
  });

  it("should accept a valid name", () => {
    expect(getGroupNameError("Bali Trip")).toBeUndefined();
  });

  it("should ignore surrounding whitespace when measuring length", () => {
    expect(getGroupNameError("   Bali   ")).toBeUndefined();
  });
});

describe("getGroupDescriptionError", () => {
  it("should accept an empty description", () => {
    expect(getGroupDescriptionError("")).toBeUndefined();
  });

  it("should reject a description longer than the maximum length", () => {
    expect(getGroupDescriptionError("a".repeat(121))).toBe(
      "Description must be at most 120 characters",
    );
  });
});

describe("getGroupMembersError", () => {
  it("should reject a group containing only the current user", () => {
    expect(getGroupMembersError(["person-1"])).toBe(
      "Select at least one other member",
    );
  });

  it("should accept a group with another member", () => {
    expect(getGroupMembersError(["person-1", "person-2"])).toBeUndefined();
  });
});

describe("toggleMemberId", () => {
  it("should add a member that is not selected", () => {
    expect(toggleMemberId(["person-1"], "person-2")).toEqual([
      "person-1",
      "person-2",
    ]);
  });

  it("should remove a member that is already selected", () => {
    expect(toggleMemberId(["person-1", "person-2"], "person-2")).toEqual([
      "person-1",
    ]);
  });

  it("should not change the original list", () => {
    const memberIds = ["person-1"];
    toggleMemberId(memberIds, "person-2");

    expect(memberIds).toEqual(["person-1"]);
  });
});

describe("parseCurrency", () => {
  it("should return the matching currency", () => {
    expect(parseCurrency("USD")).toBe(ECurrency.USD);
  });

  it("should fall back to the default currency for an unknown value", () => {
    expect(parseCurrency("XYZ")).toBe(ECurrency.BDT);
  });
});

describe("validateCreateGroupForm", () => {
  it("should report no errors for a valid form", () => {
    const errors = validateCreateGroupForm({
      ...createGroupFormInitialValues,
      name: "Bali Trip",
      memberIds: ["person-1", "person-2"],
    });

    expect(hasCreateGroupFormErrors(errors)).toBe(false);
  });

  it("should report errors for the initial empty form", () => {
    const errors = validateCreateGroupForm(createGroupFormInitialValues);

    expect(hasCreateGroupFormErrors(errors)).toBe(true);
    expect(errors.name).toBe("Group name is required");
    expect(errors.memberIds).toBe("Select at least one other member");
  });
});
