export default async function (req, res) {
    fetch('http://localhost:8080/api/collections/get/New?token=e1db7ce1a87b0ec6291162e4fca107', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(result => res.json(result));
}