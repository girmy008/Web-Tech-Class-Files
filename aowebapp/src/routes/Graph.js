import { useEffect, useState } from "react";
import * as d3 from "d3";

export default function Graph() {
    const [rngNumber, setRngNumber] = useState(0);
    const [rngArray, setRngArray] = useState([]);
    const timeOut = 500;
    const maxValue = 60;
    const maxItems = 20;

    // Update RNG number
    useEffect(() => {
        const interval = setInterval(() => {
            setRngNumber(Math.floor(Math.random() * maxValue));
        }, timeOut);
        return () => clearInterval(interval);
    }, []);

    // Update RNG array
    useEffect(() => {
        let tempArray = [...rngArray, rngNumber];
        if (tempArray.length > maxItems) tempArray.shift();
        setRngArray(tempArray);
    }, [rngNumber]);

    // Draw the gradient line graph
    useEffect(() => {
        const svg = d3.select("svg");
        svg.selectAll("*").remove();

        const width = svg.node().getBoundingClientRect().width - 40;
        const height = svg.node().getBoundingClientRect().height - 25;
        const leftMargin = 40;

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, rngArray.length - 1])
            .range([0, width]);

        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([height, 0]);

        const chartGroup = svg.append("g")
            .attr("transform", `translate(${leftMargin}, 3)`);

        // Gradient definition (vertical, red on top, green on bottom)
        const defs = svg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "line-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")   // top
            .attr("x2", "0%")
            .attr("y2", "100%"); // bottom

        gradient.append("stop")
            .attr("offset", "0%")
            .attr("stop-color", "red");   // top = red
        gradient.append("stop")
            .attr("offset", "100%")
            .attr("stop-color", "green"); // bottom = green

        // Line generator
        const line = d3.line()
            .x((d, i) => xScale(i))
            .y(d => yScale(d))
            .curve(d3.curveLinear);

        // Draw line with vertical gradient
        chartGroup.append("path")
            .datum(rngArray)
            .attr("fill", "none")
            .attr("stroke", "url(#line-gradient)")
            .attr("stroke-width", 3)
            .attr("d", line);

        // Y Axis
        const yAxis = d3.axisLeft(yScale);
        chartGroup.append("g").call(yAxis);

    }, [rngArray]);

    return (
        <div className="App Container">
            <h1>RNG Output: {rngNumber}</h1>
            <div className="row">
                <svg width="100%" height="600px" className="border border-primary rounded p-2"></svg>
            </div>
        </div>
    );
}
