import CategoriesLayout from "@/layouts/CategoriesLayout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function AddCategory() {
  return (
    <CategoriesLayout title="Add Category">
        <h1 className="text-xl">Add new Category</h1>
        <form method="post" className="mt-4">
          <label htmlFor="name">Category name:</label>
          <Input type="text" id="name" className="my-4"/>
          <Button type="submit" className="mt-4 cursor-pointer">Add Category</Button>
        </form>
    </CategoriesLayout>
  )
}
