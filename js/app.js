var main = function () {
	"use strict";

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
		var orginized = [];

		toDoObjects.forEach(function(todo){    
			todo.tags.forEach(function(tag) {
				if (orginized[tag] === undefined) {orginized[tag] = [];}
				orginized[tag].push(todo.description);
			});        
		});
		return orginized;
	};

	var descriptionText = "",
	tagsText = "";

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

			} else if ($element.parent().is(":nth-child(3)")) { 
				// THIS IS THE TAGS TAB CODE
				var organizedByTag = organizeByTags(toDos), 
				tag,
				tagName,
				$descriptions,
				appendDescriptions = function (description) { 
					var $li = $("<li>").text(description); 
					$descriptions.append($li);
				};

				// TODO: fix loop
				for (tag in organizedByTag) {
					tagName = $("<h3>").text(tag);
					$descriptions = $("<ul>");
					organizedByTag[tag].forEach(appendDescriptions);

					$("main .content").append(tagName);
					$("main .content").append($descriptions);
				}


			} else if ($element.parent().is(":nth-child(4)")) {
                // input a new to-do
                var 
                $inputLabel = $("<p>").text("Description: "),
                $tagInput = $("<input>").addClass("tags"),
                $tagLabel = $("<p>").text("Tags: ");
                
                // TODO: add focusing after TAB pressing after fulfilling tags
                $button = $("<button>").text("+");

                $input = $("<input>").addClass("description");

                $input.val(descriptionText);
                
                // TODO: add prompt
                $tagInput.val(tagsText);

                $input.on("blur", function () {
                	descriptionText = $input.val();
                });

                $tagInput.on("blur", function () {
                	tagsText = $tagInput.val();
                });

                $button.on("click", function () {
                	if ($input.val() !== "") { 
                		var description = $input.val(),
			            tags;	            
			            if ($tagInput.val() == "") {
			            	tags = [];
			            	tags.push("no tags");
			            } else {
			            	tags = $tagInput.val().split(",");	
			            }
			            toDos.push({"description":description, "tags":tags});
			            // update toDos
			            $input.val("");
			            $tagInput.val("");
			            descriptionText = "";
			            tagsText = "";
		        	}
		    	});

                $content = $("<div>").append($inputLabel, $input, $button, $tagLabel, $tagInput);
            }


            $("main .content").append($content);
            return false;
        }); 
});

$(".tabs a:first-child span").trigger("click");

};
$(document).ready(main);