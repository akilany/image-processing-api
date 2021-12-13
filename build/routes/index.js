"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageRouter_1 = __importDefault(require("./api/imageRouter"));
var routes = express_1.default.Router();
routes.get('/', function (req, res) {
    res.send('Main API Route');
});
routes.use('/image', imageRouter_1.default);
exports.default = routes;
