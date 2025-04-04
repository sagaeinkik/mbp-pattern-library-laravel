import CategoriesLayout from "@/layouts/CategoriesLayout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useForm } from "@inertiajs/react"

export default function AddCategory() {
  const { errors, data, setData, post, processing } = useForm({ name: ""});

  //Form submit
  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('categories.store'));
  }

  //Crumbs
  const breadCrumbs = [
    { title: "Add category", href: route("categories.create") }
];

  return (
    <CategoriesLayout title="Add Category" breadcrumbs={breadCrumbs}>
        <h1 className="text-2xl">Add new Category</h1>
        <form method="post" className="mt-4 md:w-4/5 lg:w" onSubmit={formSubmit}>
          <label htmlFor="name">Category name:</label>
          { errors.name && <p className="text-red-500">{errors.name}</p> }
          <Input type="text" id="name" className="my-4" value={data.name} onChange={e => setData("name", e.target.value)}/>
          <Button type="submit" className="mt-4 cursor-pointer">{ processing ? "Adding category" : "Add category"}</Button>
        </form>
    </CategoriesLayout>
  )
}
