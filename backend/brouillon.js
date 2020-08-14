// SEARCH FONCTION 

// We would like to be able to find elements through a searchbar

// As a critaeria we receive a simple string

// Then we should scan an entity and retrieve "relevant object"

/* 
    Example : we get "boi"
    We should find : 
        - boite à chaussure
        - coffre en bois 
        - puzzle de framboise
*/

// The results should organised like this

/* 
    - carton 1
        - boite à chaussure
        - coffre en bois 
    - carton 2 
        - boite à chaussure
        - puzzle de framboise
*/

// HOW TO DO THAT 

// Option 1 

// Retrieve user content (boxes and items) and create an objet in session 

/* 
    moves : req.session.user.moves : Move[]
    boxes : Box[]
    items : Item[]

    populate each box with related items

    populate each move with related boxes
*/

// In this case we should recieve a payload with moveId AND a query string with the searched string

//! In option 1 : all resources should be updated for each operation (creation, update, deletion)

/* 

*/


(async () => {
    try {
        /*
        const suite = [
            {number: 1, name:'un'},
            {number: 2, name:'deux'},
            {number: 3, name:'trois'},
            {number: 4, name:'quatre'}]; 

        const theNumber = suite.filter(entry => entry.name == 'deux'); 

        suite.splice(suite.indexOf(theNumber[0]), 1); 

        console.log("suite", suite); 
        */

       const suite = [
        {number: 1, name:'un'},
        {number: 2, name:'deux'},
        {number: 3, name:'trois'},
        {number: 4, name:'quatre'}]; 

        const theNumber = suite.filter(entry => entry.name == 'deux'); 

        delete theNumber[0]; 

        console.log("suite", suite);
        
    } catch (error) {
        console.trace(error); 
    }

})(); 


