var req = new Object();

req.signIn = function(email, password)
{
	xmlhttp = new XMLHttpRequest();
	window.alert("test");
	var rep;
	xmlhttp.open("POST", "/signin/" + email + "/" + password, true);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	window.alert("test2");
	    	return rep;
	    }
	}

	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(null);

};

req.getUserMessagesByToken = function(token)
{
	xmlhttp = new XMLHttpRequest();
	var rep;
	xmlhttp.open("GET", "/messages/" + token, false);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	window.alert("test2");
			displayView();
			return rep;
			window.alert(rep.Message);
			}
	}

	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(null);
};

req.getUserMessagesByEmail = function(token, email)
{
	xmlhttp = new XMLHttpRequest();
	var rep;
	xmlhttp.open("GET", "/messages/" + token + "/" + email, false);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	window.alert("test2");
			displayView();
			return rep;
			window.alert(rep.Message);
			}
	}

	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(null);
};