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

$(function () {
	$('#event_date').datepicker().on('click', 'show');

	$("#verifyName").live('click', function (e) {
		var guestName = $("#guest_name");
		console.log("testes");
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

$(function addGuest() {
	$("#new_guest").on('click', function (e) {
		e.preventDefault();
		var rsvp = document.getElementById('rsvp');	
		$('<p />').load(this.href + " #target").insertBefore(rsvp);
		$(this).hide();
	});
});

$(function () {
	$("#verifyAttrs").click(function (e) {

		var obj_sizes = new Array();
		obj_sizes[0] = $("#event_name").val().length;
		obj_sizes[1] = $("#event_datec").val().length;
		obj_sizes[2] = $("#event_location").val().length;
		obj_sizes[3] = $("#event_email").val().length;

		var obj = new Array();
		obj[0] = $("#event_name");
		obj[1] = $("#event_date");
		obj[2] = $("#event_location");
		obj[3] = $("#event_email");

		for (var i=0; i < 4; i++) {
			if (obj_sizes[i] < 1) {
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
var addDishCOUNT = 0;


$(function () {
	$("#event_dishes_temp").on('hover', function () {
		if (addDishCOUNT === 0) {
			var button = $("#event_dishes_temp").next();
			button.popover('toggle');
		}
	});
});


function addDishPopover() {
	var button = $("#event_dishes_temp").next();
	if (addDishCOUNT < 1) {
		button.popover('show');
	} 
	if (addDishCOUNT > 3) {
		button.popover('destroy');
	}

	addDishCOUNT++;
}

function addDishWithKey(event) {
	if (event.keyCode == 13) {
		event.preventDefault();
		addDish();
	}
}

function addDish() {
	var dish_temp = $("#event_dishes_temp");
	var dish_text = dish_temp.val();
	var dish_pre_text = document.getElementById("event_dishes").value;
	addDishPopover();

	if (dish_text == "") { 
		return;
	}

	dish_text = dish_text.replace(/,/g, '-'); // remove commas

	if ($("#event_dishes").val().length < 1) {
		document.getElementById("event_dishes").value += dish_text;
		dish_temp.attr("placeholder","and...")
		$("#event_dishes").parent().show();
	} else {
		document.getElementById("event_dishes").value = dish_text +  ", " + dish_pre_text;
		dish_temp.attr("placeholder","")
	}
	dish_temp.val("");
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

var dishes;

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

	dishes = listRelevantDishes(dishesForParsing, dishesBrought);

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

var noMore = false;

function buttonifyDishes() {
	var contents = document.getElementById('dishes_to_list');
	var bringingButton = $("#bringin_somethin")

	if (contents == null) {
		return;
	} else if (contents.style.display == 'block') {
		$("#dishes_for_clicking").toggle('show');
		bringingButton.button('toggle');

		if (noMore) {
			if (($(".popover-content") != null) && $(".popover-content").children().length > 1) {
				var pop =  $(".popover-content")[0];
				pop.removeChild(pop.lastChild);
				pop.removeChild(pop.lastChild);
			}

			bringingButton.popover('toggle');
			if ($(".popover-title") != null) $(".popover-title").attr('id',"no_more");
		}
		return;
	} else {
		bringingButton.button('toggle');
	}

	// var dishesForParsing = document.getElementById('dishes_for_clicking').
	// innerHTML.
	// replace(/\s+/g,' ').
	// split(",");

	// var dishesBrought = document.getElementById('dishes_brought').
	// innerHTML.
	// replace(/\s+/g,' ').
	// split(",");

	// var dishes = listRelevantDishes(dishesForParsing, dishesBrought);

	var new_dishes = [];
	for (var i=0; i<dishes.length; i++) {
		new_dishes[i] = ("<label><input id=\"clickable_dishes[" + i + "]\" type=\"checkbox\">" + 
			"<a id = name_dishes[" + i + "]>" + dishes[i] + "</a></label>");
	};

	if (new_dishes.length < 1) {
		bringingButton.popover('toggle');
		$(".popover-title").attr('id',"no_more");
		noMore = true;
	}

	new_dishes[dishes.length] = 
		"<div class = \"form-inline\" >" +
			"<label class=\"checkbox\"><input id=\"clickable_other_dishes\" onclick=\"showOther()\" type=\"checkbox\">" +
			"<a> other </a></label>" + 
			"<input id = \"other_dish\" type=\"text\" class=\"input-medium\" style=\"display: none;\" >"+
		"</div>";

	var dishesChild = $("#dishes_for_clicking");
	var dishesParent = dishesChild.parent();
	dishesChild.remove();
	dishesParent.show();

	$("<p id = dishes_for_clicking />").html(new_dishes).appendTo(dishesParent);
}

function addDishesToGuest() {
	var numDishes = dishes.length;

	for (var i=0; i<numDishes; i++) {

		if (document.getElementById("clickable_dishes[" + i + "]").checked) {

			dishName = document.getElementById('name_dishes[' + i + ']').
			innerHTML;

			// console.log(dishName);

			document.getElementById("guest_dishes").value += dishName +  ",";
		}
	}

	if (document.getElementById("clickable_other_dishes").checked && ($("#other_dish").val().length > 0)) {
		
		document.getElementById("guest_dishes").value +=  " " + $("#other_dish").val() +  ",";
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

function showOther() {
	if (document.getElementById("clickable_other_dishes").checked) {
		$("#other_dish").attr("style","");
		if (($(".popover-content") != null) && $(".popover-content").children().length < 2) {
			$("<br>").appendTo($(".popover-content"));
			$("<p />").html("Please be sure to <b>not</b> bring anything that is already being brought!").
			appendTo($(".popover-content"));
		}
	} else {
		$("#other_dish").attr('style','display: none;');
	}
}

function showMoney() {
	$("#event_howmuch").parent().parent().toggle('show');
};
