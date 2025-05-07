import CategoryForm from '@/components/category-form';
import CategoriesLayout from '@/layouts/CategoriesLayout';
import { router } from '@inertiajs/react';

export default function AddCategory() {
    //Redirect to categories page
    const categorySuccess = () => {
        router.visit(route('categories.all'));
    };

    //Crumbs
    const breadCrumbs = [{ title: 'Add category', href: route('categories.new') }];

    return (
        <CategoriesLayout title="Add Category" breadcrumbs={breadCrumbs}>
            <h1 className="mb-4 text-2xl">Add new category</h1>
            <CategoryForm catSuccess={categorySuccess} />
        </CategoriesLayout>
    );
}
