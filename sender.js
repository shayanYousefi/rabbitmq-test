var amqp = require('amqplib/callback_api');

amqp.connect(`amqp://${process.env.RABBIT_HOST}:${process.env.RABBIT_PORT}`, function (error0, connection) {
    if (error0) {
        throw error0;
    }
    let eventRepeater;
    let counter = 1;
    connection.createChannel(function (error1, channel) {
        if (error1) {
            throw error1;
        }

        let queue = process.env[`question-file-link`];
        let msg = {
            examId: 'rabbit-examId',
            questionFileLink: 'rabbit-questionFileLink'
        };

        channel.assertQueue(queue, {
            durable: false
        });
        eventRepeater = setInterval(() => {
            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(`[messageCount:${counter++}] Sent ${JSON.stringify(msg)} to ${queue}`);
        }, 3000)

    });

});