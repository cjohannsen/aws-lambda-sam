const Vue = require("vue")
const { createRenderer } = require("vue-server-renderer")

const vueApp = new Vue({
    template: `<div><h1>Hello World! Today is {{ date }} and time is {{ time }}.</h1></div>`,
    data() {
        return {
            date: new Date().toDateString(),
            time: new Date().toTimeString()
        }
    }
})

exports.renderVueApp = async () => { 
    const ssrResponse = await new Promise((resolve, reject) => {
        createRenderer().renderToString(vueApp, (err, html) => {
            resolve(html)
        })
    });

    return ssrResponse;
}
