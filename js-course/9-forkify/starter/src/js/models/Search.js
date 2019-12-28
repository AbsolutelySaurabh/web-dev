//export multiple things , use naming
// export const add = (a, b) => a + b;
// export const multiple = (a, b) => a * b;
// export const ID = 3;

import axios from 'axios';

export default class Search {

    constructor(query){
        this.query = query;
    }  

    async getResults(query){

        const key = '2edee171647ab9d2cc989ea3af724a77';
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        try{
            //fetch() function doesn't work in very old browsers
            //so we'll use the axios library -> works on all browsers
            //axios is also much better in error handling, etc.
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&q=${this.query}`);
            //dur to await, this code will wait to finish here first
            //" An async function can contain an await expression, that pauses the execution of the async function and waits for the passed Promise's resolution,"
            //" and then resumes the async function's execution and returns the resolved value. "
            this.result = res.data.recipes;
            console.log(this.result);
        }catch(error){
            alert(error);
        }
    
    }

}
