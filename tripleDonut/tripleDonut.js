width = 600;
height = 600;

const svg = d3.select("svg")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  
const outerData = [
    { label: " (LBW)", value: 30 },
    { label: "Prematurity", value: 20 },
    { label: " (RDS)", value: 15 },
    { label: "Jaundice", value: 10 },
  ];

  const innerData = [
    { label: "Developmental Delay", value: 10 },
    { label: "Infection", value: 5 },
    { label: "Neurological Problems", value: 3 },
  ];

  const middleData = [
    { label: "Feeding difficulties", value: 15 },
    { label: "Anemia", value: 10 },
    { label: "Hypothermia", value: 5 },
   
  ];

  // Define the scales
const outerRadius = Math.min(width, height) / 2 - 50;
const innerRadius = outerRadius * 0.8;


const color = d3.scaleOrdinal()
  .range(["DeepPink", "cyan", "yellow", "purple"]);
  const color2 = d3.scaleOrdinal()
  .range(["red", "gray", "blue"]);
  const color3 = d3.scaleOrdinal()
  .range(["indigo",  "teal","orange"]);

  // Define the arc generators
const arc = d3.arc()
.outerRadius(outerRadius)
.innerRadius(innerRadius)


const innerArc = d3.arc()
.outerRadius(innerRadius-110)
.innerRadius(innerRadius -180)

const middleArc = d3.arc()
.outerRadius(innerRadius )
.innerRadius(innerRadius - 100)


// Create the outer pie chart data and add the slices to the chart
const outerPie = d3.pie()
  .sort(null)
  .value(d => d.value);

const outerG = svg.selectAll(".outer-arc")
.data(outerPie(outerData))
.enter().append("g")
.attr("class", "outer-arc");

outerG.append("path")
.attr("d", arc)
.style("fill", d => color(d.data.label));

// Create the inner pie chart data and add the slices to the chart
const innerPie = d3.pie()
  .sort(null)
  .value(d => d.value);

const innerG = svg.selectAll(".inner-arc")
  .data(innerPie(innerData))
  .enter().append("g")
  .attr("class", "inner-arc");

innerG.append("path")
  .attr("d", innerArc)
  .style("fill", d => color2(d.data.label));


  // Create the middle pie chart data and add the slices to the chart
const middlePie = d3.pie()
.sort(null)
.value(d => d.value);

const middleG = svg.selectAll(".middle-arc")
.data(middlePie(middleData))
.enter().append("g")
.attr("class", "middle-arc");

middleG.append("path")
.attr("d", middleArc)
.style("fill", d => color3(d.data.label));

// Add the text labels to the slices
outerG.append("text")
  	.each(function(d) { d.angle = ((d.startAngle + d.endAngle) / 2);})
  	.attr("dy", ".25em")
  	.attr("class", "titles")
  	.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  	.attr("transform", function(d,i) {
  		var c = arc.centroid(d);
  		return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
  		+ "translate(" + (innerRadius + 20) + ")" //how close the labels are to the outer arc
  		+ (d.angle > Math.PI ? "rotate(180)" : "")
  	})
  	.text(function(d,i) { return outerData[i].label; });


  middleG.append("text")
  	.each(function(d) { d.angle = ((d.startAngle + d.endAngle) / 2);})
  	.attr("dy", ".25em")
  	.attr("class", "titles")
  	.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  	.attr("transform", function(d,i) {
  		var c = middleArc.centroid(d);
  		return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
  		+ "translate(" + (innerRadius - 80) + ")" //how close the labels are to the outer arc
  		+ (d.angle > Math.PI ? "rotate(180)" : "")
  	})
  	.text(function(d,i) { return middleData[i].label; });

    
  innerG.append("text")
  .each(function(d) { d.angle = ((d.startAngle + d.endAngle) / 2);})
  .attr("dy", ".25em")
  .attr("class", "titles")
  .attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  .attr("transform", function(d,i) {
    var c = innerArc.centroid(d);
    return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
    + "translate(" + (innerRadius - 200 ) + ")" //how close the labels are to the outer arc
    + (d.angle > Math.PI ? "rotate(180)" : "")
  })
  .text(function(d,i) { return innerData[i].label; });
