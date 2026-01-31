'use client';
import { BaseIcon } from './buttons';
import { Pencil, EllipsisVertical, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

const CompanyCard = () => {

    const [currentTab , setCurrentTab] = useState('company');


    let tabstoPanel : Record<string , React.ReactNode> = {
        'company': <CompanyPanel />,
        'more': <MorePanel />,
        'interest': <InterestPanel />,
        'note': <NotePanel />,
        'marketdata': <MarketDataPanel />,
        'misc': <MiscPanel />
    };

    let handleTabChange = (tab: string ) => {
        setCurrentTab(tab);
    }

    let handleArrowKey = (direction : string )=>{
        let tabs = Object.keys(tabstoPanel);
        let n = tabs.length;
        let nextIndex = tabs.indexOf(currentTab) + ((direction=="right") ? 1 : -1) 
        nextIndex = nextIndex <0  ? n+nextIndex : nextIndex
        nextIndex = nextIndex >=n ? nextIndex -n : nextIndex
        let nextTab = tabs[nextIndex]
        setCurrentTab(nextTab);
    }

    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 relative">
            {/* Top Row */}
            <div className="flex justify-between items-start mb-5">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2L2 7l10 5 10-5-10-5zm0 9l2.5-1.25L12 8.5l-2.5 1.25L12 11zm0 2.5l-5-2.5-5 2.5L12 22l10-8.5-5-2.5-5 2.5z" /></svg>
                    </div>  
                    <div>
                        <h1 className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
                            SuperCompany Ltd ASA
                            <BaseIcon icon={Star} fill="none" className='text-orange-500 hover:text-orange-600' />
                        </h1>
                        <p className="text-gray-500 text-sm mt-0.5">Department Stockholm</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <BaseIcon icon={Pencil} className='bg-orange-500 text-white rounded-full hover:bg-orange-600' />
                    <BaseIcon icon={EllipsisVertical} fill="none" className='text-gray-400 rounded-full hover:bg-gray-50 hover:text-gray-600 bg-white border' />
                </div>
            </div>

            {/* Inner Tabs */}
            <div className="flex items-center justify-start gap-0 pb-2 border-b border-gray-300 mb-3 text-sm font-medium">
                {Object.keys(tabstoPanel).map((tab)=>{
                    return (
                        <button
                            key={tab} 
                            onClick={()=>handleTabChange(tab)} 
                            className={`text-sm font-medium text-gray-600 hover:text-gray-900 px-4 py-1 ${currentTab === tab ? 'bg-light-green text-brand-green rounded-full text-sm': ''}`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    )
                }
                )}
            </div>

            {/* Panel Content */}
            {tabstoPanel[currentTab] }

            {/* Footer Row */}
            <div className="mt-4 border-t border-gray-300 pt-2 flex items-center justify-between text-sm">
                <div className="flex items-center gap-6">
                    <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded accent-emerald-500 text-emerald-500 border-gray-300 focus:ring-white" defaultChecked />
                        Stop
                    </label>
                    <label className="flex items-center gap-2 text-gray-700 cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 rounded accent-emerald-500 text-emerald-500 border-gray-300 focus:ring-white" />
                        No mailings
                    </label>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-xs">
                    <span>Updated: 18/09/2023 OG</span>
                    <div className="flex items-center gap-2">
                        <span onClick={()=>handleArrowKey("left")}><BaseIcon icon={ChevronLeft} fill='none' className='hover:text-gray-600 rounded-full border w-7 h-7' /></span>
                        <span onClick={()=>handleArrowKey("right")}><BaseIcon icon={ChevronRight} fill='none' className='hover:text-gray-600 rounded-full border w-7 h-7' /></span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyCard;


const  CompanyPanel = () =>{
    return (
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-2 text-sm'>
                <div className='flex flex-col gap-2'>
                    <div className='grid grid-cols-4'>
                        <div className='text-gray-500'>Postal:</div>
                        <div className='text-blue-500 col-span-2'>Västgötagatan 5, 102 61 Stock..</div>
                    </div>
                    <div className='grid grid-cols-4'>
                        {/* Country */}
                        <div className="text-gray-500">Country:</div>
                        <div className="text-gray-800 col-span-2">Sweden</div>
                    </div>
                    <div className='grid grid-cols-4'>
                        {/* Phone */}
                        <div className="text-gray-500">Phone:</div>
                        <div className="flex items-center gap-2 col-span-2">
                            <a href="#" className="text-blue-500 hover:underline">+46 800 193 2820</a>
                            <span className="text-gray-400 text-xs">Main</span>
                        </div>
                    </div>
                    <div className='grid grid-cols-4'>
                        {/* Webaddress */}
                        <div className="text-gray-500">Webaddress:</div>
                        <a href="#" className="text-blue-500 hover:underline     col-span-2">info@sc.se</a>
                    </div>
                    <div className='grid grid-cols-4'>
                        {/* E-mail */}
                        <div className="text-gray-500">E-mail:</div>
                        <a href="#" className="text-blue-500 hover:underline col-span-2">www.sc.se</a>
                    </div>

                </div>
                <div className='flex flex-col gap-2'>
                    <div className='grid grid-cols-4'>
                        {/* Category */}
                        <div className="text-gray-500">Category:</div>
                        <div className="text-gray-800 col-span-2">SUPERCO</div>
                    </div>
                    <div className='grid grid-cols-4'>
                        {/* Code */}
                        <div className="text-gray-500">Code:</div>
                        <div className="text-gray-800 col-span-2">SUPERCO</div>
                    </div>
                    <div className='grid grid-cols-4'>
                        {/* Number */}
                        <div className="text-gray-500">Number:</div>
                        <div className="text-gray-800 font-medium col-span-2">2002</div>
                    </div>
                    <div className='grid grid-cols-4'>
                        {/* VAT No */}
                        <div className="text-gray-500">VAT No.:</div>
                        <div className="text-gray-800 col-span-2">SE123456789</div>
                    </div>
                    <div className='grid grid-cols-4'>
                        {/* Business */}
                        <div className="text-gray-500">Business:</div>
                        <div className="text-gray-800 col-span-2">IT</div>
                    </div>
                </div>
            </div>
            ); 
}

const MorePanel = () =>{
    return (<div className='flex h-33 items-center justify-center'>
        More
    </div>)
}

const InterestPanel = () =>{
    return (<div className='flex h-33 items-center justify-center'>
        Interest
    </div>)
}

const NotePanel = () =>{
    return (<div className='flex h-33 items-center justify-center'>
        Note
    </div>)
}

const MarketDataPanel = () =>{
    return (<div className='flex h-33 items-center justify-center'>
        Market Data
    </div>)
}

const MiscPanel = () =>{
    return (
    <div className='flex h-33 items-center justify-center '>
        Misc
    </div>
    );
}


