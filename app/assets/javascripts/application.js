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
		$('<p />').
		load(this.href).
		insertBefore(rsvp);
		$(this).hide();
	});
});

$(function () {
	$("#verifyName").click(function (e) {
		var guestName = $("#guest_name");
		if (guestName.val().length < 1) {
			e.preventDefault();
			if (guestName.parent().attr("class") != "control-group error") {
				guestName.parent().attr("class","control-group error");
				$("<span class = 'help-inline' />").html("Required").insertAfter(guestName);
			}
		} else {
			if (guestName.parent().attr("class") != "control-group error") {
				guestName.parent().attr("class","control-group");
				guestName.next().remove();
			}
		}

	});
});

$(function () {
	$("#verifyAttrs").click(function (e) {

		var obj = new Array();
		obj[0] = $("#event_name");
		obj[1] = $("#event_datec");
		obj[2] = $("#event_location");
		obj[3] = $("#event_email");

		for (var i=0; i < 4; i++) {
			if (obj[i].val().length < 1) {
				e.preventDefault();
				if (obj[i].parent().attr("class") != "control-group error") {
					obj[i].parent().attr("class","control-group error");
					$("<span class = 'help-inline' />").html("Required").insertAfter(obj[i]);
				}
			} else {
				if (obj[i].parent().attr("class") == "control-group error") {
					obj[i].parent().attr("class","control-group");
					obj[i].next().remove();
				}
			}
		}
	});
});

function getNumGuests() {
	return numGuests;
}
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
	if (dish_text == "") return;

	dish_text = dish_text.replace(/,/g, '-');
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
		};

		if (exists) {
			exists = false;
			continue;
		}

		outputArray[index] = dishesToParse[i];
		index++;
		exists = false;
	}
	return outputArray;
}

function listDishes() {

	var dishesForParsing = document.getElementById('dishes_for_listing').
	innerHTML.
	replace(/\s+/g,' ').
	split(",");

	var dishesBrought = document.getElementById('dishes_brought').
	innerHTML.
	replace(/\s+/g,' ').
	split(",");

	// console.log("dishesForParsing = ");
	// console.log(dishesForParsing);
	// console.log();
	// console.log("dishes already Brought = ");
	// console.log(dishesBrought);

	var dishes = listRelevantDishes(dishesForParsing, dishesBrought);

	// console.log("dishes = ");
	// console.log(dishes);

	var new_dishes = [];
	for (var i=0; i<dishes.length; i++) {
		new_dishes[i] = (dishes[i] + "<br>");
	};

	var dishesChild = $("#dishes_for_seeing");
	var dishesParent = dishesChild.parent();
	dishesChild.remove();

	if (new_dishes.length < 1) {
		dishesParent.parent().remove();
	} else {
		$("<p id = dishes_for_seeing />").html(new_dishes).appendTo(dishesParent);
	};
}

function buttonifyDishes() {
	var contents = document.getElementById('dishes_to_list');

	if (contents.style.display == 'block') {
		return;
	} else {
		$("#bringin_somethin").hide();
	}

	var dishesForParsing = document.getElementById('dishes_for_clicking').
	innerHTML.
	replace(/\s+/g,' ').
	split(",");

	var dishesBrought = document.getElementById('dishes_brought').
	innerHTML.
	replace(/\s+/g,' ').
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

		if (document.getElementById("clickable_dishes[" + i + "]").checked) {

			dishName = document.getElementById('name_dishes[' + i + ']').
			innerHTML;

			// console.log(dishName);

			document.getElementById("guest_dishes").value += dishName +  ",";
		}
	}
}

function guestParser() {
	share();
	var guestNames = document.getElementById('attending_names').
	innerHTML.
	split("\"");

	var guestDishes = document.getElementById('attending_dishes').
	innerHTML.
	split("\"");

	var guestCash = document.getElementById('attending_with_cash').
	innerHTML.
	match(/[true,false]*e/g);

	
	var fullEvent = [];
	fullEvent[0] = "<p> Sorry! This event is full</p>";
	// fullEvent[1] = "<p> The Event is now full </p><br>";

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
		} else {
			return false;
		}
	};

	var output = [];
	for (var i=1; i<guestNames.length; i += 2)
	{
		output[0] = ("<p>" + guestNames[i] + "</p>");

		dishToPrint = guestDishes[i].substring(0,guestDishes[i].length-1);

		if ((guestDishes[i].length >= 1)){
			if ((guestCash[i] != null) && guestCash[i].bool()) {
				output[1] = ("<small> bringing " + dishToPrint + " & "+ cash + " dollars</small>");
			} else {
				output[1] = ("<small> bringing " + dishToPrint + "</small>");
			};

		} else {
			if ((guestCash[i] != null) && guestCash[i].bool()) {
				output[1] = ("<small> bringing " + cash + " dollars</small>");
			}
		};

		$("<blockquote class = pull-right />").html(output).appendTo($("#attendees"));
		output = [];
	}

	var numGuests = Math.floor(guestNames.length/2);
	if (numGuests >= guestsAllowed) {
		$("#new_guest").hide();
		$("<div />").html(fullEvent).appendTo($("#guests_coming"));
	} else {
		
		if (!isNaN(guestsAllowed)) {
			$("<h4 />").html("(" + numGuests + " of "  + guestsAllowed + ")").appendTo($("#guests_coming"));
		} else {
			$("<h4 />").html(numGuests).appendTo($("#guests_coming"));
		}
	}
}

function share() {
	if (document.getElementById("notice").innerHTML == "Event was successfully created.") {
		$("#share").show();
	}
}

function showMoney() {
	$("#event_howmuch").parent().parent().toggle('show');
};
