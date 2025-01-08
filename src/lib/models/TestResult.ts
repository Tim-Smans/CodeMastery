export interface TestResult {
    input: string,
    expectedOutput: string,
    error?: string | null,
    result?: string | null,
    passed: boolean
}