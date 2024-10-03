const path = require('path');
const fs = require('fs');

const parseStack = (stack) => {
    const stackLines = stack.split('\n');

    // 過濾出來與應用程式相關的錯誤（避免與內部Node.js或模塊有關）
    const relevantLine = stackLines.find((line) => line.includes('at '));

    if (relevantLine) {
        const match = relevantLine.match(/at\s+(.+):(\d+):(\d+)/);
        if (match) {
            return {
                fileName: match[1],
                lineNumber: match[2],
                columnNumber: match[3],
            };
        }
    }
    return {
        fileName: 'Unknown',
        lineNumber: 'Unknown',
        columnNumber: 'Unknown',
    };
};

const getCodeSnippet = (fileName, errorLine) => {
    try {
        const fullPath = path.resolve(fileName);
        const fileContent = fs.readFileSync(fullPath, 'utf-8');
        const lines = fileContent.split('\n');

        return lines[errorLine - 1];
    } catch (err) {
        console.error('Error reading file:', fileName, err.message);
        return 'Unable to read code snippet';
    }
};

class SelfSentry {
    static setupExpressErrorHandler(expressApp) {
        expressApp.use(this._expressErrorHandler());
    }

    static _expressErrorHandler() {
        return (err, req, res, next) => {
            // 這邊就是處理Sentry上報error的邏輯，目前先console出來
            console.log('----in SelfSentry error middleware');
            //console.error(err.stack);

            const stackInfo = err.stack ? parseStack(err.stack) : {};

            if (stackInfo.fileName) {
                const errorSnippet = getCodeSnippet(
                    stackInfo.fileName,
                    stackInfo.lineNumber,
                );

                const errorRecord = {
                    errorType: err.name,
                    errorMsg: err.message,
                    errorFile: stackInfo.fileName,
                    errorCode: errorSnippet.trim(),

                    // TODO: 其他想記錄的屬性
                };
                console.error(errorRecord);
            }
            next(err);
        };
    }

    static _getCodeSnippet(fileName, errorLine) {
        try {
            const fullPath = path.resolve(fileName);
            const fileContent = fs.readFileSync(fullPath, 'utf-8');
            const lines = fileContent.split('\n');

            return lines[errorLine - 1];
        } catch (err) {
            console.error('Error reading file:', fileName, err.message);
            return 'Unable to read code snippet';
        }
    }
}

module.exports = {
    SelfSentry,
};
