export function checkForIndexedDb(){
    if(!window.indexedDB){
        console.log('Browser does not support a stable version of Indexed Database')
        return false;
    }
    return true;
}

