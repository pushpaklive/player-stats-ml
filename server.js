const express = require('express')
const app = express()
const cors = require('cors')
const port = 3000

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

app.use(cors())
app.use(express.json());
  
// For parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const playerSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    stamina: {
        type: Number,
        min: [1, 'Too less stamina'],
        max: 100,
        required: [true, 'Why no stamina?']
    },
    skills: {
        speed: {
            type: Number
        },
        dribble: {
            type: Number
        },
        accuracy: {
            type: Number
        },
        power: {
            type: Number
        }
    }
});

const Player = mongoose.model('Player', playerSchema);

//Set up default mongoose connection
const mongoDB = 'mongodb://localhost:27017/alpha';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log('connected to db')
});

//Get the default connection
const db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.post('/add', (req, res) => {
    console.log('/add post api : req : ',req.body)
    const newPlayer = new Player(req.body);
    newPlayer.save(function (err, result) {
        if (err) {
            console.log('errrrror in addd API err : ',err) 
        } else{ 
            console.log('Saved to alpha db : result : ',result)
            res.send(result)
        }
        // saved!
      });
})

app.get('/all', (req, res) => {
    Player.find((err, data) => {
        if (err) {
            console.log('errrrror in all API, err : ',err)
        }
        else{
            console.log(data)
            res.send(data)
        }
    })
})

app.post('/delete-all', (req, res) => {
    Player.deleteMany({}, (err, data) => {
        if (err) {
            console.log('errrrror in delete-all API, Failed to load collection: err : ',err)
        }
        else{
            console.log(data)
            res.send(data)
        }
    })
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})