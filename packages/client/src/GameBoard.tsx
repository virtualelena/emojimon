import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { useMovement } from "./useMovement";
import { useJoinGame } from "./useJoinGame";

export const GameBoard = () => {
  const rows = new Array(10).fill(0).map((_, i) => i);
  const columns = new Array(10).fill(0).map((_, i) => i);

  const {
    components: { Position },
    playerEntity,
  } = useMUD();

  const playerPosition = useComponentValue(Position, playerEntity);
  const { moveTo } = useMovement();
  const { canJoinGame, joinGame } = useJoinGame();

  return (
    <div className="inline-grid p-2 bg-lime-500">
      {rows.map((y) =>
        columns.map((x) => (
          <div
            key={`${x},${y}`}
            className="w-8 h-8 flex items-center justify-center cursor-pointer hover:ring"
            style={{
              gridColumn: x + 1,
              gridRow: y + 1,
            }}
            onClick={(event) => {
              event.preventDefault();
              if (canJoinGame) {
                joinGame(x, y);
              } else {
                moveTo(x, y);
              }
            }}
          >
            {playerPosition?.x === x && playerPosition?.y === y ? <>🤠</> : null}
          </div>
        ))
      )}
    </div>
  );
};