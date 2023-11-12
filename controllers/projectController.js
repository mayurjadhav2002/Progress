const Project = require('../models/Project');


const newProject = async (req, res) => {
    try {
        const new_Project = new Project({
            created_by: req.body.created_by,
            title: req.body.title,
            description: req.body.description,
            AddedGitRepo: req.body.addedgitrepo,
            timeline: req.body.timeline,
            color: req.body.color
        })
        const result = await new_Project.save()
        if (result) {
            return res.status(200).send({ success: true, msg: "new project created successfully!", data: result })
        } else {
            return res.status(400).send({ success: false, msg: "some error occured, please try again" });
        }
    } catch (error) {
        return res.status(400).send({ success: false, msg: "Unexpected Error occured" })
    }
}

const getProjects = async (req, res) => {
    try {
        const Projects = await Project.find({ created_by: req.body.created_by, deleted: false })
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
        console.log( { ...req.body })
        const result = await Project.findOneAndUpdate({ id: req.body.id }, {...req.body}, { new: true })
        if (result.length > 0) {
            return res.status(200).send({ success: true, msg: "data updated successfully", data: result })
        } else {
            return res.status(400).send({ success: false, msg: "no project found with this id", data: [] })
        }

    } catch (error) {

    }
}


module.exports = { newProject, getProjects,updateProject }