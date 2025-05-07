import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/components/ui/navigation-menu';
import { NavItem, type SharedData } from '@/types';

import { Icon } from '@/components/icon';
import { Link, usePage } from '@inertiajs/react';

interface SubMenuProps {
    navItems: NavItem[];
    title?: string;
}

export default function SubPageSubMenu({ navItems }: SubMenuProps) {
    const page = usePage<SharedData>();
    return (
        <div className="mr-4 ml-3 border-b py-3">
            <NavigationMenu>
                <NavigationMenuList className="flex flex-wrap justify-evenly gap-2">
                    {navItems.map((item, index) => (
                        <NavigationMenuItem key={index} className="relative">
                            <Link
                                href={item.href}
                                className="text-primary-foreground-links text-bread hover:bg-accent hover:text-accent-foreground flex items-center gap-2 rounded-md px-4 py-2 text-sm"
                            >
                                {item.icon && <Icon iconNode={item.icon} />}
                                {item.title}
                            </Link>
                            {page.url === item.href && <div className="absolute bottom-0 left-0"></div>}
                        </NavigationMenuItem>
                    ))}
                </NavigationMenuList>
            </NavigationMenu>
        </div>
    );
}
