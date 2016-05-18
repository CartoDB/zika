/* eslint quotes: 0 */


window.onWidgetsLoaded = function() {

  window.widgets[0].on('change', function(model) {
    if (model.changed.data) {
      var selected = cartodb._.where(model.changed.data, {selected:true});
      if (selected.length === 1) {
        var selected_country = selected[0].name;
        var layer = window.dashboard.getMap().getLayer(2);
        var sql = cartodb._.template( cartodb.$('#tpl-sql-flights').html() )({data:{
          selected_country: selected_country
        }});
        layer.set('sql', sql);
      }
    }
  });

  window.widgets[1].on('change', function(model) {
    if (model.changed.data) {
      var selected = cartodb._.where(model.changed.data, {selected:true});
      if (selected.length === 1) {
        var selected_city = selected[0].name;
        var layer = window.dashboard.getMap().getLayer(2);
        var sql = cartodb._.template( cartodb.$('#tpl-sql-flights').html() )({data:{
          selected_city: selected_city
        }});
        layer.set('sql', sql);
      }
    }
  });
}


window.pageConfig = {
  layerIds: ["flights","cities"],
  zoom: 4,
  center: [15, -70],
  tooltip: {
    interactivity: "cartodb_id,name",
    fields: [
      {
        "name": "name",
        "title": true,
        "position": 0
      }
    ]
  },
  widgets: [
    {
      "id": "country",
      "type": "category",
      "title": "Country of destination",
      "order": 0,
      "layer_id": "cities",
      "options": {
        "column": "dst_country_name",
        "aggregation": "count"
      }
    },
    {
      "id": "city",
      "type": "category",
      "title": "City of destination",
      "order": 1,
      "layer_id": "cities",
      "options": {
        "type": "aggregation",
        "column": "dst_municipality",
        "aggregation": "count",
        "aggregationColumn": "seats_total_sum"
      }
    },
    {
      "id": "max-population-formula",
      "type": "formula",
      "title": "#seats/year",
      "order": 2,
      "layer_id": "cities",
      "options": {
        "column": "seats_total_sum",
        "operation": "sum"
      }
    }
  ]
}
