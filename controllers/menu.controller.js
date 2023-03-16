const fs = require("fs");
const uuid = require("uuid");

const dataFile = process.cwd() + "/data/menu.json";

exports.getAll = (request, response) => {
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const savedData = JSON.parse(data);

        return response.json({ status: true, result: savedData });
    });
};

exports.create = (request, response) => {
    const { menuname, link } = request.body;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = JSON.parse(data);

        const newObj = { id: uuid.v4(), menuname, link };

        parsedData.push(newObj);

        fs.writeFile(dataFile, JSON.stringify(parsedData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr });
            }

            return response.json({ status: true, result: parsedData });
        });
    });
};

exports.update = (req, res) => {
    const { id, menuName, link, position } = request.body;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = JSON.parse(data);

        const updateData = parsedData.map((menuObj) => {
            if (menuObj.id == id) {
                return { ...menuObj, menuName, link, position };
            } else {
                return menuObj;
            }
        });

        fs.writeFile(dataFile, JSON.stringify(updateData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr });
            }

            return response.json({ status: true, result: updateData });
        });
    });
};

exports.delete = (req, res) => {
    const { id } = request.params;
    fs.readFile(dataFile, "utf-8", (readErr, data) => {
        if (readErr) {
            return response.json({ status: false, message: readErr });
        }

        const parsedData = JSON.parse(data);

        const deletedData = parsedData.filter((e) => e.id != id);

        fs.writeFile(dataFile, JSON.stringify(deletedData), (writeErr) => {
            if (writeErr) {
                return response.json({ status: false, message: writeErr });
            }

            return response.json({ status: true, result: deletedData });
        });
    });
};