const puppeteer = require('puppeteer'); // v22.0.0 or later
const request_client = require('request-promise-native');

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setRequestInterception(true);
    const timeout = 5000;
    const result = [];

    page.setDefaultTimeout(timeout);

    {
        const targetPage = page;
        await targetPage.setViewport({
            width: 1093,
            height: 829
        })
    }
    {
        const targetPage = page;
       /*  targetPage.on('request', request => {
            request_client({
              uri: request.url(),
              resolveWithFullResponse: true,
            }).then(response => {
              const request_url = request.url();
              const request_headers = request.headers();
              const request_post_data = request.postData();
              const response_headers = response.headers;
              const response_size = response_headers['content-length'];
              const response_body = response.body;
        
              result.push({
                request_url,
                request_headers,
                request_post_data,
                response_headers,
                response_size,
                response_body,
              });
        
              console.log(result);
              request.continue();
            }).catch(error => {
              console.error(error);
              request.abort();
            });
          }); */

        const promises = [];
        const startWaitingForEvents = () => {
            promises.push(targetPage.waitForNavigation());
        }
        startWaitingForEvents();
        await targetPage.goto('https://dev-pago.payclip.com/9131e884-faf2-4416-ad26-4e29a8a8a0fd');
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Correo)'),
            targetPage.locator("[data-testid='contactDetailsForm-buyerEmail']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-buyerEmail\\"])'),
            targetPage.locator(":scope >>> [data-testid='contactDetailsForm-buyerEmail']")
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 194.5,
                y: 9,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Correo)'),
            targetPage.locator("[data-testid='contactDetailsForm-buyerEmail']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-buyerEmail\\"])'),
            targetPage.locator(":scope >>> [data-testid='contactDetailsForm-buyerEmail']")
        ])
            .setTimeout(timeout)
            .fill('fejaro1150@orsbap.com');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('V');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator("[data-testid='contactDetailsForm-wrap']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-wrap\\"])'),
            targetPage.locator(":scope >>> [data-testid='contactDetailsForm-wrap']"),
            targetPage.locator('::-p-text(Datos de contactoCorreofejaro1150@orsbap.com🇲🇽+52)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 9.5,
                y: 166,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator("[data-testid='contactDetailsForm-buyerMobile']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-buyerMobile\\"])'),
            targetPage.locator(":scope >>> [data-testid='contactDetailsForm-buyerMobile']")
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 127.5,
                y: 31.875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator("[data-testid='contactDetailsForm-buyerMobile']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"contactDetailsForm-buyerMobile\\"])'),
            targetPage.locator(":scope >>> [data-testid='contactDetailsForm-buyerMobile']")
        ])
            .setTimeout(timeout)
            .fill('11111111111');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator("[data-testid='switchCardCash-wrap']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"switchCardCash-wrap\\"])'),
            targetPage.locator(":scope >>> [data-testid='switchCardCash-wrap']"),
            targetPage.locator('::-p-text(Selecciona tu método de pagoNuevo)')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 1.5,
                y: 20.875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Número de tarjeta)'),
            targetPage.locator("[data-testid='cardHolderForm-cardNumber']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardNumber\\"])'),
            targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardNumber']")
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 43.5,
                y: 36.875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#__next'),
            targetPage.locator('::-p-xpath(//*[@id=\\"__next\\"])'),
            targetPage.locator(':scope >>> #__next')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 112,
                y: 535,
              },
            });
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down('Meta');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('Meta');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Número de tarjeta)'),
            targetPage.locator("[data-testid='cardHolderForm-cardNumber']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardNumber\\"])'),
            targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardNumber']")
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 112.5,
                y: 26.875,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Número de tarjeta)'),
            targetPage.locator("[data-testid='cardHolderForm-cardNumber']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardNumber\\"])'),
            targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardNumber']")
        ])
            .setTimeout(timeout)
            .fill('5215956400364553');
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up('V');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('#__next'),
            targetPage.locator('::-p-xpath(//*[@id=\\"__next\\"])'),
            targetPage.locator(':scope >>> #__next')
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 75,
                y: 564,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(MM/AA)'),
            targetPage.locator("[data-testid='cardHolderForm-cardExpirationDate']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardExpirationDate\\"])'),
            targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardExpirationDate']")
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 40.5,
                y: 50.75,
              },
            });
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(MM/AA)'),
            targetPage.locator("[data-testid='cardHolderForm-cardExpirationDate']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardExpirationDate\\"])'),
            targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardExpirationDate']")
        ])
            .setTimeout(timeout)
            .fill('03/44');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(CVV)'),
            targetPage.locator("[data-testid='cardHolderForm-cardCVV']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardCVV\\"])'),
            targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardCVV']")
        ])
            .setTimeout(timeout)
            .fill('345');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(Nombre en la tarjeta)'),
            targetPage.locator("[data-testid='cardHolderForm-cardName']"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"cardHolderForm-cardName\\"])'),
            targetPage.locator(":scope >>> [data-testid='cardHolderForm-cardName']")
        ])
            .setTimeout(timeout)
            .fill('FSDFSF FDDSFSDF');
    }
    {
        const targetPage = page;
        await puppeteer.Locator.race([
            targetPage.locator('::-p-aria(clip)'),
            targetPage.locator("[data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img"),
            targetPage.locator('::-p-xpath(//*[@data-testid=\\"paymentButton-ctaPrincipal\\"]/span[1]/img)'),
            targetPage.locator(":scope >>> [data-testid='paymentButton-ctaPrincipal'] > span:nth-of-type(1) > img")
        ])
            .setTimeout(timeout)
            .click({
              offset: {
                x: 11.1875,
                y: 5,
              },
            });
    }

    await browser.close();

})().catch(err => {
    console.error(err);
    process.exit(1);
});
