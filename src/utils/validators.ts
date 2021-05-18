export const ccValidator = (cardNumber: string) => {
    var regex = new RegExp("^[0-9]{16}$");
    if (!regex.test(cardNumber))
        return false;
    return true
}