import axios from 'axios';

const API_KEY = 'YOUR_UPCITEMDB_API_KEY'; // Replace with your actual API key
const API_URL = 'https://api.upcitemdb.com/prod/trial/lookup'; // Use the correct endpoint for your API key tier

const lookupCompany = async (barcode) => {
  try {
    const response = await axios.post(API_URL, {
      upc: barcode
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': API_KEY
      }
    });

    const product = response.data.items[0];
    return product.brand;
  } catch (error) {
    console.error('Error looking up the product:', error);
    return null;
  }
};
