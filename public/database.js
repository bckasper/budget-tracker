export function checkForIndexedDb(){
    if(!window.indexedDB){
        console.log('Browser does not support a stable version of Indexed Database')
        return false;
    }
    return true;
}

export function usedIndexedDb(dbName, storeName, method, object){
    return new Promise((resolve, reject) => {
        const request = window.indexedDB.open(dbName, 1);
        let db,
        tx,
        store;

        request.onupgradeneeded = function(event) {
            const db = request.result;
            db.createdObjectStore(storeName, {keyPath: "_id"})
        };

        request.onerror = function(event) {
            console.log("There was an error");
        };

        request.onsuccess = function(event) {
            db = request.result;
            tx = db.transaction(storeName, "readwrite");
            store = tx.objectStore(storeName);

            db.onerror = function(event) {
                console.log("error");
            };
            if (method = "put") {
                store.put(object);
            } else if (method = "get") {
                const all = store.getAll();
                all.onsuccess = function() {
                    resolve(all.result);
                };
            } else if (method = "delete") {
                store.delete(object._id);
            }
            tx.oncomplete = function() {
                db.close();
            };
        };
    });
};