import CategoriesLayout from "@/layouts/CategoriesLayout"
import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react";
import PatternCard from "@/components/pattern-card";

interface Category {
  id: number;
  name: string;
  pattern: Pattern[] | [];
}

interface Pattern {
  id: number;
  title: string;
  description: string;
  pattern_data: string;
  category_id: number;
  pattern_previews: PatternPreview[] | []
}

interface PatternPreview {
  id: number; 
  pattern_id: number;
  image_path: string;
}

export default function ShowCategory({ category }: { category: Category }) {
  const breadCrumbs = [
    { title: category.name, href: route("categories.details", { id: category.id }) }
  ];

  //Get an image from pattern previews
  const categoryImage = () => {
    if (category.pattern.length > 0) {
      //Find first pattern with previews
      const patternWithPreviews = category.pattern.find((pattern: Pattern) => pattern.pattern_previews.length > 0);
      
      //Get first preview
      const preview = patternWithPreviews?.pattern_previews[0];
      return preview?.image_path;
    }
  }

  return (
    <CategoriesLayout title={category.name + " details"} breadcrumbs={breadCrumbs}>
      <Link href={route("categories.all")} className="mb-4 flex gap-1 text-sm text-foreground/60 hover:text-foreground items-center"><ArrowLeft size={15} />Back to all categories</Link>
      <div className="flex justify-between items-center w-full">
        <h1 className="text-2xl">{category.name}</h1>
        <Link as="button" href={route("categories.edit", { category: category })} className="my-2 bg-secondary py-2 px-4 rounded-md text-sm hover:bg-primary">Handle category</Link>
      </div>

      { categoryImage() && <img src={categoryImage()} alt="Category example image" className="my-4 mx-auto max-h-1/3 rounded-md" />}

      <h2 className="text-xl mt-6">Patterns in this category</h2>
      { category.pattern.length === 0 ? <p>No patterns available</p> : ""}
      <div className="my-4 flex flex-wrap grow gap-4 w-full">
        {
          category.pattern.map((pattern: Pattern) => (
            <PatternCard key={pattern.id} pattern={pattern} />
          ))
        }
      </div>
    </CategoriesLayout>
  )
}
