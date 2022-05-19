const axios = require('axios')

const wordSplit = async (data) => {

  var splited = null

  const url = "https://api.aiforthai.in.th/tlexplus";

  const config = {
    headers:{
        Apikey : "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
        "Content-Type" : "application/x-www-form-urlencoded"
      }
  };

  const body = new URLSearchParams();
  body.append('text', data);

  try{
    const res = await axios.post(url, body, config)
    splited = res.data.tokens
  } catch(err){
    console.error(err);
  }

  return splited
};
module.exports = wordSplit
