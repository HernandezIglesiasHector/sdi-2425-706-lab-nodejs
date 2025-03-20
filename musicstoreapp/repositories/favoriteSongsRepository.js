module.exports = {
    mongoClient: null,
    app: null,
    database: "musicStore",
    collectionName: "favorites",
    init: function (app, dbClient) {
        this.dbClient = dbClient;
        this.app = app;
    }, getFavorites: async function(filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favoriteCollection = database.collection(this.collectionName);
            const favorite = await favoriteCollection.find(filter, options).toArray();
            return favorite;
        } catch (error) {
            throw (error);
        }
    }, findFavorite: async function (filter, options) {
        try {
            await this.dbClient.connect();
            const database = this.dbClient.db(this.database);
            const favoriteCollection = database.collection(this.collectionName);
            const favorite = await favoriteCollection.findOne(filter, options);
            return favorite;
        } catch (error) {
            throw (error);
        }
    },
    insertFavorite: function (favorite, callbackFunction) {
        this.dbClient.connect()
            .then(() => {
                const database = this.dbClient.db(this.database);
                const favoritesCollection = database.collection(this.collectionName);
                favoritesCollection.insertOne(favorite)
                    .then(result => callbackFunction({songId: result.insertedId}))
                    .then(() => this.dbClient.close())
                    .catch(err => callbackFunction({error: err.message}));
            })
            .catch(err => callbackFunction({error: err.message}))
    },
        deleteFavorite: async function (filter) {
        try{
            await this.dbClient.connect();
            const database= this.dbClient.db(this.database);
            const favorites= database.collection(this.collectionName);
            favorites.deleteOne(filter);}
            catch(error){
            throw error
            }
    }
}