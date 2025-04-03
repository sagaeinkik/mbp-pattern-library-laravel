import { NavItem } from '@/types';
import { CirclePlus, List } from 'lucide-react';

//Nav items for categories 
const categoryNav: NavItem[] = [
    {
        title: "All categories",
        href: route("categories.index"),
        icon: List
    },
    {
        title: "Add category",
        href: route("categories.create"),
        icon: CirclePlus
    }
];

export default categoryNav;