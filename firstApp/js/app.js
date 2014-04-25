var giorno = 0;

var d = new Date();
var giornoDellaSettimana = d.getDay();
var oAnno=d.getFullYear();
var oWeek=getWeekNumber(d) [1];

var weekday=new Array(7);
weekday[0]="Dom";
weekday[1]="Lun";
weekday[2]="Mar";
weekday[3]="Mer";
weekday[4]="Gio";
weekday[5]="Ven";
weekday[6]="Sab";


function getWeekNumber(d) {
    // Copy date so don't modify original
    d = new Date(+d);
    d.setHours(0,0,0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setDate(d.getDate() + 4 - (d.getDay()||7));
    // Get first day of year
    var yearStart = new Date(d.getFullYear(),0,1);
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7)
    // Return array of year and week number
    return [d.getFullYear(), weekNo];
}



function updateDebug(){
    var appo=1398458600102
    var e = new Date();

    var dopo = e.getTime();
    var minuti = Math.round((dopo-appo)/(1000*60));
    minutiStr="00:" + minuti;
    if(minuti<10)
    minutiStr = "00:0"+minuti;
    if(minuti>59)
    minutiStr = Math.round(minuti/60)+":"+(minuti-60);
    document.getElementById("debug").innerHTML =  minutiStr + " " + weekday[giornoDellaSettimana] +" "+getWeekNumber(d)[1]+"/"+getWeekNumber(d)[0];
}




function newGiornata() {
    var myNewGiornata = new Giornata();
//    showMemoDetail(myNewMemo);
}


var status = 0;

function entrata(){
  document.getElementById("sEntrata").style.display = "none";
  document.getElementById("sUscita").style.display = "block";
}


function uscita(){
  document.getElementById("sEntrata").style.display = "block";
  document.getElementById("sUscita").style.display = "none";
updateDebug();
}

function configura(){
  document.getElementById("sEntrata").style.display = "none";
  document.getElementById("sUscita").style.display = "none";
  document.getElementById("sConfig").style.display = "block";
}

function showFunction(){
  document.getElementById("sConfig").style.display = "none";
  document.getElementById("sEntrata").style.display = "none";
  document.getElementById("sUscita").style.display = "none";

  if(1==1){
    document.getElementById("sEntrata").style.display = "block";
  }

}



function toggleButton() {
    //var myNewMemo = new Memo();
    //showMemoDetail(myNewMemo);
	
	if(status==0){
		//document.getElementById("avvia").innerHTML="FERMA";
		//document.getElementById("entrata").style.visibility = "hidden"; 
		//document.getElementById("uscita").style.visibility = "visible"; 
		//document.getElementById("avvia").class = "danger";
		//   document.getElementById("entrata").classList.add("hidden");
		//   document.getElementById("uscita").classList.remove("hidden"); 
		
		status = 1;
	}else{
		//document.getElementById("avvia").innerHTML="AVVIA";
		//document.getElementById("entrata").style.visibility = "visible"; 
		//document.getElementById("uscita").style.visibility = "hidden"; 
		
		status = 0;
	}
}



window.onload = function () {
  //nascondo tutte le section
  document.getElementById("sEntrata").style.display = "none";
  document.getElementById("sUscita").style.display = "none";
  document.getElementById("sConfig").style.display = "none";

  if(1==1){
    document.getElementById("sEntrata").style.display = "block";
  }

    // elements that we're going to reuse in the code
/*
    listView = document.getElementById("memo-list");
    detailView = document.getElementById("memo-detail");
    deleteMemoDialog = document.getElementById("delete-memo-dialog");

    // All the listeners for the interface buttons and for the input changes
    document.getElementById("back-to-list").addEventListener("click", showMemoList);
    document.getElementById("new-memo").addEventListener("click", newMemo);
    document.getElementById("share-memo").addEventListener("click", shareMemo);
    document.getElementById("delete-memo").addEventListener("click", requestDeleteConfirmation);
    document.getElementById("confirm-delete-action").addEventListener("click", deleteCurrentMemo);
    document.getElementById("cancel-delete-action").addEventListener("click", closeDeleteMemoDialog);
    document.getElementById("memo-content").addEventListener("input", textChanged);
    document.getElementById("memo-title").addEventListener("input", textChanged);
*/
	//document.getElementById("uscita").style.visibility = "hidden"; 
//	document.getElementById("uscita").innerHTML = "pippo";
//	document.getElementById("sConfig").classList.add("hidden")
//	document.getElementById("uscita").innerHTML = "PLUTO";

	
    document.getElementById("bEntrata").addEventListener("click", entrata);
    document.getElementById("bUscita").addEventListener("click", uscita);
    document.getElementById("bConfiguraE").addEventListener("click",configura);
    document.getElementById("bConfiguraU").addEventListener("click",configura);
    document.getElementById("bConfigClose").addEventListener("click",showFunction);


updateDebug();


    // the entry point for the app is the following command
//    refreshMemoList();
};
