'use client'
import { BaseIcon } from './buttons';
import {
    Home, Briefcase, User, Calendar, DollarSign, ClipboardList,
    Ticket, Monitor, AtSign, MessageSquare, BarChart2, Target,
    Wrench, ChevronRight
} from 'lucide-react';
import Link from 'next/link'
import { usePathname } from 'next/navigation'


const Sidebar = () => {
    const pathname = usePathname();
    const isActive = (path: string) => {
        return path === pathname;
    }

    const iconStyle = (path: string) => {
        return isActive(path) ? "bg-white/10 rounded text-white opacity-100 transition-all ease-in-out" : "";
    }


    return (
        <aside className="w-16 bg-sidebar flex flex-col items-center py-4 gap-6 shrink-0 z-20">
            {/* Logo */}
            <div className="text-white text-3xl font-serif font-bold mb-0">L</div>

            {/* Nav Icons */}
            <nav className="flex flex-col gap-2 w-full items-center text-gray-300 h-full">
                <Link href="/home"><BaseIcon icon={Home} fill="none" className={`hover:text-white w-9 h-9 hover:bg-white/10 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/home')}`} /></Link>
                <Link href="/company"><BaseIcon icon={Briefcase} fill="none" className={`hover:opacity-100 hover:bg-white/10 w-9 h-9 rounded ${iconStyle('/company')}`} /></Link>
                <Link href="/user"><BaseIcon icon={User} fill="none" className={`hover:opacity-100 hover:bg-white/10  w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/user')}`} /></Link>
                <Link href="/calendar"><BaseIcon icon={Calendar} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/calendar')}`} /></Link>
                <Link href="/money"><BaseIcon icon={DollarSign} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/money')}`} /></Link>
                <Link href="/list"><BaseIcon icon={ClipboardList} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/list')}`} /></Link>
                <Link href="/ticket"><BaseIcon icon={Ticket} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/ticket')}`} /></Link>
                <Link href="/monitor"><BaseIcon icon={Monitor} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/monitor')}`} /></Link>
                <Link href="/sign"><BaseIcon icon={AtSign} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/sign')}`} /></Link>
                <Link href="/message"><BaseIcon icon={MessageSquare} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/message')}`} /></Link>
                <Link href="/chart"><BaseIcon icon={BarChart2} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/chart')}`} /></Link>
                <Link href="/target"><BaseIcon icon={Target} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 ${iconStyle('/target')}`} /></Link>
                <Link href="/wrench"><BaseIcon icon={Wrench} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 mt-auto mb-4 ${iconStyle('/wrench')}`} /></Link>
                <BaseIcon icon={ChevronRight} fill="none" className={`hover:text-white hover:bg-white/10 w-9 h-9 rounded transition opacity-70 hover:opacity-100 `} />
            </nav>
        </aside>
    );
};

export default Sidebar;
