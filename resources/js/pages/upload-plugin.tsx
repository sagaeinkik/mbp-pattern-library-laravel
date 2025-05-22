import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { useForm, usePage } from '@inertiajs/react';
import { useRef } from 'react';

export default function UploadPlugin() {
    // Form data
    const { errors, setData, post, processing } = useForm({
        pluginFile: null as File | null,
    });

    // Success message
    const { props } = usePage();
    const successMessage = props.success as string | undefined;

    // Input field
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    // BRead
    const allBreadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Plugin',
            href: route('plugin-form.show'),
        },
    ];

    // File input change
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const file = e.target.files[0];
            if (file) {
                setData('pluginFile', file);
            }
        }
    };

    // Form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('plugin-form.upload'), {
            onSuccess: () => {
                // Empty file input field
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            },
        });
    };

    return (
        <AppLayout breadcrumbs={allBreadcrumbs}>
            <div className="text-bread max-w-8xl p-4">
                <h1 className="text-2xl">Upload the latest plugin version</h1>
                <p className="mt-4">The plugin must be a .zip-file. It must be named mbp-pattern-library.zip.</p>
                <p>Uploading a new version will overwrite the previous files.</p>

                <form className="my-4" onSubmit={handleSubmit}>
                    {errors.pluginFile && <p className="my-4 text-red-500">{errors.pluginFile}</p>}
                    <label htmlFor="pluginFile">Add .zip-file:</label>
                    <Input
                        type="file"
                        name="pluginFile"
                        id="pluginFile"
                        className="mt-2 mb-4"
                        onChange={handleFileChange}
                        accept=".zip"
                        ref={fileInputRef}
                    />
                    <Button disabled={processing}>{processing ? 'Submitting' : 'Submit'}</Button>
                    {successMessage && (
                        <>
                            <p className="my-4">{successMessage}</p>
                            <a
                                href={route('wordpress.all')}
                                className="text-primary-foreground-links hover:text-foreground underline decoration-dotted"
                            >
                                Return
                            </a>
                        </>
                    )}
                </form>
            </div>
        </AppLayout>
    );
}
