var status = 0;

function toggleButton() {
    //var myNewMemo = new Memo();
    //showMemoDetail(myNewMemo);
	
	if(status==0){
		//document.getElementById("avvia").innerHTML="FERMA";
		//document.getElementById("entrata").style.visibility = "hidden"; 
		//document.getElementById("uscita").style.visibility = "visible"; 
		//document.getElementById("avvia").class = "danger";
		document.getElementById("entrata").classList.add("hidden");
		document.getElementById("uscita").classList.remove("hidden"); 
		
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
console.log('pippo');
//	document.getElementById("uscita").innerHTML = "PLUTO";

	
//    document.getElementById("entrata").addEventListener("click", toggleButton);
//    document.getElementById("uscita").addEventListener("click", toggleButton);


    // the entry point for the app is the following command
//    refreshMemoList();
};
