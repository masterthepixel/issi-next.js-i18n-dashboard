import { expect } from '@jest/globals';
import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { ReactElement } from 'react';

expect.extend(toHaveNoViolations);

const customRender = (ui: ReactElement, options = {}) => {
    const { container } = render(ui, { ...options });

    // Run accessibility checks
    expect(axe(container)).resolves.toHaveNoViolations();

    return { container };
};

// re-export everything
export * from '@testing-library/react';

// override render method
export { customRender as render };

