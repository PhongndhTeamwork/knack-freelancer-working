import {Badge} from "@/components/ui/badge";

export const Skill = () => {
    const skills = [
        "HTML", "CSS", "JavaScript", "React", "Node.js",
        "TypeScript", "Next.js", "Tailwind CSS", "Git", "Photoshop"
    ]

    const groupedSkills: string[][] = skills.reduce<string[][]>((acc, skill, index) => {
        const groupIndex = Math.floor(index / 4);
        if (!acc[groupIndex]) acc[groupIndex] = [];
        acc[groupIndex].push(skill);
        return acc;
    }, []);

    return (
        <div>
            <div className="grid lg:grid-cols-2 gap-12 w-full">
                <div>
                    <p className="text-muted-foreground mb-6 responsive-text-24">
                        Here, I showcase the programs I work with and the programming languages I master.
                        From Photoshop to JavaScript, each skill contributes to the mosaic of my professional expertise.
                    </p>
                </div>
                <div className="flex flex-col space-y-4">
                    {
                        groupedSkills.map((groupedSkill, index) => (<div className="flex justify-end space-x-4" key={index}>
                            {groupedSkill.map((skill, skillIndex) => (
                                <Badge key={skillIndex} variant="secondary" className="rounded-[40px] font-normal h-14 px-6 responsive-text-20 bg-[#DDDDDD] bg-opacity-50">
                                    {skill}
                                </Badge>
                            ))}
                        </div>))
                    }
                </div>
            </div>
        </div>
    )
}