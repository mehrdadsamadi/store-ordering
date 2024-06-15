import BuildingOfficeIcon from "@/components/icons/BuildingOfficeIcon";
import CreditCardIcon from "@/components/icons/CreditCardIcon";

export const PAYMENT_METHODS = Object.freeze({
    INTERNET: {
        name: "internet_payment",
        text: "پرداخت اینترنتی",
        icon: <CreditCardIcon />
    },
    SPOT: {
        name: "spot_payment",
        text: "پرداخت در محل (با کارت بانکی)",
        icon: <BuildingOfficeIcon />
    },
})