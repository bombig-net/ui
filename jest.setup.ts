import '@testing-library/jest-dom';
import { toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

/**
 * This setup file configures the Jest test environment.
 *
 * We're specifically handling React 19's development mode warnings here because:
 * 1. React 19 has stricter DOM attribute validation
 * 2. Some third-party components (like Radix UI) trigger these warnings
 * 3. These warnings are false positives in our case since:
 *    - We use TypeScript for type checking
 *    - The components work correctly despite the warnings
 *    - The warnings only appear in development/test mode
 */
beforeAll(() => {
    const originalError = console.error;

    // Mock console.error to filter out specific React warnings
    jest.spyOn(console, 'error').mockImplementation((...args: unknown[]) => {
        const msg = args[0];

        // Filter out React 19's DOM validation warning for boolean attributes on HTML elements
        if (typeof msg === 'string') {
            if (msg.includes('for a non-boolean attribute')) {
                return;
            }
        }

        // Pass through all other errors to the original console.error
        originalError(...args);
    });
});

// Restore the original console.error after all tests
afterAll(() => {
    jest.restoreAllMocks();
});
