import app from './app';
import connectDB from './db';

const port = process.env.PORT || 4000;

// Connect to the MongoDB database
connectDB();

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
