

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
	//window.alert("test");
	var rep;
	xmlhttp.open("POST", "/signup/" + document.getElementById('email').value + "/" + pass1 + "/" + document.getElementById('firstname').value + "/" + document.getElementById('familyname').value + "/" + document.getElementById('gender').value + "/" + document.getElementById('city').value + "/" + document.getElementById('country').value, false);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	//window.alert("test2");
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
	//window.alert("test");
	var rep;
	xmlhttp.open("POST", "/signin/" + document.getElementById('siemail').value + "/" + pass, false);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	//window.alert("test2");
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
	    	//window.alert("test2");
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
			userinfo();
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

	xmlhttp = new XMLHttpRequest();
		var rep;
		xmlhttp.open("POST", "/passchange/" + tok + "/" + oldpass + "/" + newpass, false);
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
				window.alert(rep.Message);
			}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(null);

	return false;
};


function postmess(mail)
{
	var tok = JSON.parse(localStorage.getItem("token"));
	var content = document.getElementById('newmess').value;
	var res;
	var email = "himself";
	if (mail) 
	{
		email = JSON.parse(localStorage.getItem("usrmail"));
		content = document.getElementById('newmessonwall').value;
	}

		xmlhttp = new XMLHttpRequest();
		var rep;
		xmlhttp.open("POST", "/postmessage/" + tok + "/" + content + "/" + email, false);
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
				window.alert(rep.Message);
				if (mail) { reloadwall(1); };
			}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(null);

};

function reloadwall(type)
{
	var tok = JSON.parse(localStorage.getItem("token"));
	var messages;
	var wall = document.getElementById('wall');
	if (type) { 
		wall=document.getElementById('wallb');
		var email = JSON.parse(localStorage.getItem("usrmail"));
		xmlhttp = new XMLHttpRequest();
		var rep;
		//window.alert(email);
		xmlhttp.open("GET", "/messages/" + tok + "/" + email, false);
		//window.alert("test1");
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
		    	messages = rep.Data;
				messparse = JSON.parse(messages);
				var wallcontent ="";
				for (var m=0; m<messparse.length; m++)
				{
					wallcontent += "<div><h4>"+messparse[m].writer+"</h4><p>"+messparse[m].content+"</p></div></br>";
				}
				//window.alert(messparse.length);
				wall.innerHTML = wallcontent;	
				window.alert(rep.Message);
				userinfo(email);
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
		xmlhttp.open("GET", "/messages/" + tok, false);
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
				messages = rep.Data;
				messparse = JSON.parse(messages);
				var wallcontent ="";
				for (var m=0; m<messparse.length; m++)
				{
					wallcontent += "<div><h4>"+messparse[m].writer+"</h4><p>"+messparse[m].content+"</p></div></br>";
				}
				//window.alert(messparse.length);
				wall.innerHTML = wallcontent;
				window.alert(rep.Message);
				userinfo();
				}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(null);
	}
	return false;
};


function finduser()
{

	var tok = JSON.parse(localStorage.getItem("token"));
	var mail = document.getElementById('usermail').value;
	localStorage.setItem("usrmail", JSON.stringify(mail));
	document.getElementById('showwall').style.display ='block';
	reloadwall(1);
	
	return false;
};


function userinfo(mail)
{
	var tok = JSON.parse(localStorage.getItem("token"));
	var req ="";
	var usrinf = document.getElementById('userinfo');
	if (mail) 
	{
		req = ("/userdataemail/" + tok + "/" + mail);
		usrinf = document.getElementById('userwallinfo');

	}
	else {
		req = ("/userdatatoken/" + tok);
	}

	xmlhttp = new XMLHttpRequest();
		var rep;
		xmlhttp.open("GET", req, false);
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
		    	userdata = rep.Data;
				userparse = JSON.parse(userdata);

				usrinf.innerHTML = "<div>Email : "+userparse.email+"</div><b>Firstname : "+userparse.firstname+"</b><div>Familyname : "+userparse.familyname+"</div><div>Gender : "+userparse.gender+"</div><div>City : "+userparse.city+"</div><div>Country : "+userparse.country+"</div>";
			
				window.alert(rep.Message);
			}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(null);


};

