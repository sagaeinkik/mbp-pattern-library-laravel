import { PatternPreview } from '@/types/patterns';
import { useState } from 'react';
import DeletePatternImageButton from './ui/delete-pattern-image-btn';

interface ShowPatternPreviewsProps {
    patternPreviews: PatternPreview[];
    patternTitle: string;
    onDelete: (index: number) => void;
}

export default function ShowPatternPreviews({ patternPreviews, patternTitle, onDelete }: ShowPatternPreviewsProps) {
    const [deletedPreviewsIDs, setDeletedPreviewIDs] = useState<number[]>([]);

    const handleDelete = (index: number) => {
        // Call parent component's delete function
        onDelete(index);

        // Update state of deleted previews
        const previewID = patternPreviews[index].id;
        setDeletedPreviewIDs([...deletedPreviewsIDs, previewID]);
    };

    // Filter out deleted previews from view
    const previewsToKeep = patternPreviews.filter((preview) => !deletedPreviewsIDs.includes(preview.id));

    return (
        <div className="mb-4 flex w-full flex-wrap items-start gap-4 rounded-md border p-4">
            {previewsToKeep.map((preview, filteredIndex) => {
                // Find the original index in the full array
                const originalIndex = patternPreviews.findIndex((p) => p.id === preview.id);

                return (
                    <div key={preview.id} className="relative">
                        <img
                            src={preview.image_path}
                            alt={`Preview ${filteredIndex + 1} of pattern ${patternTitle}`}
                            className="h-52 w-52 max-w-72 rounded-md object-cover"
                        />
                        <DeletePatternImageButton index={originalIndex} onDelete={handleDelete} />
                    </div>
                );
            })}
            {previewsToKeep.length === 0 ? <p>There are no previews for this pattern yet.</p> : ''}
        </div>
    );
}
