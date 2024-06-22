export const ORDER_STATUSES = Object.freeze({
    PROCESSING: {
        name: "processing",
        persian: "در حال پردازش",
        prev: null,
        next: "CONFIRMATION",
        progress: 16
    },
    CONFIRMATION: {
        name: "confirmation",
        persian: "تایید سفارش",
        prev: "PROCESSING",
        next: "COLLECT",
        progress: 32
    },
    COLLECT: {
        name: "collect",
        persian: "جمع آوری محصولات",
        prev: "CONFIRMATION",
        next: "SENDING",
        progress: 48
    },
    SENDING: {
        name: "sending",
        persian: "در حال ارسال",
        prev: "COLLECT",
        next: "ON_THE_WAY",
        progress: 64
    },
    ON_THE_WAY: {
        name: "on_the_way",
        persian: "در مسیر مقصد",
        prev: "SENDING",
        next: "DELIVERY",
        progress: 80
    },
    DELIVERY: {
        name: "delivery",
        persian: "تحویل داده شده",
        prev: "ON_THE_WAY",
        next: null,
        progress: 100
    },
    RETURNED: {
        name: "returned",
        persian: "مرجوع شده",
        prev: null,
        next: null,
        progress: null
    },
    CANCELED: {
        name: "canceled",
        persian: "لغو شده",
        prev: null,
        next: null,
        progress: null
    },
})