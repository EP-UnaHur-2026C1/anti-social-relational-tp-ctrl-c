const express = require('express');
const app = express();
const PORT = 3000;
const db = require('./db/models').sequelize;
const commentsRouter = require('./routes/comments.route');
const userRouter = require('./routes/user.route');
const postRouter = require('./routes/post.route');
const postImageRouter = require('./routes/post_image.route');
const tagRouter = require('./routes/tag.route');

// ----------------- Swagger -------------------

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');
const swaggerDocument = YAML.load(path.join(__dirname, '../docs/swagger.yaml'));

app.use(express.json());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/comments', commentsRouter);
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/post_Images', postImageRouter);
app.use('/tags', tagRouter);


app.listen(PORT, async (err) =>{
    if(err) {
        console.error(err);
        process.exit(1);
    }
    await db.sync();
    console.log(`Server is running on port ${PORT}`);
})




