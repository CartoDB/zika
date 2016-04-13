;(function() {

  var vizjson = {
    'id':'2b13c956-e7c1-11e2-806b-5404a6a683d5',
    'version':'0.1.0',
    'title':'european_countries_e 0',
    'scrollwheel':false,
    'legends':false,
    'map_provider':'leaflet',
    'bounds':[
      [
        -18.979025953255253,
        -155.7421875
      ],
      [
        80.58972691308571,
        261.2109375
      ]
    ],
    'center':'[51.505, -0.09]',
    'zoom':13,
    'updated_at':'2015-03-13T11:24:37+00:00',
    'datasource': {
      'user_name': 'nerikcarto',
      'maps_api_template': 'http://{user}.cartodb.com:80',
      'force_cors': true, // This is sometimes set in the editor,
      'stat_tag': '84ec6844-4b4b-11e5-9c1d-080027880ca6'
    },
    'layers':[
      {
        'options':{
          'id':'0a3d9104-99c6-482b-9f8c-7c6134bddcdc',
          'order':0,
          'visible':true,
          'type':'Tiled',
          'name':'Positron',
          'className':'default positron_rainbow',
          'base_type':'positron_rainbow',
          'urlTemplate':'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
          'read_only':true,
          'minZoom':'0',
          'maxZoom':'18',
          'attribution':'\u00a9 <a href=\'http://www.openstreetmap.org/copyright\'>OpenStreetMap</a> contributors \u00a9 <a href= \'http://cartodb.com/attributions#basemaps\'>CartoDB</a>',
          'subdomains':'abcd',
          'category':'CartoDB'
        },
        'infowindow':null,
        'tooltip':null,
        'id':'0a3d9104-99c6-482b-9f8c-7c6134bddcdc',
        'order':0,
        'type':'tiled'
      }
    ],
    'overlays':[
      {
        'type':'loader',
        'options':{
          'display':true,
          'x':20,
          'y':150
        }
      },
      {
        'type':'search',
        'options':{
          'display':true
        }
      },
      {
        'type':'zoom',
        'options':{
          'x':20,
          'y':20,
          'display':true
        }
      }
    ],
    'prev':null,
    'next':null,
    'transition_options':{}
  };

  function main() {
    cartodb.createVis('map', vizjson, {

    })
    .done(function(vis, layers) {
      // layer 0 is the base layer, layer 1 is cartodb layer
      // setInteraction is disabled by default
      // layers[1].setInteraction(true);
      // layers[1].on('featureOver', function(e, latlng, pos, data) {

      // });
      // you can get the native map to work with it
      var map = vis.getNativeMap();
    })
    .error(function(err) {
      console.log(err);
    });
  }
  window.onload = main;
})();
