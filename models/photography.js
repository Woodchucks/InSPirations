var mongoose    = require("mongoose");

var photographySchema = new mongoose.Schema({
    image: String,
    name: String,
    description: String(),
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
        ]
});
module.exports = mongoose.model("Photography", photographySchema);