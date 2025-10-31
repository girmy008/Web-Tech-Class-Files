import { useEffect, useState } from "react";
import * as d3 from "d3";
export default function Graph() {
    const [rngNumber, setRngNumber] = useState(0);
    const [rngArray, setRngArray] = useState([]);
    const timeOut = 500;
    const maxValue = 60;
    const maxItems = 20

    useEffect(() => {
        const interval = setInterval(() => {
            setRngNumber(Math.floor(Math.random() * maxValue))
        }, timeOut);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let tempArray = [...rngArray, rngNumber]
        if (tempArray.length > maxItems) { tempArray.shift() }
        setRngArray(tempArray);
    }, [rngNumber]);

    useEffect(() => {

        const svg = d3.select('svg')
        svg.selectAll("*").remove();

        let w = svg.node().getBoundingClientRect().width
        w = w-40
        let h = svg.node().getBoundingClientRect().height
        h = h-25
        const barMargin = 10;
        const barWidth = w / rngArray.length

            // Y scale
        const yScale = d3.scaleLinear()
            .domain([0, maxValue])
            .range([h, 0]);

        let barGroups = svg.selectAll('g').data(rngArray)


        let newBarGroup = barGroups.enter()
            .append('g')
            .attr('transform', (d, i) => {
                return `translate(${i * barWidth}, ${yScale(d)})`
            });

        newBarGroup
            .append('g')
            .attr('transform', (d, i) => {
                return `translate(${i * barWidth} , ${yScale(d)})`
            });

        newBarGroup
            .append('rect')
            .attr('x', 0)
            .attr('height', d => { return h - yScale(d) })
            .attr('width', barWidth - barMargin)
            .attr('fill', 'blank')

        const chartGroup = svg.append('g')
            .classed('chartGroup', true)
            .attr('transform', 'transform(30,3)')

        
        
        },   );

    return (
        <div classname="App Container">
            <h1>
                RNG Output: {rngNumber}
            </h1>
            <div classname="row">
                <svg width="100%" height="600px" class="border border-primary rounded p-2"></svg>
            </div>
        </div>
    );
};
