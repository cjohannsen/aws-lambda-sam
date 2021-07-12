const { renderVueApp } = require("./src/vueRenderer")

let response

exports.lambdaHandler = async (event, context) => {
    try {
        const html = await renderVueApp()

        response = {
            statusCode: 200,
            body: html,
            headers: {
                "content-type": [{ 
                    key: "Content-Type",
                    value: "text/html charset=utf-8"
                }]
            }
        }
    } catch (err) {
        console.log(err)
        return err
    }

    return response
}
