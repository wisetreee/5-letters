import { userData } from "@/lib/types";
import { Top3Avatar } from "../avatars/Top3Avatar";

interface Top3PanelProps {
  top3: userData[];
}
export const Top3Panel: React.FC<Top3PanelProps> = ({ top3 }) => {
  return (
    <div className="flex w-full items-center">
      {top3?.[1] && <Top3Avatar user={top3[1]} place={2} />}
      {top3?.[0] && <Top3Avatar user={top3[0]} place={1} />}
      {top3?.[2] && <Top3Avatar user={top3[2]} place={3} />}
    </div>
  );
};
