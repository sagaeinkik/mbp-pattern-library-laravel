import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CategoriesLayout from "@/layouts/CategoriesLayout"
import { Link, useForm, router } from "@inertiajs/react"
import { useState } from "react"; 
import { Category } from "@/types/categories";
import { handleConfirm } from "@/lib/deleteConfirm";

export default function EditCategory({ category }: { category: Category}) {
    const { errors, data, setData, put, processing } = useForm({ name: category.name
    });

    //States
    const [confirmDelete, setConfirmDelete] = useState(false);

    //Form submit
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        put(route("categories.update", { category: category }));
    }

    //Breadcrumbs
    const breadCrumbs = [
        { title: category.name, href: route("categories.details", { id: category.id }) },
        { title: "Edit", href: route("categories.edit", { category: category }) }
    ]

    //Delete category
    const handleDelete = () => {
        if (confirmDelete) {
            //Inertia delete
            router.delete(route("categories.delete", { category: category }));
        }
    }

    return (
        <CategoriesLayout title="Edit category" breadcrumbs={breadCrumbs}>
            <Link href={route("categories.details", { category: category})} className="mb-4 block bg-secondary w-fit py-2 px-4 rounded-md text-sm hover:bg-primary">Go back</Link>
            <h1 className="text-2xl">Edit category</h1>
            
            
            <form className="mt-4 mb-10 md:w-4/5 lg:w" onSubmit={formSubmit}>
                <label htmlFor="name">Category name:</label>
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                <Input type="text" id="name" className="my-4" value={data.name} onChange={e => setData("name", e.target.value)} />
                <Button type="submit" className="cursor-pointer">{processing ? "Saving changes" : "Save changes"}</Button>
            </form>

            <h2 className="text-xl">Delete category</h2>
            <p>Be advised: deleting the category will also remove all patterns associated with the category.</p>
            { confirmDelete && <p className="mt-3 text-red-600 dark:text-red-400">Are you absolutely certain you want to delete this category? This action cannot be undone. Deleted categories and associated patterns cannot be recovered.</p>}
            <Button variant="destructive" className="mt-4" onClick={() => { handleConfirm(confirmDelete, setConfirmDelete, handleDelete) }}>{ confirmDelete ? "Confirm delete" : "Delete"}</Button>

        </CategoriesLayout>
    )
}
