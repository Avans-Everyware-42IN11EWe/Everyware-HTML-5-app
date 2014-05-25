      $( document ).ready(function() {
            //$(function() {
                var map = L.mapbox.map('map', 'nanne.i84f0he3');
                $.get('http://glas.mycel.nl/geo', function(data){
                    map.setView(data.centroid.reverse(), 14);
                    for (var i = 0; i < data.wijken.length; i++) {
                        var wijk = data.wijken[i];var p = wijk.percentage;
                        var red = Math.ceil((100 - Math.max(50, p)) * (255/50));
                        var green = Math.ceil(Math.min(50, p) * (255/50));

                        L.marker(wijk.center.reverse()).addTo(map)
                            .bindPopup(wijk.code + "")
                            .openPopup();

                        var polygon = L.polygon(_.map(wijk.bound, function(a) { return a.reverse(); })).addTo(map);
                        polygon.setStyle({color: "black",weight: 3,fillColor: "rgb("+red+","+green+",0)",fillOpacity: 0.7});
                    }
                });
            });
