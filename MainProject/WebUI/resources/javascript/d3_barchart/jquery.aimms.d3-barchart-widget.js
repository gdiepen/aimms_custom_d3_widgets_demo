(function($) {

    var _aimms_d3_barchart_chart ; 


    var AIMMSBarchartWidget = AWF.Widget.create({

        _create: function _create() {
            console.log("Create called")
            const widgetRootNode = this.element.find('.awf-dock.center')[0]


            console.log(widgetRootNode)
            

            try{

                let _height = widgetRootNode.getBoundingClientRect().height
                let _width = widgetRootNode.getBoundingClientRect().width

                _aimms_d3_barchart_chart = create_aimms_d3_barchart().width(_width).height(_height)


                this._aimms_d3_barchart_chart = _aimms_d3_barchart_chart


                d3.select(widgetRootNode).call(_aimms_d3_barchart_chart)
               

                function throttle(f, delay) {
                    let timer = 0;
                    return function(...args){
                        clearTimeout(timer)


                        timer = setTimeout(() => f.apply(this, args), delay)
                    }
                }



                const myObserver = new ResizeObserver(throttle(entries => {

                  for (let entry of entries) {
                      _aimms_d3_barchart_chart.width(entry.contentRect.width)
                      _aimms_d3_barchart_chart.height(entry.contentRect.height)
                  }
                }, 250));
                


                myObserver.observe(widgetRootNode)








            }
            catch(error){
                console.log(error)
            }

        },


        _refresh: function(dataSource, optionName) {
            console.log("refresh called for " + optionName)

            console.log(dataSource)

            // We need to retrieve all of the data here and then send this data to 


            try{
                var rowHeaderDimension = { numRows:0, numCols: 0 };
                var colHeaderDimension = { numRows:0, numCols: 0 };

                if(dataSource) {
                    rowHeaderDimension = { 
                        numRows:dataSource.rowHeader.getNumRows(),
                        numCols:dataSource.rowHeader.getNumCols() 
                    };
                    colHeaderDimension = { 
                        numRows:dataSource.colHeader.getNumCols(),
                        numCols:dataSource.colHeader.getNumRows() 
                    };
                }

                var numRowsInGrid = dataSource.values.getNumRows();
                var numColsInGrid = dataSource.values.getNumCols();



                let foo3 = dataSource.requestDataBlocks(
                    [
                        {start: 0, end: numRowsInGrid},
                        {start: 0, end: numColsInGrid},
                    ],
                    ["values", "tooltips"],
                    function onReady(layeredDataBlocks) {


                        var new_data = []

                        var tooltip_data = []

                        console.log("BBBBB")
                        console.log(layeredDataBlocks["values"].getLayerNames())


                        window.foobar = layeredDataBlocks

                        for (var row=0 ; row<numRowsInGrid ; row++){

                            for (var col=0 ; col < numColsInGrid ; col++){


                    
                                try{

                                    let _element  = layeredDataBlocks["rowHeader"].getLayer("values").get(row, 0)
                                    let _value = layeredDataBlocks["values"].getLayer("values").get(row,col)

                                    let _data_element = {}
                                    _data_element["key"] = _element
                                    _data_element["value"] = _value
                                    _data_element["tooltip"] = layeredDataBlocks["values"].getLayer("tooltips").get(row,col)


                                    // If tooltip is not defined, use the value
                                    if (_data_element["tooltip"] === undefined){
                                        _data_element["tooltip"] = _value
                                    }


                                    new_data.push(_data_element)


                                } catch(error){console.log(error)}
                            }
                        }
                        console.log("NEW DATA")
                        console.log(new_data)
                        console.log(tooltip_data)

                        _aimms_d3_barchart_chart.data(new_data)
                    }

                )
                console.log("foo3 value:")
                console.log(foo3)



            
            }
            catch(error){
                console.log(error)
            }
        },


        _save_selection_element_parameter(dataSource){
            var widget = this ;

            widget._selected_element_parameter = dataSource

            // console.log("Storing new version of the element parameter")
            widget._aimms_d3_barchart_chart.aimms_selected_datasource(dataSource)



            try{

                var rowHeaderDimension = { numRows:0, numCols: 0 };
                var colHeaderDimension = { numRows:0, numCols: 0 };

                if(dataSource) {
                    rowHeaderDimension = { 
                        numRows:dataSource.rowHeader.getNumRows(),
                        numCols:dataSource.rowHeader.getNumCols() 
                    };
                    colHeaderDimension = { 
                        numRows:dataSource.colHeader.getNumCols(),
                        numCols:dataSource.colHeader.getNumRows() 
                    };
                }

                var numRowsInGrid = dataSource.values.getNumRows();
                var numColsInGrid = dataSource.values.getNumCols();

                console.log("QQQ")
                console.log(rowHeaderDimension)
                console.log(colHeaderDimension)

                console.log(numRowsInGrid)
                console.log(numColsInGrid)


                // console.log(dataSource.requestDataBlocks)
                let foo3 = dataSource.requestDataBlocks(
                    [
                        {start: 0, end: numRowsInGrid},
                        {start: 0, end: numColsInGrid},
                    ],
                    ["values", "tooltips"],
                    function onReady(layeredDataBlocks) {

                        console.log("WWW")

                        let selected_element = layeredDataBlocks["values"].getLayer("values").get(0,0)

                        console.log("Selected element = " + selected_element)


                        widget._aimms_d3_barchart_chart.selected_element(selected_element)
                    }
                )




            }
            catch(error){
                console.log(error)
            }
        },


























        onResolvedOptionChanged: function(optionName, value) {
            var widget = this;


            console.log("Resolved " + optionName)
            if(optionName === "contents") {
                widget._refresh(value, optionName);
            }


            if (optionName === "store_selection"){
                console.log("RECEIVED update information about the save selection")
                widget._save_selection_element_parameter(value)

            }






        },


    })



    // The jQuery-UI way of registering/creating a new widget:
    $.widget('ui.aimms_d3_barchart_widget', AIMMSBarchartWidget);


})(jQuery);
