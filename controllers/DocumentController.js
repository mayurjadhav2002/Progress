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

const getAllDocuments = async (req, res) => {
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
        const distinctGroupNames = await Documentation.distinct('group.name', { created_by: userId });
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
        console.log(req.body)
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
    console.log(req.body)
    try {
        const result = await Documentation.findOne({
            docID: req.body.docID,
            created_by: req.body.created_by,
            deleted: false
        });

        if (result) {
            return res.status(200).send({ success: true, msg: "Document Fetched", data: result });
        } else {
            return res.status(201).send({ success: false, msg: "Document not found" });
        }
    } catch (error) {
        console.error("Error occurred while fetching the document", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
}



const getRecentlyEditedDoc = async (req, res) => {
    try {
        const userId = req.body.userId;

        // Get shared documents for the user
        const sharedDocs = await Documentation.find({
            shared_with: userId,
        });

        // Get recently edited documents based on UpdatedAt
        const recentlyEditedDocs = await Documentation.find({
            created_by: userId,
        }).sort({ updatedAt: 'desc' }).limit(10); // Adjust the limit as needed

        // Get all folder names
        let distinctGroupNames = await Documentation.distinct('group.name', {
            created_by: userId,
        });
        // Handle the case when there are no distinct group names
        if (distinctGroupNames.length === 0) {
            distinctGroupNames = ['main'];
        }
        // Handle other response scenarios based on your requirements

        return res.status(200).send({
            success: true,
            sharedDocs,
            recentlyEditedDocs,
            distinctGroupNames,
        });

    } catch (error) {
        console.error("Error occurred while fetching document details", error);
        return res.status(500).send({ success: false, msg: "Internal Server Error" });
    }
}




module.exports = { CreateDocument, UpdateDocument, getDocumentsByFolder, getAllFolder, getAllDocuments, getSharedFolderNames, ShareDocument, getDocumentById, getRecentlyEditedDoc }