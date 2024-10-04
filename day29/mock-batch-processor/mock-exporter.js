const mockExporter = (tasks, callback) => {
    Promise.all(
        tasks.map((task) => {
            return new Promise((resolve) => {
                console.log(task);
                resolve();
            });
        }),
    ).finally(() => {
        console.log('---finish export!!');
        callback();
    });
};

module.exports = {
    mockExporter,
};
