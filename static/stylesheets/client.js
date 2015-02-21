

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
	xmlhttp.open("POST", "/signup", true);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	//window.alert("test2");
	    	signin(document.getElementById('email').value, pass1);
			displayView();
			//window.alert(rep.Message);
			}
	}

	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("email=" + document.getElementById('email').value + "&password=" + pass1 + "&firstname=" + document.getElementById('firstname').value + "&familyname=" + document.getElementById('familyname').value + "&gender=" + document.getElementById('gender').value + "&city=" + document.getElementById('city').value + "&country=" + document.getElementById('country').value);


};

function signin(email, password){
	var pass = document.getElementById('sipassword').value;
	var logmail = document.getElementById('siemail').value;
	if (email) {
		logmail = email;
		pass=password;
	}

	if (pass.length < 8){
		window.alert('password too short (min 8)');
		return false;
	}

	xmlhttp = new XMLHttpRequest();
	//window.alert("test");
	var rep;
	xmlhttp.open("POST", "/signin", true);
	xmlhttp.onreadystatechange=function()
	{
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
	    {
	    	rep=JSON.parse(xmlhttp.responseText);
	    	//window.alert("test2");
	    	var token = null;
			if (rep.success == true){
			token = rep.data;
			localStorage.setItem("token", JSON.stringify(token));
			displayView();
			}
			else{
				localStorage.setItem("token", JSON.stringify(token));
				displayView();
				document.getElementById('logfailed').style.display ='block';
				setTimeout(function(){document.getElementById('logfailed').style.display ='none'}, 3000);
			}
		}
	}

	xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send("email=" + logmail + "&password=" + pass);

};

function logout(){
	var tok = JSON.parse(localStorage.getItem("token"));
	localStorage.setItem("token", null);

	xmlhttp = new XMLHttpRequest();

	var rep;
	xmlhttp.open("POST", "/signout/" + tok, true);
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
		xmlhttp.open("POST", "/passchange", true);
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
		xmlhttp.send("token=" + tok + "&oldpass=" + oldpass + "&newpass=" + newpass);

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
		content = escapeHtml(content);
		//window.alert(content);
		xmlhttp.open("POST", "/postmessage", true);
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
				//window.alert(rep.Message);
				if (mail) { 
					document.getElementById('newmessonwall').value = "";
					reloadwall(1); 
				}
				else{
					document.getElementById('newmess').value = "";
					reloadwall();
				}
			}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send("token=" + tok + "&message=" + content + "&email=" + email);

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
		xmlhttp.open("GET", "/messages/" + tok + "/" + email, true);
		//window.alert("test1");
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
		    	if(rep.success){
			    	messages = rep.Data;
					messparse = JSON.parse(messages);
					var wallcontent ="";
					for (var m=0; m<messparse.length; m++)
					{
						wallcontent += "<div><h4>"+messparse[m].writer+"</h4><p>"+messparse[m].content+"</p></div></br>";
					}
					//window.alert(messparse.length);
					wall.innerHTML = wallcontent;
				}
				else {

				}
				//window.alert(rep.Message);
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
		xmlhttp.open("GET", "/messages?token=" + tok + "&t=" + Math.random(), true);
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
		    	if(rep.success){
					messages = rep.Data;
					messparse = JSON.parse(messages);
					var wallcontent ="";
					for (var m=0; m<messparse.length; m++)
					{
						wallcontent += "<div><h4>"+messparse[m].writer+"</h4><p>"+messparse[m].content+"</p></div></br>";
					}
					//window.alert(messparse.length);
					wall.innerHTML = wallcontent;
				}
				//window.alert(rep.Message);
				userinfo();
				}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(null);
	}
	return false;
};

function escapeHtml(text) {
  return text
      .replace(/&email=/g, "email=")
      .replace(/&message=/g, "message=");
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
	var wall = document.getElementById('wall');
	if (mail) 
	{
		req = ("/userdataemail/" + tok + "/" + mail);
		usrinf = document.getElementById('userwallinfo');
		wall = document.getElementById('showwall');


	}
	else {
		req = ("/userdatatoken/" + tok);
	}

	xmlhttp = new XMLHttpRequest();
		var rep;
		xmlhttp.open("GET", req, true);
		xmlhttp.onreadystatechange=function()
		{
			if (xmlhttp.readyState==4 && xmlhttp.status==200)
		    {
		    	rep=JSON.parse(xmlhttp.responseText);
				if (!rep.success) {
					wall.style.display ='none';
					//usrinf.innerHTML = "";
				}
				else{
				userdata = rep.Data;
				userparse = JSON.parse(userdata);
				var gender = "F";
				if (userparse.gender == 0) { gender = "M" };

				usrinf.innerHTML = "<div><b>Email : </b>"+userparse.email+"</div><b>Firstname : </b>"+userparse.firstname+"<div><b>Familyname : </b>"+userparse.familyname+"</div><div><b>Gender : </b>"+gender+"</div><div><b>City : </b>"+userparse.city+"</div><div><b>Country : </b>"+userparse.country+"</div>";
			
				}
				//window.alert(rep.Message);
			}
		}

		xmlhttp.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(null);


};

