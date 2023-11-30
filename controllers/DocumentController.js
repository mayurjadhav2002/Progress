const Documentation = require('../models/Documentation')

const getDocumentsByFolder = async (req, res) => {
    try {
        const result = await Documentation.find({ created_by: req.body.userId, 'group.name': req.body.folder });
        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const getAllFolder = async (req, res) => {
    try {
        const userId = req.body.userId;

        const distinctGroupNames = await Documentation.distinct('group.name', { created_by: userId });

        res.status(200).json(distinctGroupNames);
    } catch (error) {
        console.error('Error fetching distinct group names:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


const getSharedFolderNames = async (req, res) => {
    try {
        const userId = req.body.userId; // Replace with the actual property containing the userId in your request

        const result = await Documentation.find({
            shared_with: userId,
        });

        res.status(200).json(result);
    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const CreateDocument = async (req, res) => {
    try {
        const request = new Documentation({
            created_by: req.body.userid,
            document_title: req.body.document_title,
            document: req.body.document,
            published: req.body.published
        });
        const data = await request.save()
        if (data) {
            return res.status(200).send({ success: true, msg: "new doc created", data: data })
        }
        else {
            return res.status(201).send({ success: false, msg: "Some error occured" })
        }
    } catch (error) {
        console.log("Error occured while creating new doc", error)
        throw new Error()
    }
}

const UpdateDocument = async (req, res) => {
    try {

        const result = await Documentation.findOneAndUpdate({ _id: req.params.doc_id, created_by: req.params.created_by },
            { ...req.body }, { new: true })
        if (result) {
            return res.status(200).send({ success: true, msg: "Documentation Updated", data: result })
        }
        else {
            return res.status(201).send({ success: false, msg: "Some error occured" })
        }
    } catch (error) {
        console.log("Error occured while creating new doc", error)
        throw new Error()
    }
}


const ShareDocument = async (req, res) => {
    try {
        const result = await Documentation.findByIdAndUpdate({})
    } catch (error) {
        console.log("Error occured while creating new doc", error)
        throw new Error()
    }
}

module.exports = { CreateDocument, UpdateDocument, getDocumentsByFolder, getAllFolder, getSharedFolderNames, ShareDocument }