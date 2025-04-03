import CategoriesLayout from "@/layouts/CategoriesLayout"
import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react";

export default function ShowCategory( { category }: any) {
    const breadCrumbs = [
        { title: category.name, href: route("categories.show", { id: category.id }) }
    ];


  return (
    <CategoriesLayout title={category.name + " details"} breadcrumbs={breadCrumbs}>
        <Link href={route("categories.index")} className="mb-4 flex gap-1 text-sm text-foreground/60 hover:text-foreground items-center"><ArrowLeft size={15} />Back to all categories</Link>
        <h1 className="text-2xl">{category.name}</h1>
        <p>If there are any patterns in this category, use a random image off one of them to use as an example pic for the category</p>
        <h2 className="text-xl mt-6">Patterns in this category</h2>
        <p>(Add previews of patterns in this category later)</p>
    </CategoriesLayout>
  )
}
