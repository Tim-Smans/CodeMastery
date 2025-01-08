import { TestResult } from '@/lib/models/TestResult';
import { TestCase } from '@prisma/client';
import { Script, createContext, Context } from 'vm';

export const runTests = (userCode: string, testCases: TestCase[]): TestResult[] => {
  const results: TestResult[] = [];
  try {
    const script = new Script(`
      const userFunction = ${userCode};
      globalThis.runTest = userFunction;
    `);

    const sandbox: { runTest?: (arg: unknown) => unknown } = {}; 
    const context: Context = createContext(sandbox);
    script.runInContext(context);

    for (const { input, expectedOutput } of testCases) {
      try {
        const userFunction = sandbox.runTest;
        if (typeof userFunction !== 'function') {
          throw new Error('User function is not defined or is not a function');
        }

        // Ensure input is parsed safely
        const parsedInput: unknown = JSON.parse(input); 
        const result = userFunction(parsedInput);
        results.push({
          input,
          expectedOutput,
          result: String(result),
          passed: String(result) === expectedOutput,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
        results.push({
          input,
          expectedOutput,
          error: errorMessage,
          passed: false,
        });
      }
    }
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return [{ input: '', expectedOutput: '', error: errorMessage, passed: false }];
  }
  return results;
};
