import React from 'react'
import { Link } from '@inertiajs/react';

interface GuestLayoutProps {
    children: React.ReactNode;
}

export default function GuestLayout({ children }: GuestLayoutProps) {
    return (
        <div className="bg-background flex min-h-svh flex-col items-center justify-center gap p-6">
            <div className="w-full max-w-sm">
                <Link href={route("dashboard")} className="text-primary-foreground/70 hover:text-primary-foreground underline">Go to dashboard</Link>
                {children}
            </div>
        </div>
    )
}
