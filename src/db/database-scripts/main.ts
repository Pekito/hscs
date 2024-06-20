import BottomCross from "../states/BottomCross";
import F2L from "../states/F2L";

(async () => {
    console.log("Creating Tables");
     BottomCross.createStatesTable();
     F2L.createStatesTable();
     console.log("Populating Tables");
     BottomCross.populateStatesTable();
     F2L.populateStatesTable();
    console.log("Finished :)")
})();