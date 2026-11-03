import { formatTemperature, toTriplet, type Scale } from '@/lib/temperature';

export type FlavorField =
  'absoluteZeroRazz' | 'minusFortyMango' | 'punch27315' | 'freezingPointLime';

export type Flavor = {
  id: string;
  field: FlavorField;
  name: string;
  lead: boolean;
  value: number;
  scale: Scale;
  line: string;
  sameReadingAs: string | null;
};

export const FLAVORS: readonly Flavor[] = [
  {
    id: 'absolute-zero-razz',
    field: 'absoluteZeroRazz',
    name: 'Absolute Zero Razz',
    lead: true,
    value: 0,
    scale: 'K',
    line: 'The scale starts here, and so does the can. The lead flavor refuses to be a degree.',
    sameReadingAs: null,
  },
  {
    id: 'minus-forty-mango',
    field: 'minusFortyMango',
    name: 'Minus Forty Mango',
    lead: false,
    value: -40,
    scale: 'C',
    line: 'The only place the two degree scales shake hands.',
    sameReadingAs: null,
  },
  {
    id: 'punch-273',
    field: 'punch27315',
    name: '273.15 Punch',
    lead: false,
    value: 273.15,
    scale: 'K',
    line: "Ice's appointment, printed as punch.",
    sameReadingAs: null,
  },
  {
    id: 'freezing-point-lime',
    field: 'freezingPointLime',
    name: 'Freezing Point Lime',
    lead: false,
    value: 0,
    scale: 'C',
    line: 'We converted the name and left the math alone.',
    sameReadingAs: '273.15 Punch',
  },
];

export type FlavorReading = Flavor & {
  K: string;
  C: string;
  F: string;
};

export function flavorReadings(): FlavorReading[] {
  const readings: FlavorReading[] = [];
  for (const flavor of FLAVORS) {
    const triplet = toTriplet(flavor.value, flavor.scale);
    readings.push({
      ...flavor,
      K: formatTemperature(triplet.K),
      C: formatTemperature(triplet.C),
      F: formatTemperature(triplet.F),
    });
  }
  return readings;
}

export const MAX_CASES_PER_FLAVOR = 500;
