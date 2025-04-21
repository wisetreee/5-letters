import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmojiIcon from "@/components/ui/EmojiIcon";

interface dailyModeCardProps {
  reward: number;
};

const DailyModeCard:React.FC<dailyModeCardProps> = ({reward}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <EmojiIcon width={48} height={48} src="/emoji/stopwatch.svg" />
          <div className="flex items-center gap-1">
            <p>{reward}</p>
            <EmojiIcon width={24} height={24} src="/emoji/star.svg" />
          </div>
        </div>
        <CardTitle>
          <h2>Ежедневное задание</h2>
        </CardTitle>
        <CardDescription>
          <p>Новое задание через:</p>
          <p className="text-white">21.11</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default DailyModeCard;
