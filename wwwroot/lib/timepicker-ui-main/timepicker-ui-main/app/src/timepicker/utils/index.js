"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.debounce = exports.timeConversion = exports.initCallback = exports.reverseRange = exports.range = exports.createObjectFromData = exports.getIncrementTimes = exports.getBrowser = exports.createNewEvent = exports.hasClass = exports.getMathDegIncrement = exports.getClickTouchPosition = exports.getRadians = exports.getScrollbarWidth = exports.getConfig = exports.typeCheckConfig = exports.isElement = exports.toType = void 0;
const toType = (obj) => {
    if (obj === null || obj === undefined) {
        return `${obj}`;
    }
    // @ts-ignore
    return {}.toString
        .call(obj)
        .match(/\s([a-z]+)/i)[1]
        .toLowerCase();
};
exports.toType = toType;
const isElement = (obj) => (obj[0] || obj).nodeType;
exports.isElement = isElement;
const typeCheckConfig = (componentName, config, configTypes) => {
    Object.keys(configTypes).forEach((property) => {
        const expectedTypes = configTypes[property];
        const value = config[property];
        const valueType = value && exports.isElement(value) ? 'el' : exports.toType(value);
        if (!new RegExp(expectedTypes).test(valueType)) {
            throw new Error(`${componentName.toUpperCase()}: ` +
                `Option "${property}" provided type "${valueType}" ` +
                `but expected type "${expectedTypes}".`);
        }
    });
};
exports.typeCheckConfig = typeCheckConfig;
const getConfig = (options, defaultOptions) => {
    const config = Object.assign(Object.assign({}, defaultOptions), options);
    return config;
};
exports.getConfig = getConfig;
const getScrollbarWidth = () => {
    const scrollDiv = document.createElement('div');
    scrollDiv.className = 'timepicker-ui-measure';
    document.body.appendChild(scrollDiv);
    const scrollbarWidth = scrollDiv.getBoundingClientRect().width - scrollDiv.clientWidth;
    document.body.removeChild(scrollDiv);
    return scrollbarWidth;
};
exports.getScrollbarWidth = getScrollbarWidth;
const getRadians = (el) => el * (Math.PI / 180);
exports.getRadians = getRadians;
const getClickTouchPosition = (event, object, isMobile = false) => {
    const { touches } = event;
    const { clientX, clientY } = event;
    if (!object)
        return;
    const { left, top } = object.getBoundingClientRect();
    let obj = { x: 0, y: 0 };
    if (touches === undefined) {
        obj = {
            x: clientX - left,
            y: clientY - top,
        };
    }
    else if (touches !== undefined && touches.length > 0) {
        if (Object.keys(touches).length > 0) {
            const { clientX: clx, clientY: cly } = touches[0];
            obj = {
                x: clx - left,
                y: cly - top,
            };
        }
    }
    if (Object.keys(obj).length === 0 && obj.constructor === Object)
        return;
    return obj;
};
exports.getClickTouchPosition = getClickTouchPosition;
const getMathDegIncrement = (degrees, num) => Math.round(degrees / num) * num;
exports.getMathDegIncrement = getMathDegIncrement;
const hasClass = (el, selector) => el ? el.classList.contains(selector) : false;
exports.hasClass = hasClass;
const createNewEvent = (el, eventName, value) => {
    if (!el)
        return;
    const ev = new CustomEvent(eventName, { detail: value });
    el.dispatchEvent(ev);
};
exports.createNewEvent = createNewEvent;
const getBrowser = () => /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
exports.getBrowser = getBrowser;
const getIncrementTimes = (degrees, type, count) => exports.getMathDegIncrement(degrees, type * count);
exports.getIncrementTimes = getIncrementTimes;
const createObjectFromData = (obj) => {
    if (!obj)
        return;
    const parse = JSON.parse(JSON.stringify(obj));
    const keys = Object.keys(parse);
    return Object.values(parse).reduce((acc, curr, index) => {
        if (Number(curr)) {
            acc[keys[index]] = Number(curr);
        }
        else if (curr === 'true' || curr === 'false') {
            acc[keys[index]] = JSON.parse(curr);
        }
        else {
            acc[keys[index]] = curr;
        }
        return acc;
    }, {});
};
exports.createObjectFromData = createObjectFromData;
const range = (start, stop) => Array.from({ length: Number(stop) - Number(start) + 1 }, (_, i) => Number(start) + i);
exports.range = range;
const reverseRange = (start, stop) => Array.from({ length: Number(stop) - Number(start) + 1 }, (_, i) => Number(stop) - i).reverse();
exports.reverseRange = reverseRange;
const initCallback = (callback) => {
    if (callback && typeof callback === 'function') {
        callback();
    }
};
exports.initCallback = initCallback;
const timeConversion = (str = '') => {
    const time = str.replace(/(AM|PM|am|pm)/, (match) => ` ${match}`);
    const date = new Date(`September 20, 2000 ${time}`);
    const hours = date.getHours().toString().padStart(2, '0');
    const mins = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${mins}`;
};
exports.timeConversion = timeConversion;
const debounce = (callback, timeout) => {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(...args);
        }, timeout);
    };
};
exports.debounce = debounce;
