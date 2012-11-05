var workflow = {
	
	presentQuestion: {
		type: 'question',
		inputType: 'text',
		label: 'Is the patient present?',
		
		validate: function (value) {
			if (value === 'yes' || value === 'no') {
				var validation
				return { result: true };	
			}
			else {
				return { result: false,
					message: 'Please answer yes or no'};
			}
		},
		
		next: function(workflow) {	
			// TODO: figure out how to scope this properly/pass workflow better
			if (workflow.presentQuestion.value === 'yes') {
				return 'dossierQuestion';	
			}
			else if (workflow.presentQuestion.value === 'no') {
				return 'nextVisitQuestion';
			}
			else {
				throw "never should get here";	
			} 
		}			
	},
	
	dossierQuestion: {
		type: 'question',
		inputType: 'text',
		label: 'What is the patient\'s dossier number?',
		
		next: function() { return 'recapMessage'; }
	},
	
	nextVisitQuestion: {
		type: 'question',
		inputType: 'text',
		label: 'When is the patient\'s next visit?',
		
		next: function() { return 'recapMessage'; }
	},
	
	recapMessage: {
		type: 'alert',	
		message: 'Patient has dossier number ${dossierQuestion.value} and next visit ${nextVisitQuestion.value}'
	},
	
	init: function () {
		return 'presentQuestion';
	}
	
}

