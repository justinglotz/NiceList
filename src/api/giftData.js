// API CALLS FOR GIFTS
const endpoint = process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL;

// CREATE GIFT
const createGift = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gifts.json`, {
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

// UPDATE GIFT
const updateGift = (payload) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gifts/${payload.giftId}.json`, {
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

// GET ALL GIFTS FOR A SPECIFIC USER
const getGifts = (uid) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gifts.json?orderBy="uid"&equalTo="${uid}"`, {
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

// DELETE GIFT
const deleteGift = (giftId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gifts/${giftId}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((data) => resolve(data))
      .catch(reject);
  });

export { createGift, updateGift, getGifts, deleteGift };
