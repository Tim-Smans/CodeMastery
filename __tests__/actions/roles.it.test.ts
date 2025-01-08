'use server';
import { describe, vi, it, expect, beforeEach, afterEach } from "vitest";
import { assignRoleToUser, createNewRole, getRoleByIdAction } from "@/lib/server/actions";
import { revalidatePath } from "next/cache";
import { addRoleToUser, createRole, getRoleById } from "@/lib/server/dal";

vi.mock("next/cache", () => ({
  revalidatePath: vi.fn(),
}));

vi.mock("@dal", () => ({
  createRole: vi.fn(),
  getRoleById: vi.fn(),
  addRoleToUser: vi.fn(),
}));

vi.mock("server-only", () => {
    return {
        default: vi.fn()
    }
});

describe("Actions#Roles#Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create a role with valid input data", async () => {
    const formData = new FormData();
    formData.set("name", "Admin");

    const mockActionResponse = { success: true };

    vi.mocked(createRole).mockResolvedValue({ id: "123", name: "Admin" });

    const result = await createNewRole(mockActionResponse, formData);

    expect(createRole).toHaveBeenCalledTimes(1);
    expect(createRole).toHaveBeenCalledWith({
      name: "Admin",
    });

    expect(revalidatePath).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/admin/roles", "page");

    expect(result).toEqual({ success: true });
  });

  it("should fail if input data is invalid", async () => {
    const formData = new FormData();
    formData.set("name", "f"); 

    const mockActionResponse = { success: false };

    const result = await createNewRole(mockActionResponse, formData);

    expect(createRole).not.toHaveBeenCalled();
    expect(revalidatePath).not.toHaveBeenCalled();

    expect(result.success).toBe(false);
    expect(result.errors?.name?.[0]).toBe("The name of a category must be at least 5 characters long");
  });

  it("should return the role if it exists", async () => {
    const mockRole = { id: "123", name: "Admin" };
    vi.mocked(getRoleById).mockResolvedValue(mockRole);

    const result = await getRoleByIdAction("123");

    expect(getRoleById).toHaveBeenCalledTimes(1);
    expect(getRoleById).toHaveBeenCalledWith("123");
    expect(result).toEqual(mockRole);
  });

  it("should throw an error if the role does not exist", async () => {
    vi.mocked(getRoleById).mockResolvedValue(null);

    await expect(getRoleByIdAction("123")).rejects.toThrowError("Role not found");

    expect(getRoleById).toHaveBeenCalledTimes(1);
    expect(getRoleById).toHaveBeenCalledWith("123");
  });
  it("should assign a role to a user and revalidate the path", async () => {
    const userId = "user123";
    const roleId = "role123";

    await assignRoleToUser(userId, roleId);

    // Assertions
    expect(addRoleToUser).toHaveBeenCalledTimes(1);
    expect(addRoleToUser).toHaveBeenCalledWith(userId, roleId);

    expect(revalidatePath).toHaveBeenCalledTimes(1);
    expect(revalidatePath).toHaveBeenCalledWith("/admin/roles", "page");
  });
});
