import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Illustration} from "@/components/custom/illustration";

export const BannerCarousel = () => {
    const settings : Settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const SlickSlider = Slider as any;
    return (
        <SlickSlider {...settings}>
            <div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-[72px] font-semibold">
                            Phát huy tài năng,{" "}
                            <span className="block mt-3">Khám phá cơ hội.</span>
                        </h1>
                        <p className="text-lg text-[#8A8A8A] max-w-xl">
                            Preview this customizable portfolio template designed to showcase your work. With a modern,
                            responsive design, it’s perfect for elevating your brand
                        </p>
                    </div>

                    {/* Right Column - Image and Cards */}
                    <div className="relative flex justify-center mr-16">
                        {/* Main Profile Image */}
                        <div className="w-full">
                            <Illustration className="w-full object-cover aspect-[2/1]"
                                          url="/freelancer/home/banner/banner1.svg"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-[72px] font-semibold">
                            Phát huy tài năng,{" "}
                            <span className="block mt-3">Khám phá cơ hội.</span>
                        </h1>
                        <p className="text-lg text-[#8A8A8A] max-w-xl">
                            Etiam accumsan urna a mauris dapibus, nec aliquet nunc convallis. Phasellus eget justo et
                            libero ultrices posuere. Cras euismod, arcu nec congue convallis, ipsum nunc cursus nibh,
                            vel condimentum sapien orci non libero. Integer ullamcorper felis sit amet felis placerat,
                            eu convallis lorem iaculis.
                        </p>
                    </div>

                    {/* Right Column - Image and Cards */}
                    <div className="relative flex justify-center mr-16">
                        {/* Main Profile Image */}
                        <div className="w-full">
                            <Illustration className="w-full object-cover aspect-[2/1]"
                                          url="/freelancer/home/banner/banner1.svg"/>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                    {/* Left Column - Text Content */}
                    <div className="space-y-6">
                        <h1 className="text-4xl md:text-5xl lg:text-[72px] font-semibold">
                            Phát huy tài năng,{" "}
                            <span className="block mt-3">Khám phá cơ hội.</span>
                        </h1>
                        <p className="text-lg text-[#8A8A8A] max-w-xl">
                            Curabitur at felis non libero suscipit fermentum. Duis volutpat, ante et scelerisque luctus,
                            sem nulla placerat leo, at aliquet libero justo id nulla. Integer at dui nec magna posuere
                            fringilla. Nunc euismod bibendum augue. Cras nec ligula velit. Donec in laoreet leo.
                        </p>
                    </div>

                    {/* Right Column - Image and Cards */}
                    <div className="relative flex justify-center mr-16">
                        {/* Main Profile Image */}
                        <div className="w-full">
                            <Illustration className="w-full object-cover aspect-[2/1]"
                                          url="/freelancer/home/banner/banner1.svg"/>
                        </div>
                    </div>
                </div>
            </div>
        </SlickSlider>
    );
};

