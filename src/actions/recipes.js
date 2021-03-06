import { Firebase, FirebaseRef } from '../lib/firebase';
import moment from 'moment';

export function addRoom(formData) {
  const {
    address,
    square,
    price,
    phoneNumber,
    roomates,
    district,
    gender,
    images,
    utilities,
    equipment,
    description,
    userID
  } = formData;

  formData.time = moment().unix();
  formData.status = 0;
  formData.view = 0;

  FirebaseRef.child('rooms').push(formData, (result) => {
    console.log('Result from Firebase: ', result);
  });
}

export function approveRoom(id, approveCode) {
  return FirebaseRef.child(`rooms/${id}`).update({ isApproved: approveCode })
    .then(() => {
      // Success
      return {
        status: 'ok'
      };
    });
}

export function hideRoom(id) {
  return FirebaseRef.child(`rooms/${id}`).update({ status: true })
    .then(() => {
      // Success
      return {
        status: 'ok'
      };
    });
}

export function unhideRoom(id) {
  return FirebaseRef.child(`rooms/${id}`).update({ status: false })
    .then(() => {
      // Success
      return {
        status: 'ok'
      };
    });
}

/**
  * Get this User's Favourite Recipes
  */
export function getFavourites(dispatch) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  const ref = FirebaseRef.child(`favourites/${UID}`);

  return ref.on('value', (snapshot) => {
    const favs = snapshot.val() || [];

    return dispatch({
      type: 'FAVOURITES_REPLACE',
      data: favs,
    });
  });
}

/**
  * Reset a User's Favourite Recipes in Redux (eg for logou)
  */
export function resetFavourites(dispatch) {
  return dispatch({
    type: 'FAVOURITES_REPLACE',
    data: [],
  });
}

/**
  * Update My Favourites Recipes
  */
export function replaceFavourites(newFavourites) {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  const UID = Firebase.auth().currentUser.uid;
  if (!UID) return false;

  return () => FirebaseRef.child(`favourites/${UID}`).set(newFavourites);
}

/**
  * Set an Error Message
  */
export function setError(message) {
  return dispatch => new Promise(resolve => resolve(dispatch({
    type: 'RECIPES_ERROR',
    data: message,
  })));
}

/**
  * Get Recipes
  */
export function getRecipes() {
  if (Firebase === null) return () => new Promise(resolve => resolve());

  return dispatch => new Promise(resolve => FirebaseRef.child('rooms').orderByChild('time')
    .on('value', (snapshot) => {
      const recipes = snapshot.val() || {};

      return resolve(dispatch({
        type: 'RECIPES_REPLACE',
        data: recipes,
      }));
    })).catch(e => console.log(e));
}
