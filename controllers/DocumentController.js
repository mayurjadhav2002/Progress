const Documentation = require('../models/Documentation')

const getDocumentsByFolder = async (req, res) => {
    try {
        const result = await Documentation.find({ created_by: req.body.userId, 'group.name': req.body.folder });
        console.log(result)
        res.status(200).json(result);

    } catch (error) {
        console.error('Error fetching documents:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const getAllDocuments = async (req, res) => {
    console.log(req.body)
    try {
        const user = req.body.userId;
        const result = await Documentation.find({ created_by: user })
        return res.status(200).send({ success: true, message: "all documents fetched", data: result })
    } catch (error) {
        console.error('Error fetching distinct group names:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}
const getAllFolder = async (req, res) => {
    try {
        const userId = req.body.userId;
        console.log(req.body)
        const distinctGroupNames = await Documentation.distinct('group.name', { created_by: userId });
        console.log(distinctGroupNames)
        if (distinctGroupNames.length === 0) {
            return res.status(200).send({ data: ['main'] })
        }
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
        if (!req.body.userid) {
            return res.status(400).send({ success: false, msg: "User ID is required" });
        }

        const request = new Documentation({
            created_by: req.body.userid,
            // ... other fields
        });

        const data = await request.save();

        if (data) {
            return res.status(200).send({ success: true, msg: "New doc created", data: data });
        } else {
            return res.status(201).send({ success: false, msg: "Some error occurred" });
        }
    } catch (error) {
        console.log("Error occurred while creating new doc", error);
        return res.status(500).send({ success: false, msg: "Internal server error" });
    }
};


const UpdateDocument = async (req, res) => {
    try {
        const filter = { docID: req.body.doc_id, created_by: req.body.created_by };
        const update = { ...req.body };
        const options = { new: true, upsert: true };

        const result = await Documentation.findOneAndUpdate(filter, update, options);

        if (result) {
            return res.status(200).send({ success: true, msg: "Documentation Updated", data: result });
        } else {
            return res.status(201).send({ success: false, msg: "Some error occurred" });
        }
    } catch (error) {
        console.error("Error occurred while updating or creating doc", error);
        return res.status(500).send({ success: false, msg: "Internal server error" });
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


const getDocumentById = async (req, res) => {
    console.log("body", req.body);
    try {
        const result = await Documentation.find({
            docID: req.body.doc_id,
            created_by: req.body.created_by,
            deleted: false
        });
        console.log(result)
        if (result) {
            return res.status(200).send({ success: true, msg: "Document Fetched", data: result });
        } else {
            return res.status(201).send({ success: false, msg: "Some error occurred" });
        }
    } catch (error) {
        console.error("Error occurred while fetching the document", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
}

module.exports = { CreateDocument, UpdateDocument, getDocumentsByFolder, getAllFolder, getAllDocuments, getSharedFolderNames, ShareDocument, getDocumentById }