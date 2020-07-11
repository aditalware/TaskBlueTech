import {ALLITEMS} from '../data/allitems';
import {ITEMS} from '../data/items';
import {COURSES} from '../data/courses';


export const initialState={
allitems:ALLITEMS,
items:ITEMS,
courses:COURSES
}

export const Reducer=(state=initialState,action)=>{
    return state;

}