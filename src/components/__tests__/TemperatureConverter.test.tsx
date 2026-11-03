import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { TemperatureConverter } from '../TemperatureConverter';

describe('TemperatureConverter', () => {
  it('opens on the ice point', () => {
    render(<TemperatureConverter />);

    expect(screen.getByTestId('out-k')).toHaveTextContent('273.15 K');
    expect(screen.getByTestId('out-c')).toHaveTextContent('0 °C');
    expect(screen.getByTestId('out-f')).toHaveTextContent('32 °F');
  });

  it('converts absolute zero and then the handshake', async () => {
    const user = userEvent.setup();
    render(<TemperatureConverter />);

    await user.selectOptions(screen.getByLabelText(/scale you typed/i), 'K');
    const reading = screen.getByLabelText(/^number$/i);
    await user.clear(reading);
    await user.type(reading, '0');

    expect(screen.getByTestId('out-c')).toHaveTextContent('−273.15 °C');
    expect(screen.getByTestId('out-f')).toHaveTextContent('−459.67 °F');
    expect(screen.getByText(/footnote has been converted/i)).toBeInTheDocument();

    await user.selectOptions(screen.getByLabelText(/scale you typed/i), 'C');
    await user.clear(reading);
    await user.type(reading, '-40');

    expect(screen.getByTestId('out-k')).toHaveTextContent('233.15 K');
    expect(screen.getByTestId('out-f')).toHaveTextContent('−40 °F');
  });
});
