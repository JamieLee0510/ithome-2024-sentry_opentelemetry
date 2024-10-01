export const sleep = (ms) =>
    new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(), ms;
        });
    });
