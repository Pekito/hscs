import database from "../database";
import BottomCross from "../states/BottomCross";

(async () => {
    const db = database.connectionPool;
    console.log("Creating Tables");
    await BottomCross.createStatesTable(db);
    console.log("Populating Tables");
    await BottomCross.populateStatesTable(db);

    console.log("Finished :)")
})();