import { Link } from '@inertiajs/react'

export default function ShowPageHeading({ headingText, route, value }: { headingText: string, route: string, value: string }) {
    return (
        <div className="flex justify-between items-center w-full">
            <h1 className="text-2xl">{headingText}</h1>
            <Link as="button" href={route} className="my-2 bg-secondary py-2 px-4 rounded-md text-sm hover:bg-primary">{value}</Link>
        </div>
    )
}
