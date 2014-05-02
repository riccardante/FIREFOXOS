var username="";
var divs = ["splash","menu", "signin", "signup", "dashboard", "request", "communication", "aboutApp","drawer-controller-hide","drawer-controller-show"];
//"drawer-controller",







const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" }
];

var request = indexedDB.open("MyTestDatabase",1);
var db;

request.onerror = function(event) {
    document.getElementById("test").innerHTML = "ERRORE APERTURA DB!";
    console.log("error");
};
request.onsuccess = function (evt) {
      db = this.result;
      console.log("openDb DONE");
console.log(db);
};

request.onupgradeneeded = function(event) {
  var db = event.target.result;

  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique.
  var objectStore = db.createObjectStore("customers", { keyPath: "ssn" });

  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Store values in the newly created objectStore.
  for (var i in customerData) {
    objectStore.add(customerData[i]);
  }
};



/*
//GETTING DATA
var transaction = db.transaction(["customers"]);
var objectStore = transaction.objectStore("customers");
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Do something with the request.result!
  alert("Name for SSN 444-44-4444 is " + request.result.name);
};
*/







/*
  const DB_NAME = 'mdn-demo-indexeddb-epublications';
  const DB_VERSION = 1; // Use a long long for this value (don't use a float)
  const DB_STORE_NAME = 'publications';

  var db;

  // Used to keep track of which view is displayed to avoid to uselessly reload it
  var current_view_pub_key;

  function openDb() {
    console.log("openDb ...");
    var req = indexedDB.open(DB_NAME, DB_VERSION);
    req.onsuccess = function (evt) {
      // Better use "this" than "req" to get the result to avoid problems with
      // garbage collection.
      // db = req.result;
      db = this.result;
      console.log("openDb DONE");
    };
    req.onerror = function (evt) {
      console.error("openDb:", evt.target.errorCode);
    };

    req.onupgradeneeded = function (evt) {
      console.log("openDb.onupgradeneeded");
      var store = evt.currentTarget.result.createObjectStore(
        DB_STORE_NAME, { keyPath: 'id', autoIncrement: true });

      store.createIndex('biblioid', 'biblioid', { unique: true });
      store.createIndex('title', 'title', { unique: false });
      store.createIndex('year', 'year', { unique: false });
    };
  }

*/




function hideAll(){
  for(i=0;i<divs.length;i++){
    document.getElementById(divs[i]).style.display = "none";    
  }
}

function showDrawerController(){
  document.getElementById("drawer-controller-hide").style.display = "block";
  document.getElementById("drawer-controller-show").style.display = "block";
  document.getElementById("menu").style.display = "block";
}

function startApp(){
  hideAll();
  if(username == ""){
    //document.getElementById("splash").style.display = "block";
    showRequests();
  }else{
      // do something if logged in
  }
}





function showSignIn(){
  hideAll();
  document.getElementById("signin").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Sign In";
}

function showSignUp(){
  hideAll();
  document.getElementById("signup").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Sign Up";
}

function showAbout(){

// USE CURSOR
var objectStore = db.transaction("customers").objectStore("customers");
objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    //alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
    document.getElementById("test").innerHTML += "<li>"+cursor.value.name+"</li>"
    cursor.continue();
  }
  else {
    alert("No more entries!");
  }
};

  hideAll();
  showDrawerController();
  document.getElementById("aboutApp").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - About";
}

function doLogoff(){
  hideAll();
  document.getElementById("splash").style.display = "block";
  document.getElementById("addtitle").innerHTML="";
}

function doSignIn(){
  hideAll();
  showDrawerController();
  username= document.getElementById("signin-username").value;
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Dashboard";
  document.getElementById("menu").style.display = "block";
  document.getElementById("menuUsername").innerHTML=username;

}

function showCommunication(){
  hideAll();
  showDrawerController();
  document.getElementById("communication").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Messages";
}

function showRequests(){
  hideAll();
  showDrawerController();
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Dashboard";
}


function showRequestDetail(){
  hideAll();
  showDrawerController();
  document.getElementById("request").style.display = "block";
  document.getElementById("addtitle").innerHTML=" - Detail";
}


window.onload = function () {
  // aggiungo i listner	
  document.getElementById("bSignIn").addEventListener("click", showSignIn);
  document.getElementById("bSignUp").addEventListener("click", showSignUp);
  document.getElementById("btn-LogOff").addEventListener("click", doLogoff);
  document.getElementById("bFormSignIn").addEventListener("click", doSignIn);
  document.getElementById("btn-About").addEventListener("click", showAbout);
  document.getElementById("btn-showNotifications").addEventListener("click", showCommunication);
  document.getElementById("btn-showRequests").addEventListener("click", showRequests);






 
  startApp();



};


