    // Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then(function (data){
     

    // Parse and filter data to get sample names
    let dropdownMenu = d3.select("#selDataset");
    let samples = data.names;

    // names.push(data.names);
    samples.forEach((sample)=>{
        dropdownMenu.append("option").text(sample).property("value",sample);
     });
    
    console.log(samples);

     // Add dropdown option for each sample    

     // Call functions below using the first sample to build metadata and \
     //initial plots
    buildMetadata(samples[0]);
    buildCharts(samples[0]);
    buildGauge(samples[0]);
    optionChanged(samples[0]);
    });
}

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    
    // Read the json data
    d3.json("samples.json").then(function (data) {
    
    let metadata = data.metadata;
    
    console.log(metadata);
    
    let resultArray = metadata.filter(sampleObject => sampleObject.id == sample);

    let result = resultArray[0];

    let demoTable = d3.select("#sample-metadata");

    demoTable.html("");

    Object.entries(result).forEach(([key, value]) =>{
        demoTable.append("p").text(`${key} : ${value}`);
    });   

}); 
}

function buildCharts(sample) {

     // Read the json data
     d3.json("samples.json").then(function (data) {
    
    let samples = data.samples;
    let resultArray = samples.filter(sampleObject => sampleObject.id == sample);
    
    let OtuIds = resultArray[0].otu_ids;
    let SampleValues = resultArray[0].sample_values;
    let OtuLabels = resultArray[0].otu_labels;
    
    //Create bubble chart
    let trace2 = {
        x: OtuIds,
        y: SampleValues,
        mode: 'markers',
        marker: {
          color: OtuIds, 
          size: SampleValues,
          colorscale: [[0, 'rgb(1, 0, 191)'], [1, 'rgb(255, 183, 255)']]
        }
      };
      
    let data2 = [trace2];
      
    let  layout2 = {
        title: 'Bubble Chart of Otu ID',
        height: 600,
        width: 1300
      };
      
    Plotly.newPlot('bubble', data2, layout2);

    //Create Bar chart 
    let topOtuIds = OtuIds.slice(0,10);
    let topSampleValues = SampleValues.slice(0,10);
    let topOtuLabels = OtuLabels.slice(0,10);
    
    console.log(`otuIDs ${topOtuIds} sample_values ${topSampleValues} Labels ${topOtuLabels}`);
    console.log(topOtuIds);
    console.log(topSampleValues);
    let trace1 = {
        x: topSampleValues.reverse(),
        y: topOtuIds.reverse().map(topOtuId => `OTU #${topOtuId}`),
        text: topOtuLabels, 
        type: "bar",
        orientation: "h"
    };
        
    let layout = {
        hovermode:'closest',
        title: 'Top 10 OTU IDs'
     };

    let traceData = [trace1];

    Plotly.newPlot("bar", traceData, layout);

    
}); 
}

function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu
    let dropdownMenu = d3.select("#selDataset");
    let sampleSelected = dropdownMenu.property("value");
    // Update metadata with newly selected sample
    buildMetadata(sampleSelected);
    // Update charts with newly selected sample
    buildCharts(sampleSelected);
     // Update gauge chart with newly selected sample
    buildGauge(sampleSelected);
}

// Initialize dashboard on page load
init();
