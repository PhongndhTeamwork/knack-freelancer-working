import {Textarea} from "@/components/ui/textarea";
import {CSSProperties, useEffect, useRef} from "react";
import {cn} from "@/lib/utils";

type Props = {
    className?: string,
    // disabled?: boolean,
    onChange ?: (value : string) => void,
    value?: string,
    placeholder ?: string,
    id ?: string,
    style ?: CSSProperties
}

export const CustomTextarea = ({style,id,className, onChange, value, placeholder} : Props) => {
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight + 4}px`;
        }
    }, [value]);
    return (
        <Textarea
            id={id}
            placeholder={placeholder}
            value={value}
            ref={textareaRef}
            className={cn("min-h-[80px] responsive-text-16 max-h-[120px]", className && className)}
            onChange={(e) => onChange && onChange(e.target.value)}
            style={{...style}}
        />    )
}