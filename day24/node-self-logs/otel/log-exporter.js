class MockLogExporter {
    export(log) {
        console.log('Exporting log:', log);
    }
}

module.exports = {
    MockLogExporter,
};
