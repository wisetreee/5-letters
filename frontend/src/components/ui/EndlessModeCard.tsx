import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmojiIcon from "@/components/ui/EmojiIcon";
import { Link } from "react-router";

interface endlessModeCardProps {
  href: string;
  reward: number;
}
const EndlessModeCard: React.FC<endlessModeCardProps> = ({ href, reward }) => {
  return (
    <Link to={href}>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <EmojiIcon width={48} height={48} src="/emoji/infinity.svg" />
            <div className="flex items-center gap-1">
              <p>{reward}</p>
              <EmojiIcon width={24} height={24} src="/emoji/star.svg" />
            </div>
          </div>
          <CardTitle>
            <h2>Бесконечный режим</h2>
          </CardTitle>
          <CardDescription>
            <p>Отгадывайте слова и зарабатывайте звёзды, пока не надоест!</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default EndlessModeCard;
