const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db/models').sequelize;
const commentsRouter = require('./routes/comments.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');

const ayuda = "ojala pueda escribir"

app.use(express.json());
app.use('/comments', commentsRouter);
app.use('/user', userRouter);
app.use('/post', postRouter);


app.listen(PORT, async (err) =>{
    if(err) {
        console.error(err);
        process.exit(1);
    }
    await db.sync();
    console.log(`Server is running on port ${PORT}`);
})

// prueba push 


