import {Illustration} from "@/components/custom/illustration";

export const WhyKnackSection = () => {
    return (
        <div className="mx-auto py-12 justify-between grid md:grid-cols-[40%_1fr] space-x-12">
            {/* Text Content */}
            <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold">
                    Tại sao freelancers chuyển sang Knack?
                </h2>
                <p className="text-gray-600 leading-relaxed">
                    Nền tảng ứng dụng AI và Recruitment Marketing cung cấp giải pháp toàn diện giúp freelancer và
                    doanh nghiệp tối ưu quy trình tuyển dụng từ tạo CV, sàng lọc hồ sơ đảm bảo an toàn đến đánh giá
                    hiệu quả. Đồng thời, nền tảng xây dựng cộng đồng freelancer chất lượng trong lĩnh vực nghệ thuật
                    giải trí.
                </p>
            </div>

            {/* Image Card */}
            <div className="rounded-2xl">
                <Illustration className="w-full object-cover aspect-[12/5]" rounded={16} url="/home/why-knack.svg"/>
                {/*<div className="relative flex items-center justify-center">*/}
                {/*    <h3 className="absolute left-4 bottom-0 text-[40px] font-bold text-white text-start">*/}
                {/*        Quy trình hợp tác hiệu quả, đúng tiến độ và đảm bảo quyền lợi*/}
                {/*    </h3>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}