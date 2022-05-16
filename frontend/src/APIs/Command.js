import axios from "axios";

const SendAudio = (data, setStatus) => {
  const url = "http://localhost:4000/api/command/jim/";

  const config = {
  };

  const body = {
    command: data,
  };

  axios
    .post(url, body, config)
    .then(function (response) {
      console.log(response);
      setStatus((response.data.status))
    })
    .catch(function (error) {
      console.log(error);
    });
};

export default SendAudio;
