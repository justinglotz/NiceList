// API CALLS FOR PEOPLE

const endpoint = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// const getPeople = (uid) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/people.json=${uid}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         if (data) {
//           resolve(Object.values(data));
//         } else {
//           resolve([]);
//         }
//       })
//       .catch(reject);
//   });

// DELETE TOUR
// const deleteTour = (TourId) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/${TourId}`, {
//       method: 'DELETE',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((data) => resolve(data))
//       .catch(reject);
//   });

// GET SINGLE TOUR
// const getSingleTour = (TourId) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}/${TourId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(data))
//       .catch(reject);
//   });

// CREATE TOUR
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

// GET A SINGLE LOCATIONS TOURS
// const getLocationTours = (locationId) =>
//   new Promise((resolve, reject) => {
//     fetch(`${endpoint}?location=${locationId}`, {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//       .then((response) => response.json())
//       .then((data) => resolve(Object.values(data)))
//       .catch(reject);
//   });

export { createPerson, updatePerson };
