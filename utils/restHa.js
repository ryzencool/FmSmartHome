import axios from "axios";

function postHa(url, data) {
  return axios({
    method: "post",
    url: url,
    headers: {
      Authorization:
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiI5NzEzMjBjNTdhMTY0OTRjYTU1Zjc5MjUxZjgzNGRkMyIsImlhdCI6MTY3MDgyNzU5MCwiZXhwIjoxOTg2MTg3NTkwfQ.M0j4Vneomw3Ur7qGAzQNJoDl_99MNTaG5FQrgqL0jX4",
      "Content-Type": "application/json",
    },
    data: data,
  });
}

function callService() {
  postHa("http://localhost:8123/api/services/light/turn_on", {
    entity_id: "light.0x001788010c6a0f20",
  }).then((res) => {
    console.log(res);
  });
}

export { callService };
