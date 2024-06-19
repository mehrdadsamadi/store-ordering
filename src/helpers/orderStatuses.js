export const ORDER_STATUSES = Object.freeze({
    PROCESSING: {
        name: "processing",
        persian: "در حال پردازش",
        progress: 16
    },
    CONFIRMATION: {
        name: "confirmation",
        persian: "تایید سفارش",
        progress: 32
    },
    COLLECT: {
        name: "collect",
        persian: "جمع آوری محصولات",
        progress: 48
    },
    SENDING: {
        name: "sending",
        persian: "در حال ارسال",
        progress: 64
    },
    ON_THE_WAY: {
        name: "on_the_way",
        persian: "در مسیر مقصد",
        progress: 80
    },
    DELIVERY: {
        name: "delivery",
        persian: "تحویل داده شده",
        progress: 100
    },
    RETURNED: {
        name: "returned",
        persian: "مرجوع شده"
    },
    CANCELED: {
        name: "canceled",
        persian: "لغو شده"
    },
})