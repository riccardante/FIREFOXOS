/**
modello applicazione riccardante
*/

var dbName = "registraorari";
var dbVersion = 1;

var db;
var request = indexedDB.open(dbName, dbVersion);

request.onerror = function (event) {
    console.error("Can't open indexedDB!!!", event);
};
request.onsuccess = function (event) {
    console.log("Database opened ok");
    db = event.target.result;
};


// This event is only implemented in recent browsers
request.onupgradeneeded = function(event) { 
  console.log("Running onUpgradeNeeded");

  var db = event.target.result;

  if (!db.objectStoreNames.contains("registraorari")) {

        console.log("Creating objectStore for registraorari");

        var objectStore = db.createObjectStore("registraorari", {
            keyPath: "id",
            autoIncrement: true
        });
        objectStore.createIndex("title", "title", {
            unique: false
        });

        console.log("Adding sample memo");
        var sampleMemo1 = new Memo();
        sampleMemo1.title = "Welcome Memo";
        sampleMemo1.content = "This is a note taking app. Use the plus sign in the topleft corner of the main screen to add a new memo. Click a memo to edit it. All your changes are automatically saved.";

        objectStore.add(sampleMemo1);
    }
};
/*
  // Create an objectStore for this database
  var objectStore = db.createObjectStore("name", { keyPath: "myKey" });
};
*/


/**
 * This memo function is used to create new giornate.
 * @constructor
 */
function Giornata() {
    this.year = 0;
    this.week = 0;
    this.entrata = 0;
    this.pausai = 0;
    this.pausaf = 0;
    this.uscita = 0;
    this.lavorativo = 0;
}

/**
 * This memo function is used to create new giornate.
 * @constructor
 */
function Settimana() {
    this.year = 0;
    this.week = 0;
    this.towork = 0;
    this.worked = 0;
}


/**
 * This memo function is used to create new giornate.
 * @constructor
 */
function Config() {
    this.lun = 0;
    this.mar = 0;
    this.mer = 0;
    this.gio = 0;
    this.ven = 0;
    this.sab = 0;
    this.dom = 0;
    this.pmin = 0;
    this.pmax = 0;
}


/**
 * This function is used to save a memo into the indexedDB database. It is called
 * on the 'change' event of the text inputs, so it is very aggressive. The idea behind
 * this is that the user never needs to save a memo for it is always in the saved state.
 * @param inGiornata
 * @param inCallback
 */
function saveGiornata(inGiornata, inCallback) {
    var transaction = db.transaction(["memos"], "readwrite");
    console.log("Saving memo");

    transaction.oncomplete = function (event) {
        console.log("All done");
    };

    transaction.onerror = function (event) {
        console.error("Error saving memo:", event);
        inCallback({
            error: event
        }, null);

    };

    var objectStore = transaction.objectStore("memos");

    inMemo.modified = Date.now();

    var request = objectStore.put(inGiornata);
    request.onsuccess = function (event) {
        console.log("Giornata saved with id: " + request.result);
        inCallback(null, request.result);

    };
}

