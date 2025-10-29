const menu = document.querySelector("#mobile-menu");
const menuLinks = document.querySelector('.navbar__menu');

//let potentialMessages = ['N: 19.2 - <20 \n P: 25.6 - > 23.0 \n K: 23.7 - > 22 \n Your soil suffers from LOW NITROGEN: \n Please use composed sources, such as fruit and vegetable peels; vermin manure, and ammonium nitrate to replenish the nitrogen levels in the soil.', 'N: 21.5 - > 20 \n P: 20.6 - < 23.0 \n K: 25.6 - > 22 \n Your soil suffers from LOW POTASSIUM: \n Please use left over wood ash and coffee grounds to replenish potassium levels', 'N: 20.5 - > 20 \n P: 25.7 - > 23.0 \n K: 18.5 - < 22 \n Your soil suffers from LOW NITROGEN: \n Please use please use copper seed oil and temporarily use nitrogen fixing plants such as lemongrass'];

menu.addEventListener('click', function() {
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
});


async function getSoilData(lat, lon) {
  const url = `https://rest.isric.org/soilgrids/v2.0/properties/query?lat=${lat}&lon=${lon}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    /*
    // Extract some example soil properties
    const soilOrganicCarbon = data.properties.soilorganiccarbon?.depths[0]?.values?.mean;
    const phH2O = data.properties.phh2o?.depths[0]?.values?.mean;
    const sand = data.properties.sand?.depths[0]?.values?.mean;

    console.log("Soil Organic Carbon (0-5cm):", soilOrganicCarbon);
    console.log("pH (0-5cm):", phH2O);
    console.log("Sand % (0-5cm):", sand);
    */

    return data;/*{
      soilOrganicCarbon,
      phH2O,
      sand
    };*/
  } catch (error) {
    console.error('Failed to fetch soil data:', error);
    return null;
  }
}

async function getCoordinates(address) {
  const apiKey = 'b017c1f297284a28b8033688f30e8e7f'; // Replace with your OpenCage API key
  const encodedAddress = encodeURIComponent(address);
  const url = `https://api.opencagedata.com/geocode/v1/json?q=${encodedAddress}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results.length > 0) {
      const location = data.results[0].geometry;
      console.log('Coordinates:', location);
      console.log(getSoilData(13.0/*parseFloat(location.lat)*/, 77.6/*parseFloat(location.lon)*/));
      /*remove this*/ alert(getSoilData(13.0/*parseFloat(location.lat)*/, 77.6/*parseFloat(location.lon)*/))
      return location;
    }else{
      console.error('No results found.');
      return null;
    }
    }catch (error){
      console.error('Geocoding failed:', error);
      return null;
    }
}



/*
async function getSoilData() {
    const address = document.getElementById('address').value;
    const coords = await getCoordinates(address);
    if (coords) {
      alert(`Latitude: ${coords.lat}, Longitude: ${coords.lng}`);
      return `Latitude: ${coords.lat}, Longitude: ${coords.lng}`;
    } else {
      alert('Could not find coordinates. Check the address and try again.');
    }
  }
*/







//Form Handelling
let form = document.getElementById('form');
form.addEventListener('submit', function (event) {
  event.preventDefault() //prevents the form from autosubmitting --> prevents re-loading of page

  let address = document.getElementById('form-control').value; //this method only seems to work w/ ids and not classes

  console.log(address);
  console.log(encodeURIComponent(address));

  let addressLocation = getCoordinates(address); //it autoencodes the URI
  console.log(addressLocation);

  const para = document.getElementById("soilData");
  console.log(para.textContent);
  para.textContent = potentialMessages[Math.floor(Math.random() * 3)];
  console.log(para.textContent);
  const toggleThing = document.getElementById("data-popup");

  setTimeout(() => {
    // Code here runs after 2 seconds
    //alert(potentialMessages[Math.floor(Math.random() * 3)]);
    toggleThing.classList.toggle("toggleVisibility");
}, 2000); 
  //console.log(getSoilData());
});

