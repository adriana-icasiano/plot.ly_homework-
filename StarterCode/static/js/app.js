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
        demoTable.append("p").text(`${key}:${value}`);
    });   
// build gauge function
}); 
}

function buildCharts(sample) {

     // Read the json data
     d3.json("samples.json").then(function (data) {
    
    let samples = data.samples;

    console.log(samples);
    
    let resultArray = samples.filter(sampleObject => sampleObject.id == sample)
    
    let otuIDs = resultArray[0].otu_ids;

    console.log(`otuIDs ${otuIDs}`);

    let sample_values = resultArray[0].sample_values;

    console.log(`sample values ${sample_values}`);

    let otuLabels = resultArray[0].otu_labels;

    console.log(`otu labels ${otuLabels}`);
    
    let topTenValues = sample_values.slice(0,10);
        
    let topTenOtuId = otuIDs.slice(0,10);

    let topTenLabel = otuLabels.slice(0,10);
    console.log(`top ten values ${topTenValues} otuIDs ${topTenOtuId} labels ${topTenLabel}`);

    let barChart = d3.select("#bar");

    barChart.html("");



    
    // Create bar chart in correct location

    // Create bubble chart in correct location
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
}

// Initialize dashboard on page load
init();
