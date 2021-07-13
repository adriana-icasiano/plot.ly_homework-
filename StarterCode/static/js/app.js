/* The following is an example on how you might structure your code.
This is not the only way to complete this assignment.
Feel free to disregard and create your own code */

// d3.json("samples.json").then(function (data) {
//     console.log(data);
// });

// Define function that will run on page load
function init() {

    // Read json data
    d3.json("samples.json").then(function (data) {
        console.log(data);
    });
    
    // Parse and filter data to get sample names
    let names = data.map(function (id){
        return id.names
    });
    console.log("ID:", names)

    // Add dropdown option for each sample
    d3.select("#selDataset").on("change", buildMetadata);
    // Call functions below using the first sample to build metadata and initial plots

}

// Define a function that will create metadata for given sample
function buildMetadata(sample) {

    // Read the json data
    d3.json("samples.json").then(function (data) {
        console.log(data);
    });

    // Parse and filter the data to get the sample's metadata
    
    // Specify the location of the metadata and update it

}

// Define a function that will create charts for given sample
// function buildCharts(sample) {

    // Read the json data

    // Parse and filter the data to get the sample's OTU data
    // Pay attention to what data is required for each chart

    // Create bar chart in correct location

    // Create bubble chart in correct location

// }


// function optionChanged(sample) {
    // The parameter being passed in this function is new sample id from dropdown menu

    // Update metadata with newly selected sample

    // Update charts with newly selected sample

// }

// Initialize dashboard on page load
// init();

