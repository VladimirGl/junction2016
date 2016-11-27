
const data = require('./data');
module.exports = function (app) {

  app.get("/api/data", (req, res)=>{
    res.send(data);
  });
};
