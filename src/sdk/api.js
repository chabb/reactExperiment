export  const fetchFakeData = () => {
  return fetch('/scene.json').then(function(response) {
    return response.json();
  });
};
