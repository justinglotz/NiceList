// API CALLS FOR PEOPLE

const endpoint = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// GET ALL PEOPLE FOR A SPECIFIC USER
const getPeople = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/people.json?orderBy="uid"&equalTo="${uid}"`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          resolve(Object.values(data));
        } else {
          resolve([]);
        }
      })
      .catch(reject);
  });

// DELETE PERSON
const deletePerson = (PersonId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/people/${PersonId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET SINGLE PERSON
const getSinglePerson = (PersonId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/people/${PersonId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// CREATE PERSON
const createPerson = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/people.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE PERSON
const updatePerson = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/people/${payload.personId}.json`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

export { createPerson, updatePerson, deletePerson, getPeople, getSinglePerson };
