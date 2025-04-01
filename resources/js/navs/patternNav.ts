import { NavItem } from '@/types';
import { CirclePlus, List } from 'lucide-react';

//Nav items for block pattern pages 
const patternNav: NavItem[] = [
    {
        title: "All patterns",
        href: route("patterns.index"),
        icon: List
    },
    {
        title: "Add pattern",
        href: "#",
        icon: CirclePlus
    }, 
    {
        title: "Something else entirely", 
        href: "#"
    }
];

export default patternNav;