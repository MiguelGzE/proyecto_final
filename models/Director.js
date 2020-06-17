var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DirectorSchema = new Schema({
    id: Number,
    name: String,
    age: Number,
    films: [{type: Schema.Types.ObjectId, ref: "Film"}],
    created_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Director', DirectorSchema);
