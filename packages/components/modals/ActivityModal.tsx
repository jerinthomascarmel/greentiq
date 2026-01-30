
interface ActivityAddModalProps{
    open: boolean ; 
    onClose: () => void;
}

interface AcitvityEditModalProps{
    data: any ;
    open: boolean ; 
    onClose: () => void;
    mutate?:any 
}

export function ActivityAddModal(props: ActivityAddModalProps){
    const { open , onClose } = props;
    let inputStyle ="mt-1 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-brand-green px-3 py-2 text-sm transition-all duration-200 ease-out"
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
                    <h2 className="text-lg font-semibold">Add Activity</h2>
                </div>

                {/* Form */}
                <form className="space-y-4 px-6 py-5">
                    {/* Activity Name */}
                    <div>
                        <label className="text-sm text-gray-500">Activity name</label>
                        <input
                            type="text"
                            className={`${inputStyle}  text-gray-600`}
                            placeholder="45 Components - RTS"
                        />
                    </div>

                    {/* Acitivity Date */}
                    <div>
                        <label className="text-sm text-gray-500">Activity Date</label>
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

export function ActivityEditModal(props: AcitvityEditModalProps){
    const { data , open , onClose } = props;
    let inputStyle ="mt-1 w-full rounded-md border border-gray-300 focus:outline-none focus:ring-0 focus:border-brand-green px-3 py-2 text-sm transition-all duration-200 ease-out"
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
                    <h2 className="text-lg font-semibold">Edit Activity</h2>
                </div>

                {/* Form */}
                <form className="space-y-4 px-6 py-5">
                    {/* Sale Name */}
                    <div>
                        <label className="text-sm text-gray-500">Activity Name</label>
                        <input
                            type="text"
                            className={`${inputStyle}  text-gray-600`}
                            placeholder="45 Components - RTS"
                        />
                    </div>


                    {/* Next Activity */}
                    <div>
                        <label className="text-sm text-gray-500">Activity Date</label>
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