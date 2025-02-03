import { TestResult } from '@/lib/models/TestResult';
import { TestCase } from '@prisma/client';
import { Script, createContext, Context } from 'vm';

export const runTests = (userCode: string, testCases: TestCase[]): TestResult[] => {
  const results: TestResult[] = [];
  try {
    // Create a context with a global function for the user's code
    const sandbox: { userFunction?: (arg: unknown) => unknown } = {};
    const context: Context = createContext(sandbox);

    // Directly assign the function in the context
    const script = new Script(`
      userFunction = ${userCode.trim()};
    `);
    
    script.runInContext(context);

    sandbox.userFunction = context.userFunction as (arg: unknown) => unknown;


    for (const { input, expectedOutput } of testCases) {
      try {
        console.log("Input:", input);
        const userFunction = sandbox.userFunction;
        console.log('User Code:', userCode);
        console.log('User Function:', userFunction);

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
        console.log(errorMessage)
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
  console.log(results)
  return results;
};