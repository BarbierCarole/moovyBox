const client = require('../db_client');

class Task {

    constructor(obj) {
        this.id = obj.id;
        this.checked = obj.checked;
        this.label = obj.label;
        this.date = obj.date;
        this.note = obj.note;
        this.contact = obj.contact;
        this.user_id = obj.user_id; 
        this.move_id = obj.move_id;
    }

    static async getByPk(taskId) {

        const query = `SELECT * FROM "task" WHERE "id" = $1;`; 

        const results = await client.query(query, [taskId]); 

        return (results.rows[0]) ? new this(results.rows[0]) : false; 
    }

    static async getAllTaskFromMove(moveId) {

        const query = `SELECT * FROM "task" WHERE move_id = $1`;
        console.log(">> moveId =",moveId);
        const values = [moveId];
        const results = await client.query(query, values);
        const instances = [];
        for ( const row of results.rows) {
            instances.push(new this(row));
        }
        return instances;
    }

    static async taskLabelExists (dataForm) {
        try {
            const query = `SELECT * FROM "task" WHERE "label" = $1 AND move_id = $2;`
            const results = await client.query(query,[dataForm.label,dataForm.move_id])
            return !!results.rowCount;
        } catch (error) {
            return console.trace(error); 
        }
    
    }

    async save() {
        try {

            if(!!this.id) {
               return this.update(); 
            } else {
               return this.insert(); 
            }
            
        } catch (error) {
            console.log(error); 
        }
    }

    async insert() {

        try {
            const query = `INSERT INTO "task" (checked, label, date, note, contact, user_id, move_id) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
           
            const values = [ this.checked, this.label, this.date, this.note, this.contact, this.user_id, this.move_id ];
            
            const results = await client.query(query, values);
            
            return new Task(results.rows[0]);

       } catch (error) {
           console.trace(error)
       }

    }
}

module.exports = Task;