let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let CounterSchema = Schema({
    _id: { type: String, required: true },
    seq: { type: Number, default: 10000 }
});

let counter = mongoose.model('counter', CounterSchema);

let urlSchema = new Schema({
  _id: { type: Number, index: true },
  long_url: Array,
  created_at: Date
});

urlSchema.pre('save', function(next){
  let doc = this;
  counter.findByIdAndUpdate({ _id: 'url_count' }, { $inc: {seq: 1} },
  { "upsert": true, "new": true }, function(error, counter) {
      if (error) return next(error);
      doc.created_at = new Date();
      doc._id = counter.seq;
      console.log(doc.id);
      next();
  });
});

let Url = mongoose.model('Url', urlSchema);
module.exports = Url;
