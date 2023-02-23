// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0;
import { Uint32Component } from "std-contracts/components/Uint32Component.sol";
import { ID as PositionComponentID, Coord } from "components/PositionComponent.sol";
import { ID as ObstructionComponentID } from "components/ObstructionComponent.sol";
import { QueryType } from "solecs/interfaces/Query.sol";
import { IWorld, WorldQueryFragment } from "solecs/World.sol";

library LibMath {
  function increment(Uint32Component component, uint256 entity) internal {
    uint32 current = component.has(entity) ? component.getValue(entity) : 0;
    component.set(entity, current + 2);
  }
}
