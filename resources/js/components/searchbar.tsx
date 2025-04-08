import { useState } from 'react'
import { Input } from './ui/input';
import { Search } from 'lucide-react';


interface SearchbarProps {
    onSearch: (query: string) => void;
    placeholder?: string;
    className?: string;
}

export default function Searchbar({ onSearch, placeholder = "Search...", className }: SearchbarProps) {
    const [query, setQuery] = useState<string>('')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setQuery(value);
        onSearch(value);
    }

    return (
        <div className="mt-1 mb-4 relative">
            <label htmlFor="categorysearch" className="text-primary-foreground-links"><Search size={18} className="absolute top-2 left-1" /></label>
            <Input type="search" value={query} onChange={handleChange} placeholder={placeholder} id="categorysearch" className={className}/>
        </div>
    )
}
