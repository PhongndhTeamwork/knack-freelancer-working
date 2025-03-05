import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slick-modification.css"
import {Illustration} from "@/components/custom/illustration";

export const BannerCarousel = () => {
    const settings : Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 10000,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SlickSlider = Slider as any;
    return (
        <SlickSlider {...settings}>
            <div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <h1 className="responsive-text-56 font-semibold">
                            Phát huy tài năng,{" "}
                            <span className="block mt-3">Khám phá cơ hội.</span>
                        </h1>
                        <p className="text-lg text-[#8A8A8A] max-w-xl">
                            Thỏa sức sáng tạo cùng đam mê, Knack là đối tác tin cậy cho thành công của bạn!
                        </p>
                    </div>

                    {/* Right Column - Image and Cards */}
                    <div className="relative flex justify-end" style={{marginRight : "0.1px", marginLeft:"1px"}}>
                        {/* Main Profile Image */}
                        <div className="w-full">
                            <Illustration className="w-full object-cover aspect-[2/1]"
                                          url="/freelancer/home/banner/banner2.svg"/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <h1 className="responsive-text-56 font-semibold">
                            Phát huy tài năng,{" "}
                            <span className="block mt-3">Khám phá cơ hội.</span>
                        </h1>
                        <p className="text-lg text-[#8A8A8A] max-w-xl">
                            Thỏa sức sáng tạo cùng đam mê, Knack là đối tác tin cậy cho thành công của bạn!
                        </p>
                    </div>

                    {/* Right Column - Image and Cards */}
                    <div className="relative flex justify-end" style={{marginRight : "0.1px", marginLeft:"1px"}}>
                        {/* Main Profile Image */}
                        <div className="w-full">
                            <Illustration className="w-full object-cover aspect-[2/1]"
                                          url="/freelancer/home/banner/banner3.svg"/>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-5">
                        <h1 className="responsive-text-56 font-semibold">
                            Phát huy tài năng,{" "}
                            <span className="block mt-3">Khám phá cơ hội.</span>
                        </h1>
                        <p className="text-lg text-[#8A8A8A] max-w-xl">
                            Thỏa sức sáng tạo cùng đam mê, Knack là đối tác tin cậy cho thành công của bạn!
                        </p>
                    </div>

                    {/* Right Column - Image and Cards */}
                    <div className="relative flex justify-end" style={{marginRight : "0.1px", marginLeft:"1px"}}>
                        {/* Main Profile Image */}
                        <div className="w-full">
                            <Illustration className="w-full object-cover aspect-[2/1]"
                                          url="/freelancer/home/banner/banner2.svg"/>
                        </div>
                    </div>
                </div>
            </div>
        </SlickSlider>
    );
};

