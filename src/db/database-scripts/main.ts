import BottomCross from "../states/BottomCross";

(async () => {
    console.log("Creating Tables");
     BottomCross.createStatesTable();
    console.log("Populating Tables");
     BottomCross.populateStatesTable();
    console.log("Finished :)")
})();