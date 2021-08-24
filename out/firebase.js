"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = exports.fb = void 0;
require("dotenv").config();
var app_1 = __importDefault(require("firebase/app"));
require("firebase/firestore");
var firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "fir-poc-59374.firebaseapp.com",
    projectId: "fir-poc-59374",
    storageBucket: "fir-poc-59374.appspot.com",
    messagingSenderId: "1000302268158",
    appId: "1:1000302268158:web:19c7c5c21e014741ce5faf",
    measurementId: "G-5LJERWFQ7B"
};
exports.fb = app_1.default.initializeApp(firebaseConfig);
exports.db = exports.fb.firestore();
