//Graphical
import CategoryForm from '@/components/category-form';
import ShowThumbnails from '@/components/show-thumbnails';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import PatternsLayout from '@/layouts/PatternsLayout';
import { CirclePlus } from 'lucide-react';

//Interfaces
import { Category } from '@/types/categories';

//Functions
import { handleJsonUpload } from '@/lib/handleJson';
import { cleanUpThumbnails, handleDeletePreview, handleNewFiles } from '@/lib/patternThumbnails';
import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useRef, useState } from 'react';

export default function AddPattern() {
    const { categories } = usePage<{ categories: Category[] }>().props;

    //States and refs
    const [imageThumbnails, setImageThumbnails] = useState<string[]>([]);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [dialogOpen, setDialogOpen] = useState<boolean>(false);
    const [newCatName, setNewCatName] = useState<string>('');
    const [formError, setFormError] = useState<string | null>(null);

    //Breadcrumbs
    const breadCrumbs = [{ title: 'Add pattern', href: route('patterns.add') }];

    //Form data
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        pattern_data: '',
        category_id: '',
        pattern_previews: [] as File[],
    });

    //Successfully added category
    const categorySuccess = (name: string) => {
        setNewCatName(name);
        //Close modal
        setDialogOpen(false);
    };

    // Form submission
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormError(null);
        post(route('patterns.new'));
    };

    //Dismount cleanup thumbnail URLS
    useEffect(() => {
        return () => cleanUpThumbnails(imageThumbnails);
    }, [imageThumbnails]);
    useEffect(() => {
        if (newCatName) {
            //Find category ID
            const category = categories.find((cat) => cat.name === newCatName);
            if (category) {
                setData('category_id', String(category.id));
            }
        }
    }, [categories, newCatName, setData]);

    return (
        <PatternsLayout title="Add Pattern" breadcrumbs={breadCrumbs}>
            <h1 className="text-2xl">Add new pattern</h1>
            <p className="text-muted-foreground my-2">Upload a JSON-file, or fill in fields manually.</p>
            <form onSubmit={handleSubmit} className="lg:w mt-4 md:w-4/5">
                {formError && <p className="my-4 text-red-500">{formError}</p>}
                <h2 className="mb-3 text-lg">Populate fields from JSON-file</h2>
                <label htmlFor="json">Upload file:</label>
                <Input
                    type="file"
                    accept=".json"
                    name="json"
                    id="json"
                    className="mt-2 mb-4"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleJsonUpload(e, setFormError, setData)}
                />

                <label htmlFor="title">Pattern title:</label>
                {errors.title && <p className="text-red-500">{errors.title}</p>}
                <Input type="text" id="title" className="mt-2 mb-4" value={data.title} onChange={(e) => setData('title', e.target.value)} />

                <label htmlFor="description">Description:</label>
                {errors.description && <p className="text-red-500">{errors.description}</p>}
                <Input type="text" id="description" className="mt-2 mb-4" onChange={(e) => setData('description', e.target.value)} />

                <label htmlFor="pattern_data">Block pattern JSON:</label>
                {errors.pattern_data && <p className="text-red-500">{errors.pattern_data}</p>}
                <textarea
                    name="pattern_data"
                    id="pattern_data"
                    value={data.pattern_data}
                    onChange={(e) => setData('pattern_data', e.target.value)}
                    className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2 mb-4 flex h-60 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 font-mono text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
                ></textarea>

                <label htmlFor="category_id">Category:</label>
                {errors.category_id && <p className="text-red-500">{errors.category_id}</p>}
                <div className="category flex items-center gap-4">
                    <select
                        name="category"
                        id="category_id"
                        value={data.category_id ? data.category_id : 'choose'}
                        onChange={(e) => setData('category_id', e.target.value)}
                        className="border-input placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive mt-2 mb-4 flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
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

                    {/* Dialog */}
                    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                        <DialogTrigger asChild>
                            <CirclePlus
                                className="text-primary-foreground-links hover:text-accent mb-2 cursor-pointer"
                                size={28}
                                onClick={() => setDialogOpen(true)}
                            />
                        </DialogTrigger>
                        <DialogContent>
                            <DialogTitle className="text-2xl">Add new category</DialogTitle>
                            <DialogDescription>Can't find the category you're looking for? Add it to the list real quick!</DialogDescription>
                            <CategoryForm catSuccess={categorySuccess} />
                        </DialogContent>
                    </Dialog>
                </div>

                {/* Add previews */}
                <h2 className="text-xl">Preview images</h2>
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

                {/* Preview thumbnails */}
                {imageThumbnails.length > 0 && (
                    <ShowThumbnails
                        imageThumbnails={imageThumbnails}
                        onDelete={(index) => handleDeletePreview(index, setImageThumbnails, setData, imageThumbnails, data)}
                    />
                )}

                <Button type="submit" className="mt-6 cursor-pointer">
                    {processing ? 'Adding pattern' : 'Add pattern'}
                </Button>
            </form>
        </PatternsLayout>
    );
}
