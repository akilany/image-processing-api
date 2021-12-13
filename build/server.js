"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var express_1 = __importDefault(require("express"));
var index_1 = __importDefault(require("./routes/index"));
var app = (0, express_1.default)();
var PORT = 3333;
app.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
app.use('/api', index_1.default);
app.listen(PORT, function () {
    console.log("Server is listning on port: http://localhost:".concat(PORT));
});
exports.default = app;
