import { Pattern } from './patterns';

/* Interfaces for category pages */

export interface Category {
    id: number;
    name: string;
    pattern?: Pattern[] | [];
    pattern_count?: number;
}
