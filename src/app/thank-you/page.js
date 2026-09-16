import { Suspense } from 'react';
import ThankYouContent from './ThankYouContent';

export default function ThankYouPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-cream flex items-center justify-center px-6">
          <div className="text-center">
            <p className="text-ink-soft">Loading...</p>
          </div>
        </main>
      }
    >
      <ThankYouContent />
    </Suspense>
  );
}
