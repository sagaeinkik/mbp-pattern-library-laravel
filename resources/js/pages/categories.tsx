import SubPageLayout from '@/layouts/subpage-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import categoryNav from '@/navs/categoryNav';

//Interfaces
interface Category {
    id: number;
    name: string;
}

interface CategoriesProps {
    categories: Category[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Categories',
        href: route('categories.index'),
    },
];


export default function Categories({ categories }: CategoriesProps) {
    return (
        <SubPageLayout breadcrumbs={breadcrumbs} navItems={categoryNav}>
            <Head title="Categories" />

            {/* Loop */}
            {categories.map((category) => (
                <div key={category.id} >
                    <p>ID: {category.id}</p>
                    <p>Category name: {category.name}</p>
                </div>
            ))
            }
        </SubPageLayout>
    );
}