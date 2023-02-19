import { useEffect } from "react";
import { useComponentValue } from "@latticexyz/react";
import { uuid } from "@latticexyz/utils";
import { useMUD } from "./MUDContext";

export const GameBoard = () => {
  const rows = new Array(10).fill(0).map((_, i) => i);
  const columns = new Array(10).fill(0).map((_, i) => i);

  const {
    components: { Position },
    systems,
    playerEntity,
  } = useMUD();

  const playerPosition = useComponentValue(Position, playerEntity);

  const moveTo = async (x: number, y: number) => {
    const positionId = uuid();
    Position.addOverride(positionId, {
      entity: playerEntity,
      value: { x, y },
    });

    try {
      const tx = await systems["system.Move"].executeTyped({ x, y });
      await tx.wait();
    } finally {
      Position.removeOverride(positionId);
    }
  };

  useEffect(() => {
    const moveBy = async (deltaX: number, deltaY: number) => {
      if (!playerPosition) {
        console.warn(
          "cannot moveBy without a player position, not yet spawned?"
        );
        return;
      }
      await moveTo(playerPosition.x + deltaX, playerPosition.y + deltaY);
    };

    const listener = (e: KeyboardEvent) => {
      if (e.key === "ArrowUp") {
        moveBy(0, -1);
      }
      if (e.key === "ArrowDown") {
        moveBy(0, 1);
      }
      if (e.key === "ArrowLeft") {
        moveBy(-1, 0);
      }
      if (e.key === "ArrowRight") {
        moveBy(1, 0);
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [playerPosition, systems]);

  return (
    <div className="inline-grid p-2 bg-lime-500">
      {rows.map((y) =>
        columns.map((x) => (
          <div
            key={`${x},${y}`}
            className="w-8 h-8"
            style={{
              gridColumn: x + 1,
              gridRow: y + 1,
            }}
            onClick={async () => {
              await moveTo(x,y)
            }}
          >
      {playerPosition?.x === x && playerPosition?.y === y ? <>🤠</> : null}

          </div>
        ))
      )}
    </div>
  );
};