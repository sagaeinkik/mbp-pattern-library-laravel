import { Link } from '@inertiajs/react';
import Blobs from './ui/blobs';

interface DashboardCardProps {
    className?: string;
    headline?: string;
    description?: string;
    linkText: string;
    linkTo: string;
}

export default function DashboardCard({ className, headline, description, linkText, linkTo }: DashboardCardProps) {
    return (
        <div className={`${className} p-4`}>
            <Blobs />
            <h2 className="relative z-10 text-xl">{headline}</h2>
            <p className="relative z-10 text-center">{description}</p>
            <Link href={linkTo} as="button" className="bg-primary hover:bg-secondary relative z-10 my-2 rounded-md px-5 py-3 dark:border">
                {linkText}
            </Link>
        </div>
    );
}
