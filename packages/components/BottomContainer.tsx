'use client'
import { useEffect, useState } from "react";
import useSWR from "swr";
import { ActivityModal, SalesModal } from "./modals";
import { GetSalesResponse, Sale } from "../types";
import { toast } from 'react-toastify';
import { ErrorDiv } from "@/packages/components/error";
import { Loader, } from "./loading";


const BottomContainer = () => {
    type tabType = 'activities' | 'contacts' | 'projects' | 'sales' | 'requests';

    const [currentTab, setCurrentTab] = useState<tabType>('sales');

    let tabstoPanel: Record<tabType, React.ReactNode> = {
        'activities': <ActivitiesPanel />,
        'contacts': <ContactsPanel />,
        'projects': <ProjectsPanel />,
        'sales': <SalesPanel />,
        'requests': <RequestsPanel />,
    };

    let handleTabChange = (tab: string) => {
        setCurrentTab(tab as tabType);
    }

    return (
        <>
            <div className="max-h-75 mb-3 bg-white rounded-xl shadow-sm border border-gray-200 flex-1 flex flex-col">
                {/* Tabs */}
                <div className="px-6 pt-3 flex items-center gap-8 border-b border-gray-100 text-sm font-medium text-gray-500">
                    {
                        Object.keys(tabstoPanel).map((tab) => (
                            <button key={tab} onClick={() => handleTabChange(tab)}
                                className={`pb-3 hover:text-gray-800 px-3 ${tab == currentTab ? "text-brand-green border-b-1 border-brand-green/100 bg-light-green/50 rounded-t" : ""}`}>
                                {tab[0].toUpperCase() + tab.substring(1).toLowerCase()}
                            </button>
                        ))
                    }
                </div>
                {tabstoPanel[currentTab]}
            </div>
        </>
    );
};

export default BottomContainer;

const SalesPanel = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [operation, setOperation] = useState<"add" | "edit">('add');
    const [page, setPage] = useState<number>(1);
    // default perpage = 4 


    const handleToggleModal = (operation: "add" | "edit") => {
        setOperation(operation);
        setModalOpen(!modalOpen);
    }


    let tableHeaders: TableLayoutProps['tableHeaders'] = [
        <span>Status</span>,
        <span>Sale date</span>,
        <span>Amount</span>,
        <div className="flex items-center gap-2">
            Stage
            <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <polyline points="19 12 12 19 5 12"></polyline>
            </svg>
        </div>,
        <span>Next Activity</span>,
        <span>Sale Name </span>
    ];

    let fetcher = async (url: string) => {
        const res = await fetch(url);
        if (!res.ok) {
            const error = await res.json();
            throw new Error(error.message || 'Request failed');
        }
        return res.json();
    };
    const { data, error, isLoading, mutate } = useSWR('/api/sales?page=' + page + '&perpage=4', fetcher, {
        revalidateOnFocus: false,
    });

    const [selectedSales, setSelectedSales] = useState<Sale[]>([]);

    useEffect(() => {
        if (error) {
            toast.error(error.message);
        }
    }, [error]);

    if (isLoading) return <>
        <div className="w-full h-full flex items-center justify-center"><Loader /></div>;
        <FooterActions handleToggleModal={handleToggleModal} page={0} totalPage={0} setPage={setPage} />
    </>
    if (error) {
        return <>
            <ErrorDiv />
            <FooterActions handleToggleModal={handleToggleModal} page={0} totalPage={0} setPage={setPage} />
        </>;
    }

    let sales: Sale[] = data?.data || [];

    let totalPage: GetSalesResponse["metadata"]["total"] = Math.floor(data?.metadata.total / 4) + 1 || 0;

    let handleSelectSale = (sale: Sale) => {
        let isIncluded = false;
        selectedSales.forEach((s) => {
            if (s.saleId === sale.saleId) {
                isIncluded = true;
                return;
            }
        })

        if (isIncluded) {
            setSelectedSales(selectedSales.filter(s => s.saleId !== sale.saleId));
        } else {
            setSelectedSales([...selectedSales, sale]);
        }
    }
    console.log(selectedSales)



    let tableData: TableLayoutProps['tableData'] = sales.map(sale => {
        return {
            saleId: sale.saleId,
            status: saleStatusDiv[sale.status],
            saleDate: sale.saleDate,
            amount: sale.amount,
            stage: sale.stage,
            nextActivity: sale.nextActivity,
            saleName: sale.saleName
        }
    });



    return (
        <>
            <div className="px-4 flex-1 overflow-y-auto max-h-65">
                <TableLayout tableData={tableData} tableHeaders={tableHeaders} />
            </div>
            <SalesModal open={modalOpen} onClose={() => setModalOpen(false)} operation={operation} mutate={mutate} />
            <FooterActions handleToggleModal={handleToggleModal} page={page} totalPage={totalPage} setPage={setPage} />
        </>
    );
}

const ActivitiesPanel = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [operation, setOperation] = useState<"add" | "edit">('add');

    const handleToggleModal = (operation: "add" | "edit") => {
        setOperation(operation);
        setModalOpen(!modalOpen);
    }

    let page = 1;
    let totalPage = 1;
    let setPage = (page: number) => { }

    let tableContent: TableLayoutProps = {
        tableHeaders: [
            <span>Activity date</span>,
            <span>Activity name</span>,
        ],
        tableData: []
    }

    return (
        <>
            <div className="px-4 flex-1 overflow-y-auto max-h-65">
                <TableLayout tableData={tableContent.tableData} tableHeaders={tableContent.tableHeaders} />
            </div>
            <ActivityModal open={modalOpen} onClose={() => setModalOpen(false)} operation={operation} />
            <FooterActions handleToggleModal={handleToggleModal} page={page} totalPage={totalPage} setPage={setPage} />
        </>
    )
}

const ContactsPanel = () => {

    const handleToggleModal = () => { }
    return (
        <>
            <div className="px-4 flex-1 overflow-y-auto max-h-65">
                <div className="h-full flex align-center justify-center">
                    controls
                </div>
            </div>
            <FooterActions handleToggleModal={handleToggleModal} page={0} totalPage={0} setPage={(page: number) => { }} />
        </>
    )
}


const ProjectsPanel = () => {
    const handleToggleModal = () => {
    }
    return (<>
        <div className="px-4 flex-1 overflow-y-auto max-h-65">
            <div className="h-full flex align-center justify-center">
                Projects
            </div>
        </div>
        <FooterActions handleToggleModal={handleToggleModal} page={0} totalPage={0} setPage={(page: number) => { }} />
    </>)
}


const RequestsPanel = () => {
    const handleToggleModal = () => {
    }
    return (<>
        <div className="px-4 flex-1 overflow-y-auto max-h-65">
            <div className="h-full flex align-center justify-center">
                Projects
            </div>
        </div>
        <FooterActions handleToggleModal={handleToggleModal} page={0} totalPage={0} setPage={(page: number) => { }} />
    </>)
}

interface TableLayoutProps {
    tableHeaders: any[];
    tableData: any[];
    handleSelected?: (tuple: any) => void;
}

const TableLayout = (tableProps: TableLayoutProps) => {
    let tableData = tableProps.tableData;
    let handleSelected = tableProps.handleSelected;
    return (
        <table className="w-full text-left text-sm border border-gray-200 border-separate rounded-xl">
            <thead className="text-xs text-gray-500 font-normal bg-gray-50">
                <th className="pl-3 py-1 font-normal"><div className="w-5 h-5 bg-emerald-500 text-white rounded flex items-center justify-center text-xs">-</div></th>
                {tableProps.tableHeaders.map((header) => <th className="px-2 font-normal">{header}</th>)}
            </thead>
            <tbody>
                {
                    tableData.map((tuple) => (
                        <tr className="group hover:bg-emerald-50">
                            <td className="pl-3 py-1 rounded-l-lg border-y border-l border-transparent group-hover:border-emerald-200">
                                <input type="checkbox" onChange={() => handleSelected ? handleSelected(tuple) : {}} className="w-4 h-4 rounded border-gray-300 text-emerald-500 accent-emerald-500 ring-white w-5 h-5" />
                            </td>
                            {Object.entries(tuple).slice(1).map(([key, cell]) => (
                                <td className="px-2 py-1 border-y border-transparent group-hover:border-emerald-200 text-gray-500">{cell as any}</td>
                            ))}
                        </tr>
                    ))
                }
            </tbody>
        </table>
    );
}



const DemoTable = () => {
    return (
        <table className="w-full text-left text-sm border border-gray-200 border-separate border-spacing-y-2">
            <thead className="text-xs text-gray-500 font-normal">
                <tr>
                    <th className="pl-3 font-normal"><div className="w-5 h-5 bg-emerald-500 text-white rounded flex items-center justify-center text-xs">-</div></th>
                    <th className="px-2 font-normal">Status</th>
                    <th className="px-2 font-normal">Sale date</th>
                    <th className="px-2 font-normal text-right">Amount</th>
                    <th className="pl-8 font-normal flex items-center gap-1">Stage <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><polyline points="19 12 12 19 5 12"></polyline></svg></th>
                    <th className="px-2 font-normal">Next activity</th>
                    <th className="px-2 font-normal">Sale name</th>
                </tr>
            </thead>
            <tbody>
                {/* Row 1 */}
                <tr className="bg-emerald-50/50 group hover:bg-emerald-50">
                    <td className="pl-3 py-2 rounded-l-lg border-y border-l border-emerald-100 group-hover:border-emerald-200">
                        <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-emerald-500 accent-emerald-500 ring-white w-5 h-5" defaultChecked />
                    </td>
                    {/* <td className="pl-3 py-2 rounded-l-lg border-y border-l border-emerald-100 group-hover:border-emerald-200"><div className="w-5 h-5 bg-emerald-500 text-white rounded flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div></td> */}
                    <td className="px-2 py-2 border-y border-emerald-100 group-hover:border-emerald-200">
                        <div className="flex items-center gap-1">
                            <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-500 font-serif font-bold">€</div>
                            <span className="text-xs font-semibold">Open</span>
                        </div>
                    </td>
                    <td className="px-2 py-2 border-y border-emerald-100 group-hover:border-emerald-200 text-gray-700">01/02/2025</td>
                    <td className="px-2 py-2 border-y border-emerald-100 group-hover:border-emerald-200 text-right font-medium text-gray-800">17,344.00</td>
                    <td className="pl-8 py-2 border-y border-emerald-100 group-hover:border-emerald-200 text-gray-700">Proposal (60%)</td>
                    <td className="px-2 py-2 border-y border-emerald-100 group-hover:border-emerald-200 text-gray-700">06/11/2024</td>
                    <td className="px-2 py-2 rounded-r-lg border-y border-r border-emerald-100 group-hover:border-emerald-200 text-gray-700 bg-emerald-100/30">45 Components - RTS</td>
                </tr>
                {/* Row 2 */}
                <tr className="hover:bg-gray-50">
                    <td className="pl-3 py-2 border-y border-transparent"><div className="w-5 h-5 rounded border border-gray-300"></div></td>
                    <td className="px-2 py-2 border-y border-transparent">
                        <div className="flex items-center gap-1 bg-red-100 px-1.5 py-0.5 rounded w-fit">
                            <span className="text-red-500 text-[10px]">✕</span>
                            <span className="text-xs font-medium text-red-700">Lost</span>
                        </div>
                    </td>
                    <td className="px-2 py-2 border-y border-transparent text-gray-700">07/07/2024</td>
                    <td className="px-2 py-2 border-y border-transparent text-right font-medium text-gray-800">3,200.00</td>
                    <td className="pl-8 py-2 border-y border-transparent text-gray-700">Lost</td>
                    <td className="px-2 py-2 border-y border-transparent text-gray-700">07/07/2024</td>
                    <td className="px-2 py-2 border-y border-transparent text-gray-700">Premium Support</td>
                </tr>
                {/* Row 3 */}
                <tr className="hover:bg-gray-50">
                    <td className="pl-3 py-2 border-y border-transparent"><div className="w-5 h-5 rounded border border-gray-300"></div></td>
                    <td className="px-2 py-2 border-y border-transparent">
                        <div className="flex items-center gap-1 bg-emerald-100 px-1.5 py-0.5 rounded w-fit">
                            <span className="text-emerald-500 text-[10px]">✓</span>
                            <span className="text-xs font-medium text-emerald-700">Sold</span>
                        </div>
                    </td>
                    <td className="px-2 py-2 border-y border-transparent text-gray-700">27/04/2024</td>
                    <td className="px-2 py-2 border-y border-transparent text-right font-medium text-gray-800">47,230.00</td>
                    <td className="pl-8 py-2 border-y border-transparent text-gray-700">Sold</td>
                    <td className="px-2 py-2 border-y border-transparent text-gray-700">27/04/2024</td>
                    <td className="px-2 py-2 border-y border-transparent text-gray-700">Introduction package - 48..</td>
                </tr>
                {/* Row 4 */}
                {/* <tr className="hover:bg-gray-50">
                            <td className="pl-3 py-2 border-y border-transparent"><div className="w-5 h-5 rounded border border-gray-300"></div></td>
                            <td className="px-2 py-2 border-y border-transparent">
                                <div className="flex items-center gap-1 bg-orange-100 px-1.5 py-0.5 rounded w-fit">
                                    <span className="text-orange-500 text-[10px]">▽</span>
                                    <span className="text-xs font-medium text-orange-700">Stalled</span>
                                </div>
                            </td>
                            <td className="px-2 py-2 border-y border-transparent text-gray-700">02/03/2021</td>
                            <td className="px-2 py-2 border-y border-transparent text-right font-medium text-gray-800">23,550.00</td>
                            <td className="pl-8 py-2 border-y border-transparent text-gray-700">Stalled</td>
                            <td className="px-2 py-2 border-y border-transparent text-gray-700">02/03/2024</td>
                            <td className="px-2 py-2 border-y border-transparent text-gray-700">Introduction package for..</td>
                        </tr> */}

            </tbody>
        </table>
    );

}

let saleStatusDiv = {
    "Open": <div className="flex items-center gap-1">
        <div className="w-4 h-4 rounded-full border border-gray-300 flex items-center justify-center text-[10px] text-gray-500 font-serif font-bold">€</div>
        <span className="text-xs font-semibold">Open</span>
    </div>,
    "Lost": <div className="flex items-center gap-1 bg-red-100 px-1.5 py-0.5 rounded w-fit">
        <span className="text-red-500 text-[10px]">✕</span>
        <span className="text-xs font-medium text-red-700">Lost</span>
    </div>,
    "Sold": <div className="flex items-center gap-1 bg-emerald-100 px-1.5 py-0.5 rounded w-fit">
        <span className="text-emerald-500 text-[10px]">✓</span>
        <span className="text-xs font-medium text-emerald-700">Sold</span>
    </div>,
    "Stalled": <div className="flex items-center gap-1 bg-orange-100 px-1.5 py-0.5 rounded w-fit">
        <span className="text-orange-500 text-[10px]">▽</span>
        <span className="text-xs font-medium text-orange-700">Stalled</span>
    </div>,
}


const FooterActions = ({ handleToggleModal, page, totalPage, setPage }: { handleToggleModal: (type: 'add' | 'edit') => void, page: number, totalPage: number, setPage: (page: number) => void }) => {
    return (
        <div className="px-2 py-4 border-t border-gray-100 flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center gap-3">
                <button onClick={() => handleToggleModal("add")} className="hover:bg-gray-100 py-1 px-3 rounded-lg flex items-center gap-2 hover:text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg> Add</button>
                <button className="hover:bg-gray-100 py-1 px-3 rounded-lg flex items-center gap-2 hover:text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg> Delete</button>
                <button className="hover:bg-gray-100 py-1 px-3 rounded-lg flex items-center gap-2 hover:text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg> Filter</button>
                <button className="hover:bg-gray-100 py-1 px-3 rounded-lg flex items-center gap-2 hover:text-gray-900"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg> Export</button>
            </div>
            <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                    {page == 1 ? "" : <span onClick={() => setPage(page - 1)} className="cursor-pointer">{`<<`}</span>}
                    <span>{page}/{totalPage}</span>
                    {page == totalPage ? "" : <span onClick={() => setPage(page + 1)} className="cursor-pointer">{`>>`}</span>}
                </div>
                <button className="hover:text-gray-900 mr-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" /></svg>
                </button>

            </div>
        </div>
    );
}