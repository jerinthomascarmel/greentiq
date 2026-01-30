
import { BaseIcon } from './buttons';
import { List, DollarSign, Calendar, Clipboard, Star, ChevronDown } from 'lucide-react';

const PreviewPanel = () => {
    return (
        <aside className="shadow-sm rounded-xl w-80 bg-white border-l border-gray-200 overflow-y-auto hidden lg:block shrink-0">
            <div className="px-6 py-4 flex items-center justify-between text-gray-500 border-b border-gray-300">
                <div className="flex items-center gap-1">
                    <BaseIcon icon={List} fill="none" className="p-1 text-gray-800 bg-gray-100 rounded hover:bg-gray-200 h-6 w-6" />
                    <BaseIcon icon={DollarSign} fill="none" className="hover:text-gray-800 p-1 text-gray-500 h-6 w-6" />
                    <BaseIcon icon={Calendar} fill="none" className="hover:text-gray-800 p-1 text-gray-500 h-6 w-6" />
                    <BaseIcon icon={Clipboard} fill="none" className="hover:text-gray-800 p-1 text-gray-500 h-6 w-6" />
                    <BaseIcon icon={Star} className="hover:text-gray-800 text-brand-green p-1 h-6 w-6" />
                </div>
                <BaseIcon icon={ChevronDown} fill="none" className="rounded-full border border-gray-200 p-1 hover:bg-gray-50 text-gray-500 h-6 w-6" />
            </div>

            <div className="px-6 py-4 border-b border-gray-300">
                <h3 className="text-xs uppercase tracking-wide text-gray-400 font-semibold mb-3">PREVIEW</h3>
                <div className="flex items-start gap-4 mb-2">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-serif text-lg font-bold shrink-0">$</div>
                    <div>
                        <h2 className="text-lg font-medium text-blue-600 leading-tight">45 Components - RTS</h2>
                        <p className="text-gray-500 text-sm mt-1">17 344 EUR</p>
                    </div>
                </div>

                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                    <div className="text-gray-400">Company:</div>
                    <div className="text-blue-500 hover:underline">SuperCompany Ltd ASA</div>

                    <div className="text-gray-400">Contact:</div>
                    <div className="text-blue-500 hover:underline">Peter Elliot</div>

                    <div className="text-gray-400">Sale date:</div>
                    <div className="text-gray-800">01/02/2025</div>

                    <div className="text-gray-400">Owner:</div>
                    <div className="text-gray-800">Eric Davies</div>

                    <div className="text-gray-400">Sale type:</div>
                    <div className="text-gray-800 truncate">Cross-sale to existing cust...</div>

                    <div className="text-gray-400">Status:</div>
                    <div className="text-gray-800">Open (20%)</div>
                </div>
            </div>

            {/* Activities */}
            <div className="px-6 py-4 border-b border-gray-300">
                <h3 className="text-base font-medium text-gray-800 mb-4">Activities</h3>
                <div className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                    <div className="text-gray-400">04/11/2024</div>
                    <a href="#" className="text-blue-500 hover:underline">Follow-up call</a>

                    <div className="text-gray-400">01/11/2024</div>
                    <a href="#" className="text-blue-500 hover:underline truncate">Quote for 45 components...</a>

                    <div className="text-gray-400">23/09/2024</div>
                    <a href="#" className="text-blue-500 hover:underline">Prospect meeting</a>

                    <div className="text-gray-400">22/09/2024</div>
                    <a href="#" className="text-blue-500 hover:underline">Introduction call</a>
                </div>
            </div>

            {/* Stakeholders */}
            <div className="px-6 py-4">
                <h3 className="text-base font-medium text-gray-800 mb-4">Stakeholders</h3>
                <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span>James Vargas</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Lisa Jansson</span>
                    </div>
                </div>
            </div>

        </aside>
    );
};

export default PreviewPanel;
