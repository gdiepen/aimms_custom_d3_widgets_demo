create_aimms_d3_barchart = function() {

    // All options that should be accessible to caller
    var outerwidth = 500
    var outerheight = 300
    var barPadding = 1;
    var fillColor = 'coral';
    var data = [];

    var selected_element ; 

    var margins = {top: 10, right:10, bottom:10, left:10} ; 


    var width = outerwidth - margins.left - margins.right ; 
    var height = outerheight - margins.top - margins.bottom ; 



    var updateWidth;
    var updateHeight;
    var updateFillColor;
    var updateData;
    var forceRedraw;



    var aimms_selected_datasource

    var svg
    var svgroot


    

    function chart(selection){
        selection.each(function () {

            var barSpacing = height / data.length;
            var barHeight = barSpacing - barPadding;
            var maxValue = d3.max(data);
            var widthScale = (width - 20) / maxValue;

            var dom = d3.select(this);

//                          create a tooltip
              var Tooltip = d3.select("body")
                .append("div")
                .style("opacity", 0)
                .attr("class", "tooltip_d3")
                .style("position", "absolute")
                .style("background-color", "white")
                .style("border", "solid")
                .style("border-width", "2px")
                .style("border-radius", "5px")
                .style("padding", "5px")




            mouseover = function(e,d) {
                Tooltip
                  .style("opacity", 1)
                d3.select(this)
                  .style("stroke", "black")
                  .style("opacity", 1)
              }
            mousemove = function(e,d) {
                Tooltip
                    .html(d.tooltip)

                let tooltipWidth = Tooltip.node().getBoundingClientRect().width
                let tooltipHeight = Tooltip.node().getBoundingClientRect().height



                let tooltipDeltaX = 0

                if (e.clientX >= 0.5 * width){
                    tooltipDeltaX = tooltipWidth

                }





                Tooltip
                    .style("display", "block")




                //                 if (e.clientX >= 0.5 * width){



                //                 }
                // .style("left", (d3.mouse(this)[0]+70) + "px")
                // .style("top", (d3.mouse(this)[1]) + "px")
                // .style("left", (d3.mouse(this)[0]+70) + "px")
                // .style("top", (d3.mouse(this)[1]) + "px")
                // .style("left", (e.clientX-50) + "px")
                // .style("top", (e.clientY - 0) + "px")
                //
                    .style("transform", `translate3d(${e.clientX - tooltipDeltaX}px, ${e.clientY-tooltipHeight-5}px, 0px)`)




            }
              mouseleave = function(e,d) {
                Tooltip
                  .style("opacity", 0)
                d3.select(this)
                  .style("stroke", "none")
                  .style("opacity", 0.8)
              }









            
            svgroot = dom.append('svg')
                .attr('class', 'bar-chart')
                .attr('height', height)
                .attr('width', width)
                .style('fill', fillColor)

            svgroot.html('          <defs> <pattern id="pattern-stripe" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"> <rect width="2" height="4" transform="translate(0,0)" fill="white"></rect> </pattern> <mask id="mask-stripe"> <rect x="0" y="0" width="100%" height="100%" fill="url(#pattern-stripe)" /> </mask>      </defs>')


            svg = svgroot
                .append("g")
                    .attr("transform", "translate(" + margins.left + "," + margins.top + ")");
            

            const colorIndices = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]


            let colors = []

            svgroot.selectAll(".check-color")
                .data(colorIndices)
                .enter()
                    .append("rect")
                    .style("opacity", 0)
                    .attr("x", 0)
                    .attr("y", 0)
                    .attr("width", 0)
                    .attr("height", 0)
                    .each(function(_d, _i){

                        let _node = d3.select(this)
                        _node.classed("annotation-Mod16Ord" + _i, true)

                        console.log(window.getComputedStyle(_node.node(), null).getPropertyValue("fill"))
                    })



            // console.log(element)
            // console.log(window.getComputedStyle(element, null).getPropertyValue("fill"))


            var bars = svg.selectAll('rect.display-bar')
                .data(data)
                .enter()
                .append('rect')
                .attr('class', 'display-bar')
                .attr('y', function (d, i) { return i * barSpacing;  })
                .attr('height', barHeight)
                .attr('x', 0)
                .attr('width', function (d) { return d * widthScale; });


            console.log("Setting updateWidth")

            // update functions
            updateWidth = function() {
                console.log("Width = " + width)
                widthScale = (width - 20) / maxValue;
                svgroot.attr("width", width)
                // bars.transition().duration(1000).attr('width', function(d) { return d.value * widthScale; });
                // svg.transition().duration(1000).attr('width', width);
            };

            updateHeight = function() {
                barSpacing = height / data.length;
                barHeight = barSpacing - barPadding;
                svgroot.attr("height", height)
                // bars.transition().duration(1000).attr('y', function(d, i) { return i * barSpacing; })
                //     .attr('height', barHeight);
                // svg.transition().duration(1000).attr('height', height);

            };

            updateFillColor = function() {
                svg.transition().duration(1000).style('fill', fillColor);
            };

            forceRedraw = function(){
                updateData()
            }


            store_selection = function(selected_element){

                aimms_selected_datasource.values.requestSetValues([{
                    ranges: [{start:0, end:1}, {start:0, end:1}],
                    layerName: "values",
                    value: selected_element
                }], function onDone(status){
                    console.log("STATUS OF SETTING VALUE")
                    console.log(status)
                })



            }


            updateData = function() {

                console.log("Updating data")
                barSpacing = height / data.length;
                barHeight = barSpacing - barPadding;
                maxValue = d3.max(data, _d => {return _d.value });
                widthScale = (width - 20) / maxValue;

                console.log(widthScale, maxValue)



                var update = svg.selectAll('rect.display-bar')
                    .data(data, function(_d){return _d.key});



                let _list16 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
                


                update
                    .transition()
                    .duration(1000)
                    .attr('y', function(d, i) { return i * barSpacing; })
                    .attr('height', barHeight)
                    .style('opacity', .8)
                    .attr('x', 0)
                    .attr('width', function(d) { return d.value * widthScale; })
                    .attr("mask", function(_d, _i){ console.log(_d) ; console.log(selected_element)  ; if (_d.key === selected_element){ console.log("YES - SELECTED") ; return "url(#mask-stripe)" }else{return ""}})

                update.enter()
                    .append('rect')
                    .attr('class', 'display-bar')
                    .attr('y', function(d, i) { return i * barSpacing; })
                    .attr('height', barHeight)
                    .attr('x', 0)
                    .each( function( _d, _i){
                        let _foo = (_i % 16) + 1


                        _list16.forEach( _ord => {
                            d3.select(this).classed( "annotation-Mod16Ord"+_ord, _ord == _foo)
                        })

                    })
                    .attr('width', 0)
                    .style('opacity', 0)
                    .on("click", function(e,d) { console.log("CLICKED...") ; console.log(d) ; store_selection(d.key) })
                    // .on("mouseover", function(e, d) {
                    //     tooltipDiv.html("<h1>"+ d.tooltip +"</h1>")
                    // })
                    // .on("mouseleave", function(d){
                    //     tooltipDiv.html("")
                    // })
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave)        
                    .transition()
                    .duration(1000)
                    .delay(function(d, i) { return (data.length - i) * 40; })
                    .attr('width', function(d) { return d.value * widthScale; })
                    .style('opacity', .8)

                update.exit()
                    .transition()
                    .duration(650)
                    .delay(function(d, i) { return (data.length - i) * 20; })
                    .style('opacity', 0)
                    .attr('height', 0)
                    .attr('x', 0)
                    .attr('width', 0)
                    .remove();
            }

        });
    }




    chart.forceRedraw = function(){
        if (typeof forceRedraw === 'function') forceRedraw();
    }


    chart.width = function(value) {

        if (!arguments.length) return width;
        console.log(width)

        
        width = value - margins.left - margins.right



        console.log(width)
        console.log(updateWidth)

        if (typeof updateWidth === 'function') updateWidth();
        if (typeof updateData === 'function') updateData();
        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        // height = value;

        height = value - margins.top - margins.bottom

        if (typeof updateHeight === 'function') updateHeight();
        if (typeof updateData === 'function') updateData();
        
        return chart;
    };

    chart.fillColor = function(value) {
        if (!arguments.length) return fillColor;
        fillColor = value;
        if (typeof updateFillColor === 'function') updateFillColor();
        if (typeof updateData === 'function') updateData();
        return chart;
    };

    chart.data = function(value) {
        if (!arguments.length) return data;
        data = value;
        if (typeof updateData === 'function') updateData();
        return chart;
    };

    chart.aimms_selected_datasource = function(value) {
        console.log("DSAFDSAFDSAFDSFDSFDSAFDS")
        aimms_selected_datasource = value ;


    };


    chart.selected_element = function(value){

        console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAA: " + value)
        if (!arguments.length) return selected_element;
        selected_element = value;
        if (typeof updateData === 'function') updateData();
        return chart;
    }



    return chart;
}


