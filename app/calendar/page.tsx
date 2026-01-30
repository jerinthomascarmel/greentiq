import { Calendar } from 'lucide-react';

export default function CalendarPage() {
    return (
        <div className="w-full flex flex-col items-center justify-center h-screen bg-gray-50 text-gray-400 gap-2">
            <Calendar size={30} strokeWidth={1} />
            <h1 className="text-sm font-medium text-gray-600 ">Calendar</h1>
        </div>
    )
}
