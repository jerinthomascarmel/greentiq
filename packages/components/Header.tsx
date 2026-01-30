
import { BaseIcon } from './buttons';
import { Search, SlidersVertical, Bell, User, Menu, PanelLeft } from 'lucide-react';

const Header = () => {
    return (
        <header className="h-14 bg-gray-100 flex items-center px-6 gap-4  shrink-0">
            {/* New Button */}
            <div className="relative group">
                <button className="bg-white border text-brand-green border-emerald-500/30 px-3 py-1.5 rounded flex items-center gap-2 text-sm font-medium shadow-sm hover:bg-emerald-50">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="12" y1="18" x2="12" y2="12"></line><line x1="9" y1="15" x2="15" y2="15"></line></svg>
                    New
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-gray-400"><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>
            </div>
            <BaseIcon icon={SlidersVertical} className='rounded border bg-white border-gray-200 hover:bg-gray-50 text-gray-500 h-9 w-9' />

            {/* Search */}
            <div className="flex-1 max-w-lg mx-auto relative">
                <div className="absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 ">
                    <BaseIcon icon={Search} fill="none" className='w-9 h-9'></BaseIcon>
                </div>
                <input type="text" placeholder="Search for anything" className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 bg-white placeholder-gray-400 text-sm" />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-4 ml-auto">
                <button className="relative text-gray-500 hover:text-gray-700">
                    <BaseIcon icon={Bell} fill="none" className='w-9 h-9'></BaseIcon>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg> */}
                    <span className="absolute -top-0 -right-0 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">3</span>
                </button>
                <BaseIcon icon={User} fill="none" className='rounded-full border border-gray-300 bg-white hover:bg-gray-50 hover:text-gray-700 overflow-hidden'></BaseIcon>
                <BaseIcon icon={Menu} fill="none" className='text-gray-500 hover:text-gray-700 w-9 h-9'></BaseIcon>
                <span className="text-sm font-small text-gray-600">Help</span>
                <BaseIcon icon={PanelLeft} fill="none" className="text-gray-500 hover:text-gray-700 w-9 h-9"></BaseIcon>
            </div>
        </header>
    );
};

export default Header;
