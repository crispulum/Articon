const token = "eyJhbGciOiJIUzI1NiJ9.eyJyb2xlcyI6IiIsInN1YmplY3RfYXBwbGljYXRpb24iOiI4YmExNGJhYi05ZjY0LTRlM2ItOGMxZC0xMmNmZjdlMDJhMGYiLCJleHAiOjE2OTY5OTAyOTksImlhdCI6MTY5NjM4NTQ5OSwiYXVkIjoiOGJhMTRiYWItOWY2NC00ZTNiLThjMWQtMTJjZmY3ZTAyYTBmIiwiaXNzIjoiR3Jhdml0eSIsImp0aSI6IjY1MWNjOWRiMzlhNjllMDAwZDhhNzVjOSJ9.ZzuKLJDzk0lkVVXMTlG_3-gvE5wnpb_SbgEi0t_wN1M";
const apiUrl = 'https://api.artsy.net/api/artists/andy-warhol';


fetch(apiUrl, {
    method: 'GET',
    headers: {
        'X-Xapp-Token': token,
    },
})
    .then(function (response) {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(function (data) {
        // Handle the data (data contains the response from the API)
        console.log(data);
    })
    .catch(function (error) {
        // Handle errors
        console.error('There was a problem with the fetch operation:', error);
    });