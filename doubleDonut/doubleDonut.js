
width = 500;
height = 500;

const svg = d3.select("svg")
  .append("svg")
  .attr("width", width)
  .attr("height", height)
  .append("g")
  .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

const outerData = [
  { label: "Low Birth Weight (LBW)", value: 20 },
  { label: "Prematurity", value: 10 },
  { label: "Respiratory Distress Syndrome (RDS)", value: 15 },
  { label: "Jaundice", value: 5 },
];

const innerData = [
  { label: "Developmental Delay", value: 10 },
  { label: "Infection", value: 5 },
  { label: "Neurological Problems", value: 3 },
];

// Define the scales
const outerRadius = Math.min(width, height) / 2 - 50;
const innerRadius = outerRadius * 0.7;
const color = d3.scaleOrdinal()
  .range(["DeepPink", "cyan", "yellow", "purple"]);
  const color2 = d3.scaleOrdinal()
  .range(["red", "green", "blue"]);

// Define the arc generators
const arc = d3.arc()
  .outerRadius(outerRadius)
  .innerRadius(innerRadius);
  
const innerArc = d3.arc()
  .outerRadius(innerRadius )
  .innerRadius(innerRadius - 70);
 
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

// Add the text labels to the slices
outerG.append("text")
  .attr("transform", d => "translate(" + arc.centroid(d) + ")")
  .attr("dy", ".35em")
  .text(d => d.data.label);

innerG.append("text")
  .attr("transform", d => "translate(" + innerArc.centroid(d) + ")")
  .attr("dy", ".35em")
  .text(d => d.data.label);
                 
    
    
    
    
    
    
    






    
    
    
    
    

    
    
    
    
    
    
    
    
    
    
    















