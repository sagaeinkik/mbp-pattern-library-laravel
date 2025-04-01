import { NavigationMenu, NavigationMenuItem, NavigationMenuList, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { NavItem, type SharedData } from '@/types';

import { Link, usePage } from '@inertiajs/react';
import { Icon } from '@/components/icon';

interface SubMenuProps {
    navItems: NavItem[]; 
    title?: string; 
}

const SubPageSubMenu = ({ navItems, title} : SubMenuProps) => {
    const page = usePage<SharedData>();
    return (
        <div className="border-b ml-3 mr-4 py-3">
            <NavigationMenu>
                <NavigationMenuList className="flex gap-2 flex-wrap justify-evenly">
                    {navItems.map((item, index) => (
                        <NavigationMenuItem key={index} className="relative">
                            <Link
                                href={item.href} className="text-sky-200 py-2 px-4 rounded-md text-sm flex gap-2 items-center hover:bg-slate-800 hover:text-sky-50">
                                {item.icon && <Icon iconNode={item.icon} />}
                                {item.title}
                            </Link>
                            {page.url === item.href && (
                                <div className="absolute bottom-0 left-0"></div>
                            )}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    )
}

export default SubPageSubMenu