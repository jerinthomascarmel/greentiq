import Header from "@/packages/components/Header";
import CompanyCard from "@/packages/components/CompanyCard";
import BottomContainer from "@/packages/components/BottomContainer";
import PreviewPanel from "@/packages/components/PreviewPanel";

export default function CompanyPage() {
    return (
        <div className="flex-1 flex flex-col">
            <Header />
            {/* Content Area */}
            <main className="flex-1 flex pr-2 pb-2 overflow-y-auto">
                {/* Central Column */}
                <div className="flex-1 px-3 overflow-y-auto flex flex-col gap-2">
                    <CompanyCard />
                    <BottomContainer />
                </div>
                {/* Preview Panel */}
                <div className="mb-3 flex">
                    <PreviewPanel />
                </div>
            </main>
        </div>
    )
}