import CategoriesLayout from "@/layouts/CategoriesLayout";

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
        <h1>Categories Index</h1>
        {
            categories.map((category: Category) => (
                <div key={category.id}>
                    <p>ID: {category.id}</p>
                    <p>Name: {category.name}</p>
                </div>
            ))
        }
    </CategoriesLayout>
  )
}
