import {cn} from "@/lib/utils";

type Props = {
    width ?: number,
    height ?: number,
    url ?: string,
    rounded ?: number,
    className ?: string
}

export const Illustration = ({width, height, url, rounded, className} : Props) => {
    return (
        <div
            className={cn(`relative ${rounded && `rounded-[${rounded}px]`}`, className && className)}
            style={{
                backgroundImage: `url('${url}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                width : width+"px",
                height : height+"px"
            }}
        />
    )
}