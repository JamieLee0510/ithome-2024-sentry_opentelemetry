const mockExporter = (tasks, callback) => {
    Promise.all(
        tasks.map((task) => {
            return new Promise((resolve) => {
                console.log(task);
                resolve();
            });
        }),
    ).finally(() => {
        callback();
    });
};
