import type { LucideIcon } from "lucide-react";
import { cn } from "@/packages/lib/utils"

interface IconProps {
    icon: LucideIcon;
    className?: string;
    size?: number;
    fill?: string;
}

export function BaseIcon({ icon: Icon, className, size, fill }: IconProps) {
    return (
        <Icon
            className={cn('w-8 h-8 p-2 flex items-center justify-center shrink-0', className)}
            size={size || 14}
            fill={fill || "currentColor"}
        />
    )
}



