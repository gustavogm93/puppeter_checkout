class ExcelDTO {
    constructor(card_brand, email, phone, pr_id, payment_flow, amount, pr_type, status_test)
    {
            this.card_brand = card_brand
            this.email = email
            this.phone = phone
            this.pr_id = pr_id
            this.payment_flow = payment_flow
            this.amount = amount
            this.pr_type = pr_type
            this.status_test = status_test
    }
        
    convertToExcelParseableData() {
        return [this.card_brand,
            this.email,
            this.phone,
            this.pr_id,
            this.payment_flow,
            this.amount,
            this.pr_type,
            this.status_test,
        ]
    }

}