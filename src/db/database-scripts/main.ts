import BottomCross from "../states/BottomCross";
import F2L from "../states/F2L";
import OLL from "../states/OLL";
import PLL from "../states/PLL";

(async () => {
    console.log("Creating Tables");
     BottomCross.createStatesTable();
     F2L.createStatesTable();
     OLL.createStatesTable();
     PLL.createStatesTable();
     console.log("Populating Tables");
     BottomCross.populateStatesTable();
     F2L.populateStatesTable();
     OLL.populateStatesTable();
     PLL.populateStatesTable();
    console.log("Finished :)")
})();