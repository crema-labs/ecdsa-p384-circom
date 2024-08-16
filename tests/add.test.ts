import { WitnessTester } from "circomkit";
import { circomkit } from "./common";

describe("Add", () => {
  let circuit: WitnessTester<["a", "b"], ["out"]>;

  describe("Add", () => {
    before(async () => {
      circuit = await circomkit.WitnessTester(`Add`, {
        file: "add",
        template: "Add",
      });
      console.log("#constraints:", await circuit.getConstraintCount());
    });

    it("should add two numbers", async () => {
      await circuit.expectPass({ a: 1, b: 2 }, { out: 3 });
    });
  });
});
