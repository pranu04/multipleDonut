width = 500;
height = 500;

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
.outerRadius(innerRadius-55)
.innerRadius(innerRadius -100)

const middleArc = d3.arc()
.outerRadius(innerRadius-5 )
.innerRadius(innerRadius - 50)


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

