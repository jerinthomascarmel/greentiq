'use client'
import { CreateSaleRequest, CreateSaleRequestSchema } from "@/packages/types";
import { useState } from "react";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from "react-toastify";

interface SalesEditModalProps {
    data: any;
    open: boolean;
    onClose: () => void;
    mutate?: any;
}

export function SalesEditModal(props: SalesEditModalProps) {
    const { data, open, onClose, mutate } = props;
    let inputStyle = "mt-1 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-brand-green px-3 py-2 text-sm transition-all duration-200 ease-out"
    return (
        <>
            {/* Backdrop */}
            <div
                className={`
          fixed inset-0 z-40 bg-black/40
          transition-opacity duration-200
          ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}
        `}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`
          fixed left-1/2 top-1/2 z-50 w-full max-w-lg
          -translate-x-1/2 -translate-y-1/2
          rounded-lg bg-white shadow-lg
          transition-all duration-200 ease-out
          ${open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}
        `}
            >
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-3">
                    <h2 className="text-lg font-semibold">Edit Sale</h2>
                </div>

                {/* Form */}
                <form className="space-y-4 px-6 py-5">
                    {/* Sale Name */}
                    <div>
                        <label className="text-sm text-gray-500">Sale name</label>
                        <input
                            type="text"
                            className={`${inputStyle}  text-gray-600`}
                            placeholder="45 Components - RTS"
                        />
                    </div>

                    {/* Status & Stage */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-500">Status</label>
                            <select className={`${inputStyle} text-gray-600`}>
                                <option>Open</option>
                                <option>Sold</option>
                                <option>Lost</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Stage</label>
                            <select className={`${inputStyle} text-gray-600`}>
                                <option>Proposal (60%)</option>
                                <option>Negotiation</option>
                                <option>Closed</option>
                            </select>
                        </div>
                    </div>

                    {/* Amount & Sale Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-500">Amount</label>
                            <input
                                type="number"
                                className={`${inputStyle} text-gray-600`}
                                placeholder="17344"
                            />
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Sale date</label>
                            <input
                                type="date"
                                className={`${inputStyle} text-gray-600`}
                            />
                        </div>
                    </div>

                    {/* Next Activity */}
                    <div>
                        <label className="text-sm text-gray-500">Next activity</label>
                        <input
                            type="date"
                            className={`${inputStyle} text-gray-600`}
                        />
                    </div>
                </form>

                {/* Footer */}
                <div className="flex justify-end gap-3 border-t text-gray-200 px-6 py-3">
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                    >
                        Save
                    </button>
                </div>
            </div>
        </>
    )
}

interface SalesAddModalProps {
    open: boolean;
    onClose: () => void;
    mutate?: any;
}

export function SalesAddModal(props: SalesAddModalProps) {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<CreateSaleRequest>({
        resolver: zodResolver(CreateSaleRequestSchema)
    });
    const [loading, setLoading] = useState(false);

    function formatDateToDDMMYYYY(dateStr: string) {
        if (!dateStr) return ''
        const [year, month, day] = dateStr.split('-')
        return `${day}/${month}/${year}`
    }

    let onSubmit = async (data: CreateSaleRequest) => {

        try {
            setLoading(true);
            data.nextActivity = formatDateToDDMMYYYY(data.nextActivity);
            const response = await fetch('/api/sales', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const result = await response.json();
            toast.success("Sale added successfully");

        } catch (error: any) {
            toast.error(error.messsage);
        } finally {
            setLoading(false);
            reset();
            props.onClose();
            props?.mutate();
        }
    }
    let inputStyle = "mt-1 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-brand-green px-3 py-2 text-sm transition-all duration-200 ease-out"
    const { open, onClose } = props;
    return (
        <>
            {/* Backdrop */}
            <div
                className={`
          fixed inset-0 z-40 bg-black/40
          transition-opacity duration-200
          ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}
        `}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`
          fixed left-1/2 top-1/2 z-50 w-full max-w-lg
          -translate-x-1/2 -translate-y-1/2
          rounded-lg bg-white shadow-lg
          transition-all duration-200 ease-out
          ${open ? 'scale-100 opacity-100' : 'pointer-events-none scale-95 opacity-0'}
        `}
            >
                {/* Header */}
                <div className="border-b border-gray-200 px-6 py-3">
                    <h2 className="text-lg font-semibold">Add Sale</h2>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-6 py-5" >
                    {/* Sale Name */}
                    <div>
                        <label className="text-sm text-gray-500">Sale name</label>
                        <input
                            type="text"
                            className={`${inputStyle}  text-gray-600 ${errors.saleName ? 'border-red-500' : ''}`}
                            placeholder="45 Components - RTS"
                            {...register('saleName')}
                        />
                        {errors.saleName && <p className="text-xs text-red-500 mt-1">{errors.saleName.message}</p>}
                    </div>

                    {/* Status & Stage */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-500">Status</label>
                            <select
                                className={`${inputStyle} text-gray-600`}
                                {...register('status')}
                            >
                                <option value="Open">Open</option>
                                <option value="Sold">Sold</option>
                                <option value="Lost">Lost</option>
                                <option value="Stalled">Stalled</option>
                            </select>
                        </div>

                        <div>
                            <label className="text-sm text-gray-500">Stage</label>
                            <select
                                className={`${inputStyle} text-gray-600`}
                                {...register('stage')}
                            >
                                <option>Proposal (60%)</option>
                                <option>Negotiation</option>
                                <option>Closed</option>
                            </select>
                        </div>
                    </div>

                    {/* Amount & Sale Date */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm text-gray-500">Amount</label>
                            <input
                                type="number"
                                className={`${inputStyle} text-gray-600`}
                                placeholder="17344"
                                {...register('amount', { valueAsNumber: true })}
                            />
                            {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount.message}</p>}
                        </div>
                        {/* Next Activity */}
                        <div>
                            <label className="text-sm text-gray-500">Next activity</label>
                            <input
                                type="date"
                                className={`${inputStyle} text-gray-600`}
                                {...register('nextActivity')}
                            />
                            {errors.nextActivity && <p className="text-xs text-red-500 mt-1">{errors.nextActivity.message}</p>}
                        </div>

                    </div>


                    {/* Footer */}
                    <div className="flex justify-end gap-3 border-t text-gray-200 px-6 py-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="rounded-md px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="rounded-md bg-green-600 px-4 py-2 text-sm text-white hover:bg-green-700"
                        >
                            {loading ? 'Saving...' : 'Save'}
                        </button>
                    </div>
                </form>

            </div>
        </>
    )
}

