import { useComponentValue } from "@latticexyz/react";
import { useMUD } from "./MUDContext";
import { useMovement } from "./useMovement";
import { useJoinGame } from "./useJoinGame";
import { useMapConfig } from "./useMapConfig";

export const GameBoard = () => {
  const mapConfig = useMapConfig();
  const rows = new Array(mapConfig.height).fill(0).map((_, i) => i);
  const columns = new Array(mapConfig.width).fill(0).map((_, i) => i);

  const {
    components: { Position },
    playerEntity,
  } = useMUD();

  const playerPosition = useComponentValue(Position, playerEntity);
  useMovement();
  const { canJoinGame, joinGame } = useJoinGame();

  return (
    <div className="inline-grid p-2 bg-lime-500">
      {rows.map((y) =>
        columns.map((x) => {
          const terrain = mapConfig.terrainValues.find(
            (t: { x: number; y: number; }) => t.x === x && t.y === y
          )?.type;

          return (
            <div
              key={`${x},${y}`}
              className={`w-8 h-8 flex items-center justify-center ${
                canJoinGame ? "cursor-pointer hover:ring" : ""
              }`}
              style={{
                gridColumn: x + 1,
                gridRow: y + 1,
              }}
              onClick={(event) => {
                event.preventDefault();
                if (canJoinGame) {
                  joinGame(x, y);
                }
              }}
            >
              <div className="flex flex-wrap gap-1 items-center justify-center relative">
                {terrain ? (
                  <div className="absolute inset-0 flex items-center justify-center text-3xl pointer-events-none">
                    {terrain.emoji}
                  </div>
                ) : null}
                <div className="relative">
                  {playerPosition?.x === x && playerPosition?.y === y ? (
                    <>🤠</>
                  ) : null}
                </div>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};