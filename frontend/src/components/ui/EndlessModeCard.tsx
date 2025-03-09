import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
import EmojiIcon from "@/components/ui/EmojiIcon"

  const EndlessModeCard = () => {
    return (
      <Card>
      <CardHeader>
        <div className="flex justify-between items-start">
          <EmojiIcon src="/emoji/infinity.svg"/>
          <div className="flex items-center gap-1">
            <p>25</p>
            <EmojiIcon width={24} height={24} src="/emoji/star.svg"/>
          </div>
        </div>
          <CardTitle><h2>Бесконечный режим</h2></CardTitle>
          <CardDescription><p>Отгадывайте слова и зарабатывайте звёзды, пока не надоест!</p></CardDescription>
      </CardHeader>
     
  </Card>
    )
  }
  
  export default EndlessModeCard