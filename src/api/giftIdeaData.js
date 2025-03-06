// API CALLS FOR GIFT IDEAS
const endpoint = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// GET ALL GIFT IDEAS FOR A SPECIFIC USER
const getGiftIdeas = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gift-ideas.json?orderBy="uid"&equalTo="${uid}"`, {
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

// CREATE GIFT IDEA
const createGiftIdea = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gift-ideas.json`, {
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

// DELETE GIFT IDEA
const deleteGiftIdea = (giftIdeaId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gift-ideas/${giftIdeaId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

// UPDATE GIFT IDEA
const updateGiftIdea = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gift-ideas/${payload.giftIdeaId}.json`, {
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

export { createGiftIdea, getGiftIdeas, deleteGiftIdea, updateGiftIdea };
