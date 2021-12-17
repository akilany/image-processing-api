"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var imageRouter_1 = __importDefault(require("./api/imageRouter"));
var router = express_1.default.Router();
router.route('/').get(function (req, res) {
    res.send('<h1>Main API Route</h1><a href="/api/image">Visit Image API</a>');
});
router.use('/image', imageRouter_1.default);
exports.default = router;
