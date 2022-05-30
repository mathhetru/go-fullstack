const express = require('express');
/* installation d'express (framework qui simplifie les taches, en nous permettant de déployer les API plus rapidement) 
l'application Express est fondamentalement une série de fonctions appelées MIDDLEWARE. Chaque élément de middleware reçoit les objets request et response , peut les lire, les analyser et les manipuler, le cas échéant. (COMME CI DESSOUS) */

const app = express(); 
/* on donne un nom à express = app */ 

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://user01:user01@gofullstack.rsbmh38.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true,
    useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use(express.json());
/* Pour gérer la requête POST venant de l'application front-end, on a besoin d'en extraire le corps JSON. Pour cela, vous avez juste besoin de ce middleware très simple, mis à disposition par le framework Express.
Avec ceci, Express prend toutes les requêtes qui ont comme Content-Type  'application/json'  et met à disposition leur  body  directement sur l'objet req */

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});
/* middleware qui autorise toutes les origines, ajoute des headers aux requêtes envoyées vers l'API et d'envoyer des requêtes GET POST PUT Etc... sinon erreur de CORS !!! 
CORS signifie « Cross Origin Resource Sharing ». Il s'agit d'un système de sécurité qui, par défaut, bloque les appels HTTP entre des serveurs différents, ce qui empêche donc les requêtes malveillantes d'accéder à des ressources sensibles. Par défaut, les requêtes AJAX sont interdites.*/

app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);
    res.status(201).json({
        message: 'Objet crée !'
    });
});
/* middleware qui post grâce au 'app.use(express.json());' */

app.get('/api/stuff', (req, res, next) => {
    const stuff = [
        {
            _id: 'oeihfzeoi',
            title: 'Mon premier objet',
            description: 'Les infos de mon premier objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 4900,
            userId: 'qsomihvqios',
        },
        {
            _id: 'oeihfzeomoihi',
            title: 'Mon deuxième objet',
            description: 'Les infos de mon deuxième objet',
            imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
            price: 2900,
            userId: 'qsomihvqios',
        },
    ];
    res.status(200).json(stuff);
});
/* middleware qui get (marche aussi avec use) grace à la route (./api/stuff). Car il s'agit de la route demandée par le frontend pour afficher les données JSON */

module.exports = app;