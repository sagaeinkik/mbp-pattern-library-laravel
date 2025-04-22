import { Link } from "@inertiajs/react";
import Blobs from "./ui/blobs";

interface DashboardCardProps {
    className?: string;
    headline: string;
    description: string;
    linkText: string;
    linkTo: string;
}

export default function DashboardCard({ className, headline, description, linkText, linkTo }: DashboardCardProps) {
    return (
        <div className={className}>
            <Blobs />
            <h2 className="text-xl relative z-10">{headline}</h2>
            <p className="relative z-10">{description}</p>
            <Link href={linkTo} as="button" className="relative dark:border z-10 my-2 py-3 px-5 rounded-md bg-primary hover:bg-secondary">{linkText}</Link>
        </div>
    )
}
