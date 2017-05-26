

var getData = function (selector,eventName,url) {	
	elems = document.querySelectorAll(selector) ; 
	if ( !elems.length ) return; 
	elems.forEach( function(currentValue) {
		currentValue.addEventListener(eventName, function (event)  {
			event.preventDefault();
			event.stopPropagation();
			var xhttp = new XMLHttpRequest();
			xhttp.onreadystatechange = function () {
				if (this.readyState == 4 && this.status == 200) {
					var container = document.querySelector('main');
					if ( container == null ) {
						container = document.createElement("main"); 
						container.className = 'main';
						document.querySelector(".page__inner").appendChild(container); 
					}
					container.innerHTML = this.responseText; 
					getData ('a[itemprop="url"]','click',function(elem){
						return '/api/items/' + elem.href.substr(elem.href.lastIndexOf('/')+1) ; 
					});
				}
			}

			xhttp.open("GET", url(currentValue), true);
			xhttp.setRequestHeader("Content-type", "text/html");
			xhttp.send();
			return false;
		});
	});
}

getData ('.search-form','submit',function(elem){ 
	return '/api/items?q=' + elem.elements[0].value;
});	

getData ('a[itemprop="url"]','click',function(elem){
	return '/api/items/' + elem.href.substr(elem.href.lastIndexOf('/')+1) ; 
});

