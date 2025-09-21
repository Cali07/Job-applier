import jsPDF from 'jspdf';

export default defineNuxtPlugin((nuxtApp) => {
    return {
        provide: {
            jsPDF: () => new jsPDF(),
        },
    };
});