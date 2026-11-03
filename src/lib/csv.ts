import { formatISO } from 'date-fns';

export const PREORDER_CSV_COLUMNS = [
  'id',
  'createdAt',
  'contactName',
  'email',
  'organization',
  'city',
  'absoluteZeroRazz',
  'minusFortyMango',
  'punch27315',
  'freezingPointLime',
  'note',
  'ipHash',
  'userAgent',
] as const;

export type PreorderCsvRow = {
  id: string;
  createdAt: Date;
  contactName: string;
  email: string;
  organization: string | null;
  city: string | null;
  absoluteZeroRazz: number;
  minusFortyMango: number;
  punch27315: number;
  freezingPointLime: number;
  note: string | null;
  ipHash: string;
  userAgent: string | null;
};

export function csvEscape(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replaceAll('"', '""')}"`;
  }
  return value;
}

export function preordersToCsv(rows: PreorderCsvRow[]): string {
  const lines: string[] = [PREORDER_CSV_COLUMNS.join(',')];
  for (const row of rows) {
    const cells = [
      row.id,
      formatISO(row.createdAt),
      row.contactName,
      row.email,
      row.organization ?? '',
      row.city ?? '',
      String(row.absoluteZeroRazz),
      String(row.minusFortyMango),
      String(row.punch27315),
      String(row.freezingPointLime),
      row.note ?? '',
      row.ipHash,
      row.userAgent ?? '',
    ];
    const escaped: string[] = [];
    for (const cell of cells) {
      escaped.push(csvEscape(cell));
    }
    lines.push(escaped.join(','));
  }
  return `${lines.join('\n')}\n`;
}
