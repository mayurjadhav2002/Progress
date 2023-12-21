const Project = require('../models/Project');
const Kanban = require("../models/Kanban");
const { InviteMail } = require('../config/mails');

const newProject = async (req, res) => {
    try {

        const new_Project = new Project({
            created_by: req.body.created_by,
            title: req.body.title,
            description: req.body.description,
            AddedGitRepo: req.body.addedgitrepo,
            timeline: req.body.timeline, // Parse the timeline string to Date
            keyword: req.body.keyword,
            color: req.body.color,
            collaborators: req.body.collaborators
        })
        const result = await new_Project.save()
        if (result) {

            const createkanban = new Kanban({
                projectId: result._id,
                board: [{ boardName: 'to do', cards: [] }]

            })
            const kanbanResult = await createkanban.save()
            if (kanbanResult) {
                return res.status(200).send({ success: true, msg: "new project created successfully!", data: result })
            }
            return res.status(200).send({ success: true, msg: "Some error occured recreating the kanban", data: result })

        } else {
            return res.status(400).send({ success: false, msg: "some error occured, please try again" });
        }
    } catch (error) {
        return res.status(400).send({ success: false, msg: "Unexpected Error occured", error: error })
    }
}


const deleteProject = async (req, res) => {
    try {
        const data = await Kanban.findOneAndDelete({ _id: req.body.id, created_by: req.body.created_by })
        if (data) {
            return res.status(200).send({ succes: true, msg: "Deleted the project" })
        }

    } catch (error) {

    }
}
const getProjects = async (req, res) => {
    try {
        const Projects = await Project.find({ created_by: req.body.created_by, deleted: false })
  .sort({ createdAt: 'desc' })
  .populate('created_by', 'avatar name')
  .exec();

        if (Projects.length > 0) {
            return res.status(200).send({ success: true, msg: "project found", data: Projects })
        }
        else {
            return res.status(200).send({ success: true, msg: "No project created", data: null })
        }

    } catch (error) {
        return res.status(400).send({ success: false, msg: "Unexpected Error occured" })
    }
}

const updateProject = async (req, res) => {
    try {
        console.log(req.params.id)
        const result = await Project.findOneAndUpdate({ _id: req.params.id }, { ...req.body }, { new: true })
        if (result) {
            return res.status(200).send({ success: true, msg: "data updated successfully", data: result })
        } else {
            return res.status(400).send({ success: false, msg: "no project found with this id", data: [] })
        }
    } catch (error) {
        console.log(error)
    }
}

const inviteCollaborator = async (req, res) => {
    try {
        console.log(req.body.email, req.body.id)
        const email = req.body.email;
        const result = await Project.findOneAndUpdate(
            { _id: req.body.id },
            { $push: { invite: email } },
            { new: true }
        ).populate('created_by', 'name');

        if (result) {
            const createdByUserName = result.created_by.name;

            const Mail = await InviteMail({
                token: result.inviteCode,
                email: email,
                by: createdByUserName,
            });

            res
                .status(200)
                .send({ success: true, message: `Invite sent to ${email} by ${createdByUserName}` });

        } else {
            console.log("Some Error occurred");
            return res.status(500).send({ success: false, message: "Some error occurred" });
        }
    } catch (error) {
        console.error("Error in inviteCollaborator:", error);
        return res.status(500).send({ success: false, message: "Internal Server Error" });
    }
};

module.exports = { newProject, getProjects, updateProject, deleteProject, inviteCollaborator }