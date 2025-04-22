import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LeaderboardData } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import EmojiIcon from "@/components/ui/EmojiIcon";

interface LeaderboardTableProps {
  leaderboardData: LeaderboardData;
}

export const LeaderboardTable: React.FC<LeaderboardTableProps> = ({
  leaderboardData,
}) => {
  const currentUser = leaderboardData.current_user;
  if (currentUser) {
    return (
      <div className="rounded-md overflow-hidden  w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start">Место</TableHead>
              <TableHead>Пользователь</TableHead>
              <TableHead className="text-end">Звёзды</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.leaderboard.map((user) => (
              <TableRow key={user.user_id}>
                <TableCell className="text-start">{user.rank}</TableCell>
                <TableCell className="flex items-center justify-start gap-2">
                  <Avatar>
                    <AvatarImage src={user.photo_url} />
                    <AvatarFallback>
                      <img src="/mock-user-dark.svg" alt="user" />
                    </AvatarFallback>
                  </Avatar>
                  {user.username}
                </TableCell>
                <TableCell className="text-end">
                  <div className="flex items-center justify-end gap-2">
                    {user.star_balance}
                    <EmojiIcon width={24} height={24} src="/emoji/star.svg" />
                  </div>
                </TableCell>
              </TableRow>
            ))}

            <TableRow className="bg-accent-1 hover:bg-accent-1-hover">
              <TableCell className="text-start">{currentUser.rank}</TableCell>
              <TableCell className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={currentUser.photo_url} />
                  <AvatarFallback>
                    <img src="/mock-user-dark.svg" alt="user" />
                  </AvatarFallback>
                </Avatar>
                {currentUser.username}
              </TableCell>
              <TableCell className="text-end">
                <div className="flex items-center justify-end gap-2">
                  {currentUser.star_balance}
                  <EmojiIcon width={24} height={24} src="/emoji/star.svg" />
                </div>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
};
