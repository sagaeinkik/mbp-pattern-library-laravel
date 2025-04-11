import { PatternPreview } from "@/types/patterns"
import DeletePatternImageButton from "./ui/delete-pattern-image-btn";

interface ShowPatternPreviewsProps {
    patternPreviews: PatternPreview[];
    patternTitle: string;
    onDelete: (index: number) => void;
}

export default function ShowPatternPreviews({ patternPreviews, patternTitle, onDelete }: ShowPatternPreviewsProps) {
    return (
        <div className="flex gap-4 items-start w-full wrap border rounded-md p-4 mb-4">
            {
                patternPreviews.map((preview, index) => (
                    <div key={preview.id} className="relative">
                        <img src={preview.image_path} alt={`Preview ${index + 1} of pattern ${patternTitle}`} className="h-52 w-52 object-cover rounded-md max-w-72" />
                        <DeletePatternImageButton index={index} onDelete={onDelete} />
                    </div>
                ))
            }
            {patternPreviews.length === 0 ? <p>There are no previews for this pattern yet.</p> : ""}
        </div>
    )
}
