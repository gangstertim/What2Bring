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
		console.log(this);	
		$('<p />').
		load(this.href).
		insertBefore(rsvp);
		$(this).hide();
	});

	$("#verifyName").click(function (e) {
		if ($("#guest_name").val().length == "") {
			e.preventDefault();
			if ($("#warning_name").length < 1) {
				$("<p id = warning_name />").html("Name Required").insertBefore($("#guest_name"));
			}
		} else {
			$("#warning_name").remove();
		}

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
	dish_text = dish_text.replace(/,/g, '');
	if ($("#event_dishes").val().length < 1) {
		var dish_final = document.getElementById("event_dishes").value += dish_text;
	} else {
		var dish_final = document.getElementById("event_dishes").value += ", " + dish_text;
	}
	$("#event_dishes_temp").val("");
	$("#event_dishes").parent().show();
	//     dish_final.outputtext.value += dish_text;
  };

function listRelevantDishes(dishesToParse,dishesToRemove) {
	var index = 0;
	var exists = false;
	var outputArray = [];

	for (var i=0; i < dishesToParse.length; i++) {
		for (var j = 0; j<dishesToRemove.length; j++) {

			if (dishesToParse[i] == dishesToRemove[j]) {
				exists = true;
			}
			console.log()
			console.log(dishesToParse[i] + " ?=" + dishesToRemove[j] + " " + exists);
		};

		if (exists) {
			exists = false;
			continue;
		}

		outputArray[index] = dishesToParse[i];
		index++;
		exists = false;
	}
	console.log(outputArray);
	return outputArray;
}

function listDishes() {

	var dishesForParsing = document.getElementById('dishes_for_listing').
	innerHTML.
	replace(/\s+/g, '').
	split(",");

	var dishesBrought = document.getElementById('dishes_brought').
	innerHTML.
	replace(/\s+/g, '').
	split(",");

	console.log(dishesForParsing);
	console.log(dishesBrought);

	var dishes = listRelevantDishes(dishesForParsing, dishesBrought);

	console.log("out = " + dishesBrought);

	var new_dishes = [];
	for (var i=0; i<dishes.length; i++) {
		new_dishes[i] = (dishes[i] + "<br>");
	}

	var dishesChild = $("#dishes_for_seeing");
	var dishesParent = dishesChild.parent();
	dishesChild.remove();

	if (new_dishes.length < 1) {
		dishesParent.parent().remove();
	} else {
		$("<p id = dishes_for_seeing />").html(new_dishes).appendTo(dishesParent);
	}
}

function buttonifyDishes() {
	var contents = document.getElementById('dishes_to_list');
	$("#suggested_amount").toggle('show');

	if (contents.style.display == 'block') {
		return;
	}

	var dishesForParsing = document.getElementById('dishes_for_clicking').
	innerHTML.
	replace(/\s+/g, '').
	split(",");

	var dishesBrought = document.getElementById('dishes_brought').
	innerHTML.
	replace(/\s+/g, '').
	split(",");

	var dishes = listRelevantDishes(dishesForParsing, dishesBrought);

	var new_dishes = [];
	for (var i=0; i<dishes.length; i++) {
		new_dishes[i] = ("<label><input id=\"clickable_dishes[" + i + "]\" type=\"checkbox\">" + 
			"<a id = name_dishes[" + i + "]>" + dishes[i] + "</a></label>");
	};

	var dishesChild = $("#dishes_for_clicking");
	var dishesParent = dishesChild.parent();
	dishesChild.remove();
	dishesParent.show();

	if (new_dishes.length < 1) {
		$("#bringin_somethin").hide();
		$("#suggested_amount").toggle('show');
		new_dishes[0] = "No more items to bring";
		$("<p />").html(new_dishes).insertBefore($("#bringin_somethin"));
		dishesParent.remove();
	} else {
		$("<p id = dishes_for_clicking />").html(new_dishes).appendTo(dishesParent);
	}
}

function addDishesToGuest() {
	var numDishes = document.getElementById('dishes_for_clicking').childElementCount;

	for (var i=0; i<numDishes; i++) {
		isChecked = document.getElementById("clickable_dishes[" + i + "]").checked;

		if (isChecked) {
			dishName = document.getElementById('name_dishes[' + i + ']').innerText;

			document.getElementById("guest_dishes").value += dishName +  ", ";
		}
	}
}

function guestParser()
{
	var guestNames = document.getElementById('attending_names').
	innerHTML.
	split("\"");

	var guestDishes = document.getElementById('attending_dishes').
	innerHTML.
	split("\"");

	var guestCash = document.getElementById('attending_with_cash').
	innerHTML.
	match(/[true,false]*e/g);

	var output = [];
	var fullEvent = [];
	fullEvent[0] = "<p> Sorry! </p>";
	fullEvent[1] = "<p> The Event is now full </p><br>";

	var temp = document.getElementById('number_of_attendees').innerText;
	var guestsAllowed = parseInt(temp);
	temp = document.getElementById('how_much')
	var cash;
	if (temp != null) {
		temp = temp.innerHTML;
		cash = parseFloat(temp);
	}
	String.prototype.bool = function() {
		if ((/^true$/i).test(this) || (/^false$/i).test(this)) {
			return (/^true$/i).test(this);
		} else return false;
	};


	for (var i=1; i<guestNames.length; i += 2)
	{
		output[0] = ("<p>" + guestNames[i] + "</p>");

		if ((guestDishes[i].length >= 1)){
			if ((guestCash[i] != null) && guestCash[i].bool()) {
				output[1] = ("<small> bringing " + guestDishes[i] + " & "+ cash + " dollars</small>");
			} else {
				output[1] = ("<small> bringing " + guestDishes[i] + "</small>");
			};

		} else {
			if ((guestCash[i] != null) && guestCash[i].bool()) {
				output[1] = ("<small> bringing " + cash + " dollars</small>");
			}
		};

		$("<blockquote class = pull-right />").html(output).appendTo($("#attendees"));
		output = [];
	}

	if (guestNames.length/2 >= guestsAllowed) {
		$("#new_guest").hide();
		$("<div />").html(fullEvent).appendTo($("#attendees"));
	}

    //document.getElementById('names').innerHTML = "boobies";
}

function showMoney() {
	$("#event_howmuch").parent().parent().toggle('show');
};
