

displayView = function()
{
	// The code required to display a view.
	var tok = JSON.parse(localStorage.getItem("token"));
	var div = document.getElementById('nonlogview');
	var elem = document.getElementById('notlogview');
	if (tok != null){
		elem = document.getElementById('logview');
	}
	div.innerHTML = elem.innerHTML;
	if (tok != null){
		tabdisplay(1);
	}
};

window.onload = function()
{
	displayView();
};

function signup(){
	
	var pass1 = document.getElementById('password').value;
	var pass2 = document.getElementById('repeat_password').value;

	if (pass1 != pass2){
		window.alert('different passwords');
		return false;
	}

	if (pass1.length < 8){
		window.alert('password too short (min 8)');
		return false;
	}

	
	xmlhttp = new XMLHttpRequest();
	window.alert("test");
	var rep;
	xmlhttp.open("POST", "/signup/" + document.getElementById('email').value + "/" + pass1 + "/" + document.getElementById('firstname').value + "/" + document.getElementById('familyname').value + "/" + document.getElementById('gender').value + "/" + document.getElementById('city').value + "/" + document.getElementById('country').value, false);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	window.alert("test2");
			displayView();
			window.alert(rep.Message);
			}
	}

	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(null);


};

function signin(){
	var pass = document.getElementById('sipassword').value;

	if (pass.length < 8){
		window.alert('password too short (min 8)');
		return false;
	}

	xmlhttp = new XMLHttpRequest();
	window.alert("test");
	var rep;
	xmlhttp.open("POST", "/signin/" + document.getElementById('siemail').value + "/" + pass, false);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	window.alert("test2");
	    	var token = null;
			if (rep.success == true){
			token = rep.data;
			}
			localStorage.setItem("token", JSON.stringify(token));
			displayView();
			window.alert(rep.Message);
			}
	}

	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(null);

};

function logout(){
	var tok = JSON.parse(localStorage.getItem("token"));
	localStorage.setItem("token", null);

	xmlhttp = new XMLHttpRequest();

	var rep;
	xmlhttp.open("POST", "/signout/" + tok, false);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	window.alert("test2");
			displayView();
			window.alert(rep.Message);
			}
	}

	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(null);
	return true;
};

function tabdisplay(id){

	switch(id){
		case 1 : 

			document.getElementById('browse').style.display ='none';
			document.getElementById('account').style.display ='none';
			var tok = JSON.parse(localStorage.getItem("token"));
			var res = serverstub.getUserDataByToken(tok);
			var usr = res.data;
			var usrinf = document.getElementById('userinfo');

			usrinf.innerHTML = "<div>Email : "+usr.email+"</div><b>Firstname : "+usr.firstname+"</b><div>Familyname : "+usr.familyname+"</div><div>Gender : "+usr.gender+"</div><div>City : "+usr.city+"</div><div>Country : "+usr.country+"</div>";
			
			reloadwall();

			document.getElementById('home').style.display='block';
			break;
		case 2 : 
			document.getElementById('home').style.display ='none';
			document.getElementById('account').style.display ='none';
			document.getElementById('browse').style.display='block';
			document.getElementById('showwall').style.display ='none';
			break;
		case 3 : 
			document.getElementById('browse').style.display ='none';
			document.getElementById('home').style.display ='none';
			document.getElementById('account').style.display='block';
			break;
		default:
			document.getElementById('browse').style.display ='none';
			document.getElementById('account').style.display ='none';
			document.getElementById('home').style.display='none';
			break;
	}

	return true;

};


function changepass()
{

	var tok = JSON.parse(localStorage.getItem("token"));
	var oldpass = document.getElementById('oldpwd').value;
	var newpass = document.getElementById('newpwd').value;

	if (newpass.length < 8){
		window.alert('password too short (min 8)');
		return false;
	}

	var res = serverstub.changePassword(tok, oldpass, newpass);

	window.alert(res.message);

};


function postmess(mail)
{
	var tok = JSON.parse(localStorage.getItem("token"));
	var content = document.getElementById('newmess').value;
	var res;
	if (mail) 
	{
		content = document.getElementById('newmessonwall').value;
		var email = JSON.parse(localStorage.getItem("usrmail"));
		res = serverstub.postMessage(tok, content, email);

	} else res = serverstub.postMessage(tok, content, null);

	window.alert(res.message);

};

function reloadwall(type)
{
	var tok = JSON.parse(localStorage.getItem("token"));
	var messages;
	window.alert("test1");
	var wall = document.getElementById('wall');
	if (type) { 
		wall=document.getElementById('wallb');
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
				messages=rep.data;
				var wallcontent ="";
				for (var m=0; m<messages.length; m++)
				{
					wallcontent += "<div><h4>"+messages[m].writer+"</h4><p>"+messages[m].content+"</p></div></br>";
				}
				wall.innerHTML = wallcontent;	
				window.alert(rep.Message);
				}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(null);

	}
	else
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
				messages = rep.data;
				var wallcontent ="";
				for (var m=0; m<messages.length; m++)
				{
					wallcontent += "<div><h4>"+messages[m].writer+"</h4><p>"+messages[m].content+"</p></div></br>";
				}
				wall.innerHTML = wallcontent;
				window.alert(rep.Message);
				}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(null);
	}
	
};


function finduser()
{

	var tok = JSON.parse(localStorage.getItem("token"));
	var mail = document.getElementById('usermail').value;

	document.getElementById('showwall').style.display ='block';

	var messages = serverstub.getUserMessagesByEmail(tok, mail).data;
	var wallb = document.getElementById('wallb');

	var res = serverstub.getUserDataByEmail(tok, mail);
			var usr = res.data;
			var usrinf = document.getElementById('userwallinfo');

			usrinf.innerHTML = "<div>Email : "+usr.email+"</div><b>Firstname : "+usr.firstname+"</b><div>Familyname : "+usr.familyname+"</div><div>Gender : "+usr.gender+"</div><div>City : "+usr.city+"</div><div>Country : "+usr.country+"</div>";
			

	var wallcontent ="";
		for (var m=0; m<messages.length; m++)
		{
			wallcontent += "<div><h4>"+messages[m].writer+"</h4><p>"+messages[m].content+"</p></div></br>";
		};
		wallb.innerHTML = wallcontent;
		localStorage.setItem("usrmail", JSON.stringify(mail));
		return false;
};


