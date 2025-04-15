import { KeyRound } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import ClipboardCopyButton from "@/components/clipboard-copy-btn";

import { useState } from "react";
import { WPSite } from "@/types/wpsite";

export default function WPCard({ wpSite }: { wpSite: WPSite }) {
    //States
    const [showKey, setShowKey] = useState(false);

    const toggleKey = () => {
        setShowKey(!showKey);
    }
    return (
        <div key={wpSite.id} className="p-4 border rounded-md shadow-md mb-4">
            <h2 className="text-xl">{wpSite.url}</h2>
            <div className="flex items-center gap-4 mt-3">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="cursor-pointer">
                            <KeyRound onClick={toggleKey} />
                        </TooltipTrigger>
                        <TooltipContent>
                            {showKey ? "Hide site key" : "Show site key"}
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {showKey && <p className="bg-default-hover py-1 px-6 rounded-xl text-sm">{wpSite.key}</p>}
                <ClipboardCopyButton copyText={wpSite.key} btnText="key" className="ml-2" />
            </div>
        </div>
    )
}
