import Header from "@/packages/components/Header";
import CompanyCard from "@/packages/components/CompanyCard";
import BottomContainer from "@/packages/components/BottomContainer";
import PreviewPanel from "@/packages/components/PreviewPanel";

export default function CompanyPage() {
    return (
        <div className="flex-1 flex flex-col min-w-150">
            <Header />
            {/* Content Area */}
            <main className="flex-1 flex pr-2 pb-2 overflow-auto min-w-150  ">
                {/* Central Column */}
                <div className="flex-1 px-3 flex flex-col gap-2 min-w-150">
                    <CompanyCard />
                    <BottomContainer />
                </div>
                {/* Preview Panel */}
                <div className="mb-3 flex min-w-0">
                    <PreviewPanel />
                </div>
            </main>
        </div>
    )
}