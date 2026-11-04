'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm, type UseFormReturn } from 'react-hook-form';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FLAVORS, MAX_CASES_PER_FLAVOR, type FlavorField } from '@/lib/flavors';
import { intakeReceipt, preorderSchema, type PreorderInput } from '@/lib/preorder';
import { ShrimpClubStamp } from '@/components/ShrimpClubStamp';

type FormStatus = 'idle' | 'loading' | 'error' | 'success';

type SuccessCopy = {
  headline: string;
  detail: string;
};

const fallbackReceipt = intakeReceipt(0, false);

export function PreorderForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);
  const [success, setSuccess] = useState<SuccessCopy>(fallbackReceipt);

  const form = useForm<PreorderInput>({
    resolver: zodResolver(preorderSchema),
    defaultValues: {
      contactName: '',
      email: '',
      organization: '',
      city: '',
      absoluteZeroRazz: 0,
      minusFortyMango: 0,
      punch27315: 0,
      freezingPointLime: 0,
      note: '',
      companyWebsite: '',
      acknowledged: false,
    },
  });

  function refreshTotal() {
    const values = form.getValues();
    setTotal(
      values.absoluteZeroRazz +
        values.minusFortyMango +
        values.punch27315 +
        values.freezingPointLime
    );
  }

  async function onSubmit(values: PreorderInput) {
    setStatus('loading');
    setError(null);
    try {
      const response = await fetch('/api/preorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      const body: unknown = await response.json();
      const record = typeof body === 'object' && body !== null ? body : null;
      const message =
        record && 'error' in record && typeof record.error === 'string'
          ? record.error
          : 'That count did not convert. Nothing was charged.';
      const ok = response.ok && record && 'ok' in record && record.ok === true;
      if (!ok) {
        setStatus('error');
        setError(message);
        return;
      }
      const headline =
        record && 'headline' in record && typeof record.headline === 'string'
          ? record.headline
          : fallbackReceipt.headline;
      const detail =
        record && 'detail' in record && typeof record.detail === 'string'
          ? record.detail
          : fallbackReceipt.detail;
      setSuccess({ headline, detail });
      setStatus('success');
    } catch {
      setSuccess(fallbackReceipt);
      setStatus('success');
    }
  }

  if (status === 'success') {
    return (
      <div className='border-cyan bg-void/70 border p-6 md:p-8' role='status'>
        <p className='text-magenta font-mono text-xs tracking-[0.18em] uppercase'>
          Only at Shrimp Club
        </p>
        <h2 className='font-display mt-3 text-4xl [font-stretch:140%] md:text-5xl'>
          {success.headline}
        </h2>
        <p className='num text-cyan mt-4 text-lg'>K = °C + 273.15</p>
        <p className='text-silver mt-4 max-w-xl'>{success.detail}</p>
        <div className='mt-6'>
          <ShrimpClubStamp />
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8' noValidate>
        <div className='grid gap-4 md:grid-cols-2'>
          <FormField
            control={form.control}
            name='contactName'
            render={function renderName({ field }) {
              return (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input autoComplete='name' placeholder='King Louie' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='email'
            render={function renderEmail({ field }) {
              return (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      autoComplete='email'
                      placeholder='you@club.invalid'
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>For the club. We do not send mail.</FormDescription>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='organization'
            render={function renderOrg({ field }) {
              return (
                <FormItem>
                  <FormLabel>House or buyer</FormLabel>
                  <FormControl>
                    <Input
                      autoComplete='organization'
                      placeholder='Shrimp Club, Jackson Street'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='city'
            render={function renderCity({ field }) {
              return (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl>
                    <Input autoComplete='address-level2' placeholder='San Francisco' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        <fieldset className='space-y-4'>
          <legend className='text-cyan font-mono text-xs tracking-[0.16em] uppercase'>
            Cases by flavor
          </legend>
          <p className='text-silver text-sm'>
            Count the boxes. A case is a box. This form does not charge anything.{' '}
            {MAX_CASES_PER_FLAVOR} is the ceiling per flavor.
          </p>
          <div className='grid gap-4 sm:grid-cols-2'>
            {FLAVORS.map(function renderFlavor(flavor) {
              return (
                <CaseField
                  key={flavor.id}
                  form={form}
                  name={flavor.field}
                  label={flavor.name}
                  image={flavor.image}
                  onChanged={refreshTotal}
                />
              );
            })}
          </div>
          <p className='num text-volt text-sm'>
            Total boxes: {total}. The number stays a count of boxes.
          </p>
        </fieldset>

        <FormField
          control={form.control}
          name='note'
          render={function renderNote({ field }) {
            return (
              <FormItem>
                <FormLabel>Note</FormLabel>
                <FormControl>
                  <Input placeholder='Aisle, house, or a temperature to print' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <FormField
          control={form.control}
          name='acknowledged'
          render={function renderAck({ field }) {
            return (
              <FormItem>
                <div className='flex items-start gap-3'>
                  <FormControl>
                    <input
                      type='checkbox'
                      className='accent-cyan mt-1 size-4'
                      checked={field.value}
                      onChange={function onCheck(event) {
                        field.onChange(event.target.checked);
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormLabel className='text-sm leading-snug font-normal normal-case'>
                    I understand this is a pre-order request. Nothing is charged. No card. No
                    payment.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        <div className='absolute -left-[9999px] h-0 w-0 overflow-hidden' aria-hidden='true'>
          <label htmlFor='companyWebsite'>Company website</label>
          <input
            id='companyWebsite'
            type='text'
            tabIndex={-1}
            autoComplete='off'
            {...form.register('companyWebsite')}
          />
        </div>

        {error ? (
          <p role='alert' className='border-destructive text-destructive border px-3 py-2 text-sm'>
            {error}
          </p>
        ) : null}

        <Button type='submit' disabled={status === 'loading'} className='w-full md:w-auto'>
          {status === 'loading' ? 'Filing…' : 'File the pre-order'}
        </Button>
      </form>
    </Form>
  );
}

type CaseFieldProps = {
  form: UseFormReturn<PreorderInput>;
  name: FlavorField;
  label: string;
  image: string;
  onChanged: () => void;
};

function CaseField({ form, name, label, image, onChanged }: CaseFieldProps) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={function renderCase({ field }) {
        const current = typeof field.value === 'number' ? field.value : 0;

        function setCount(next: number) {
          const clamped = Math.min(MAX_CASES_PER_FLAVOR, Math.max(0, next));
          field.onChange(clamped);
          onChanged();
        }

        return (
          <FormItem className='border-silver/25 border p-4'>
            <FormLabel>{label}</FormLabel>
            <div className='flex items-center gap-3'>
              <Image
                src={image}
                alt={`Kelvin ${label} can`}
                width={864}
                height={1152}
                sizes='48px'
                className='aspect-[3/4] h-16 w-12 shrink-0 object-cover'
              />
              <div className='flex min-w-0 flex-1 items-center gap-2'>
                <button
                  type='button'
                  className='border-silver/40 text-cyan size-11 border font-mono text-lg'
                  aria-label={`Remove a case of ${label}`}
                  onClick={function decrement() {
                    setCount(current - 1);
                  }}
                >
                  −
                </button>
                <FormControl>
                  <Input
                    type='number'
                    inputMode='numeric'
                    min={0}
                    max={MAX_CASES_PER_FLAVOR}
                    className='num text-center text-lg'
                    name={field.name}
                    ref={field.ref}
                    onBlur={field.onBlur}
                    value={current}
                    onChange={function onCount(event) {
                      if (event.target.value === '') {
                        field.onChange(0);
                        return;
                      }
                      const next = Number(event.target.value);
                      if (Number.isFinite(next)) {
                        setCount(Math.trunc(next));
                      }
                    }}
                  />
                </FormControl>
                <button
                  type='button'
                  className='border-silver/40 text-cyan size-11 border font-mono text-lg'
                  aria-label={`Add a case of ${label}`}
                  onClick={function increment() {
                    setCount(current + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
