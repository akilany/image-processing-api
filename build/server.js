"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var PORT = 3333;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use((0, morgan_1.default)('dev'));
// Router
app.use('/api', index_1.default);
app.get('/', function (req, res) {
    res
        .status(200)
        .send('<h1>Image Processing API</h1><a href="/api/image">Visit Image API</a>');
});
// Server
app.listen(PORT, function () {
    console.log("Server is listning on port: http://localhost:".concat(PORT));
});
exports.default = app;
