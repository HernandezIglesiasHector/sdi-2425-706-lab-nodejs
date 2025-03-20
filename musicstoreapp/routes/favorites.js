const {ObjectId} = require("mongodb");

module.exports = function (app, favoriteRepository, songsRepository) {
    app.get('/songs/favorites', function (req, res) {
        let filter = {user: req.session.user};
        let options = {};
        favoriteRepository.getFavorites(filter, options).then(favorites => {
            let totalPrice= favorites.reduce((total, song)=>
                total + parseFloat(song.price), 0);
            res.render("favorites/favorites.twig", {favorites : favorites, totalPrice: totalPrice});
        }).catch(error => {
            res.send("Se ha producido un error al listar los favoritos " + error)
        });
    });

    app.post('/songs/favorites/add/:song_id', function (req, res) {
        let song_id= req.params.song_id;
        let filter= {_id: new ObjectId(song_id)}
        songsRepository.findSong(filter, {}).then(song => {
            let favoriteSong = {
                song_id: song_id,
                date: new Date().toLocaleDateString('es-ES'),
                title: song.title,
                price: song.price,
                user: req.session.user
            }
            favoriteRepository.insertFavorite(favoriteSong, function (result){
                res.redirect("/shop");
            });
        })
    });
    app.get('/songs/favorites/delete/:song_id', function(req,res){
        let song_id = req.params.song_id;
        let filter= {user: req.session.user,_id : new ObjectId(song_id)}
        favoriteRepository.deleteFavorite(filter).then(()=> {
            res.redirect("/songs/favorites");
        }).catch(error =>{
            res.send("Error al eliminar canciones de favoritas")
        });
        })
}