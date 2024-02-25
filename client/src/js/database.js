import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      // if the 'jate' database already exists, log a message to the console and return
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      // if the 'jate' database doesn't exist, create a new one
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });
// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // this function should add the content to the 'jate' database
  try {
    const db = await initdb();
    const transaction = db.transaction('jate', 'readwrite');
    const store = transaction.objectStore('jate');
    await store.add({ content });
    // console.log messages to confirm whether the content was added to the database
    console.log('Content added to the database');
  } catch (error) {
    console.error('Error adding content to the database:', error);
  }
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // this function *should* get the content from the 'jate' database
  try {
    const db = await initdb();
    const transaction = db.transaction('jate', 'readonly');
    const store = transaction.objectStore('jate');
    // this will getAll the content from the database
    const allContent = await store.getAll();
    // console.log messages to confirm whether the content was retrieved from the database
    console.log('All content retrieved from the database:', allContent);
    // return the content from the database
    return allContent;
  } catch (error) {
    console.error('Error getting content from the database:', error);
  }
};

// call the initdb function to initialize the database
initdb();
