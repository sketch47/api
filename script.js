$(document).ready(function() {
    // <option>2</option>
    // <option>3</option>
    // <option>4</option>
    load_Campus('#sel1');
}); 


$('body').on('click', '.audit-list', function() 
{
    // $('.main').children('p').html('');
    $(this).toggleClass( "try" );
    $(this).hasClass('try') ? getAuditoreInfo($(this).attr("data-auditore"),$('.main')) : $('.main').children('info').html('');
});

$('#sel1').change(function()
{
    if($('#sel1 option:selected').attr('data-campus')!=0){
        getAuditoreSp($('#sel1 option:selected').attr('data-campus'));
        $('.info').html("");
    }
    else{ 
        $('.aud').html("");
        $('.info').html("");
    }
});

function getAuditoreSp(CampusId)
{
   $.get('http://blant.96.lt/api.php?action=getAuditoreSp&id='+CampusId, function(data){
       
        var obj = jQuery.parseJSON(data); 
        //console.log(obj);
        if(obj){
        var text = " ";
        for(var i in obj)
        //<a href="" class="list-group-item list-group-item-action flex-column align-items-start ">
        //        <h5>head    </h5><i>text</i></a>
            text += "<div class=\"audit-list list-group-item list-group-item-action flex-column align-items-start\"  data-auditore=\" "+obj[i].Id+" \">" + obj[i].EnAud +
            "<p></p></div>";
        delete obj;
        $(".aud").html(text);
        }
        else $(".aud").html("");
  });
}

function getAuditoreInfo(mynum,object)
{
    $(object).children('.info').html("");
    text = ' ';
  $.get('http://blant.96.lt/api.php?action=getAuditoreInfo&id='+mynum, function(data){
        obj = jQuery.parseJSON(data); 
        // console.log(obj);

        text = "<hr><div class=\"row\"> <em class=\"col-6 col-md-6\">Площадь аудитории: "+" "+obj[0].Place+"</em>" + 
                "<em class=\"col-6 col-md-6\"> Количество мест: "+" "+obj[0].Seats+"</em> </div>";
        delete obj;
        text += "<div class=\"row\"> <em class=\"col-6 col-md-4\"> Название </em>"+
                "<em class=\"col-6 col-md-4\"> Описание </em>" +
                "<em class=\"col-6 col-md-4\"> Сирийный номер </em> </div>";   

                $(object).children('.info').append(text);
        get_tech(mynum,object);
        get_forniture(mynum,object);

        
   });
}

function get_tech(mynum, object)
{
    text = " ";
    $.get('http://blant.96.lt/api.php?action=getInfo&where=tech&auditore='+mynum , function(data){
        obj = jQuery.parseJSON(data); 
        
       
        for(var i in obj){
            text += "<div class=\"row\"> <em class=\"col-6 col-md-4\"> \""+obj[i].Name +"\"</em>"+
                "<em class=\"col-6 col-md-4\"> \""+ obj[i].Description+"\"</em>" +
                "<em class=\"col-6 col-md-4\"> \""+obj[i].UnNumber+"\"</em> </div>";
        }
        delete obj;
        
        $(object).children('.info').append(text);
    });
}

function get_forniture(mynum, object)
{
    $.get('http://blant.96.lt/api.php?action=getInfo&where=forniture&auditore='+mynum , function(data){
        obj = jQuery.parseJSON(data); 
        var text = " ";
        for(var i in obj){
            text += "<div class=\"row\"> <em class=\"col-6 col-md-4\"> \""+obj[i].Name +"\"</em>"+
                "<em class=\"col-6 col-md-4\">  \""+ obj[i].Description+"\"</em>" +
                "<em class=\"col-6 col-md-4\">  \""+obj[i].UnNumber+"\"</em> </div>";
        }
        //alert(text);
        delete obj;
        $(object).children('.info').append(text);
    });
}

function load_Campus($where_id){
    $.get('http://blant.96.lt/api.php?action=getCampusSp', function(data){
        
        var obj = jQuery.parseJSON(data); 
        //console.log(obj);
        var text="";
        for(var i in obj){
            text += "<option data-campus=\""+obj[i].Id+"\">" + obj[i].Number+ " " +obj[i].Name + "</option>";
        }
        $($where_id).append(text);
 });
}
$('.popup .close_window, .overlay').click(function (){
    $('.popup, .overlay').css({'opacity': 0, 'visibility': 'hidden'});
    });
    $('a.open_window').click(function (e){
    $('.popup, .overlay').css({'opacity': 1, 'visibility': 'visible'});
    e.preventDefault();
    });

$('body').on('click','.add_campus',function(){
    $('.pop_window').html("");
    
    text = "Имя корпуса : <input  class=\"inputs name\" type=\"text\"></input><hr>"+
    "Номер корпуса : <input class=\"inputs numb\" type=\"number\" min=\"1\" value=\"1\"></input>"+
    " <p></p>"+
    "<button class=\"btn addCampusOk \">Ok</button>";
       
    $('.pop_window').append(text);
});   
$('body').on('click','.add_auid',function(){
    $('.pop_window').html("");
    
    text = "Номер аудитории : <input  class=\"inputs EnAud\" type=\"number\"></input><hr>"+
    "Кампус:  <select  id=\"sel_Campus\" >"+
            "<option data-campus=\0\"></option>"+          
            "</select><hr>"+
        "Площадь аудитории : <input  class=\"inputs Place\" type=\"number\" min=\"1\" value=\"1\"></input><hr>"+
        "Колличество мест : <input  class=\"inputs Seats\" type=\"number\" min=\"1\" value=\"1\"></input><hr>"+
    " <p></p>"+
    "<button class=\"btn addAudOk \">Ok</button>";
       
    $('.pop_window').append(text);
    load_Campus('#sel_Campus');
}) ;   
$('body').on('click','.addCampusOk',function(){
    var params = {
        name : $(".name").val(),
        numb : $(".numb").val()
    };
    //GET запрос для добаления с параметрами
    //console.log(params);  
});

$('body').on('click','.addAudOk',function(){
    var params = {
        EnAud : $(".EnAud").val(),
        Campus : $("#sel_Campus option:selected").attr('data-campus'),
        Place : $(".Place").val(),
        Seats : $(".Seats").val()
    };
    //GET запрос для добаления с параметрами
    // console.log(params);  
    // console.log("g");  
});

