import {Button} from "@/components/ui/button"
import {Illustration} from "@/components/custom/illustration";

export const CommunitySection = () => {
    return (
        <div className="mx-auto py-12 mt-32">
            <div className="justify-between grid md:grid-cols-[40%_1fr] space-x-12">
                {/* Text Content */}
                <div className="space-y-6">
                    <div>
                        <h2 className="text-[40px] font-bold mb-1">
                            Cộng đồng của chúng tôi.
                        </h2>
                        <p className="text-[40px] font-bold text-[#8A8A8A]">
                            Kết nối và Chia sẻ
                        </p>
                    </div>

                    <p className="text-gray-600 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur. Sed quam tristique et nullam tincidunt in scelerisque.
                        Eu urna nam dapibus felis a. Tortor morbi mauris nisl purus scelerisque convallis mauris in
                        duis.
                    </p>

                    <Button
                        variant="dark"
                    >
                        Tham gia ngay
                    </Button>
                </div>
                {/* Image Grid */}
                <div className="grid md:grid-cols-3 md:gap-4">
                    {/* Main Large Image */}
                    <div className="md:col-span-2 md:row-span-2">
                        <Illustration url="/home/community1.svg" rounded={12}
                                      className="w-full object-cover aspect-square"/>
                    </div>
                    <div className="md:col-span-1 md:row-span-1">
                        <Illustration url="/home/community3.svg" rounded={12}
                                      className="w-full object-cover aspect-square"/>
                    </div>
                    <div className="md:col-span-1 md:row-span-1">
                        <Illustration url="/home/community4.svg" rounded={12}
                                      className="w-full object-cover aspect-square"/>
                    </div>


                    {/* Right Column Images */}
                    {/*<div className="space-y-4">*/}
                    {/*    <div className="relative h-[210px] w-[578px] rounded-xl overflow-hidden">*/}
                    {/*        <Image*/}
                    {/*            src="/home/community2.svg"*/}
                    {/*            alt="Community event"*/}
                    {/*            fill*/}
                    {/*            className="object-cover"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*    <div className="relative h-[240px] rounded-2xl overflow-hidden">*/}
                    {/*        <Image*/}
                    {/*            src="/placeholder.svg?height=300&width=400"*/}
                    {/*            alt="Artistic eye through leaf"*/}
                    {/*            fill*/}
                    {/*            className="object-cover"*/}
                    {/*        />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    )
}