var main = function () {
	"use strict";

	// var toDos = [
	// "Finish writing this book",
	// "Take Gracie to the park",
	// "Answer emails",
	// "Prep for Monday's class",
	// "Make up some new ToDos",
	// "Get Groceries"
	// ];


	var toDos = [{
		"description" : "Get groceries",
		"tags"  : [ "shopping", "chores" ]
	},
	{
		"description" : "Make up some new ToDos",
		"tags"  : [ "writing", "work" ]
	}, 

	{
		"description" : "Prep for Monday's class",
		"tags"  : [ "work", "teaching" ]
	},

	{
		"description" : "Answer emails",
		"tags"  : [ "work" ]
	}, 

	{
		"description" : "Take Gracie to the park",
		"tags"  : [ "chores", "pets" ]
	},
	{
		"description" : "Finish writing this book",
		"tags"  : [ "writing", "work" ]
	} ];

	var organizeByTags = function (toDoObjects) { 
		console.log("organizeByTags called");
		var tags = [];
		var orginized = [];

		toDoObjects.forEach(function(todo){    
			todo.tags.forEach(function(tag) {
				if (typeof(orginized[tag]) == "undefined") orginized[tag] = [];
				orginized[tag].push(todo.description);
			});        
		});
		return orginized;
	};



	$(".tabs a span").toArray().forEach(function (element) {
		$(element).on("click", function() {
			var $element = $(element),
			$content,
			$input,
			$button;
			$(".tabs a span").removeClass("active");
			$element.addClass("active");
			$("main .content").empty();
			if ($element.parent().is(":nth-child(1)")) {
				$content = $("<ul>");
				var toDosReversed = Array.prototype.slice.call(toDos);
				toDosReversed.reverse().forEach(function (todo) {
					$content.append($("<li>").text(todo.description));
				});
			} else if ($element.parent().is(":nth-child(2)")) {
				// THIS IS THE OLDEST TAB CODE
				$content = $("<ul>");
				toDos.forEach(function (todo) {
					$content.append($("<li>").text(todo.description));
				});

			} else if ($element.parent().is(":nth-child(3)")) { // THIS IS THE TAGS TAB CODE
				// THIS IS THE TAGS TAB CODE
				var organizedByTag = organizeByTags(toDos);				
				// console.log(organizedByTag)
				for (var tag in organizedByTag) {
					console.log(tag);
					var $tagName = $("<h3>").text(tag),
					$descriptions = $("<ul>");
					organizedByTag[tag].forEach(function (description) { 
						var $li = $("<li>").text(description); 
						$descriptions.append($li);
					});
					
					$("main .content").append($tagName);
					$("main .content").append($descriptions);
				};

			} else if ($element.parent().is(":nth-child(4)")) {
                // input a new to-do
                $input = $("<input>"),
                $button = $("<button>").text("+");

                $button.on("click", function () {
                	if ($input.val() !== "") {
                		toDos.push($input.val());
                		$input.val("");
                	}
                });

                $content = $("<div>").append($input).append($button);
               /* Alternatively append() allows multiple arguments so the above
               can be done with $content = $("<div>").append($input, $button); */
           }

           $("main .content").append($content);
           return false;
       });
});

$(".tabs a:first-child span").trigger("click");

};
$(document).ready(main);