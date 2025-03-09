import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EmojiIcon from "@/components/ui/EmojiIcon";

const NewWordsCard = () => {
  return (
    <Card>
      <CardHeader>
        <EmojiIcon src="/emoji/pencil.svg" />
        <CardTitle>
          <h2>Новые слова</h2>
        </CardTitle>
        <CardDescription>
          <p>
            Голосуйте за добавление новых слов в следующем сезоне. Возможно, ваш
            голос станет решающим :)
          </p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default NewWordsCard;
