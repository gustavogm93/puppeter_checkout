

const visa_card_brands = [
"4766944332216006",
"4065503514846523",
]

const master_card_brands = [
"5215956400364553",
"5581168067405507",
"5581168067405507"
]

const payment_request_ids = [
    "9131e884-faf2-4416-ad26-4e29a8a8a0fd"
]

function generateRandomEmail() {
    const prefix = 'for_guest_tests';
    const randomString = Math.random().toString(36).substring(2, 10); 
    const domain = 'example.com'; 
    return `${prefix}_${randomString}@${domain}`;
}

const card_brands = [
    //VISA
...visa_card_brands,
...master_card_brands,
]


function generateTestRunId() {
    const currentDateInMs = Date.now();
    return `${currentDateInMs}_doble_Test`;
}
function generateTestCaseId(i) {
    const currentDateInMs = Date.now();
    return `test_case_${i.toString()}`;
}

function getCard (){
return card_brands
}
function getPaymentRequestId (){
    return payment_request_ids
    }






//For each por 8 generar array y obtener dee array lo que no se puede



module.exports = { getCard, generateRandomEmail, getPaymentRequestId, generateTestCaseId, generateTestRunId }


//completed_tests/test_runs/test_run_164676746/1313213213 imagenes 