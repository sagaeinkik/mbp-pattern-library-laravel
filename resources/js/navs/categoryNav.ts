import { NavItem } from '@/types';
import { CirclePlus, List } from 'lucide-react';

//Nav items for categories 
const categoryNav: NavItem[] = [
    {
        title: "All categories",
        href: route("categories.all"),
        icon: List
    },
    {
        title: "Add category",
        href: route("categories.add"),
        icon: CirclePlus
    }
];

export default categoryNav;