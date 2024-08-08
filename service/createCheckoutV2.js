
const fetch = require("node-fetch");


function createCheckoutV2() {
const myHeaders = new fetch.Headers();
myHeaders.append("x-api-key", "Basic NzE0NGIxNjEtNDA3OS00MWQ1LWI3NzgtODMwZmIzYTU3Y2YwOjQxMjkyMWRjLTY3ZGMtNGU1Zi1hMzlkLWVmMzM0ZDIyZmFlZA==");
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Cookie", "visid_incap_2787157=b/3WrsQTRxuud3JivBXm6S2W2mMAAAAAQUIPAAAAAAAFjOYHyzNmNV7vDyJ8+m1g; visid_incap_2822146=2BH5qV/HRr2sVxPWQUzmb3QsbGQAAAAAQUIPAAAAAAAaDh5r1MNNFZ1/UOrwtZQo; visid_incap_2823212=ad1NxNgST0abc6aY/OsrmVex2WMAAAAAQUIPAAAAAACf91S5wJlOFHEMJUgbeToK; visid_incap_2841629=ud5F57bbSfazqY5BAvUrt0ux2WMAAAAAQUIPAAAAAAB70r13RzKGJpkZjyoYmfI1; __cf_bm=cY1eemlLnDSKKYx3MTKabLft1mxDctiBCumXQB7Rz9s-1723053748-1.0.1.1-jPtk5PU_MgUqsSmIky7LCMY2prjOkHK5Nvcjr7ewgVDfX.5vA_mkoJ49Qz4lF29MdsZ9K58td86JSjxb5Yqnbw");

const raw = JSON.stringify({
  "amount": 500,
  "currency": "MXN",
  "purchase_description": "Hamburguesas 2x1 + 50% descuento & envío gratis",
  "redirection_url": {
    "success": "https://www.clip.mx/success",
    "error": "https://www.clip.mx/error",
    "default": "https://merchant_ecoomerce.com"
  },
  "override_settings": {
    "locale": "es-MX",
    "tip_enabled": true,
    "currency": {
      "show_currency_code": false
    },
    "merchant_info": {
      "show_contact_info": true
    }
  },
  "expires_at": "2024-10-26T13:17:00Z",
  "metadata": {
    "me_reference_id": "HXO-000-043",
    "customer_info": {
      "name": "Dong Hyun Lee",
      "email": "ABC@gmail.com",
      "phone": "5212456721",
      "matricula": "XXXX2"
    },
    "shipping_address": {
      "zip_code": "05200",
      "street": "Héctor Victoria",
      "outdoor_number": "54",
      "interior_number": "Villa Hermosa 123",
      "locality": "San José de los Cedros",
      "city": "Cuajimalpa de Morelos",
      "state": "Ciudad de México",
      "country": "mx",
      "reference": "Portón negro",
      "between_streets": "Entre calle 1 y calle 3",
      "floor": "1"
    },
    "billing_address": {
      "zip_code": 5200,
      "street": "Héctor Victoria",
      "outdoor_number": "54",
      "interior_number": "Villa Herm",
      "locality": "San José de los Cedros",
      "city": "Cuajimalpa de Morelos",
      "state": "Ciudad de México",
      "country": "mx",
      "reference": "Portón negro",
      "between_streets": "Entre calle 1 y calle 3",
      "floor": "1"
    },
    "source": "xo-hosted"
  },
  "custom_payment_options": {
    "tip_enabled": true,
    "international_enabled": true,
    "installments_msi": [
      3,
      9
    ],
    "payment_method_brands": [
      "visa",
      "mastercard",
      "amex",
      "carnet",
      "diners"
    ],
    "payment_method_types": [
      "credit",
      "cash"
    ]
  }
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
  redirect: "follow"
};

fetch("https://testapi-gw.payclip.com/checkout/v2", requestOptions)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.error(error));


};

createCheckoutV2()

module.exports = { createCheckoutV2 }