
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const DB = require('./database.js');
const { peerProxy } = require('./peerProxy.js');

const authCookieName = 'token';

let games = [];

const port = process.argv.length > 2 ? process.argv[2] : 4000;

app.use(express.json());

app.use(cookieParser());

app.use(express.static('public'));

var apiRouter = express.Router();
app.use(`/api`, apiRouter);

apiRouter.post('/auth/create', async (req, res) => {
    if (await findUser('email', req.body.email)) {
        res.status(409).send({ msg: 'Existing user' });
    } else {
        const user = await createUser(req.body.email, req.body.password);

        setAuthCookie(res, user.token);
        res.send({ email: user.email });
    }
});

apiRouter.post('/auth/login', async (req, res) => {
    const user = await findUser('email', req.body.email);
    if (user) {
        if (await bcrypt.compare(req.body.password, user.password)) {
            user.token = uuid.v4();
            await DB.updateUser(user);
            setAuthCookie(res, user.token);
            res.send({ email: user.email });
            return;
        }
    }
    res.status(401).send({ msg: 'Unauthorized' });
});

apiRouter.delete('/auth/logout', async (req, res) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        await DB.updateUserRemoveAuth(user);
    }
    res.clearCookie(authCookieName);
    res.status(204).end();
});

const verifyAuth = async (req, res, next) => {
    const user = await findUser('token', req.cookies[authCookieName]);
    if (user) {
        next();
    } else {
        res.status(401).send({ msg: 'Unauthorized' });
    }
};

apiRouter.get('/games', verifyAuth, async (_req, res) => {
    const games = await DB.getGames();
    res.send(games);
});

apiRouter.post('/game', verifyAuth, async (req, res) => {
    const games = await updateGames(req.body);
    res.send(games);
});

//Join game endpoint
apiRouter.put('/game/:id', verifyAuth, async (req, res) => {
    const id = req.params.id;
    const game = await findGame(id);
    if (game) {
        const user = await DB.getUser(req.body.player);
        const games = await joinGame(game, user);
        res.send(games);
    } else{
        res.status(404).send({ msg: 'Game not found' });
    }
});

//Get current game endpoint
apiRouter.get('/game/:id', verifyAuth, async (req, res) => {
    const id = req.params.id;
    const game = await findGame(id);
    if (game) {
        res.send(game);
    } else {
        res.status(404).send({ msg: 'Game not found' });
    }
})

apiRouter.delete('/games/reset', verifyAuth, (req, res) => {
    games = resetGames();
    res.send(games);
})

app.use(function (err, req, res, next) {
    res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
    res.sendFile('index.html', { root: 'public' });
});

async function updateGames(newGame) {
    const lobby = { name: newGame.name, max: newGame.playerCount, players: new Array(Number(newGame.playerCount)), playerCount : 0};
    await DB.addGame(lobby);
    return DB.getGames();
}

async function resetGames() {
    await DB.resetGames();
}

async function createUser(email, password) {
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await DB.addUser(user);

    return user;
}

async function findUser(field, value) {
    if (!value) return null;

    if (field === 'token'){
        return DB.getUserByToken(value);
    }
    return DB.getUser(value);
}

async function findGame(id) {
    if (!id) return null;

    return DB.getGame(id);
}

async function joinGame(game, player) {
    if (game?.playerCount < game?.max) {
        await DB.joinGame(game, player);
    }
    
    const games = await DB.getGames();
    return games;
}

function setAuthCookie(res, authToken) {
    res.cookie(authCookieName, authToken, {
        maxAge: 1000 * 60 * 60 * 24 * 365,
        secure: true,
        httpOnly: true,
        sameSite: 'strict',
    });
}

const httpService = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

peerProxy(httpService);