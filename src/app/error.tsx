'use client';

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  return (
    <main className='mx-auto flex min-h-[60vh] max-w-3xl flex-col items-start justify-center gap-4 px-4 py-20 md:px-8'>
      <p className='text-magenta font-mono text-xs tracking-[0.22em] uppercase'>Fault</p>
      <h1 className='font-display text-5xl md:text-6xl'>The lab dropped a beaker.</h1>
      <p className='text-silver max-w-md text-sm'>
        {error.message || 'Something failed before the conversion finished.'}
      </p>
      <button
        type='button'
        onClick={reset}
        className='bg-cyan text-void mt-2 px-5 py-3 font-mono text-xs tracking-[0.14em] uppercase'
      >
        Try the reading again
      </button>
    </main>
  );
}
