/**
 * Plot a set of persistence diagrams using plotly
 * 
 * @param {VectorVector} dgms All of the persistence diagrams. It
 *                            is assumed that they start at H0
 * @param {string} elemStr A string ID of the DOM element where
 *                         the plots will be placed
 */
function plotDGMS(dgms, elemStr) {
    let allPlots = [];
    let axMin = null;
    let axMax = null;
    for (let k = 0; k < dgms.size(); k++) {
        let Hk = dgms.get(k);
        if (Hk === undefined) {
            continue;
        }
        let births = [];
        let deaths = [];
        for (let i = 0; i < Hk.size(); i+=2) {
            births.push(Hk.get(i));
            deaths.push(Hk.get(i+1));
        }
        let dgmPoints = {x:births, y:deaths, mode:'markers', name:'H'+k};
        allPlots.push(dgmPoints);
        // TODO: Add another persistence diagram for each dimension
        let axMink = Math.min(Math.min.apply(null, births), Math.min.apply(null, deaths));
        let axMaxk = Math.max(Math.max.apply(null, births), Math.max.apply(null, deaths.filter(function(x){
            return x < Infinity;
        })));
        if (axMin === null) {
            axMin = axMink;
            axMax = axMaxk;
        }
        else {
            axMin = Math.min(axMin, axMink);
            axMax = Math.max(axMax, axMaxk);
        }
    }
    let axRange = axMax - axMin;
    let diagonal = {x:[axMin-axRange/5, axMax+axRange/5], y:[axMin-axRange/5, axMax+axRange/5], mode:'lines', name:'diagonal'};
    allPlots.push(diagonal);
    let layout = {title:'Persistence Diagrams'};
    Plotly.newPlot(elemStr, allPlots, layout);
}
