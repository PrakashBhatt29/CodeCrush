import { Card } from "@/components/Card";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { Quote } from "@/components/Quote";
 
export default async function NeonGradientCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Card />
      </div>
      <div className="hidden lg:block">
        <Quote/>
      </div>
    </div>
  );
};