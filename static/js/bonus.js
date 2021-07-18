function buildGauge(sample) {

    // Read the json data
    d3.json("samples.json").then(function (data) {
   
   let samples = data.samples;
  
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
