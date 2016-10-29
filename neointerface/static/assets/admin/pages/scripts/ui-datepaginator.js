var UIDatepaginator = function () {

    return {

        //main function to initiate the module
        init: function () {
            var stock="is";
            var value=10;
            var date="26-10-2016";
            PutNews(stock,date,value);
            $('#optnes').on('change', function() {
            value+=5;
            $( "#datenews" ).empty();
            stock=this.value;
            PutNews(stock,moment(date).format("DD-MM-YYYY"),value);
            });

            $('#datepaginatornews').datepaginator({
                onSelectedDateChanged: function(event, dat) {
                   $( "#datenews" ).empty();
                   date=dat;
                   PutNews(stock,moment(date).format("DD-MM-YYYY").toString(),value);
                }
            });

            function PutNews(stock,date,value) {
              $.getJSON("http://localhost:3000/search/"+stock+"/"+date+"/"+value.toString(),function (json) {
                  console.log(json)
                  for (var i = 0; i < json.length; i++) {
                      var tr="";
                      tr+= '<a href="'+json[i].url+'class="list-group-item active">';
                      tr+='<h4 class="list-group-item-heading">' + json[i].title + "</h4></a>";
                      tr+='<p class="list-group-item-text">'+ json[i].newsdesc + "</p><hr>";
                      $('#datenews').append(tr);
                  }
              });
              }


        } // end init

    };

}();
