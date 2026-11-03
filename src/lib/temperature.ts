export const KELVIN_OFFSET = 273.15;

export type Scale = 'K' | 'C' | 'F';

export type Triplet = {
  K: number;
  C: number;
  F: number;
};

export const SCALE_ORDER: readonly Scale[] = ['K', 'C', 'F'];

export const FORMULAS = [
  'K = °C + 273.15',
  '°F = °C × 9/5 + 32',
  '°F = (K − 273.15) × 9/5 + 32',
] as const;

export function roundTemperature(value: number): number {
  const rounded = Math.round(value * 100) / 100;
  if (Object.is(rounded, -0)) {
    return 0;
  }
  return rounded;
}

export function formatTemperature(value: number): string {
  const rounded = roundTemperature(value);
  const fixed = rounded.toFixed(2);
  const trimmed = fixed.replace(/\.00$/, '').replace(/(\.\d)0$/, '$1');
  if (trimmed.startsWith('-')) {
    return `−${trimmed.slice(1)}`;
  }
  return trimmed;
}

export function formatWithUnit(value: number, scale: Scale): string {
  if (scale === 'K') {
    return `${formatTemperature(value)} K`;
  }
  if (scale === 'C') {
    return `${formatTemperature(value)} °C`;
  }
  return `${formatTemperature(value)} °F`;
}

export function celsiusToKelvin(celsius: number): number {
  return celsius + KELVIN_OFFSET;
}

export function kelvinToCelsius(kelvin: number): number {
  return kelvin - KELVIN_OFFSET;
}

export function celsiusToFahrenheit(celsius: number): number {
  return (celsius * 9) / 5 + 32;
}

export function fahrenheitToCelsius(fahrenheit: number): number {
  return ((fahrenheit - 32) * 5) / 9;
}

export function kelvinToFahrenheit(kelvin: number): number {
  return celsiusToFahrenheit(kelvinToCelsius(kelvin));
}

export function fahrenheitToKelvin(fahrenheit: number): number {
  return celsiusToKelvin(fahrenheitToCelsius(fahrenheit));
}

export function toTriplet(value: number, from: Scale): Triplet {
  if (from === 'K') {
    return {
      K: value,
      C: kelvinToCelsius(value),
      F: kelvinToFahrenheit(value),
    };
  }
  if (from === 'C') {
    return {
      K: celsiusToKelvin(value),
      C: value,
      F: celsiusToFahrenheit(value),
    };
  }
  return {
    K: fahrenheitToKelvin(value),
    C: fahrenheitToCelsius(value),
    F: value,
  };
}

export function nextScale(scale: Scale): Scale {
  const index = SCALE_ORDER.indexOf(scale);
  const following = SCALE_ORDER[(index + 1) % SCALE_ORDER.length];
  return following ?? 'K';
}

export function absoluteZeroStatement(): string {
  const triplet = toTriplet(0, 'K');
  return `0 K = ${formatTemperature(triplet.C)} °C = ${formatTemperature(triplet.F)} °F`;
}

export type AnchorRow = {
  label: string;
  K: string;
  C: string;
  F: string;
};

export function anchorRows(): AnchorRow[] {
  const anchors: { label: string; value: number; scale: Scale }[] = [
    { label: 'Absolute zero', value: 0, scale: 'K' },
    { label: 'Ice point', value: 0, scale: 'C' },
    { label: 'Scale handshake', value: -40, scale: 'C' },
  ];

  const rows: AnchorRow[] = [];
  for (const anchor of anchors) {
    const triplet = toTriplet(anchor.value, anchor.scale);
    rows.push({
      label: anchor.label,
      K: formatTemperature(triplet.K),
      C: formatTemperature(triplet.C),
      F: formatTemperature(triplet.F),
    });
  }
  return rows;
}

export type ConvertedFootnote = {
  marker: string;
  text: string;
};

const FOOTNOTE_MARKERS = ['*', '†', '‡', '§'] as const;

export function footnoteChain(value: number, from: Scale): ConvertedFootnote[] {
  const triplet = toTriplet(value, from);
  const steps: Scale[] = [from, nextScale(from), nextScale(nextScale(from)), from];
  const footnotes: ConvertedFootnote[] = [];

  for (let index = 0; index < steps.length; index += 1) {
    const scale = steps[index] ?? from;
    const marker = FOOTNOTE_MARKERS[index] ?? '*';
    const reading = formatWithUnit(triplet[scale], scale);
    if (index === 0) {
      footnotes.push({ marker, text: `Reading locked at ${reading}.` });
    } else if (index === steps.length - 1) {
      footnotes.push({
        marker,
        text: `Footnote converted back to ${scale === 'K' ? 'K' : scale === 'C' ? '°C' : '°F'}: ${reading}. The footnote has been converted.`,
      });
    } else {
      footnotes.push({
        marker,
        text: `Footnote converted to ${scale === 'K' ? 'K' : scale === 'C' ? '°C' : '°F'}: ${reading}.`,
      });
    }
  }

  return footnotes;
}

export function parseReading(raw: string): number | null {
  const trimmed = raw.trim().replaceAll('−', '-').replaceAll(',', '');
  if (trimmed === '' || trimmed === '-' || trimmed === '.' || trimmed === '-.') {
    return null;
  }
  const value = Number(trimmed);
  if (!Number.isFinite(value)) {
    return null;
  }
  return value;
}

export function scaleLabel(scale: Scale): string {
  if (scale === 'K') {
    return 'K';
  }
  if (scale === 'C') {
    return '°C';
  }
  return '°F';
}
