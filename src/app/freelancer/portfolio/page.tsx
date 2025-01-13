import {ProminentProject} from "@/app/freelancer/portfolio/components/prominent-project";
import {CustomerFeedback} from "@/app/freelancer/portfolio/components/customer-feedback";
import {About} from "@/app/freelancer/portfolio/components/about";
import {WorkExperience} from "@/app/freelancer/portfolio/components/work-experience";
import {Skill} from "@/app/freelancer/portfolio/components/skill";
import {MarqueeBrand} from "@/components/constitution/marquee-brand";
import {PortfolioHeader} from "@/app/freelancer/portfolio/components/portfolio-header";

export default function Component() {
    return (
        <div className="space-y-12">
            <div className="max-width-suitable px-14 mx-auto mt-6">
                <PortfolioHeader/>
            </div>
            <MarqueeBrand/>
            <div className="max-width-suitable px-14 mx-auto ">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"/>
                    <h2 className="text-3xl font-semibold">Dự án nổi bật</h2>
                </div>
                {
                    Array.from({length: 2}).map((_, i) => (
                            <div key={i} className={i > 0 ? "mt-10" : "mt-5"}><ProminentProject/></div>
                        )
                    )
                }
            </div>

            <div className="mt-8">
                <div className="flex items-center gap-2 mb-6 max-width-suitable px-14 mx-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full"/>
                    <h2 className="text-3xl font-semibold">Feedback của Khách hàng</h2>
                </div>
                <CustomerFeedback/>
            </div>

            <div className="max-width-suitable px-14 mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"/>
                    <h2 className="text-3xl font-semibold">About</h2>
                </div>
                <About/>
            </div>

            <div className="max-width-suitable px-14 mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"/>
                    <h2 className="text-3xl font-semibold">Kinh nghiệm làm việc</h2>
                </div>
                <WorkExperience/>
            </div>

            <div className="max-width-suitable px-14 mx-auto">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-2 bg-green-500 rounded-full"/>
                    <h2 className="text-3xl font-semibold">Kỹ năng</h2>
                </div>
                <Skill/>
            </div>
        </div>
    )
}