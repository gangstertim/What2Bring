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
// $(function () {
// 	// Executes on DOM ready
// 	console.log("the function executed on DOM ready (whatever that means)");
// 	buttonifyDishes();
// 	listDishes();
// 	nameParser();
// });


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

	$("#create_guest").click(function (e) {
		e.preventDefault();

		addDishesToGuest();

		var body = $(this).serialize();
		$.post(this.action, body);
	});
});

// $(function () {
// $("#new_guest".click(function (e) {
// 	e.preventDefault();
// 	$("<div />")

// }));
// });
function addDishWithKey(event) {
	if (event.keyCode == 13) {
		event.preventDefault();
		addDish();
	}
}

function addDish() {
	var dish_text = $("#event_dishes_temp").val();
	dish_text = dish_text.replace(/,/g, '')
	var dish_final = document.getElementById("event_dishes").value += dish_text + ", ";
	$("#event_dishes_temp").val("");
	$("#event_dishes").parent().show();
	//     dish_final.outputtext.value += dish_text;
  };

function listDishes() {
	console.log("listDishes was called");

	dishes = document.getElementById('dishes_for_listing').
		innerHTML.
		replace(/\s+/g, ' ').
		split(",");
	var new_dishes = [];
	for (var i=0; i<dishes.length; i++) {
		new_dishes[i] = (dishes[i] + "<br>");
	}
	document.getElementById('dishes_for_listing').innerHTML = "";
	$("<div class = placeholder />").html(new_dishes).appendTo($("#dishes_for_listing"));
}

function buttonifyDishes() {
	console.log("Buttonify was called");

	// dishes =$("#dishes_for_clicking").parent().html();
	// 	//replace(/\s+/g, ' ').
	// 	//split(",");

	// console.log(dishes);
	var contents = document.getElementById('dishes_to_list');

	if (contents.style.display == 'block') {
		return;
	}

	dishes = document.getElementById('dishes_for_clicking').
		innerHTML.
		replace(/\s+/g, ' ').
		split(",");

	var new_dishes = [];
	for (var i=0; i<dishes.length - 1; i++) {
		//<label><input id="lifecheck" type="checkbox" >Lives</label>
		new_dishes[i] = ("<label><input id=\"clickable_dishes[" + i + "]\" type=\"checkbox\">" + 
			"<a id = name_dishes[" + i + "]>" + dishes[i] + "</a></label>");
	}
	var dishesFC = $("#dishes_for_clicking");
	var dishesParent = dishesFC.parent();
	dishesFC.remove();
	dishesParent.show();
	$("<p id = dishes_for_clicking />").html(new_dishes).appendTo(dishesParent);

}

function addDishesToGuest() {
	var numDishes = document.getElementById('dishes_for_clicking').childElementCount;

	for (var i=0; i<numDishes; i++) {
		isChecked = document.getElementById("clickable_dishes[" + i + "]").checked;

		if (isChecked) {
			dishName = document.getElementById('name_dishes[' + i + ']').innerText;

			document.getElementById("guest_dishes").value += dishName + ", ";
		}
	}
	

}


function addDishToList(clicked_id) {
	// document.getElementById('selected_dish')
	var thing = clicked_id;
	$("<div class = new_div />").html(thing).appendTo($("selected_dish"));
	
	console.log("the" + clicked_id + " was called");
}

function nameParser()
{
	temp = document.getElementById('names').innerHTML;
	temp = temp.split("\"");
	var temp2 = [];
	l=temp.length;

	for (var i=0; i<l; i++)
	{
		if (i%2 == 1) {
			temp2[(i-1)/2] = (temp[i] + "<br>");
		}
	}
	document.getElementById('names').innerHTML = "";
	$("<div class = placeholder />").html(temp2).appendTo($("#names"));
    //document.getElementById('names').innerHTML = "boobies";
}

function showMoney() {
  $("#event_howmuch").parent().parent().toggle('show');
};
