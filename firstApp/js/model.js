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

