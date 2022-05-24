import Model from "../models/mealModel.js"

export const get = async (req, res) => {
    const data = await Model.find()
    res.json(data)
}

export const create = async (req, res) => {
    const data = await Model.create(req.body)
    res.json(data)
}

export const edit = async (req, res) => {
    const data = await Model.updateOne({ _id: req.body._id }, req.body)


    if (data.modifiedCount == 1) {
        const modified = await Model.find({ _id: req.body._id })
        if (modified.length > 0) {
            res.json(modified[0])
        }
    }
    
}

export const destroy = async (req, res) => {
    const data = await Model.deleteOne({ _id: req.params.id })
    if (data.deletedCount == 1) {
        res.json({ _id: req.params.id })
    }
}