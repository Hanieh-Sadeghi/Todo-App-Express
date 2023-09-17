const fs = require('fs');
const path = require('path');

const todosPath = path.join(__dirname, '/db.json')

function read_data(callBack) {
    fs.readFile(todosPath, 'utf-8', (error, data) => {
        if (error) return callBack('', error);
        json_data = JSON.parse(data);
        callBack(json_data, '');
    })
}

function write_data(data, callBack) {
    fs.writeFile(todosPath, JSON.stringify(data), (res, err) => {
        if (callBack) callBack(res, err);
    });
}


function checkToken(token, callBack) {
    read_data((data, error) => {
        var status = false;
        var user;
        data.forEach(element => {
            if (element.token == token) return status = true, user = element;
        })
        callBack(status, user, data);
    });
}

module.exports = {
    read_data,
    write_data,
    checkToken,
};
