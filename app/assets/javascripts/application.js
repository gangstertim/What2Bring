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
	var dish_final = document.getElementById("event_dishes").value += dish_text + ", ";
	$("#event_dishes_temp").val("");
	$("#event_dishes").parent().show();
	//     dish_final.outputtext.value += dish_text;
  };

function listRelevantDishes(dishesToParse,dishesToRemove) {
  var index = 0;
  var exists = false;
  var outputArray = [];

  for (var i=0; i<dishesToParse.length - 1; i++) {
    for (var j = 0; j<dishesToRemove.length - 1; j++) {
      
      if (dishesToParse[i] === dishesToRemove[j]) {
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
		replace(/\s+/g, ' ').
		split(",");

  var dishesBrought = document.getElementById('dishes_brought').
    innerHTML.
    replace(/\s+/g, ' ').
    split(",");

  var dishes = listRelevantDishes(dishesForParsing, dishesBrought);

	var new_dishes = [];
	for (var i=0; i<dishes.length; i++) {
		new_dishes[i] = (dishes[i] + "<br>");
	}

  var dishesChild = $("#dishes_for_seeing");
  var dishesParent = dishesChild.parent();
  dishesChild.remove();


	$("<p id = dishes_for_seeing />").html(new_dishes).appendTo(dishesParent);
}

function buttonifyDishes() {
	var contents = document.getElementById('dishes_to_list');

	if (contents.style.display == 'block') {
		return;
	}

	var dishesForParsing = document.getElementById('dishes_for_clicking').
		innerHTML.
		replace(/\s+/g, ' ').
		split(",");

	var dishesBrought = document.getElementById('dishes_brought').
		innerHTML.
		replace(/\s+/g, ' ').
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

	if (new_dishes === []) {
    new_dishes[0] = "<a>No More Dishes to Bring!</a>";
	}

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
