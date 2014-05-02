var db;
const DB_NAME = 'MyTestDatabase';
const DB_VERSION = 1; // Use a long long for this value (don't use a float)
const DB_STORE_NAME = 'customers';
const DB_STORE_NAME1 = 'pubblications';



// This is what our customer data looks like.
const customerData = [
  { ssn: "444-44-4444", name: "Bill", age: 35, email: "bill@company.com" },
  { ssn: "555-55-5555", name: "Donna", age: 32, email: "donna@home.org" },
  { ssn: "666-66-6666", name: "Riccardo", age: 42, email: "rick@home.org" }
];

const customerDatx = [
  { ssn: "444-44-4447", name: "John", age: 35, email: "jj@company.com" },
  { ssn: "555-55-5557", name: "Mick", age: 32, email: "mi@home.org" }
];



var request = indexedDB.open(DB_NAME,DB_VERSION);

request.onerror = function(event) {
  alert("Database error: " + event.target.errorCode);
};
request.onsuccess = function(event) {
  db = request.result;
};

request.onupgradeneeded = function(event) { 
  var db = event.target.result;

  // Create an objectStore for this database
  //var objectStore = db.createObjectStore("objectStoreName", { keyPath: "myKey" });
  
  
  // Create an objectStore to hold information about our customers. We're
  // going to use "ssn" as our key path because it's guaranteed to be
  // unique.
  var objectStore = db.createObjectStore(DB_STORE_NAME, { keyPath: "ssn" });

  //****//
  // Create another object store with the autoIncrement flag set as true.    
  var objStore = db.createObjectStore(DB_STORE_NAME1, {keyPath: "id", autoIncrement: true} );
  //solo chiave valore??? DA CAPIRE
  //****//
	
	
  // Create an index to search customers by name. We may have duplicates
  // so we can't use a unique index.
  objectStore.createIndex("name", "name", { unique: false });

  // Create an index to search customers by email. We want to ensure that
  // no two customers have the same email, so use a unique index.
  objectStore.createIndex("email", "email", { unique: true });

  // Use transaction oncomplete to make sure the objectStore creation is 
  // finished before adding data into it.
  objectStore.transaction.oncomplete = function(event) {
    // Store values in the newly created objectStore.
    var customerObjectStore = db.transaction(DB_STORE_NAME, "readwrite").objectStore(DB_STORE_NAME);
    for (var i in customerData) {
      customerObjectStore.add(customerData[i]);
    }
  }
};

window.onload = function () {
  // aggiungo i listner	
  document.getElementById("btn-action").addEventListener("click", doSmthing);
  document.getElementById("btn-insert").addEventListener("click", doInsert);
}

function doSmthing(){
//out
  var objectStore = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
  objectStore.openCursor().onsuccess = function(event) {
    var cursor = event.target.result;
    if (cursor) {
      document.getElementById("out").innerHTML += "<br/>" + cursor.value.ssn + " " + cursor.value.name + " - " + cursor.value.email;
      cursor.continue();
    }
    else {
      console.log("No more entries!");
    }
  };
}


function doInsert(){

  var transaction = db.transaction([DB_STORE_NAME], "readwrite");
  // Do something when all the data is added to the database.
  transaction.oncomplete = function(event) {
    console.log("All done!");
  };
  transaction.onerror = function(event) {
    // Don't forget to handle errors!
    console.log(event);
  };
  var objectStore = transaction.objectStore(DB_STORE_NAME);
  for (var i in customerDatx) {
console.log(customerDatx[i].ssn);
    var request = objectStore.add(customerDatx[i]);
    request.onsuccess = function(event) {
    // The result of a request generated from a call to add() is the key of the value that was added.
    // event.target.result == customerData[i].ssn;
    };
  }

}



/*

///////////////  ADDING DATA  add()
// NOTA:  The first argument is a list of object stores that the transaction will span!!!!
var transaction = db.transaction([DB_STORE_NAME], "readwrite");
// Do something when all the data is added to the database.
transaction.oncomplete = function(event) {
  alert("All done!");
};
transaction.onerror = function(event) {
  // Don't forget to handle errors!
};
var objectStore = transaction.objectStore(DB_STORE_NAME);
for (var i in customerData) {
  var request = objectStore.add(customerData[i]);
  request.onsuccess = function(event) {
    // The result of a request generated from a call to add() is the key of the value that was added.
    // event.target.result == customerData[i].ssn;
  };
}

/////////////// DELETE   delete()
var request = db.transaction([DB_STORE_NAME], "readwrite")
                .objectStore(DB_STORE_NAME)
                .delete("444-44-4444");
request.onsuccess = function(event) {
  // It's gone!
};



///////////////  SELECT  get(key)  &  cursor()  & index

//  GET(Key)  
var transaction = db.transaction([DB_STORE_NAME]);
var objectStore = transaction.objectStore(DB_STORE_NAME);
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Do something with the request.result!
  alert("Name for SSN 444-44-4444 is " + request.result.name);
};
/////  SHORTEN:
db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME).get("444-44-4444").onsuccess = function(event) {
  alert("Name for SSN 444-44-4444 is " + event.target.result.name);
};



// CURSOR
var objectStore = db.transaction(DB_STORE_NAME).objectStore(DB_STORE_NAME);
objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    alert("Name for SSN " + cursor.key + " is " + cursor.value.name);
    cursor.continue();
  }
  else {
    alert("No more entries!");
  }
};
// ***********  add cursor to array:
var customers = [];
objectStore.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    customers.push(cursor.value);
    cursor.continue();
  }
  else {
    alert("Got all customers: " + customers);
  }
};






// INDEX  usare solo su indici univoci!!!  altrimenti ritorna solo la prima occorrenza trovata
var index = objectStore.index("name");
index.get("Donna").onsuccess = function(event) {
  alert("Donna's SSN is " + event.target.result.ssn);
};
// Using a normal cursor to grab whole customer record objects
index.openCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.value is the whole object.
    alert("Name: " + cursor.key + ", SSN: " + cursor.value.ssn + ", email: " + cursor.value.email);
    cursor.continue();
  }
};



// KEYCURSOR su indice : ritorna le key dell'indice cercato!!!
// Using a key cursor to grab customer record object keys
index.openKeyCursor().onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // cursor.key is a name, like "Bill", and cursor.value is the SSN.
    // No way to directly get the rest of the stored object.
    alert("Name: " + cursor.key + ", SSN: " + cursor.value);
    cursor.continue();
  }
};




//  CURSOR    -  SPECIFYING THE RANGE AND DIRECTION OF CURSORS
// Only match "Donna"
var singleKeyRange = IDBKeyRange.only("Donna");

// Match anything past "Bill", including "Bill"
var lowerBoundKeyRange = IDBKeyRange.lowerBound("Bill");

// Match anything past "Bill", but don't include "Bill"
var lowerBoundOpenKeyRange = IDBKeyRange.lowerBound("Bill", true);

// Match anything up to, but not including, "Donna"
var upperBoundOpenKeyRange = IDBKeyRange.upperBound("Donna", true);

// Match anything between "Bill" and "Donna", but not including "Donna"
var boundKeyRange = IDBKeyRange.bound("Bill", "Donna", false, true);

// To use one of the key ranges, pass it in as the first argument of openCursor()/openKeyCursor()
index.openCursor(boundKeyRange).onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the matches.
    cursor.continue();
  }
};

objectStore.openCursor(boundKeyRange, "prev").onsuccess = function(event) {
  var cursor = event.target.result;
  if (cursor) {
    // Do something with the entries.
    cursor.continue();
  }
};







/////////////////////////////  UPDATE  put(data)
var objectStore = db.transaction([DB_STORE_NAME], "readwrite").objectStore(DB_STORE_NAME);
var request = objectStore.get("444-44-4444");
request.onerror = function(event) {
  // Handle errors!
};
request.onsuccess = function(event) {
  // Get the old value that we want to update
  var data = request.result;
  
  // update the value(s) in the object that you want to change
  data.age = 42;

  // Put this updated object back into the database.
  var requestUpdate = objectStore.put(data);
   requestUpdate.onerror = function(event) {
     // Do something with the error
   };
   requestUpdate.onsuccess = function(event) {
     // Success - the data is updated!
   };
};

*/


