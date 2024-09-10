export function getCurrencySymbol(currency: string) {

    if (currency == 'BRL') return 'R$';
    else if(currency == 'GBP') return '£';
    else if(currency == 'USD') return '$';
    else if(currency == 'EUR') return '€';
    else return '?';
}
