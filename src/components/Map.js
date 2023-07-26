import { loadModules } from "esri-loader";
import React, { useEffect } from "react";

const Map = () => {
  
    useEffect(() => {
        loadModules(["esri/Map", "esri/views/MapView", "esri/layers/FeatureLayer"]).then(([Map, MapView, FeatureLayer]) => {
          const map = new Map({
            basemap: "streets-vector",
          });
    
          const view = new MapView({
            container: "viewDiv", 
            map: map,
            center: [35.0, 31.5],
            zoom: 6,
          });
    
          
         
    
          const citiesLayer = new FeatureLayer({
            url: "https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/World_Cities/FeatureServer/0",
           definitionExpression:"STATUS = 'National and provincial capital'",
            outFields: ["World_Cities"],
            popupTemplate: {
              title: "{CITY_NAME}",
              content: "Population: {POP}",
            },
            renderer: {
              type: "simple",
              symbol: {
                size: "12px",
                color: "red",
                type: "simple-marker",
              },
              
            },
            
          });
          map.add(citiesLayer);
        });
        
      }, []);
    
      return <div style={{ height: "100vh"}} id="viewDiv"></div>;
    };
    
    export default Map;