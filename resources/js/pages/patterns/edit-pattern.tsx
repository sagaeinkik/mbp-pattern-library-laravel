//Graphical
import ShowPatternPreviews from '@/components/show-pattern-previews';
import ShowThumbnails from '@/components/show-thumbnails';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import PatternsLayout from '@/layouts/PatternsLayout';

//Interfaces
import { Category } from '@/types/categories';
import { Pattern } from '@/types/patterns';

//Functions
import { handleConfirm } from '@/lib/deleteConfirm';
import { cleanUpThumbnails, handleDeletePreview, handleNewFiles } from '@/lib/patternThumbnails';
import { router, useForm } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function EditPattern({ pattern, categories }: { pattern: Pattern; categories: Category[] }) {
    //Form data
    const { data, setData, processing, errors } = useForm({
        title: pattern.title,
        description: pattern.description,
        pattern_data: pattern.pattern_data,
        category_id: pattern.category_id,
        pattern_previews: [] as File[],
        previews_to_delete: [] as number[],
    });

    //States and refs
    const [imageThumbnails, setImageThumbnails] = useState<string[]>([]);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const breadCrumbs = [
        { title: pattern.title, href: route('patterns.details', { pattern }) },
        { title: 'Edit', href: route('patterns.edit', { pattern }) },
    ];

    //Store IDs of previews to delete
    const previewsToDelete: number[] = [];
    const deleteExistingPreview = (index: number) => {
        previewsToDelete.push(pattern.pattern_previews[index].id);
    };

    //Form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        //Save form data
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('description', data.description);
        formData.append('pattern_data', data.pattern_data);
        formData.append('category_id', String(data.category_id));

        //Check existing previews to delete
        if (previewsToDelete.length > 0) {
            previewsToDelete.forEach((id) => {
                formData.append('previews_to_delete[]', String(id));
            });
        }

        //Check for new images to add
        if (data.pattern_previews.length > 0) {
            data.pattern_previews.forEach((file) => {
                formData.append('pattern_previews[]', file);
            });
        }

        formData.append('_method', 'put');

        router.post(route('patterns.update', { pattern }), formData, {
            forceFormData: true,
        });
    };

    //Delete pattern
    const handleDelete = () => {
        if (confirmDelete) {
            router.delete(route('patterns.delete', { pattern: pattern }));
        }
    };

    //Dismount cleanup thumbnail URLS
    useEffect(() => {
        return () => cleanUpThumbnails(imageThumbnails);
    }, [imageThumbnails]);

    return (
        <PatternsLayout title="Edit pattern" breadcrumbs={breadCrumbs}>
            <h1 className="text-2xl">Edit pattern</h1>
            <form onSubmit={handleSubmit} className="lg:w mt-4 md:w-4/5">
                <label htmlFor="title">Pattern title:</label>
                {errors.title && <p className="text-red-500">{errors.title}</p>}
                <Input type="text" id="title" className="mt-2 mb-4" value={data.title} onChange={(e) => setData('title', e.target.value)} />

                <label htmlFor="description">Description:</label>
                {errors.description && <p className="text-red-500">{errors.description}</p>}
                <Input
                    type="text"
                    id="description"
                    className="mt-2 mb-4"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                />

                <label htmlFor="pattern_data">Block pattern JSON:</label>
                {errors.pattern_data && <p className="text-red-500">{errors.pattern_data}</p>}
                <textarea
                    name="pattern_data"
                    id="pattern_data"
                    value={data.pattern_data}
                    onChange={(e) => setData('pattern_data', e.target.value)}
                    className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2 mb-4 flex h-60 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 font-mono text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                ></textarea>

                <label htmlFor="category_id">Category:</label>
                {errors.category_id && <p className="text-red-500">{errors.category_id}</p>}
                <select
                    name="category"
                    id="category_id"
                    defaultValue={data.category_id}
                    onChange={(e) => setData('category_id', Number(e.target.value))}
                    className="border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2 mb-4 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                >
                    <option value="choose" disabled>
                        Choose
                    </option>
                    {/* Loop through categories */}
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>

                {/* Existing previews */}
                <h2 className="mt-4 mb-2 text-xl">Existing previews</h2>
                <ShowPatternPreviews patternPreviews={pattern.pattern_previews} patternTitle={pattern.title} onDelete={deleteExistingPreview} />

                {/* New previews */}
                <h2 className="text-xl">Add more previews</h2>
                <label
                    htmlFor="pattern_previews[]"
                    className="bg-secondary hover:bg-primary my-4 block w-fit cursor-pointer rounded-md px-4 py-2 text-sm"
                >
                    Add image
                </label>
                {errors.pattern_previews && <p className="text-red-500">{errors.pattern_previews}</p>}
                <input
                    type="file"
                    multiple
                    id="pattern_previews[]"
                    name="pattern_previews[]"
                    onChange={(e) => handleNewFiles(e, setData, setImageThumbnails)}
                    ref={fileInputRef}
                    className="hidden"
                />

                {/* New previews thumbnails */}
                {imageThumbnails.length > 0 && (
                    <ShowThumbnails
                        imageThumbnails={imageThumbnails}
                        onDelete={(index) => handleDeletePreview(index, setImageThumbnails, setData, imageThumbnails, data)}
                    />
                )}

                <Button type="submit" className="my-6 cursor-pointer">
                    {processing ? 'Saving changes' : 'Save changes'}
                </Button>
            </form>

            {/*  Delete pattern  */}
            <h2 className="text-xl">Delete pattern</h2>
            {confirmDelete && (
                <p className="mt-3 text-red-600 dark:text-red-400">
                    Are you absolutely certain you want to delete this pattern? This action cannot be undone. Deleted patterns and associated pattern
                    previews cannot be recovered.
                </p>
            )}
            <Button
                variant="destructive"
                className="mt-4"
                onClick={() => {
                    handleConfirm(confirmDelete, setConfirmDelete, handleDelete);
                }}
            >
                {confirmDelete ? 'Confirm delete' : 'Delete'}
            </Button>
        </PatternsLayout>
    );
}
