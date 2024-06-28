export async function sendSms(data) {
    await fetch("http://ippanel.com/api/select", {
        method: 'post',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    })
}