 $( document ).ready(function() {
            //$(function() {
                var map = L.mapbox.map('map', 'nanne.i84f0he3');
                 $.get('http://glas.mycel.nl/geo?id=2', function(data){
                console.log(JSON.stringify(data));
                map.setView(data.center.reverse(), 14);
                var wijkarray=[];
                wijkarray=data.bound;
                    for (var i = 0; i < data.bound.length; i++) {
                       var wijk = data.bound[i];
                       var p = wijk.percentage;                       
                        var red = Math.ceil((100 - Math.max(50, p)) * (255/50));
                        var green = Math.ceil(Math.min(50, p) * (255/50));
                        console.log("wijk reverse: "+wijk.reverse());
                        L.marker(wijk).addTo(map)
                            .bindPopup(wijk.code + "")
                            .openPopup();
                        
                       // var polygon = L.polygon(_.map(data.bound, function(a) { return a.reverse(); })).addTo(map);
                       // polygon.setStyle({color: "black",weight: 3,fillColor: "rgb("+red+","+green+",0)",fillOpacity: 0.7});
                    }
                    console.log("wijkarray: "+wijkarray);
                     var polygon = L.polygon(wijkarray).addTo(map);
         console.log(JSON.stringify(wijkarray));
                        polygon.setStyle({color: "black",weight: 3,fillColor: "rgb("+red+","+green+",0)",fillOpacity: 0.7});
                });
            });
