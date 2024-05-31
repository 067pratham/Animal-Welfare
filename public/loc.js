const btn=document.getElementById('search-location');
btn.addEventListener('click',()=>{
    navigator.geolocation.getCurrentPosition(success,error);
})

function success(po){
    let lat=po.coords.latitude;
    let lng=po.coords.longitude;
    const url = `https://us1.locationiq.com/v1/reverse?key=pk.0cb2e2b0f57f9563ee3fa48165d82d6f&lat=${lat}&lon=${lng}&format=json&`;
fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    // Handle the API response data here
    let ipt= document.getElementById('pincode');
    console.dir(ipt);
    ipt.value=data.address.postcode;
  })
  .catch(error => {
    // Handle errors here
    console.error('There was a problem with the fetch operation:', error);
  });
  }
  function error(){
    console.log("ERROR HE BHAI");
  }