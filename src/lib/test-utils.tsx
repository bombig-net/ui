import '@testing-library/jest-dom';
import type { ReactElement } from 'react';

import type { RenderOptions, RenderResult } from '@testing-library/react';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';

expect.extend(toHaveNoViolations);

/**
 * Custom render function that wraps Testing Library's render
 * Add providers here if needed
 */
const customRender = (
    ui: ReactElement,
    options: Omit<RenderOptions, 'wrapper'> = {}
): RenderResult => render(ui, { ...options });

// Re-export everything
export * from '@testing-library/react';
export { axe, customRender as render };
