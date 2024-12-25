const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    desc: {
        type: String,
        default: "No description provided."
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    ],
    channels: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
        }
    ],
    invites: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        }
    ]
});

module.exports = mongoose.model("Group", groupSchema);
