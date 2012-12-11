// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function addGuest() {
	$("#new_guest").click(function (e) {
		e.preventDefault();
		var rsvp = document.getElementById('rsvp');
		console.log("got clicked yob");
		console.log(this);	
		$('<p />').
		load(this.href).
		insertBefore(rsvp);
		$(this).hide();
	});
});
// $(function () {
// $("#new_guest".click(function (e) {
// 	e.preventDefault();
// 	$("<div />")

// }));
// });

function addDish() {
	    var dish_text = $("#event_dishes").val();
	    $("<p />").html(dish_text).appendTo($("#dishes_label"));
  };

function nameParser()
{
	temp = document.getElementById('names').innerHTML;
	temp = temp.split("\"");
	var temp2 = [];
	l=temp.length;
	console.log(temp);

	for (var i=0; i<l; i++)
	{
		if (i%2 == 1) {
			temp2[(i-1)/2] = (temp[i] + "<br>");
			console.log(i);
		}
	}

	console.log(temp2);
	document.getElementById('names').innerHTML = "";
	$("<div class = placeholder />").html(temp2).appendTo($("#names"));
    //document.getElementById('names').innerHTML = "boobies";
}

