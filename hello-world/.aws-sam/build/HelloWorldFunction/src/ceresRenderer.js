const fs = require("fs")
const { join } = require("path")
const minify = require("html-minifier").minify;
const zlib = require("zlib");
const { createRenderer } = require("vue-server-renderer")

const { initGlobals } = require("../assets/Ceres/globals.js")
initGlobals()
const { createApp } = require("../assets/Ceres/dist/ceres-server.js")


exports.renderCeres = async () => {
    const ssrResponse = await new Promise((resolve, reject) => {
        initGlobals()

        const context = {
            template: appTemplate,
        };
        createApp(context).then(vueApp => {
            const renderer = createRenderer()
            renderer.renderToString(vueApp, (err, html) => {
                if (err) throw err
                resolve(html)
            })
        });
    });

    return ssrResponse
}





// const context = {
//     template: appTemplate,
// };
// createApp(context).then(vueApp => {
//     console.log(vueApp)
//     return
//     const renderer = createRenderer()
//     renderer.renderToString(vueApp, (err, html) => {
//         if (err) throw err
//         console.log(html)
//     })
// });

// renderer.renderToString({}, (err, html) => {
//     if (err) throw err

    // let minified = minify(html, {
    //     caseSensitive: true,
    //     collapseWhitespace: true,
    //     preserveLineBreaks: true,
    //     removeAttributeQuotes: true,
    //     removeComments: true
    // })

    // const response = {
    //     status: "200",
    //     statusDescription: "OK",
    //     headers: {
    //         "content-type": [{
    //             key: "Content-Type",
    //             value: "text/html; charset=utf-8"
    //         }],
    //         "content-encoding": [{
    //             key: "Content-Encoding",
    //             value: "gzip"
    //         }]
    //     },
    //     body: zlib.gzipSync(minified).toString("base64"),
    //     bodyEncoding: "base64"
    // }

// })