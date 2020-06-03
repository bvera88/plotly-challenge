// demographic info script 
function init(){
    d3.json("samples.json").then((data) => {
        var sampleNames = data.names
        var sampleId = d3.select("#selDataset")
        sampleNames.forEach((x)=>{
            sampleId.append("option")
            .text(x)
            .property("value",x)
        });
        var firstId = sampleNames[0];
        demotable(firstId)
        buildchart(firstId)
    });
}

function optionChanged(Sample1) {
demotable(Sample1);
buildchart(Sample1)

}

init()

function demotable(sample){
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata
        var sampleId = d3.select("#sample-metadata")
        var filteredData = metadata.filter(x => x.id == sample)
        var filteredData1 = filteredData[0]
        console.log(filteredData1)
        console.log(filteredData)

        sampleId.html("");
        Object.entries(filteredData1).forEach(function([key, value]){
            var row = sampleId.append("tr")
            // console.log(key,value);
            row.append("td").html(`<strong><font size = '1'>${key}</font></strong>:`);
            // console.log(key,value);
            row.append('td').html(`<font size ='1'>${value}</font>`);
            // console.log(key,value);
        })
    });
}

// creating barchart here
function buildchart(sample){
    d3.json("samples.json").then((data) => {
        var samples = data.samples
        var filteredData = samples.filter(x => x.id == sample)
        var filteredData1 = filteredData[0]
        var value1 = filteredData1.otu_ids
        var value2 = filteredData1.sample_values
        var value3 = filteredData1.otu_labels

            var trace1 = {
            x:value2.slice(0,10),
            y:value1.slice(0,10).map(x => `OTU ${x}`),
            text:value3,
            type:"bar",
            orientation:"h"
        };

        var data1 = [trace1];

        // labeling the bar chart
        var layout = {
        title:"Bar Chart",
        xaxis:{title: "sample values"},
        yaxis:{title: "otu_ids"}
    };

    Plotly.newPlot("bar", data1,layout);

    // // bubble plot here

    var trace2 = {
        x:value1,
        y:value2,
        text:value3,
        mode: "markers",
        marker:{size:value2, color:value1}
    };

    var bubbledata = [trace2];

    var layout = {
        title:"Bubble Plot",
        xaxis:{title:"otu ids"},
        yaxis:{title:"sample_vaules"},
        // height: 600,
        // width:600,
    };

    Plotly.newPlot("bubble", bubbledata,layout);
    })
};
