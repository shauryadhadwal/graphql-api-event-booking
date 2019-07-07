const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const mongoose = require('mongoose');
const isAuthMiddleware = require('./middleware/is-auth');
// const corsMiddleware = require('./middleware/cors');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());

app.use(cors());
// app.use(corsMiddleware);
app.use(isAuthMiddleware);

const graphQlSchema = require('./graphql/schemas/index');
const graphQlResolvers = require('./graphql/resolvers/index');

app.use('/graphql', graphqlHttp({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
}));

const mongoConnectionUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0-rjk9d.mongodb.net/${process.env.MONGO_DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(mongoConnectionUrl, { useNewUrlParser: true })
    .then(() => {
        app.listen(3000, () => { console.log('Listening on 3000') });
    })
    .catch(err => {
        console.error(err);
    });
