// API CALLS FOR BUDGET
const endpoint = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// GET BUDGET FOR A SPECIFIC USER
const getBudget = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/budget.json?orderBy="uid"&equalTo="${uid}"`, {
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

// CREATE BUDGET
const createBudget = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/budget.json`, {
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

// UPDATE BUDGET
const updateBudget = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/budget/${payload.budgetId}.json`, {
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

export { createBudget, getBudget, updateBudget };
