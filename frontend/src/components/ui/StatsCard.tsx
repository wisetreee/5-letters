import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmojiIcon from "@/components/ui/EmojiIcon";

const StatsCard = () => {
  return (
    <Card>
      <CardHeader>
        <EmojiIcon src="/emoji/stats.svg" />
        <CardTitle>
          <h2>Статистика</h2>
        </CardTitle>
        <CardDescription>
          <p>Тут пока пусто...</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default StatsCard;
