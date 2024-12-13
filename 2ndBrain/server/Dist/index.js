"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pg_1 = require("pg");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware_1 = require("./middleware");
const server = (0, express_1.default)();
server.use(express_1.default.json());
server.use((0, cors_1.default)());
// Use connection pool instead of Client
const pool = new pg_1.Pool({
    connectionString: "postgresql://neondb_owner:fV9TbC4kRaLo@ep-silent-base-a48lv2rf.us-east-1.aws.neon.tech/neondb?sslmode=require",
    ssl: { rejectUnauthorized: false }
});
// Connect to the database
pool.connect()
    .then(() => console.log('Connected to database'))
    .catch((err) => console.error('Database connection error', err));
server.post("/api/v1/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // TODO: zod validation, hash the password
    const username = req.body.username;
    const password = req.body.password;
    try {
        // Check if user already exists
        const existingUserCheck = yield pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (existingUserCheck.rows.length > 0) {
            return res.status(409).json({
                message: "Username already exists"
            });
        }
        // Insert new user
        const query = "INSERT INTO users(username, password) VALUES($1, $2) RETURNING id";
        const response = yield pool.query(query, [username, password]);
        console.log('User signup response:', response);
        res.status(201).json({
            message: "User signed up",
            userId: response.rows[0].id
        });
    }
    catch (e) {
        console.error('Signup error:', e);
        res.status(500).json({
            message: "Error signing up",
            error: e
        });
    }
}));
const JWT_PASSWORD = '12345';
server.post("/api/v1/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        // Input validation
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required." });
        }
        console.log("Signin attempt for username:", username);
        // Query to find user
        const query = "SELECT * FROM users WHERE username=$1 AND password=$2";
        const response = yield pool.query(query, [username, password]);
        console.log("Query response:", response.rows);
        // Check if user exists
        if (response.rows.length === 0) {
            return res.status(401).json({ message: "Invalid username or password." });
        }
        const userId = response.rows[0].id;
        const token = jsonwebtoken_1.default.sign({ id: userId }, JWT_PASSWORD);
        res.json({ token, userId });
    }
    catch (error) {
        console.error('Signin error:', error);
        res.status(500).json({
            message: "Internal Server Error.",
            error: error
        });
    }
}));
server.post("/api/v1/content", middleware_1.userMiddleware, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userid = req.userId;
    try {
        // Await the query
        const response = yield pool.query("INSERT INTO content(title, type, user_id, link, tags, body) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *", [req.body.title, req.body.type, userid, req.body.link, req.body.tags, req.body.body]);
        // If you want to insert tags, you might want to do this separately
        // or use a more dynamic approach
        const tagQuery = "INSERT INTO tags (tag_name) VALUES ('JavaScript'),('React'),('Node.js'),('SQL') ON CONFLICT DO NOTHING;";
        yield pool.query(tagQuery);
        // Return the inserted content
        res.status(201).json({ content: response.rows[0] });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Error creating content",
            error: error
        });
    }
}));
server.get("/api/v1/type", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const type = req.query.type;
    try {
        // Validate type parameter
        if (!type) {
            return res.status(400).json({ message: "Type parameter is required" });
        }
        // Query to fetch content by type
        const query = "SELECT * FROM content WHERE type = $1";
        const response = yield pool.query(query, [type]);
        // Check if any content was found
        if (response.rows.length === 0) {
            return res.status(404).json({ message: `No content found with type: ${type}` });
        }
        // Return the found content
        res.status(200).json({
            count: response.rows.length,
            content: response.rows
        });
    }
    catch (error) {
        console.error('Error fetching content by type:', error);
        res.status(500).json({
            message: "Error retrieving content",
            error: error
        });
    }
}));
// Error handling for unhandled routes
server.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server connected on port ${PORT}`);
});
// Graceful shutdown
process.on('SIGINT', () => __awaiter(void 0, void 0, void 0, function* () {
    yield pool.end();
    console.log('Database pool closed');
    process.exit(0);
}));
