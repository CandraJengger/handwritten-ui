import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Toaster, toast } from '../../templates/toaster';

describe('Toaster Component', () => {
  it('renders without crashing', () => {
    const { container } = render(<Toaster />);
    // Sonner usually renders a container for toasts
    expect(container).toBeInTheDocument();
  });

  it('exports the toast function', () => {
    expect(typeof toast).toBe('function');
  });
});
