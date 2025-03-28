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

// DELETE MULTIPLE GIFTS
const deleteGifts = (gifts) =>
  new Promise((resolve, reject) => {
    Promise.all(
      gifts.map((gift) =>
        fetch(`${endpoint}/gifts/${gift.giftId}.json`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        }),
      ),
    )
      .then((responses) => resolve(responses))
      .catch(reject);
  });

// GET SINGLE GIFT
const getSingleGift = (giftId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gifts/${giftId}.json`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch(reject);
  });

// GET ALL GIFTS FOR A PERSON
const getGiftsByPersonId = (personId) =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gifts.json?orderBy="personId"&equalTo="${personId}"`, {
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

// GET ALL COMPLETED GIFTS
const getCompletedGifts = () =>
  new Promise((resolve, reject) => {
    fetch(`${endpoint}/gifts.json?orderBy="status"&equalTo=4`, {
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

export { createGift, updateGift, getGifts, deleteGift, getSingleGift, getGiftsByPersonId, getCompletedGifts, deleteGifts };
