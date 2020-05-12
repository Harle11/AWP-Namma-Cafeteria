function openNav() {
  document.getElementById("mySidenav").style.width = "20%";
  document.getElementById("main").style.marginLeft = "20%";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
}

function toMenu() {
  window.location.href = "menu.html";
}

function toPayments() {
  window.location.href = "payments.html";
}

/* --Login and register pages-- */
var check = function() {
  if ((document.getElementById('pass').value).length < 6) {
    document.getElementById('submit').disabled = true;
    document.getElementById('firstpass').style.color = 'red';
    document.getElementById('firstpass').innerHTML = 'Password size less than 6';
  } else {
    document.getElementById('submit').disabled = false;
    document.getElementById('firstpass').style.color = 'green';
    document.getElementById('firstpass').innerHTML = 'Password accepted';
  }
  if (document.getElementById('pass').value == document.getElementById('conpass').value) {
    document.getElementById('confirmpass').style.color = 'green';
    document.getElementById('confirmpass').innerHTML = 'Passwords matching';
    document.getElementById('submit').disabled = false;
  } else {
    document.getElementById('confirmpass').style.color = 'red';
    document.getElementById('confirmpass').innerHTML = 'not matching';
    document.getElementById('submit').disabled = true;
  }
  if (document.getElementById('pass').value==''){
    document.getElementById('firstpass').innerHTML = '';
    document.getElementById('confirmpass').innerHTML = '';
    document.getElementById('submit').disabled = true;
  }
}

/* --Contact form-- 

JotForm.init(function(){
if (window.JotForm && JotForm.accessible) $('input_4').setAttribute('tabindex',0);
      setTimeout(function() {
          $('input_6').hint('ex: myname@example.com');
       }, 20);
	JotForm.newDefaultTheme = false;
	JotForm.clearFieldOnHide="disable";
    /*INIT-END
	});

   JotForm.prepareCalculationsOnTheFly([null,{"name":"clickTo","qid":"1","text":"Feedback Form","type":"control_head"},
   {"name":"submitForm","qid":"2","text":"Submit Feedback","type":"control_button"},
   {"name":"feedbackType","qid":"3","text":"Feedback Type","type":"control_radio"},
   {"name":"describeFeedback","qid":"4","text":"Describe Feedback:","type":"control_textarea"},null,
   {"name":"email6","qid":"6","text":"E-mail","type":"control_email"},null,{"name":"name","qid":"8","text":"Name","type":"control_fullname"}]);
   setTimeout(function() {
JotForm.paymentExtrasOnTheFly([null,{"name":"clickTo","qid":"1","text":"Feedback Form","type":"control_head"},
{"name":"submitForm","qid":"2","text":"Submit Feedback","type":"control_button"},
{"name":"feedbackType","qid":"3","text":"Feedback Type","type":"control_radio"},
{"name":"describeFeedback","qid":"4","text":"Describe Feedback:","type":"control_textarea"},null,
{"name":"email6","qid":"6","text":"E-mail","type":"control_email"},null,{"name":"name","qid":"8","text":"Name","type":"control_fullname"}]);}, 20);
*/