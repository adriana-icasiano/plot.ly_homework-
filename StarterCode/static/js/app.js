/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// d3.json("samples.json").then(function (data) {
//     console.log(data);
// });

// d3.json("samples.json").then(function (data) {
//     console.log(data);

//     // Parse and filter data to get sample names
//     // let names = ["apple"]
//     let names = [];
//     let metadata = [];

//     names.push(data.names);
//     metadata.push(data.metadata);
//     console.log(names);
//     console.log(metadata);

// });

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

        // append the information to the demographics panel
        // using the variables key and value
    });   
// build gauge function
}); 
}
    
    
    // Parse and filter the data to get the sample's metadata
    

    // Specify the location of the metadata and update it
   


        // Define a function that will create charts for given sample
function buildCharts(sample) {


    // Read the json data

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

}

function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

}

// Initialize dashboard on page load
init();
