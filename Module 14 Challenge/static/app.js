// Create function to create plots based on data from sample.json
// Use D3 to read sample.json data then generate bar chart and bubble plot from the data
function getPlots(id) {
        // Use D3 to read samples.json data and store into variables
        d3.json("samples.json").then (sampledata =>{
            console.log(sampledata)
            var ids = sampledata.samples[0].otu_ids;
            console.log(ids)
            var sampleValues =  sampledata.samples[0].sample_values.slice(0,10).reverse();
            console.log(sampleValues)
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log (labels)
        
            // Top 10 
            var OTU_top10 = ( sampledata.samples[0].otu_ids.slice(0, 10)).reverse();
        
            // Get the top 10 IDs
            var OTU_id = OTU_top10.map(x => "OTU " + x);
            console.log(`OTU IDS: ${OTU_id}`)
            // Get top 10 labels
            var labels =  sampledata.samples[0].otu_labels.slice(0,10);
            console.log(`OTU_labels: ${labels}`)
            var trace = {
                x: sampleValues,
                y: OTU_id,
                text: labels,
                marker: {
                color: 'blue'},
                type:"bar",
                orientation: "h",
            };
            // Create data variable to hold array
            var data = [trace];
    
            // Layout
            var layout = {
                title: "OTU",
                yaxis:{
                    tickmode:"linear",
                },
                margin: {
                    l: 100,
                    r: 100,
                    t: 100,
                    b: 30
                }
            };
    
        // Display bar chart
        Plotly.newPlot("bar", data, layout);

            // Bubble plot
            var trace1 = {
                x: sampledata.samples[0].otu_ids,
                y: sampledata.samples[0].sample_values,
                mode: "markers",
                marker: {
                    size: sampledata.samples[0].sample_values,
                    color: sampledata.samples[0].otu_ids
                },
                text:  sampledata.samples[0].otu_labels
            };
    
            // Format the plot
            var layout_2 = {
                xaxis:{title: "OTU ID"},
                height: 500,
                width: 900
            };
    
            var data1 = [trace1];
    
        // Display bubble plot
        Plotly.newPlot("bubble", data1, layout_2); 
        
        });
    }  
    // Create function for grabbing demographic information
    function getDemoInfo(id) {
        // Use D3 to read the sample.json data
        d3.json("samples.json").then((data)=> {
            // Metadata
            var metadata = data.metadata;
            console.log(metadata)
    
          // Filter ID
           var result = metadata.filter(meta => meta.id.toString() === id)[0];
          
    
           var demographicInfo = d3.select("#sample-metadata");
            
         // Resets the demographic panel
           demographicInfo.html("");
    
         // Demographic data
            Object.entries(result).forEach((key) => {   
                demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");    
            });
        });
    }
    // Function to allow us to change names in the dropdown menu below
    function optionChanged(id) {
        getPlots(id);
        getDemoInfo(id);
    }
    
    // Create initial function
    function init() {
        var dropdown = d3.select("#selDataset");
    
        // Use D3 to read data from sample.json
        d3.json("samples.json").then((data)=> {
            console.log(data)
    
            // Populate names into the dropdown menu
            data.names.forEach(function(name) {
                dropdown.append("option").text(name).property("value");
            });
    
            // Display data and the name
            getPlots(data.names[0]);
            getDemoInfo(data.names[0]);
        });
    }
    
    init();