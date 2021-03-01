// const { isThisSecond } = require('date-fns');
const client = require('../db_client');

class TasksList {

    constructor(obj) {
        // task
        this.id = obj.id;
        this.label = obj.label;
        this.description = obj.description;
        this.nber_days = obj.nber_days;
        this.general_task = obj.general_task;
        // move
        this.date = obj.date;
        // tasks_list
        this.move_id = obj.move_id;
        this.task_id = obj.task_id;
        this.contact = obj.contact;
        this.is_realised = obj.is_realised; 
        this.note = obj.note;
        this.date_perso = obj.date_perso;
    }

    static async getAllTaskFromMove(moveId) {

        const query = `
        SELECT 
            move_id,
            is_realised,
            date_perso,
            note,
            contact,
            m.date,
            t.label,
            t.description,
            t.id,
            t.nber_days, 
            t.general_task
        FROM move m
        INNER JOIN tasks_list tl
            ON tl.move_id = m.id
        INNER JOIN task t
            ON t.id = tl.task_id
        WHERE move_id = $1
        ORDER BY t.nber_days ASC;`;
    
        const values = [moveId];
        const results = await client.query(query, values);
        const instances = [];
        for ( const row of results.rows) {
            instances.push(new this(row));
        }
        return instances;
    }

    static async getByPk(moveId, taskId) {
        console.log("tasksList l.55 moveId, taslId",moveId, taskId)        
        const query = ` 
            SELECT 
                move_id,
                task_id,
                is_realised,
                note,
                contact,
                date_perso,
                m.date,
                t.label,
                t.description,
                t.nber_days,
                t.id, 
                t.general_task
                
            FROM move m
            INNER JOIN tasks_list tl
                ON tl.move_id = m.id
            INNER JOIN task t
                ON t.id = tl.task_id
            WHERE 
                move_id = $1 AND task_id = $2`;

        const values = [moveId,taskId]; 
        const results = await client.query(query, values); 
        console.log(">> tasksList l.77 : results :", results.rows[0]);
        return (results.rows[0]) ? new this(results.rows[0]) : false; 
    }

    // to see if the label enter exist yet in the move or not
    static async taskLabelExists (dataForm) {
        try {
            const query = `
                SELECT 
                    t.label
                FROM move m
                INNER JOIN tasks_list tl
                    ON tl.move_id = m.id
                INNER JOIN task t
                    ON t.id = tl.task_id
                WHERE task_id = 15 AND move_id = 19`;
            const results = await client.query(query,[dataForm.label,dataForm.move_id])
            return !!results.rowCount;
        } catch (error) {
            return console.trace(error); 
        }
    
    }

    async save() {
        try {

            if(!!this.task_id) {
               return this.update(); 
            } else {
               return this.insert(); 
            }
            
        } catch (error) {
            console.log(error); 
        }
    }
    
    // Pour insérer toutes les taches d'un bloc dans la checklist du déménagement
    static async insertNewTasks(move_id) { 

        try {
            console.log("ds tasksList.js : plops");
            const query = `
            INSERT INTO 
                tasks_list ( task_id, move_id )
            SELECT 
                id,$1 
            FROM 
                task
            WHERE 
                general_task=true;`;
            const values = [ move_id ];
            
            const results = await client.query(query, values);
            //console.log("l.149 ",new TasksList(results.rows[0]));
            return results;

       } catch (error) {
           console.trace(error);
       }
    }
   
    async updateTasksList() {
        try {
            // Prepare the query
            const query = `
            UPDATE 
                tasks_list 
            SET 
                ( move_id, task_id, contact, is_realised, note, date_perso ) = ( $1, $2, $3, $4::boolean, $5, $6 ) 
            WHERE 
                move_id = $7
            AND 
                task_id = $8             
            RETURNING *;`;
            // Set the involved data
            const values = [this.move_id, this.task_id, this.contact, this.is_realised, this.note, this.date_perso, this.move_id, this.task_id]; 
            console.log(">> tasksList l.176 : values :", values);
            // Query update to DB 
            const results = await client.query(query, values); 
        
            //return the updated move
            return new TasksList(results.rows[0]); 
        } catch (error) {
            console.trace(error);
        }
    }

    async insertInTasksList(move_id) { 

        try {
            
            console.log("task.js l.142 : this.label, this.description, move_id, this.note, this.date_perso, this.contact => ",this.label, this.description, move_id, this.note, this.date_perso, this.contact);
            const query = `
            INSERT INTO 
                tasks_list ( task_id, move_id, note, date_perso, contact )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;`;
            const values = [ this.task_id, move_id, this.note, this.date_perso, this.contact ];
            
            const results = await client.query(query, values);
            return new TasksList(results.rows[0]); 
            

       } catch (error) {
           console.trace(error);
       }

    }

    async delete() {
        try {
            const query = `DELETE FROM tasks_list WHERE move_id=$1 AND task_id=$2;`;
            const values = [this.move_id, this.task_id];
            const result = await client.query(query,values);
            return !! result.rowCount;
        }
        catch (error) {
            console.trace(error);
        }
    }
    
}

module.exports = TasksList;