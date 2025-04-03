import CategoriesLayout from "@/layouts/CategoriesLayout";
import CategoryCard from "@/components/category-card";

//Interfaces
interface Category {
    id: number;
    name: string;
}

interface CategoriesIndexProps {
    categories: Category[];
}


export default function CategoriesIndex({ categories }: CategoriesIndexProps) {
  return (
    <CategoriesLayout title="Categories">
        <h1 className="text-2xl">Available categories</h1>
        <div className="my-4 flex flex-wrap grow gap-4 w-full">
        {
            categories.map((category: Category) => (
                <CategoryCard key={category.id} category={category} />
            ))
        }
        </div>
    </CategoriesLayout>
  )
}
