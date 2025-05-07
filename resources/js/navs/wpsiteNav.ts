import { NavItem } from '@/types';
import { CirclePlus, List } from 'lucide-react';

//Nav items for WordPress Site pages
const patternNav: NavItem[] = [
    {
        title: 'WordPress sites',
        href: route('wordpress.all'),
        icon: List,
    },
    {
        title: 'Add new site',
        href: route('wordpress.add'),
        icon: CirclePlus,
    },
];

export default patternNav;
