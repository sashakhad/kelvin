import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import { ConversionFacts } from '../ConversionFacts';

describe('ConversionFacts', () => {
  it('prints the three-column label with correct anchors', () => {
    render(<ConversionFacts />);

    expect(screen.getByText(/conversion facts/i)).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: 'K' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '°C' })).toBeInTheDocument();
    expect(screen.getByRole('columnheader', { name: '°F' })).toBeInTheDocument();

    const zero = screen.getByRole('row', { name: /^absolute zero 0/i });
    expect(zero).toHaveTextContent('−273.15');
    expect(zero).toHaveTextContent('−459.67');

    const handshake = screen.getByRole('row', { name: /^scale handshake/i });
    expect(handshake).toHaveTextContent('233.15');
    expect(handshake).toHaveTextContent('−40');
  });
});
