(function() {	
	var PersonsApp = {
		// Firstly retreive the data.
		retriveData: function() {
			var apiUrl = 'https://raw.githubusercontent.com/maqe/maqe.github.io/gh-pages/persons.json';
			 
			var request = new XMLHttpRequest();
			request.open('GET', apiUrl, true);
			
			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			    // Success!
			    var data = JSON.parse(request.responseText);
			    PersonsApp.renderDataVisualsTemplate(data);
			  } else {
			    // We reached our target server, but it returned an error
			    console.log('Error occured: ', request.status);
			  }
			};
			
			request.onerror = function() {
			  // Connection error
			  console.log('Sorry there has been a connection error.');
			};
			
			request.send();
		},
		// Render the compiled HandleBars Template.
		renderDataVisualsTemplate: function(data){
			PersonsApp.renderHandlebarsTemplate('personDetailsTemplate.handlebars', 'person-details', data);
		},
		// Render the handlebars template using AJAX.
		getTemplateAjax: function(path, callback) {
			var source, template;
		    var request = new XMLHttpRequest();
			request.open('GET', path, true);
			
			request.onload = function() {
			  if (request.status >= 200 && request.status < 400) {
			    // Success!
			    var source = request.responseText;
			    template = Handlebars.compile(source);
			    if (callback) callback(template);
			  } else {
			    // We reached our target server, but it returned an error
			    console.log('Error occured: ', request.status);
			  }
			};
			
			request.onerror = function() {
			  // Connection error
			  console.log('Sorry there has been a connection error.');
			};
			
			request.send();
		    
		},
		// Compile the handlebars template.
		renderHandlebarsTemplate: function(withTemplate,inElement,withData) {
			PersonsApp.getTemplateAjax(withTemplate, function(template) {
		        document.getElementById(inElement).innerHTML = template(withData);
		    });
		}
	}
	
	// Start the process.
    PersonsApp.retriveData();
})();