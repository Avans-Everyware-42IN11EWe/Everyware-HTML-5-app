 $( document ).ready(function() {
$( "#register" ).click(function (event) {
                    var Name = $("#txtName").val();
                    var Email = $("#txtEmail").val();
                    $.ajax({
                        url: "http://glas.mycel.nl/register",
                        type: "POST",
                     data: JSON.stringify({ "email" : Email, "name" : Name, "latlong": [1.233, 4.222], "district_id": 3 }),
                        dataType: "json",
                        success: function (data) {
                            alert("Success");
                            mySwiper.swipeNext();
                        },
                        error: function(jqXHR, textStatus, errorThrown) {
                            alert("ERROR! -- textStatus")
                          console.log(textStatus, errorThrown);
                        }
                    });
                });
                
                $( "#register-facebook" ).click(function() {
                
                // TODO - create and login
                    mySwiper.swipeNext();
                });

    });
            
                    