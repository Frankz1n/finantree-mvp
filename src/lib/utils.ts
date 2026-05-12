export const formatCurrency = (
    amount: number,
    locale: string = 'en-US',
    currency: string = 'USD',
) => {
    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    }).format(amount);
};
