import Tile from "@/components/Tile";
import useGameSessionStore from "@/store/gameSessionStore";

const Board = () => {
  const { board } = useGameSessionStore();
  return (
    <div className="flex flex-col gap-1 mb-8">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="flex gap-1">
          {row.map((tile, colIndex) => (
            <Tile
              key={`${rowIndex}-${colIndex}`}
              letter={tile.letter}
              state={tile.state}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

export default Board