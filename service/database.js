const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const config = require('./dbConfig.json');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;
const client = new MongoClient(url);
const db = client.db('startup');
const userCollection = db.collection('user');
const gameCollection = db.collection('game');

(async function testConnection() {
    try {
        await db.command({ping: 1});
        console.log(`Connect to database`);
    } catch (ex) {
        console.log(`Unable to connect to database with ${url} because ${ex.message}`);
        process.exit(1);
    }
})();

function getUser(email) {
    return userCollection.findOne({ email: email});
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token});
}

async function addUser(user) {
    await userCollection.insertOne(user);
}

async function updateUser(user) {
    await userCollection.updateOne({ email: user.email }, { $set: user});
}

async function updateUserRemoveAuth(user) {
    await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

async function addGame(game) {
    return gameCollection.insertOne(game);
}

async function resetGames() {
    await gameCollection.deleteMany({});
}

function getGames(){
    const cursor = gameCollection.find({});
    return cursor.toArray();
}

function getGame(id){
    return gameCollection.findOne({ _id: new ObjectId(id)});
}

async function joinGame(game, user){
    game.players[game.playerCount] = user.email;
    game.playerCount += 1;
    await gameCollection.updateOne ({ _id: new ObjectId(game._id) }, {$set: game});
}

module.exports = {
  getUser,
  getUserByToken,
  addUser,
  updateUser,
  updateUserRemoveAuth,
  addGame,
  resetGames,
  getGames,
  getGame,
  joinGame,
};