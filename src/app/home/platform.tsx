import Image from "next/image"
import { Button } from "@/components/ui/button"

export const PlatformSections = () => {
    return (
        <div className="mx-auto py-12 space-y-12">
            {/* Freelancer Section */}
            <section className="relative mt-[72px]">
                <h2 className="text-[40px] font-bold">
                    Dành cho Freelancers.
                </h2>
                <div className="bg-black rounded-3xl mt-8">
                    <div className="grid md:grid-cols-[65%_1fr] gap-8 py-8 px-12  lg:py-12">
                        <div className="space-y-6">
                            <blockquote className="text-xl md:text-2xl text-white">
                                &#34;Gặp gỡ những khách hàng mà bạn muốn làm việc cùng và nhận một công việc{" "}
                                <span className="font-semibold">phù hợp với tài năng của bạn</span>{" "}
                                mà bạn luôn mơ ước&#34;
                            </blockquote>
                            <Button
                                variant="white"
                                className="px-10"
                            >
                                Tìm việc
                            </Button>
                        </div>
                        <div className="relative lg:h-auto ml-28 md:flex hidden">
                            <div className="absolute -bottom-[160px] left-[64px] w-[295px] h-[161px]">
                                <Image
                                    src="/home/freelancer1.svg"
                                    alt="Creative professional"
                                    fill
                                    className="object-cover rounded-xl"
                                />
                                {/*<Illustration width={192} height={192} url="/home/freelancer1.svg"/>*/}
                            </div>
                            <div className="absolute -top-[154px] w-[295px] h-[275px]">
                                <Image
                                    src="/home/freelancer3.svg"
                                    alt="Creative professional"
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                            <div className="absolute -top-[40px] left-[308px] w-[138px] h-[161px]">
                                <Image
                                    src="/home/freelancer2.svg"
                                    alt="Creative professional"
                                    fill
                                    className="object-cover rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Business Section */}
            <section className="relative top-36">
                <h2 className="text-[40px] font-bold">
                    Dành cho Doanh nghiệp.
                </h2>
                <p className="text-[40px] font-bold text-[#8A8A8A]">
                    Tìm kiếm tài năng chưa bao giờ dễ dàng hơn
                </p>
                <div className="bg-black rounded-3xl overflow mt-8">
                    <div className="grid lg:grid-cols-[65%_1fr] gap-8 p-8 lg:p-12">
                        <div className="space-y-6">
                            <blockquote className="text-xl md:text-2xl text-white">
                                &#34;Mở rộng networking với đa dạng các chuyên gia trong ngành với{" "}
                                <span className="font-semibold">môi trường sáng tạo và rộng mở</span>&#34;
                            </blockquote>
                            <div className="flex flex-wrap gap-4">
                                <Button
                                    variant="secondary"
                                >
                                    Đăng bài tuyển việc
                                </Button>
                                <Button
                                    variant="outline"
                                >
                                    Tìm kiếm tài năng
                                </Button>
                            </div>
                        </div>
                        <div className="relative h-[400px] lg:h-auto md:flex hidden">
                            <div className="absolute right-0 -bottom-12 w-[346px] h-[343px]">
                                <Image
                                    src="/home/tranlot.svg"
                                    alt="Business professional"
                                    fill
                                    className="object-cover object-top rounded-xl"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}