width = 500;
height = 500;

const svg = d3.select("svg")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  
const Data = [
  { label: "Prematurity", value: 20 },
  { label: "Feeding difficulties", value: 15 },
  { label: " (LBW)", value: 30 },
  { label: "Neurological Problems", value: 3 },
  { label: "Developmental Delay", value: 10 },
    { label: " (RDS)", value: 15 },
    { label: "Jaundice", value: 10 },
    { label: "Anemia", value: 10 },
    { label: "Hypothermia", value: 5 },
    { label: "Infection", value: 5 },
  ];

  // Define the scales
const outerRadius = Math.min(width, height) / 2 - 120;
const innerRadius = outerRadius * 0.8;


const color = d3.scaleOrdinal()
  .range(["DeepPink", "cyan", "yellow", "purple","red", "gray", "blue","indigo",  "teal","orange"]);
 
  // Define the arc generators
const arc = d3.arc()
.outerRadius(outerRadius)
.innerRadius(innerRadius)




// Create the outer pie chart data and add the slices to the chart
const Pie = d3.pie()
  .sort(null)
  .value(d => d.value);

const donutG = svg.selectAll(".donut-arc")
.data(Pie(Data))
.enter().append("g")
.attr("class", "donut-arc");

donutG.append("path")
.attr("d", arc)
.style("fill", d => color(d.data.label));


// Add the text labels to the slices
donutG.append("text")
  	.each(function(d) { d.angle = ((d.startAngle + d.endAngle) / 2);})
  	.attr("dy", ".25em")
  	.attr("class", "titles")
  	.attr("text-anchor", function(d) { return d.angle > Math.PI ? "end" : null; })
  	.attr("transform", function(d,i) {
  		var c = arc.centroid(d);
  		return "rotate(" + (d.angle * 180 / Math.PI - 90) + ")"
  		+ "translate(" + (innerRadius + 30) + ")" //how close the labels are to the outer arc
  		+ (d.angle > Math.PI ? "rotate(180)" : "")
  	})
  	.text(function(d,i) { return Data[i].label; });

