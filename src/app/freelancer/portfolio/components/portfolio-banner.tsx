import Slider, {Settings} from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/slick-modification.css"
import {Illustration} from "@/components/custom/illustration";

const bannerImages = [
    "/freelancer/portfolio/banner/1.svg",
    "/freelancer/portfolio/banner/2.svg",
]

export const PortfolioBanner = () => {
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
            {bannerImages.map((image, index) => (
                <div key={index} className="flex justify-center" >
                    <Illustration style={{width : "99.99%"}} className="w-full rounded-2xl object-cover aspect-[11/3]"
                                  url={image}/>
                </div>
            ))}
        </SlickSlider>
    );
};

