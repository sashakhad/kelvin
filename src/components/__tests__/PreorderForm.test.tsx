import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { PreorderForm } from '../PreorderForm';

describe('PreorderForm', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('says nothing is charged and has no card fields', () => {
    render(<PreorderForm />);

    expect(screen.getByText(/nothing is charged/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /file the pre-order/i })).toBeInTheDocument();
    expect(document.querySelector('input[name="cardNumber"]')).toBeNull();
    expect(document.querySelector('input[name="cvc"]')).toBeNull();
    expect(document.querySelector('input[autocomplete="cc-number"]')).toBeNull();
    expect(document.querySelector('input[autocomplete="cc-csc"]')).toBeNull();
  });

  it('shows validation when the filing is empty', async () => {
    const user = userEvent.setup();
    render(<PreorderForm />);

    await user.click(screen.getByRole('button', { name: /file the pre-order/i }));

    expect(await screen.findByText(/name the human placing the boxes/i)).toBeInTheDocument();
    expect(screen.getByText(/that email does not convert/i)).toBeInTheDocument();
  });

  it('shows the Shrimp Club success state when nothing is stored', async () => {
    const user = userEvent.setup();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        ok: true,
        stored: false,
        headline: 'Converted. Not charged.',
        detail:
          'Only at Shrimp Club. 1 box picked up 273.15. 0 °C of payment is 273.15 K is 32 °F.',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    render(<PreorderForm />);
    await user.type(screen.getByRole('textbox', { name: /^name$/i }), 'King Louie');
    await user.type(screen.getByRole('textbox', { name: /^email$/i }), 'louie@example.com');
    await user.click(screen.getByRole('button', { name: /add a case of absolute zero razz/i }));
    await user.click(screen.getByRole('checkbox', { name: /nothing is charged/i }));
    await user.click(screen.getByRole('button', { name: /file the pre-order/i }));

    expect(await screen.findByRole('status')).toHaveTextContent('Converted. Not charged.');
    expect(screen.getByText(/K = °C \+ 273\.15/)).toBeInTheDocument();
    expect(screen.getByText(/273\.15 K/)).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /only at shrimp club/i })).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledOnce();
  });

  it('steps a flavor count without leaving the page', async () => {
    const user = userEvent.setup();
    render(<PreorderForm />);

    await user.click(screen.getByRole('button', { name: /add a case of absolute zero razz/i }));
    const input = screen.getByRole('spinbutton', { name: /absolute zero razz/i });
    expect(input).toHaveValue(1);
    expect(screen.getByText(/total boxes: 1/i)).toBeInTheDocument();
  });
});
