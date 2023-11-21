const express = require("express");
const Todo = require("../models/Todo");
const getNextSequence = require("../utils/GetNextSequence");

const router = express.Router();

// Route 1 : Adding the todos
router.post("/", async (req, res) => {
    const { title, link } = req.body;

    // getting the next position for a new todo to be added
    const pos = await getNextSequence("todos_pos");
    
    const newTodo = new Todo({
        title : title,
        link :link,
        state:"active",
        position:pos,
    })

    const addedTodo = await newTodo.save();

    return res.send({success:true, todo:addedTodo});
});

// Route 2 : Getting all the todos
router.get("/", async(req, res) => {
    const todos = await Todo.find().sort({position:1});

    return res.send({success : true, todos:todos});
});

// Route 3 : Updating the state
router.put("/state", async(req, res)=>{
    const { id, state } = req.body;

    await Todo.findByIdAndUpdate({"_id":id}, {"$set":{state:state}}, {new:true});

    return res.send({success:true});
})

// Route 4 : Updating the position route to be added.
router.put("/position", async(req, res)=>{
    const { id, pos } = req.body;

    await Todo.findByIdAndUpdate({"_id":id}, {"$set":{position:pos}}, {new:true});

    return res.send({success:true});
})


module.exports = router;
