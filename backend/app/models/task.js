// const { isThisSecond } = require('date-fns');
const client = require('../db_client');

class Task {

    constructor(obj) {
        // task
        this.id = obj.id;
        this.label = obj.label;
        this.description = obj.description;
        this.nber_days = obj.nber_days;
        this.general_task = obj.general_task;
    }

    // Pour afficher le détail d'une tache
    static async getTaskByPk(id) {
                
        const query = ` 
            SELECT * FROM task WHERE id = $1;`;

        const values = [id]; 
        const results = await client.query(query, values); 
        console.log(">> tasksList l.65 : results :", results.rows[0]);
        return (results.rows[0]) ? new this(results.rows[0]) : false; 
    }
    
    async insertInTask() { 
        try {
            const query = `
            INSERT INTO task (label,description) VALUES ( $1,$2 ) RETURNING *;`;
            const values = [ this.label, this.description];
            
            const results = await client.query(query, values);
            // console.log(">> l.35 new TasksList(results.rows[0]) => ",new TasksList(results.rows[0]));
            return new Task(results.rows[0]); 
            
       } catch (error) {
           console.trace(error);
       }
    }
    
    async updateTask() {
        try {
            // Prepare the query
            const query = `
            UPDATE 
                task 
            SET 
                ( label, description ) = ( $1, $2 ) 
            WHERE id = $3       
            RETURNING *;`;
            // Set the involved data
            const values = [this.label, this.description, this.id]; 
            console.log(">> task l.176 : values :", values);
            // Query update to DB 
            const results = await client.query(query, values); 
        
            //return the updated move
            return new Task(results.rows[0]); 
        } catch (error) {
            console.trace(error);
        }
    }

    async delete() {
        try {
            const query = `DELETE FROM task WHERE id=$1;`;
            const values = [this.id];
            const result = await client.query(query,values);
            return !! result.rowCount;
        }
        catch (error) {
            console.trace(error);
        }
    }

}

module.exports = Task;