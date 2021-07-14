// const { renderVueApp } = require("./src/vueRenderer")
const { renderCeres } = require("./src/ceresRenderer")

let response

exports.lambdaHandler = async (event, context) => {
    try {
        // const html = await renderVueApp()
        const ceresHTML = await renderCeres()

        response = {
            'statusCode': 200,
            'body': JSON.stringify({
                ceresHTML
            })
        }

        // response = {
        //     statusCode: 200,
        //     body: JSON.stringify(obj),
        //     headers: {
        //         "content-type": [{ 
        //             key: "Content-Type",
        //             value: "application/json charset=utf-8"
        //         }]
        //     }
        // }
    } catch (err) {
        console.log(err)
        return err
    }

    return response
}
