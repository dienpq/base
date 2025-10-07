import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import { Button, Typography } from '@/components/ui';
import { PAGE_ROUTES } from '@/constants';

export default function NotFoundPage() {
  return (
    <section className="flex min-h-svh w-full flex-col items-center justify-center gap-4">
      <div>
        <Typography variant="h3" className="text-center">
          404
        </Typography>
        <Typography>Page Not Found</Typography>
      </div>

      <Button asChild>
        <Link href={PAGE_ROUTES.HOME}>
          <span>Go back to Home</span>
          <ArrowRight />
        </Link>
      </Button>
    </section>
  );
}
