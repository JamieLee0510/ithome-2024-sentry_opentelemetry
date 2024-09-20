const sleep = (ms) =>
    new Promise((resolve, _) => {
        setTimeout(() => {
            resolve();
        }, ms);
    });

module.exports = {
    sleep,
};
