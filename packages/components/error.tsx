import { Frown } from "lucide-react";

export const ErrorDiv = () => {
    return (
        <div className="h-full flex flex-col items-center justify-center ">
            <Frown className="text-gray-500"/>
            <p className="text-gray-500 mt-2 text-sm">Something went wrong</p>
        </div>
    );
};

export const ErrorPage = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <ErrorDiv />
        </div>
    );
};