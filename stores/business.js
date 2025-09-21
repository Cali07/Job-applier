// stores/business.js
import { defineStore } from 'pinia';

export const useBusinessStore = defineStore('business', {
    state: () => ({
        isOnboarded: false,
        business: {
            name: 'BeasyLink',
            address: '1710 Duvhapark x8, Emalahleni, Mpumalanga - 1034, South Africa',
            mobile: '0835210920',
            email: 'mlilocalistas@gmail.com',
            logo: '', // Base64 logo
            bank: {
                accountNumber: '10145270678',
                holder: 'MR Mlilo',
                bankName: 'Standard Bank',
                bankCode: '9006',
                address: 'Mall of Africa',
            },
            terms: '75% Upfront is Required',
        },
        quotations: [],
        invoices: [],
        nextQuoteSerial: 1,
        nextInvoiceNumber: 1,
    }),
    actions: {
        saveBusinessDetails(details) {
            this.business = { ...this.business, ...details };
            this.isOnboarded = true;
            localStorage.setItem('businessData', JSON.stringify(this.$state));
        },
        loadBusinessDetails() {
            const saved = localStorage.getItem('businessData');
            if (saved) {
                this.$state = JSON.parse(saved);
            }
        },
        addQuotation(quotation) {
            quotation.total = quotation.items.reduce((sum, i) => sum + (i.quantity * i.price), 0);
            this.quotations.push({ ...quotation, serial: this.nextQuoteSerial++ });
            localStorage.setItem('businessData', JSON.stringify(this.$state));
        },
        addInvoice(invoice) {
            invoice.total = invoice.items.reduce((sum, i) => sum + (i.quantity * i.price), 0);
            this.invoices.push({ ...invoice, number: this.nextInvoiceNumber++ });
            localStorage.setItem('businessData', JSON.stringify(this.$state));
        }
    },
});
