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
    readOnly?:boolean
}

export const CustomTextarea = ({readOnly,style,id,className, onChange, value, placeholder} : Props) => {
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
            value={value?.replace("####", "\n\n")}
            onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // Prevents unintended form submission
                }
            }}
            readOnly={readOnly}
            ref={textareaRef}
            className={cn("min-h-[80px] responsive-text-16", className && className)}
            onChange={(e) => onChange && onChange(e.target.value)}
            style={{...style}}
        />    )
}