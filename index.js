/* eslint quotes: 0 */

;(function() {

  let tplCssConfig = {
    colors: {
      background: '#FFFFFF',
      quali: {
        important: '#cc2d7f',
        value1: '#e58606',
        value2: '#52bca3'
      },
      quanti: {
        scale1: ['#5c53a5','#ab5b9e','#dc6f8e','#f59280','#fabc82','#f3e79b'] //sunset2
      }
    }
  }

  var vizJSON = {
    "user": {
      "fullname": "",
      "avatar_url": ""
    },
    "widgets": window.pageConfig.widgets,
    "datasource": {
      "user_name": "nerikcarto",
      "maps_api_template": "https://{user}.cartodb.com:443",
      "force_cors": true, // This is sometimes set in the editor,
      "stat_tag": "84ec6844-4b4b-11e5-9c1d-080027880ca6"
    },
    //"id": "84ec6844-4b4b-11e5-9c1d-080027880ca6",
    "version": "0.1.0",
    "likes": 0,
    "scrollwheel": false,
    "legends": true,
    "map_provider": "leaflet",
    "center": window.pageConfig.center,
    "zoom": window.pageConfig.zoom,
    "updated_at": "2015-10-26T11:50:30+00:00",
    "layers": [
      {
        "options": {
          "type": "Plain",
          "base_type": "plain",
          "className": "plain",
          "color": "#ffffff",
          "image": "",
          "maxZoom": 32,
          "id": "053e8f80-ecad-4d74-a9e0-f1eaf2f807f8",
          "order": 0
        },
        "infowindow": null,
        "tooltip": null,
        "id": "053e8f80-ecad-4d74-a9e0-f1eaf2f807f8",
        "order": 0,
        "type": "background"
      },
      {
        "type": "layergroup",
        "options": {
          "user_name": "nerikcarto",
          "maps_api_template": "https://{user}.cartodb.com:443",
          "sql_api_template": "https://{user}.cartodb.com:443",
          "tiler_protocol": "http",
          "tiler_domain": "cartodb.com",
          "tiler_port": "80",
          "sql_api_protocol": "http",
          "sql_api_domain": "cartodb.com",
          "sql_api_endpoint": "/api/v2/sql",
          "sql_api_port": 80,
          "filter": "mapnik",
          "layer_definition": {
            "stat_tag": "1ab8106e-0233-11e6-8d70-0e787de82d45",
            "version": "1.0.1",
            "layers": [
              {
                "id": "3c6d147d-6127-4347-b396-9884022d0482",
                "type": "CartoDB",
                "tooltip": {
                  "fields": window.pageConfig.tooltip.fields,
                  "template_name": "tooltip_light",
                  "template": cartodb.$('#tpl-tooltip-base').html(),
                  "alternative_names": {},
                  "maxHeight": 180
                },
                "order": 1,
                "visible": true,
                "options": {
                  "layer_name": "world_borders",
                  "cartocss": "#world_borders_hd{\n  polygon-fill: #ffeab0;\n  polygon-opacity: .5;\n  line-color: #FFF;\n  line-width: 1;\n  line-opacity: 1;\n}\n#world_borders_hd[has_cases=true]{\n  polygon-opacity: 1;\n\n}\n",
                  "cartocss_version": "2.1.1",
                  "interactivity": window.pageConfig.tooltip.interactivity,
                  "sql": cartodb.$('#tpl-sql-base').html(),
                  "table_name": "\"\"."
                }
              },
            ]
          },
          "attribution": ""
        }
      }
    ],
    "overlays": [
      {
        "type": "search",
        "order": 3,
        "options": {
          "display": true,
          "x": 60,
          "y": 20
        },
        "template": ""
      },
      {
        "type": "zoom",
        "order": 6,
        "options": {
          "display": true,
          "x": 20,
          "y": 20
        },
      "template": "<div class=\"CDB-Overlay\"><button class=\"CDB-Zoom-action CDB-Zoom-action--out js-zoomOut\"></button><button class=\"CDB-Zoom-action CDB-Zoom-action--in js-zoomIn\"></button></div><div class=\"CDB-Zoom-info js-zoomInfo\">1</div>"
    },
      {
        "type": "loader",
        "order": 8,
        "options": {
          "display": true,
          "x": 20,
          "y": 150
        },
        "template": ""
      }
    ],
    "prev": null,
    "next": null,
    "transition_options": {
      "time": 0
    }
  };

  function main() {

    _.templateSettings = {
      interpolate: /\{\{(.+?)\}\}/g
    };

    vizJSON = prepareLayers(vizJSON);

    cartodb.deepInsights.createDashboard('#dashboard', vizJSON, {
     no_cdn: false,
     renderMenu: false
   }, function(err, dashboard) {
      console.log(err)
    });

  }

  function prepareLayers(_vizJSON) {
    var layerIds = window.pageConfig.layerIds;
    console.log(layerIds);

    //sublayers
    var vizJSONLayers = _vizJSON.layers[1].options.layer_definition.layers;
    var i = 1;
    layerIds.forEach(layerId => {
      var layer = {
        id: layerId,
        "type": "CartoDB",
        order: i++,
        visible: true,
        options: {
          cartocss: cartodb._.template( cartodb.$('#tpl-css-'+layerId).html() )(tplCssConfig),
          "cartocss_version": "2.1.1",
          sql: cartodb._.template( cartodb.$('#tpl-sql-'+layerId).html() )({})
        }
      };

      if (cartodb.$('#tpl-legend-'+layerId).length) {
        layer.legend = {
          "type": "custom",
          "show_title": false,
          "visible": true,
          template: cartodb._.template( cartodb.$('#tpl-legend-'+layerId).html() )(tplCssConfig)
        }
      }

      vizJSONLayers.push(layer);

    });
    console.log(_vizJSON);
    return _vizJSON;
  }
  window.onload = main;
})();
