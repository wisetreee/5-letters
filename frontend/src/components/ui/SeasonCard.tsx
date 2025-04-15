import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmojiIcon from "./EmojiIcon";

interface seasonCardProps {
  userRank: number;
  seasonEndDate: number;
  userBalance: number;
};
const SeasonCard: React.FC<seasonCardProps> = ({userRank, seasonEndDate, userBalance}) => {
  return (
    <Card className="bg-accent-1 hover:bg-accent-1-hover">
      <CardHeader>
        <CardTitle>
          <h1>Сезон 1</h1>
        </CardTitle>
        <CardDescription>
          <p className="text-white">
            Набирай звёзды и попади в топ-1000 отгадывателей слов!
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 justify-center sm:items-center sm:flex-row">
          <div className="py-2 border-b-1 border-b-white sm:border-b-0 sm:border-r-1 sm:border-r-white sm:py-0 sm:px-8 sm:text-center">
            <p>Ваше место:</p>
            <h2>#{userRank}</h2>
          </div>

          <div className="py-2 border-b-1 border-b-white sm:border-b-0 sm:border-r-1 sm:border-r-white sm:py-0 sm:px-8 sm:text-center">
            <p>Конец сезона через:</p>
            <h2>{seasonEndDate}</h2>
          </div>

          <div className="py-2 border-b-1 border-b-white sm:border-b-0 sm:py-0 sm:px-8 sm:text-center">
            <p>У вас:</p>
            <div className="flex gap-1">
              <h2>{userBalance}</h2>
              <EmojiIcon width={24} height={24} src="/emoji/star.svg" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SeasonCard;
