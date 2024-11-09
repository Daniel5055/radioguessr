import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Image from "next/image";

import countries from "@/assets/countries.json";

export interface CountryProps {
    alpha2?: string;
}

function Country({ alpha2 }: CountryProps) {
    if (!alpha2) {
        return null;
    }

    return (
            <div>
            <TooltipProvider delayDuration={0}>
                <Tooltip>
                    <TooltipTrigger>
                        <Image alt="Flag" src={`https://firebasestorage.googleapis.com/v0/b/harlyy-51e17.appspot.com/o/assets%2Fimages%2Fflags%2F${alpha2}.svg?alt=media`} width={64} height={64} />
                    </TooltipTrigger>
                    <TooltipContent>
                        {(countries as any)[alpha2]}
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            
            </div>
    );
}

export default Country;
