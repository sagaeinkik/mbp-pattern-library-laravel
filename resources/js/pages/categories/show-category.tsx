import CategoriesLayout from "@/layouts/CategoriesLayout"
import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react";
import PatternCard from "@/components/pattern-card";
import { Category } from "@/types/categories";
import { Pattern } from "@/types/patterns";
import ShowPageHeading from "@/components/ui/showpage-heading";


export default function ShowCategory({ category }: { category: Category }) {
  const breadCrumbs = [
    { title: category.name, href: route("categories.details", { id: category.id }) }
  ];

  //Get an image from pattern previews
  const categoryImage = () => {
    if (category.pattern!.length > 0) {
      //Find first pattern with previews
      const patternWithPreviews = category.pattern!.find((pattern: Pattern) => pattern.pattern_previews.length > 0);
      
      //Get first preview
      const preview = patternWithPreviews?.pattern_previews[0];
      return preview?.image_path;
    }
  }

  return (
    <CategoriesLayout title={category.name + " details"} breadcrumbs={breadCrumbs}>
      <Link href={route("categories.all")} className="mb-4 flex gap-1 text-sm text-foreground/60 hover:text-foreground items-center w-fit"><ArrowLeft size={15} />Back to all categories</Link>
      <ShowPageHeading headingText={category.name} route={route("categories.edit", {category: category})} value={"Handle category"} />

      { categoryImage() && <img src={categoryImage()} alt="Category example image" className="my-4 mx-auto max-h-1/3 rounded-md" />}

      <h2 className="text-xl mt-6">Patterns in this category</h2>
      { category.pattern!.length === 0 ? <p>No patterns available</p> : ""}
      <div className="my-4 flex flex-wrap grow gap-4 w-full">
        {
          category.pattern!.map((pattern: Pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))
        }
      </div>
    </CategoriesLayout>
  )
}
