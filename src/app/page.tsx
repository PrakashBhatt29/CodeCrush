import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
 
export default async function NeonGradientCardDemo() {
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div className="mr-40">
          <NeonGradientCard className="max-w-sm items-center justify-center text-center">
            <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
            CodeCrush Devs Community
            </span>
          </NeonGradientCard>
        </div>
        <div className="max-w-80">
           <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-gradient-to-br from-[#ff2975] from-35% to-[#00FFF1] bg-clip-text text-center text-xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
              CodeCrush Dev Community is a collaborative platform where developers connect to discuss challenges, share knowledge, and seek solutions. Members can post questions, engage in discussions, and receive insightful answers and comments from fellow developers, fostering a supportive environment for learning and problem-solving.
            </span>
        </div>
      </div>
    </div>
  );
};