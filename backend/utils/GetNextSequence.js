const Counter = require("../models/Counter");

const getNextSequence = async (name) =>{
    const counter = await Counter.findOneAndUpdate(
        {name : name},
        {"$inc":{seq:1024}},
        {new : true},
    )

    return counter.seq;
}

module.exports = getNextSequence;