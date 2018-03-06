import {appName} from '../config'
import {Record, List} from 'immutable'
import {reset} from 'redux-form'
import {createSelector} from 'reselect'
import {takeEvery, put, call} from 'redux-saga/effects'
import firebase from 'firebase'

/**
 * Constants
 * */
export const moduleName = 'people'
const prefix = `${appName}/${moduleName}`
export const ADD_PERSON_REQUEST = `${prefix}/ADD_PERSON_REQUEST`
export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`

/**
 * Reducer
 * */
const ReducerState = Record({
    entities: new List([])
})

const PersonRecord = Record({
    id: null,
    firstName: null,
    lastName: null,
    email: null
})

export default function reducer(state = new ReducerState(), action) {
    const {type, payload} = action

    switch (type) {
        case ADD_PERSON_SUCCESS:
            return state.update('entities', entities => entities.push(new PersonRecord(payload)))

        default:
            return state
    }
}
/**
 * Selectors
 * */

export const stateSelector = state => state[moduleName]
export const peopleSelector = createSelector(stateSelector, state => state.entities.toArray())

/**
 * Action Creators
 * */

export function addPerson(person) {
    return {
        type: ADD_PERSON_REQUEST,
        payload: person
    }
}

/*
export function addPerson(person) {
    return (dispatch) => {
        dispatch({
            type: ADD_PERSON,
            payload: {
                person: {id: Date.now(), ...person}
            }
        })

        dispatch(reset('person'))
    }
}
*/

/**
 * Sagas
 **/

export const addPersonSaga = function * (action) {
    const ref = firebase.database().ref('/people')
    const person = yield call([ref, ref.push], action.payload)
    yield put({
        type: ADD_PERSON_SUCCESS,
        payload: {
            id: person.key,
            ...action.payload
        }
    })

    yield put(reset('person'))

}

export const saga = function * () {
    yield takeEvery(ADD_PERSON_REQUEST, addPersonSaga)
}