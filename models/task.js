var mongoose = require('mongoose');

// documents get distroyed after 2.5 hours
var taskSchema = new mongoose.Schema({
    content: String,
    expire_at: {type: Date, default: Date.now, expires: 9000}

});

module.exports = mongoose.model('Task', taskSchema);
