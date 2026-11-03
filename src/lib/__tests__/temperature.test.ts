import { describe, expect, it } from 'vitest';

import {
  absoluteZeroStatement,
  anchorRows,
  celsiusToFahrenheit,
  celsiusToKelvin,
  footnoteChain,
  formatTemperature,
  kelvinToCelsius,
  kelvinToFahrenheit,
  parseReading,
  roundTemperature,
  toTriplet,
} from '../temperature';

describe('temperature conversions', () => {
  it('locks absolute zero across all three scales', () => {
    expect(roundTemperature(kelvinToCelsius(0))).toBe(-273.15);
    expect(roundTemperature(kelvinToFahrenheit(0))).toBe(-459.67);
    expect(absoluteZeroStatement()).toBe('0 K = −273.15 °C = −459.67 °F');
  });

  it('converts the ice point and the scale handshake exactly', () => {
    expect(roundTemperature(celsiusToKelvin(0))).toBe(273.15);
    expect(roundTemperature(celsiusToFahrenheit(0))).toBe(32);
    expect(roundTemperature(celsiusToKelvin(-40))).toBe(233.15);
    expect(roundTemperature(celsiusToFahrenheit(-40))).toBe(-40);
    const handshake = toTriplet(233.15, 'K');
    expect(roundTemperature(handshake.C)).toBe(-40);
    expect(roundTemperature(handshake.F)).toBe(-40);
  });

  it('round-trips a reading through every scale', () => {
    const start = 20;
    const viaKelvin = toTriplet(toTriplet(start, 'C').K, 'K');
    const viaFahrenheit = toTriplet(toTriplet(start, 'C').F, 'F');
    expect(roundTemperature(viaKelvin.C)).toBe(start);
    expect(roundTemperature(viaFahrenheit.C)).toBe(start);
    expect(roundTemperature(viaKelvin.F)).toBe(68);
  });

  it('prints anchor rows from the formulas, not from handwritten drift', () => {
    const rows = anchorRows();
    expect(rows.map(row => [row.K, row.C, row.F])).toEqual([
      ['0', '−273.15', '−459.67'],
      ['273.15', '0', '32'],
      ['233.15', '−40', '−40'],
    ]);
  });

  it('converts footnotes into the next scale and back again', () => {
    const notes = footnoteChain(100, 'C');
    expect(notes[0]?.text).toContain('100 °C');
    expect(notes[1]?.text).toContain('212 °F');
    expect(notes[2]?.text).toContain('373.15 K');
    expect(notes[3]?.text).toContain('100 °C');
    expect(notes[3]?.text).toContain('The footnote has been converted.');
  });

  it('parses a typed reading, including a unicode minus', () => {
    expect(parseReading('  -40 ')).toBe(-40);
    expect(parseReading('−273.15')).toBe(-273.15);
    expect(parseReading('')).toBeNull();
    expect(parseReading('nope')).toBeNull();
    expect(formatTemperature(-0)).toBe('0');
  });
});
