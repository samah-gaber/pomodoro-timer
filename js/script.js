(function(){
	var person={
		workTime: 0,
		breakTime: 0,
		workTimeInterval: null,
		breakTimeInterval: null
	}
	// Person Methods
	person.onWorkStart=function(){
		startWork.setAttribute("disabled", true);
		breakTime.removeAttribute("disabled");
		endWork.removeAttribute("disabled");
		document.getElementById("workMsgCont").style.display="none";
		person.workTimeInterval = setInterval(function(){
			startWorkTimer();
		},1000);
	}
	person.onBreak=function(){
		breakTime.setAttribute("disabled", true);
		resumeWork.removeAttribute("disabled");
		clearInterval(person.workTimeInterval);
		person.breakTimeInterval=setInterval(function(){
			startBreakTimer();
		}, 1000);
	}
	person.onResume=function(){
		resumeWork.setAttribute("disabled", true);
		breakTime.removeAttribute("disabled");
		clearInterval(person.breakTimeInterval);
		person.workTimeInterval = setInterval(function(){
			startWorkTimer();
		},1000);
	}
	person.onEndWork=function(){
		endWork.setAttribute("disabled", true);
		resumeWork.setAttribute("disabled", true);
		breakTime.setAttribute("disabled", true);
		startWork.removeAttribute("disabled");
		clearInterval(person.workTimeInterval);
		clearInterval(person.breakTimeInterval);
		document.getElementById("finalMsgCont").style.display="block";
		document.getElementById("finalMsg").innerHTML="Today, you have worked "+document.getElementById("workTimer").innerHTML+" And you took a break for "+document.getElementById("breakTimer").innerHTML+" Good job !!";
		person.workTime=person.breakTime=0;
		displayTime("workTimer",0,0);
		displayTime("breakTimer",0,0);
	}
	function onGoBackWorkBtn() {
		document.getElementById("workMsgCont").style.display="none";
		person.workTimeInterval = setInterval(function(){
			startWorkTimer();
		},1000);
	}
	function onEndWorkBtn() {
		document.getElementById("workMsgCont").style.display="none";
		person.onEndWork();
	}
	function onEndBreak() {
		document.getElementById("breakMsgCont").style.display="none";
		person.onResume();
	}
	function onFinalBtn() {
		window.location.reload();
	}
	// Selectors
	var startWork=document.getElementById("startWork");
	var breakTime=document.getElementById("breakTime");
	var resumeWork=document.getElementById("resumeWork");
	var endWork=document.getElementById("endWork");
	var goBackWorkBtn=document.getElementById("goBackWorkBtn");
	var endWorkBtn=document.getElementById("endWorkBtn");
	var endBreak=document.getElementById("endBreak");
	var finalBtn=document.getElementById("finalBtn");
	// Event Listeners
	startWork.addEventListener("click", function(){
		person.onWorkStart();
	});
	breakTime.addEventListener("click", function(){
		person.onBreak();
	});
	resumeWork.addEventListener("click", function(){
		person.onResume();
	});
	endWork.addEventListener("click", function(){
		person.onEndWork();
	});
	goBackWorkBtn.addEventListener("click", onGoBackWorkBtn);
	endWorkBtn.addEventListener("click", onEndWorkBtn);
	endBreak.addEventListener("click", onEndBreak);
	finalBtn.addEventListener("click", onFinalBtn);
	// SetIntervals
	function startWorkTimer(){
		if(person.workTime%120==0 && person.workTime>0){
			clearInterval(person.workTimeInterval);
			document.getElementById("workMsgCont").style.display="block";
		}
		person.workTime += 1;
		formatTime("workTimer", person.workTime);
	}
	function startBreakTimer(){
		if(person.breakTime>=60){
			clearInterval(person.breakTimeInterval);
			document.getElementById("breakMsgCont").style.display="block";
		}
		person.breakTime += 1;
		formatTime("breakTimer", person.breakTime);
	}
	// Time format
	function formatTime(elt, time){
		var mins=Math.floor(time/60);
		var secs=Math.floor(time%60);
		mins = mins < 10 ? "0" + mins : mins;
		secs = secs < 10 ? "0" + secs : secs;
		displayTime(elt, mins, secs);
	}
	function displayTime(elt, mins, secs){
		document.getElementById(elt).innerHTML =mins+" : "+secs;
	}
})();