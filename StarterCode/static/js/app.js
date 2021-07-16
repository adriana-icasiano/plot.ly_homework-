    // Define function that will run on page load
function init() {

    // Read json data
    d3.json("../samples.json").then(function (data){
     

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
        // showlegend: false,
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
        // mode: 'markers',
        // marker: {},
        // line: {width:1.5},
        text: topOtuLabels, 
        type: "bar",
        orientation: "h"
    };
    // console.log( ` ${otuIds}`);
    // console.log( ` ${sampleValues.sort((a,b)=>(b-a))}`);
    
    let layout = {
        hovermode:'closest',
        title: 'Top 10 OTU IDs'
     };

    let traceData = [trace1];

    Plotly.newPlot("bar", traceData, layout);

    //Creat gauge chart
    
    let resultArray1 = data.metadata.filter(sampleObject => sampleObject.id == sample);
    let wfreq = resultArray1[0].wfreq;
    console.log(wfreq);

    let data3 = [
        {
          domain: { x: [0, 1], y: [0, 1] },
          value: wfreq,
          title: { text: "Weekly Scrub Frequency" },
          type: "indicator",
          mode: "gauge+number",
        //   'scale-r' :{
        //     aperture: 9,     //Specify your scale range.
        //     values: "0:9:1" //Provide min/max/step scale values.
        //   },
          series: [
            {
              values: [wfreq],
              csize: "5%",     //Needle Width
              size: "100%",    //Needle Length
              'background-color': "#000000"  //Needle Color
            }],
          gauge: {
            axis: { range: [null, 9] },
                      }
        }
      ];
      
      let layout3 = { width: 600, height: 450, margin: { t: 0, b: 0 } };
      Plotly.newPlot('gauge', data3, layout3);
          
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
