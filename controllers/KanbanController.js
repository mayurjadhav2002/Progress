const Kanban = require('../models/Kanban')

const getKanban = async (req, res) => {
    try {
        const data = await Kanban.findOne({ projectId: req.body.projectid })
        .populate({
          path: 'projectId',
          select: 'title created_by timeline color collaborators keyword description',
          populate: {
            path: 'collaborators.userId',
            model: 'User',
            select: 'name avatar organization_name',
            match: {
              _id: { $ne: req.body.userId }
            }
          }
        })
        .exec();
      

        if (data) {
            return res.status(200).send({ success: true, msg: "Board fetched", data: data })
        }
        return res.status(201).send({ success: false, msg: "Some error occured" })
    } catch (error) {
        return res.status(400).send({ success: false, msg: "unexpected error occured", error: error })

    }
}

const updateKanban = async (req, res) => {
    try {
        const data = await Kanban.findOneAndUpdate({ projectId: req.body.projectid }, { board: req.body.board }, { new: true })
        if (data) {
            return res.send({ success: true, msg: "Updated the Data", data: data });
        } else {
            console.log("Some error Occured at updateKanban");
        }
    } catch (error) {
        console.log("Error ocured at update Kanban", error)
    }
}


const UpdateCard = async (req, res) => {
    try {
        const result = await Kanban.findOneAndUpdate(
            {
                projectId: req.params.projectId,
                "board._id": req.params.id,
                "board.card._id": req.params.cardId,

            },
            {
                $set: {
                    "board.$.card.$[card]": { ...req.body },
                },
            },
            { new: true, arrayFilters: [{ "card.id": cardId }] }
        );

        if (result) {
            res.status(200).json({ success: true, message: "Card details updated successfully", data: result });
        } else {
            res.status(404).json({ success: false, message: "Board or card not found" });
        }
    } catch (error) {
        console.error("Error updating card details:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = { getKanban, updateKanban, UpdateCard }