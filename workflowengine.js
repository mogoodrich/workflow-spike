
var workflowEngine = (function () {	
	
	// TODO: move all variables so that they are defined at the beginning of a function?

	// private properties	
	var workflow = {};
	var ui = {};
	
	// private methods
	
	// handlers for the different action types
	var handlers = {};
	
	// handle the "question" action type
	handlers.question = function (action) {
		
		var input;
		
		// TODO: add other types, make case-insensitive
		if (action.inputType == 'text' || action.inputType == undefined) {
		     input = jQuery('<input type="text"/>');
		}
			
		// configure the next button
		// TODO: configure next button as well
		ui.nextButton.click({'action': action}, function () {
			
			// perform validation
			if (action.validate != undefined) {
			
			     var validationResult = action.validate(input.val());     
			     // if the validation is false, display message and don't move on
			     if (validationResult.result == false) {
			     	     if (validationResult.message != undefined) {
			     	     	     ui.content.append(validationResult.message);
			     	     }
			     	     return;
			     }
			}
			
			// set the value
			action.value = input.val();
			
			// call the next action
			// TODO: is the workflow exposed properly here?
			var nextActionName = action.next(workflow);
			handlers[workflow[nextActionName].type](workflow[nextActionName]);	
		});
		ui.nextButton.show();
		
		// render the template
		ui.content.text(action.label).append(input);
	}
	
	// handles the "alert" question type
	handlers.alert = function (action) {
		alert (action.message);	
	}
	
	return {
		init: function (w, u) {

			var actionName;
			
			workflow = w;
			ui = u;

			// perform the first action
			actionName = workflow.init();		
			handlers[workflow[actionName].type](workflow[actionName]);
		}
		
	}

}());


	

