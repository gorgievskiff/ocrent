"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkedDisabledValuesInterval = exports.checkDisabledHoursAndMinutes = exports.createDisabledTime = void 0;
const index_1 = require("./index");
const input_1 = require("./input");
/* eslint-disable no-else-return */
const createDisabledTime = (options) => {
    if (!options)
        return;
    const { disabledTime, clockType } = options;
    if (!disabledTime || Object.keys(disabledTime).length <= 0 || disabledTime.constructor.name !== 'Object') {
        return;
    }
    const { hours, interval, minutes } = disabledTime;
    if (interval) {
        delete disabledTime.hours;
        delete disabledTime.minutes;
        const [first, second] = interval.toString().split('-');
        const { hour: startHour, minutes: startMinutes, type: startType, } = input_1.getInputValue({ value: first.trimEnd() }, clockType);
        const { hour: endHour, minutes: endMinutes, type: endType, } = input_1.getInputValue({ value: second.trimEnd().trimStart() }, clockType);
        let rangeArrHour = index_1.range(startHour, endHour).map((e) => e === '00' || Number(e) === 0 ? `0${Number(e)}` : `${Number(e)}`);
        const removedHours = [];
        const numberStartMinutes = Number(startMinutes);
        const numerEndMinutes = Number(endMinutes);
        if (endType === startType) {
            if (numberStartMinutes > 0 && numerEndMinutes <= 0) {
                removedHours.push(rangeArrHour[0], rangeArrHour[rangeArrHour.length - 1]);
                rangeArrHour = rangeArrHour.slice(1, -1);
            }
            else if (numerEndMinutes < 59 && numerEndMinutes > 0 && numberStartMinutes <= 0) {
                removedHours.push(undefined, rangeArrHour[rangeArrHour.length - 1]);
                rangeArrHour = rangeArrHour.slice(0, -1);
            }
            else if (numerEndMinutes > 0 && numberStartMinutes > 0) {
                removedHours.push(rangeArrHour[0], rangeArrHour[rangeArrHour.length - 1]);
                rangeArrHour = rangeArrHour.slice(1, -1);
            }
            else if (numerEndMinutes === 0 && numberStartMinutes === 0) {
                removedHours.push(undefined, rangeArrHour[rangeArrHour.length - 1]);
                rangeArrHour.pop();
            }
            return {
                value: {
                    removedStartedHour: Number(removedHours[0]) <= 9 ? `0${removedHours[0]}` : removedHours[0],
                    removedEndHour: Number(removedHours[1]) <= 9 ? `0${removedHours[1]}` : removedHours[1],
                    rangeArrHour,
                    isInterval: true,
                    startMinutes: index_1.range(startMinutes, 59).map((e) => Number(e) <= 9 ? `0${e}` : `${e}`),
                    endMinutes: index_1.reverseRange(0, endMinutes).map((e) => Number(e) <= 9 ? `0${e}` : `${e}`),
                    endType,
                    startType,
                },
            };
            // eslint-disable-next-line no-else-return
        }
        else {
            const amHours = index_1.range(startHour, 12).map(String);
            const pmHours = index_1.reverseRange(1, endHour).map(String);
            const removedPmHours = [];
            const removedAmHours = [];
            if (numberStartMinutes > 0 && numerEndMinutes <= 0) {
                removedPmHours.push(pmHours[pmHours.length - 1]);
                removedAmHours.push(amHours[0]);
                pmHours.splice(-1, 1);
                amHours.splice(0, 1);
            }
            else if (numerEndMinutes < 59 && numerEndMinutes > 0 && numberStartMinutes <= 0) {
                removedAmHours.push(amHours[0]);
                removedPmHours.push(pmHours[pmHours.length - 1]);
                pmHours.splice(-1, 1);
            }
            else if (numerEndMinutes > 0 && numberStartMinutes > 0) {
                removedPmHours.push(pmHours[pmHours.length - 1]);
                removedAmHours.push(amHours[0]);
                pmHours.splice(-1, 1);
                amHours.splice(0, 1);
            }
            else if (numerEndMinutes === 0 && numberStartMinutes === 0) {
                removedPmHours.push(pmHours[pmHours.length - 1]);
                removedAmHours.push(amHours[0]);
                pmHours.pop();
            }
            return {
                value: {
                    isInterval: true,
                    endType,
                    startType,
                    pmHours,
                    amHours,
                    startMinutes: Number(startMinutes) === 0
                        ? []
                        : index_1.range(startMinutes, 59).map((e) => (Number(e) <= 9 ? `0${e}` : `${e}`)),
                    endMinutes: index_1.reverseRange(0, endMinutes).map((e) => Number(e) <= 9 ? `0${e}` : `${e}`),
                    removedAmHour: Number(removedAmHours[0]) <= 9 ? `0${removedAmHours[0]}` : removedAmHours[0],
                    removedPmHour: Number(removedPmHours[0]) <= 9 ? `0${removedPmHours[0]}` : removedPmHours[0],
                },
            };
        }
    }
    else {
        hours === null || hours === void 0 ? void 0 : hours.forEach((e) => {
            if (clockType === '12h' && Number(e) > 12) {
                throw new Error('The disabled hours value has to be less than 13');
            }
            if (clockType === '24h' && Number(e) > 23) {
                throw new Error('The disabled hours value has to be less than 24');
            }
        });
        minutes === null || minutes === void 0 ? void 0 : minutes.forEach((e) => {
            if (Number(e) > 59) {
                throw new Error('The disabled minutes value has to be less than 60');
            }
        });
        return {
            value: {
                hours: hours === null || hours === void 0 ? void 0 : hours.map((e) => e === '00' || Number(e) === 0 ? `0${Number(e)}` : `${Number(e)}`),
                minutes: minutes === null || minutes === void 0 ? void 0 : minutes.map((e) => (Number(e) <= 9 ? `0${e}` : `${e}`)),
            },
        };
    }
};
exports.createDisabledTime = createDisabledTime;
const checkDisabledHoursAndMinutes = (value, type, clockType, arrValue) => {
    if (!value)
        return;
    if (Array.isArray(value) && value.length > 0) {
        const checkArr = value.map((e) => input_1.handleValueAndCheck(e, type, clockType));
        if (checkArr.some((e) => e === false)) {
            return false;
        }
        return true;
    }
    else if (typeof value === 'string' || typeof value === 'number') {
        const isValid = input_1.handleValueAndCheck(value, type, clockType);
        const isIncludes = arrValue === null || arrValue === void 0 ? void 0 : arrValue.map(Number).includes(Number(value));
        if (isValid && !isIncludes) {
            return true;
        }
        return false;
    }
};
exports.checkDisabledHoursAndMinutes = checkDisabledHoursAndMinutes;
const checkedDisabledValuesInterval = (hour, minutes, type, interval) => {
    const actualTime = type ? index_1.timeConversion(`${hour}:${minutes} ${type}`.trim()) : `${hour}:${minutes}`.trim();
    let getFirstTime;
    let getSecondTime;
    if (!type) {
        const [first, second] = interval.trim().split('-');
        const normalizeValue = (str) => str
            .trim()
            .split(':')
            .map((e) => (Number(e) <= 9 ? `0${Number(e)}` : e))
            .join(':');
        getFirstTime = normalizeValue(first);
        getSecondTime = normalizeValue(second);
    }
    else {
        const [first, second] = interval
            .trim()
            .split('-')
            .map((e) => e.trim());
        getFirstTime = index_1.timeConversion(first);
        getSecondTime = index_1.timeConversion(second);
    }
    return actualTime < getFirstTime || actualTime > getSecondTime;
};
exports.checkedDisabledValuesInterval = checkedDisabledValuesInterval;
