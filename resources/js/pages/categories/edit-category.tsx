import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import CategoriesLayout from "@/layouts/CategoriesLayout"
import { useForm } from "@inertiajs/react"

export default function EditCategory() {
    const { errors, data, setData, put, processing } = useForm({ name: ""
    });

    //Form submit
    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

    }

    return (
        <CategoriesLayout title="Edit category">
            <h1 className="text-2xl">Edit category</h1>
            <form method="put" className="mt-4 md:w-4/5 lg:w" onSubmit={formSubmit}>
                <label htmlFor="name">Category name:</label>
                {errors.name && <p className="text-red-500">{errors.name}</p>}
                <Input type="text" id="name" className="my-4" value={data.name} onChange={e => setData("name", e.target.value)} />
                <Button type="submit" className="mt-4 cursor-pointer">Add Category</Button>
            </form>
        </CategoriesLayout>
    )
}
