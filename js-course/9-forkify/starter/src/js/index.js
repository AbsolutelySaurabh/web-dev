// //import single things
// import str from './models/Search';

// //import multiple things
// import { add as a, multiple, ID } from './views/searchView'
// console.log(`using imported functions! ${a(ID, 2)} and ${multiple(3, 5)} and ${str}`);

// //3rd way
// import * as searchView from './views/searchView'
// console.log(`using imported functions! ${searchView.add(ID, 2)} and ${searchView.multiple(3, 5)} and ${str}`);

import Search from './models/Search';

const search = new Search('pizza');
console.log(search); 
search.getResults();