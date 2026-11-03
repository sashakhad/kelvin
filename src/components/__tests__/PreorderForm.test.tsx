import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import { PreorderForm } from '../PreorderForm';

describe('PreorderForm', () => {
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

  it('steps a flavor count without leaving the page', async () => {
    const user = userEvent.setup();
    render(<PreorderForm />);

    await user.click(screen.getByRole('button', { name: /add a case of absolute zero razz/i }));
    const input = screen.getByRole('spinbutton', { name: /absolute zero razz/i });
    expect(input).toHaveValue(1);
    expect(screen.getByText(/total boxes: 1/i)).toBeInTheDocument();
  });
});
