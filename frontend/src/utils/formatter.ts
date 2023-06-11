export function formatPhone(phone: string): string {
    return phone.replace(
        /(\d{2})(\d{3})(\d{3})(\d{4})/, '$1 $2 $3 $4'
    );
}

export function formatIdentificationNumber(
    identification: string
): string {
    return Intl.NumberFormat('es-CO').format(
        parseInt(identification)
    );
}

export function formatCurrency(amount: number): string {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP'
    }).format(amount);
}