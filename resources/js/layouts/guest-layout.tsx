import { Link } from '@inertiajs/react';
import React from 'react';

interface GuestLayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div className="bg-background gap flex min-h-svh flex-col items-center justify-center p-6">
            <div className="w-full max-w-sm">
                <Link href={route('dashboard')} className="text-primary-foreground/70 hover:text-primary-foreground underline">
                    Go to dashboard
                </Link>
                {children}
            </div>
        </div>
    );
}
