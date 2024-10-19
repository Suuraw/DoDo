import db from "../db/db.js";

// Create ToDo
export const createToDo = async (req, res) => {
    try {
        const { title, description, isCompleted, createdBy } = req.body;
        const query = `
            INSERT INTO Todo (title, description, isCompleted, createdBy)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `;
        const values = [title, description, isCompleted, createdBy];
        const result = await db.query(query, values);
        
        console.log(result.rows[0]);
        res.status(201).send({ message: "Created New Task!", todo: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Error creating task." });
    }
};

// Get All ToDos for a User
export const getAllToDo = async (req, res) => {
    
    const { userId } = req.params;
    console.log(userId)
    try {
        const query = `
            SELECT * FROM Todo
            WHERE createdBy = $1;
        `;
        const values = [userId];
        const result = await db.query(query, values);
        
        res.send(result.rows);
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: "Error retrieving tasks." });
    }
};

// Update ToDo
export const updateToDo = async (req, res) => {
    try {
        const { id } = req.params; // Ensure this is coming from req.params
        const { title, description, isCompleted } = req.body;

        // Check if id is valid
        if (!id) {
            return res.status(400).send({ message: "Invalid ID." });
        }

        const completedOn = isCompleted ? new Date() : null;
        const query = `
            UPDATE Todo
            SET title = $1, description = $2, isCompleted = $3, completedOn = $4
            WHERE id = $5
            RETURNING *;
        `;
        
        const values = [title, description, isCompleted, completedOn, id];
        const result = await db.query(query, values);
        
        if (result.rowCount === 0) {
            return res.status(404).send({ message: "ToDo not found." });
        }
        
        console.log(result.rows[0]);
        res.send({ message: 'ToDo list Updated!', todo: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(400).send({ message: "Error updating task." });
    }
};

// Delete ToDo
export const deleteToDo = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        // Check if id is valid
        if (!id) {
            return res.status(400).send({ message: "Invalid ID." });
        }

        const query = `
            DELETE FROM Todo
            WHERE id = $1
            RETURNING *;
        `;
        
        const values = [id];
        const result = await db.query(query, values);
        
        if (result.rowCount === 0) {
            return res.status(404).send({ message: "ToDo not found." });
        }

        console.log(result.rows[0]);
        res.send({ message: "ToDo Task Deleted!" });
    } catch (err) {
        console.error(req.body);
        res.status(400).send({ message: "Error deleting task." });
    }
};
