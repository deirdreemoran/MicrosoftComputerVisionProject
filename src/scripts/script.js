  document.addEventListener('DOMContentLoaded', bindButtons);
      function bindButtons(){
        document.getElementById('qSubmit').addEventListener('click', function(event){
          var req = new XMLHttpRequest();
          var payload = {url: null};
          payload.url = document.getElementById('url').value;
          document.getElementById("myimg").src = payload.url;
          req.open("POST", "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories,Tags,Description,Faces,ImageType,Color,Adult&details=Celebrities&language=en", true);
		req.setRequestHeader('Content-Type', 'application/json');
		  req.setRequestHeader('Ocp-Apim-Subscription-Key', '6e12c5f8dfe44e9d954490e5d5d4c009');
		  req.addEventListener('load',function(){
		      	if(req.status >= 200 && req.status < 400){
	      	   	    var response = JSON.parse(req.responseText);
					for(prop in response.adult){
						  var li = document.createElement("li");
						  li.textContent = prop + ": " + response.adult[prop];
						  var ul = document.getElementById("mylist");
						  ul.appendChild(li);
					}
					for(prop in response.color){
						  var li = document.createElement("li");
						  li.textContent = prop + ": " + response.color[prop];
						  var ul = document.getElementById("mylist");
						  ul.appendChild(li);
					}

					for(prop in response.description.captions["0"].confidence){
							  var li = document.createElement("li");
							  li.textContent = prop + ": " + response.description.captions["0"].confidence[prop];
							  var ul = document.getElementById("mylist");
							  ul.appendChild(li);
					}
					for(prop in response.color){
						 var li = document.createElement("li");
						 li.textContent = prop + ": " + response.color[prop];
						 var ul = document.getElementById("mylist");
						 ul.appendChild(li);
					}
 
					var con = response.description.captions["0"].confidence;
					var tex = response.description.captions["0"].text;
					var li = document.createElement("li");
					li.textContent = "text" + ": " + [tex];
					var ul = document.getElementById("mylist");
					ul.appendChild(li);
					var li = document.createElement("li");
					li.textContent = "confidence" + ": " + [con];
					var ul = document.getElementById("mylist");
					ul.appendChild(li);

					var ul = document.createElement("ul");
					ul.textContent = "tags";

					for (var i = 0; i < response.description.tags.length; i++){
						var li = document.createElement("li");
						li.textContent = response.description.tags[i];
						ul.appendChild(li);
						}

						var big = document.getElementById("mylist");
						big.appendChild(ul);
					for(prop in response.metaData){
						  var li = document.createElement("li");
						  li.textContent = prop + ": " + response.metaData[prop];
						  var ul = document.getElementById("mylist");
						  ul.appendChild(li);
					}
					for(prop in response.imageType){
						var li = document.createElement("li");
					    li.textContent = prop + ": " + response.imageType[prop];
						var ul = document.getElementById("mylist");
						ul.appendChild(li);
					}

					for (var j = 0; j < response.categories.length; j++){
					  for(prop in response.categories[j]){
						var li = document.createElement("li");
					    li.textContent = prop + ": " + response.categories[j][prop];
						var ul = document.getElementById("mylist");
						ul.appendChild(li);
					}}
					for (var j = 0; j < response.faces.length; j++){
					  for(prop in response.faces[j]){
						var li = document.createElement("li");
					    li.textContent = prop + ": " + response.faces[j][prop];
						var ul = document.getElementById("mylist");
						ul.appendChild(li);

					}}
					for (var j = 0; j < response.tags.length; j++){
					  for(prop in response.tags[j]){
						var li = document.createElement("li");
					    li.textContent = prop + ": " + response.tags[j][prop];
						var ul = document.getElementById("mylist");
						ul.appendChild(li);
					}}
				}
				if(req.status == 400){
					var response = JSON.parse(req.responseText);
            		console.log(response.code + " " + response.message);
			    }
			  	if (req.status == 415){
					var response = JSON.parse(req.responseText);
            		console.log(response.code + " " + response.message);
			  	}
				if(req.status == 500){
					var response = JSON.parse(req.responseText);
					console.log(response.code + " " + response.message);
				}
		   });
           req.send(JSON.stringify(payload));
           event.preventDefault();
         });
       }
