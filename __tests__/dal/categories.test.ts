import { createCategory, getCategories, getCategoryById } from "@/lib/server/dal";
import { prismaClient } from "@/lib/server/dal/utils/prismaClient";
import { create } from "domain";
import { describe, vi, expect, it, afterEach, beforeEach} from "vitest";

vi.mock("@/lib/server/dal/utils/prismaClient", () => ({
    prismaClient: {
        category: {
            findMany: vi.fn(),
            findUnique: vi.fn(),
            create: vi.fn()
        }
    },
}));

vi.mock("server-only", () => {
    return {
        default: vi.fn()
    }
});


describe("dal#categories", () => {
    beforeEach(() => {
        vi.useFakeTimers({ shouldAdvanceTime: true });
    });

    afterEach(() => {
        vi.useRealTimers();
    })
    
    describe("getCategories", () => {
        it("should return an array of categories", async () => {
            const category = {
                id: "fake-id",
                name: "Develop",
                description: "fake description"
            };

            vi.mocked(prismaClient.category.findMany).mockResolvedValue([ category ]);

            const categoryPromise = getCategories();
            vi.advanceTimersByTime(1000);
            
            const categories = await categoryPromise;

            expect(categories).toHaveLength(1);
            expect(categories[0]).toEqual(category);

        });
        it("should return one category", async () => {
            const category = {
                id: "fake-id",
                name: "Develop",
                description: "fake description"
            };

            vi.mocked(prismaClient.category.findUnique).mockResolvedValue(category);

            const categoryPromise = getCategoryById("fake-id");
            vi.advanceTimersByTime(1000);
            
            const categoryResult = await categoryPromise;

            expect(categoryResult).toEqual(category);

        });
        it("should create a category", async () => {
            const category = {
                id: "fake-id",
                name: "Develop",
                description: "fake description"
            };

            vi.mocked(prismaClient.category.create).mockResolvedValue(category);

            const categoryPromise = createCategory(category);
            vi.advanceTimersByTime(1000);
            
            const categoryResult = await categoryPromise;

            expect(categoryResult).toEqual(category);
        })
    });
});