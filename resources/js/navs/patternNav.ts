import { NavItem } from '@/types';
import { CirclePlus, List } from 'lucide-react';

//Nav items for block pattern pages 
const patternNav: NavItem[] = [
    {
        title: "All patterns",
        href: route("patterns.all"),
        icon: List
    },
    {
        title: "Add pattern",
        href: route("patterns.add"),
        icon: CirclePlus
    }
];

export default patternNav;