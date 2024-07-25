export function saveFileToIndexedDB(file: Blob, key: string) {
  const request = indexedDB.open('filesDatabase', 1);

  request.onupgradeneeded = function (event) {
    const db = (event.target as IDBOpenDBRequest).result;
      db.createObjectStore('files', { keyPath: 'key' });
  };

  request.onsuccess = function (event) {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(['files'], 'readwrite');
    const store = transaction.objectStore('files');
    const reader = new FileReader();

    reader.onload = function () {
      store.put({ key: key, data: reader.result });
    };
    reader.readAsDataURL(file);
  };
}

export function loadFileFromIndexedDB(key: string, callback: any) {
  const request = indexedDB.open('filesDatabase', 1);

  request.onsuccess = function (event) {
    const db = (event.target as IDBOpenDBRequest).result;
    const transaction = db.transaction(['files']);
    const store = transaction.objectStore('files');
    const getRequest = store.get(key);

    getRequest.onsuccess = function () {
      callback(getRequest.result ? getRequest.result.data : null);
    };
  };
}
