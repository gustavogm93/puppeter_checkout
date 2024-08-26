const { DEV, API } = require("../constants/environment");
const CreateCheckout = require("./createCheckout");
const fetch = require("node-fetch");

class CreateCheckoutV2 extends CreateCheckout {
  constructor(env) {
    super();
    this.env = env;
    this.url = API.V2[env];
  }

  generateBody(data) {
    try {
      const { currency, amount, email, phone } = data;

      const raw = JSON.stringify({
        amount: amount,
        currency: currency,
        purchase_description: "Hamburguesas 2x1 + 50% descuento & envío gratis",
        redirection_url: {
          success: "https://www.clip.mx/success",
          error: "https://www.clip.mx/error",
          default: "https://merchant_ecoomerce.com",
        },
        override_settings: {
          locale: "es-MX",
          tip_enabled: true,
          currency: {
            show_currency_code: false,
          },
          merchant_info: {
            show_contact_info: true,
          },
        },
        expires_at: "2024-10-26T13:17:00Z",
        metadata: {
          me_reference_id: "HXO-000-043",
          customer_info: {
            name: "Dong Hyun Lee",
            email: email,
            phone: phone,
            matricula: "XXXX2",
          },
          shipping_address: {
            zip_code: "05200",
            street: "Héctor Victoria",
            outdoor_number: "54",
            interior_number: "Villa Hermosa 123",
            locality: "San José de los Cedros",
            city: "Cuajimalpa de Morelos",
            state: "Ciudad de México",
            country: "mx",
            reference: "Portón negro",
            between_streets: "Entre calle 1 y calle 3",
            floor: "1",
          },
          billing_address: {
            zip_code: 5200,
            street: "Héctor Victoria",
            outdoor_number: "54",
            interior_number: "Villa Herm",
            locality: "San José de los Cedros",
            city: "Cuajimalpa de Morelos",
            state: "Ciudad de México",
            country: "mx",
            reference: "Portón negro",
            between_streets: "Entre calle 1 y calle 3",
            floor: "1",
          },
          source: "xo-hosted",
        },
        custom_payment_options: {
          tip_enabled: true,
          payment_method_types: ["cash", "credit", "debit"],
        },
      });
      return raw;
    } catch (error) {
      console.error(e);
      throw new Error("Error at generateBodyCheckoutV2" + e.toString());
    }
  }

  generateHeader() {
    try {
      const myHeaders = new fetch.Headers();
      const envToken = this.env === DEV ? "AUTH_DEV" : "AUTH_STAGE";
      const token = process.env[envToken];
      myHeaders.append("Authorization", token);
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append(
        "Cookie",
        "visid_incap_2787157=b/3WrsQTRxuud3JivBXm6S2W2mMAAAAAQUIPAAAAAAAFjOYHyzNmNV7vDyJ8+m1g; visid_incap_2822146=2BH5qV/HRr2sVxPWQUzmb3QsbGQAAAAAQUIPAAAAAAAaDh5r1MNNFZ1/UOrwtZQo; visid_incap_2823212=ad1NxNgST0abc6aY/OsrmVex2WMAAAAAQUIPAAAAAACf91S5wJlOFHEMJUgbeToK; visid_incap_2841629=ud5F57bbSfazqY5BAvUrt0ux2WMAAAAAQUIPAAAAAAB70r13RzKGJpkZjyoYmfI1; __cf_bm=cY1eemlLnDSKKYx3MTKabLft1mxDctiBCumXQB7Rz9s-1723053748-1.0.1.1-jPtk5PU_MgUqsSmIky7LCMY2prjOkHK5Nvcjr7ewgVDfX.5vA_mkoJ49Qz4lF29MdsZ9K58td86JSjxb5Yqnbw"
      );
      return myHeaders;
    } catch (e) {
      console.error(e);
      throw new Error("Error at generateHeadersCheckoutV2" + e.toString());
    }
  }

  getUrl() {
    return this.url;
  }
}

module.exports = CreateCheckoutV2;
