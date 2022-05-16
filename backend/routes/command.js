const wordSplit = require("../APIs/TLexPlus");

const jimCommand = async (req, res) => {

    let word = await wordSplit(req.body.command);
    if (word.includes("จิม")){
      res.send({ status: "happy" });
    }else{
      res.send({ status: "sad" });
    }  
  }

module.exports = jimCommand