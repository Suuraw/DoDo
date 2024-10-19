import pg from "pg";
import env from "dotenv"
env.config();
// Database connection configuration
const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_NAME,
    ssl: {
        rejectUnauthorized: true, // Enforce SSL certificate validation
        ca:process.env.DB_SSL_CA,
    },
};

// Create a new PostgreSQL client
const db = new pg.Client(config);

// Connect to the database and execute a query
db.connect(function (err) {
    if (err) {
        console.error("Error connecting to the database:", err.stack);
        return;
    }
    console.log("Connected to the database");

    // Query the PostgreSQL server for its version
    db.query("SELECT VERSION()", [], function (err, result) {
        if (err) {
            console.error("Error executing query:", err.stack);
            return;
        }

        console.log("PostgreSQL version:", result.rows[0].version);

        // Close the connection to the database
        // db.end(function (err) {
        //     if (err) {
        //         console.error("Error disconnecting from the database:", err.stack);
        //     }
        // });
    });
});

export default db;
