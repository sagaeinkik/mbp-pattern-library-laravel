import { NavItem } from '@/types';
import { CirclePlus, List } from 'lucide-react';

//Nav items for WordPress Site pages
const patternNav: NavItem[] = [
    {
        title: "Connected WordPress sites",
        href: "#",
        icon: List
    },
    {
        title: "Connect site",
        href: "#",
        icon: CirclePlus
    }, 
    {
        title: "Something else entirely", 
        href: "#"
    }
];

export default patternNav;