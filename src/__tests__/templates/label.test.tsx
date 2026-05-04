import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Label } from '../../templates/label';

describe('Label Component', () => {
  it('renders correctly with children', () => {
    render(<Label>Username</Label>);
    expect(screen.getByText('Username')).toBeInTheDocument();
  });

  it('displays asterisk when required is true', () => {
    render(<Label required>Username</Label>);
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('applies disabled styles', () => {
    render(<Label disabled>Username</Label>);
    const label = screen.getByText('Username');
    expect(label).toHaveClass('cursor-not-allowed');
    expect(label).toHaveClass('text-[#999999]');
  });

  it('forwards htmlFor attribute', () => {
    render(<Label htmlFor="input-id">Username</Label>);
    expect(screen.getByText('Username')).toHaveAttribute('for', 'input-id');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLLabelElement>();
    render(<Label ref={ref}>Username</Label>);
    expect(ref.current).toBeInstanceOf(HTMLLabelElement);
  });

  it('handles custom className', () => {
    render(<Label className="custom-label">Username</Label>);
    expect(screen.getByText('Username')).toHaveClass('custom-label');
  });
});
