import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from '@inertiajs/react';

interface CategoryFormProps {
    catSuccess: (name: string) => void;
}

export default function CategoryForm({ catSuccess }: CategoryFormProps) {
    const { errors, data, setData, post, processing } = useForm({ name: '' });

    //Form submit
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        e.stopPropagation();

        post(route('categories.new'), {
            onSuccess: () => {
                catSuccess(data.name);
            },
        });
    };

    return (
        <form className="lg:w mt-4 md:w-4/5" onSubmit={formSubmit}>
            <label htmlFor="name">Category name:</label>
            {errors.name && <p className="text-red-500">{errors.name}</p>}
            <Input type="text" id="name" className="mt-2 mb-4" value={data.name} onChange={(e) => setData('name', e.target.value)} />
            <Button type="submit" className="mt-4 cursor-pointer">
                {processing ? 'Adding category' : 'Add category'}
            </Button>
        </form>
    );
}
