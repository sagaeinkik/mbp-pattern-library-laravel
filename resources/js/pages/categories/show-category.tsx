import PatternCard from '@/components/pattern-card';
import ShowPageHeading from '@/components/ui/showpage-heading';
import CategoriesLayout from '@/layouts/CategoriesLayout';
import { Category } from '@/types/categories';
import { Pattern } from '@/types/patterns';
import { Link, usePage } from '@inertiajs/react';
import { ArrowLeft } from 'lucide-react';

export default function ShowCategory() {
    const { category } = usePage<{ category: Category }>().props;
    const breadCrumbs = [{ title: category.name, href: route('categories.details', { id: category.id }) }];

    //Get an image from pattern previews
    const categoryImage = () => {
        if (category.pattern!.length > 0) {
            //Find first pattern with previews
            const patternWithPreviews = category.pattern!.find((pattern: Pattern) => pattern.pattern_previews.length > 0);

            //Get first preview
            const preview = patternWithPreviews?.pattern_previews[0];
            return preview?.image_path;
        }
    };

    return (
        <CategoriesLayout title={category.name + ' details'} breadcrumbs={breadCrumbs}>
            <Link href={route('categories.all')} className="text-foreground/60 hover:text-foreground mb-4 flex w-fit items-center gap-1 text-sm">
                <ArrowLeft size={15} />
                Back to all categories
            </Link>
            <ShowPageHeading headingText={category.name} route={route('categories.edit', { category: category })} value={'Handle category'} />

            {categoryImage() && <img src={categoryImage()} alt="Category example image" className="mx-auto my-4 max-h-1/3 rounded-md" />}

            <h2 className="mt-6 text-xl">Patterns in this category</h2>
            {category.pattern!.length === 0 ? <p>No patterns available</p> : ''}
            <div className="my-4 flex w-full grow flex-wrap gap-4">
                {category.pattern!.map((pattern: Pattern) => (
                    <PatternCard key={pattern.id} pattern={pattern} />
                ))}
            </div>
        </CategoriesLayout>
    );
}
