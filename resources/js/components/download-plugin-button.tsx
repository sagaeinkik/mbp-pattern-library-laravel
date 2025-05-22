import { Link } from '@inertiajs/react';

export default function DownloadPluginButton({ pluginUrl }: { pluginUrl: string | null }) {
    return (
        <div className="mt-6 flex items-center justify-between gap-2">
            {pluginUrl ? (
                <a href={pluginUrl} download className="bg-primary hover:bg-secondary rounded-md px-4 py-2 text-lg">
                    Download Plugin
                </a>
            ) : (
                <Link href={route('plugin-form.show')} className="bg-primary hover:bg-secondary rounded-md px-4 py-2 text-lg">
                    Upload Plugin
                </Link>
            )}
        </div>
    );
}
