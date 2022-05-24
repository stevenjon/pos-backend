import userModel from "../models/userModel.js"

export const getUser = async (req, res) => {
    const User = await userModel.find({pincode: req.body.pincode}).select("-pincode")
    res.json(User)
}

// export const createUser = async (req, res) => {0
//     console.log(req.body);
//     const goal = await goalModel.create(req.body)
    
//     res.json(goal)
// }

// export const updateUser = async (req, res) => {
//     console.log(req.body);
//     const goal = await goalModel.updateOne({text: "go heal"}, {rating: 10})
    
//     res.json(goal)
// }