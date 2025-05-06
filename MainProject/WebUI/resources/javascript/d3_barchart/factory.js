(function($) {
// factory.js
var OptionTypeTable =
{
    type : "datasource",
    parts : [ {name : "rowHeader"}, {name : "colHeader"} ],
};

AWF.Bus.subscribe({

    onCollectTypes: function(collectedTypes, contextElQ) {
        if(!contextElQ || contextElQ.awf.tags("placeable-widget-container")) {
            collectedTypes.push("D3 Barchart");
        }
    },

    onInitializeTags: function(elQ, type) {
        if(type === 'D3 Barchart') {
            elQ.awf.tags(["placeable", "contents property", "d3-barchart-widget"], 'add');
        }
    },

    onInitializeOptionTypes: function(elQ, type) {
        if(type === 'D3 Barchart') {
            AWF.OptionTypeCollector.addOptionType(elQ, "contents", OptionTypeTable);
            AWF.OptionTypeCollector.addOptionType(elQ, "store_selection", OptionTypeTable);
        }
    },

    onDecorateElement: function(elQ, type) {
        if(type === 'D3 Barchart') {
            elQ.aimms_d3_barchart_widget();
        }
    },
});

})(jQuery);

