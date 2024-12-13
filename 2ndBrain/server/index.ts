import express from 'express'
import cors from 'cors'
import { Client, Pool } from 'pg';
import jwt from 'jsonwebtoken';
import { userMiddleware } from './middleware';

const server = express();
server.use(express.json())
server.use(cors());

const pool = new Pool({
    connectionString: "postgresql://neondb_owner:fV9TbC4kRaLo@ep-silent-base-a48lv2rf.us-east-1.aws.neon.tech/neondb?sslmode=require",
    ssl: { rejectUnauthorized: false }
});

pool.connect()
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Database connection error', err));

server.post("/api/v1/signup", async (req:any, res:any) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const existingUserCheck = await pool.query(
            "SELECT * FROM users WHERE username = $1", 
            [username]
        );

        if (existingUserCheck.rows.length > 0) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }

        const query = "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id";
        const response = await pool.query(query, [username, password]);
        
        console.log('User signup response:', response);

        res.status(201).json({
            message: "User signed up",
            userId: response.rows[0].id
        });
    } catch(e) {
        console.error('Signup error:', e);
        res.status(500).json({
            message: "Error signing up",
            error: e
        });
    }
});

const JWT_PASSWORD = '12345'

server.post("/api/v1/signin", async (req: any, res:any) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }

        console.log("Signin attempt for username:", username);
        
        const query = "SELECT * FROM users WHERE username=$1 AND password=$2";
        const response = await pool.query(query, [username, password]);
        
        console.log("Query response:", response.rows);
        
        if (response.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password." });
        }

        const userId = response.rows[0].id;
        const token = jwt.sign({ id: userId }, JWT_PASSWORD);

        res.json({ token, userId });
    } catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({ 
            message: "Internal Server Error.",
            error: error 
        });
    }
});


server.post("/api/v1/content", userMiddleware, async(req:any, res:any)=>{
    const userid = req.userId;
    try {
        const response = await pool.query(
            "INSERT INTO content(title, type, user_id, link, tags, body) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", 
            [req.body.title, req.body.type, userid, req.body.link, req.body.tags, req.body.body]
        );
        const tagQuery = "INSERT INTO tags (tag_name) VALUES ('JavaScript'),('React'),('Node.js'),('SQL') ON CONFLICT DO NOTHING;";
        await pool.query(tagQuery);
        res.status(201).json({ content: response.rows[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ 
            message: "Error creating content",
            error: error 
        });
    }
});
server.get("/api/v1/type",userMiddleware, async(req:any, res: any) => {
    const type = req.query.type;
    const userId = req.userId

    try {
        if (!type) {
            return res.status(400).json({ message: "Type parameter is required" });
        }
        const query = "SELECT * FROM content WHERE type = $1 AND user_id=$2";
        const response = await pool.query(query, [type, userId]);

        if (response.rows.length === 0) {
            return res.status(404).json({ message: `No content found with type: ${type}` });
        }
        res.status(200).json({ 
            count: response.rows.length,
            content: response.rows 
        });

    } catch (error) {
        console.error('Error fetching content by type:', error);
        res.status(500).json({ 
            message: "Error retrieving content",
            error: error 
        });
    }
});

server.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`)
});

process.on('SIGINT', async () => {
    await pool.end();
    console.log('Database pool closed');
    process.exit(0);
});