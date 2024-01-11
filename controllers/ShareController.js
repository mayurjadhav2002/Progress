const Share = require("../models/Share");
const { InviteMail } = require("../config/mails");

const shareController = async (req, res) => {
    try {
        const shareInstance = new Share({
            created_by: req.body.userId,
            sharing: req.body.sharing,
            shared_with: req.body.shared_with,
            shared_resource_id: req.body.shared_resource_id
        });

        const data = await InviteMail({
            project_name: req.body.project_name,
            token: req.body.resource_token,
            unique_key: shareInstance.unique_key,
            by: req.body.userName,
            email: req.body.shared_with
        });

        if (data) {
            const result = await shareInstance.save();

            if (result) {
                return res.status(200).send({ success: true, msg: "Invitation Sent" });
            } else {
                return res.status(500).send({ success: false, msg: "Error saving share instance" });
            }
        }

    } catch (error) {
        console.error("Error occurred while sharing:", error);
        return res.status(500).send({ success: false, msg: "Internal Error occurred", data: [] });
    }
}

module.exports = { shareController };
