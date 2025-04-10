import { CircleX } from "lucide-react";

interface DeletePatternImageButtonProps {
    index: number;
    onDelete: (index: number) => void;
}

export default function DeletePatternImageButton( { index, onDelete }: DeletePatternImageButtonProps) {
    return (
        <button
            type="button"
            className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-700 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
            onClick={() => onDelete(index)}>
            <CircleX />
        </button>
    )
}
