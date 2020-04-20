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

/* --Contact form-- */
JotForm.init(function(){
if (window.JotForm && JotForm.accessible) $('input_4').setAttribute('tabindex',0);
      setTimeout(function() {
          $('input_6').hint('ex: myname@example.com');
       }, 20);
	JotForm.newDefaultTheme = false;
	JotForm.clearFieldOnHide="disable";
    /*INIT-END*/
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