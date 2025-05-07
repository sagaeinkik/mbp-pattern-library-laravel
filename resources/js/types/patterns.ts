import { Category } from './categories';

/* Interfaces for pattern pages */
export interface PatternPreview {
    id: number;
    pattern_id: number;
    image_path: string;
}

export interface Pattern {
    id: number;
    title: string;
    description: string;
    pattern_data: string;
    category_id: number;
    pattern_previews: PatternPreview[];
    category?: Category;
}

export interface PatternJson {
    id?: number;
    title: string;
    pattern_data: string;
}
