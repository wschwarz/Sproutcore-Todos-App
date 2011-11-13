$(document).ready(function () {
	console.log("jquery working");
	$("#tag-button").click(function() {
		console.log("tag button clicked");
	});
	$('#modal').click(function(e) {
		console.log("anything");
        //Cancel the link behavior
        e.preventDefault();
        //Get the A tag
        var id = $("#modal");
     
        //Get the screen height and width
        var maskHeight = $(document).height();
        var maskWidth = 300;
     
        //Set height and width to mask to fill up the whole screen
        //$('#mask').css({'left': '600'});
        $('#mask').css({'width':maskWidth,'height':maskHeight,'left':'600px'});
         
        //transition effect     
        $('#mask').fadeIn(1000);    
        $('#mask').fadeTo("slow",0.8);  
     
        //Get the window height and width
        var winH = $(window).height();
        var winW = $(window).width();
               
        //Set the popup window to center
        $(id).css('top',  winH/2-$(id).height()/2);
        $(id).css('left', winW/2-$(id).width()/2);
     
        //transition effect
        $(id).fadeIn(2000); 
     
    });
     
    //if close button is clicked
    $('.window .close').click(function (e) {
        //Cancel the link behavior
        e.preventDefault();
        $('#mask, .window').hide();
    });     
     
    //if mask is clicked
    $('#mask').click(function () {
        $(this).hide();
        $('.window').hide();
    });         
});
