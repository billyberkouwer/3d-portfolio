export default async function fetchNextAPI() {
    fetch('/api/getContent/')
    .then(response => response.json())
    .then(result => console.log(result));
};