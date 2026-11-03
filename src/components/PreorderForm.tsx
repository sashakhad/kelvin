'use client';

import { zodResolver } from '@hookform/resolvers/zod';
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
import { preorderSchema, type PreorderInput } from '@/lib/preorder';

type FormStatus = 'idle' | 'loading' | 'error' | 'success';

export function PreorderForm() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(0);

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
      const message =
        typeof body === 'object' &&
        body !== null &&
        'error' in body &&
        typeof body.error === 'string'
          ? body.error
          : 'The lab could not file that.';
      const ok =
        response.ok &&
        typeof body === 'object' &&
        body !== null &&
        'ok' in body &&
        body.ok === true;
      if (!ok) {
        setStatus('error');
        setError(message);
        return;
      }
      setStatus('success');
    } catch {
      setStatus('error');
      setError('The lab could not file that. Nothing was charged.');
    }
  }

  if (status === 'success') {
    return (
      <div className='border-cyan bg-void/70 border p-6 md:p-8' role='status'>
        <p className='text-cyan font-mono text-xs tracking-[0.18em] uppercase'>Filed</p>
        <h2 className='font-display mt-3 text-4xl [font-stretch:140%] md:text-5xl'>
          Nothing was charged.
        </h2>
        <p className='text-silver mt-4 max-w-xl'>
          Shrimp Club has the count. Kelvin did not take a card, did not start a bill, and did not
          send an email. A case is still just a box.
        </p>
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
                  <FormDescription>
                    For the club&apos;s ledger. We do not send mail.
                  </FormDescription>
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
  onChanged: () => void;
};

function CaseField({ form, name, label, onChanged }: CaseFieldProps) {
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
            <div className='flex items-center gap-2'>
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
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}
