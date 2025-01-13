import {Card, CardContent} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

type Props = {
    link : string,
    image : string,
    title :string,
    aspect : string
}

export const ImageWithContent = ({image, title, link, aspect} : Props) => {

    return (
        <Card
            className="group relative overflow-hidden rounded-xl border-0 bg-transparent"
        >
            <CardContent className="p-0">
                <Link href={link} className={`block relative aspect-[${aspect}]`}>
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"/>
                    <div className="absolute bottom-0 left-0 p-6">
                        <h3 className="text-3xl font-semibold text-white">
                            {title}
                        </h3>
                    </div>
                </Link>
            </CardContent>
        </Card>
    )
}