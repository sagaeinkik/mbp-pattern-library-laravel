import DeletePatternImageButton from './ui/delete-pattern-image-btn';

interface ShowThumbnailsProps {
    imageThumbnails: string[];
    onDelete: (index: number) => void;
}

export default function ShowThumbnails({ imageThumbnails, onDelete }: ShowThumbnailsProps) {
    return (
        <div className="mt-2">
            <p className="mb-2 text-sm">
                {imageThumbnails.length} {imageThumbnails.length === 1 ? 'image' : 'images'} selected:
            </p>
            <div className="flex flex-wrap gap-2">
                {imageThumbnails.map((preview, index) => (
                    <div key={index} className="relative">
                        <img src={preview} alt={`Preview ${index + 1}`} className="h-24 w-24 rounded border border-gray-300 object-cover" />
                        <DeletePatternImageButton index={index} onDelete={onDelete} />
                    </div>
                ))}
            </div>
        </div>
    );
}
