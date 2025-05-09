import { Button } from "@/components/ui/button";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {

    return (
        <div className="flex justify-center items-center gap-6 my-8 w-full md:max-w-4/5 mx-auto">
            <Button variant="outline" className="" disabled={currentPage === 1} onClick={() => onPageChange(Math.max(currentPage - 1, 1))}>
                Previous
            </Button>

            <div className="flex flex-wrap gap-1">
            {

            [...Array(totalPages)].map((_, i) => (
                <button
                    key={i}
                    onClick={() => onPageChange(i + 1)}
                    className={`px-3 py-1 border rounded hover:bg-accent ${currentPage === i + 1 ? 'bg-secondary' : ''}`}
                    >
                    {i + 1}
                </button>
            ))
        }
                    </div>

            <Button variant="outline" disabled={currentPage === totalPages || totalPages === 0} onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}>
                Next
            </Button>
        </div>
    );
}
