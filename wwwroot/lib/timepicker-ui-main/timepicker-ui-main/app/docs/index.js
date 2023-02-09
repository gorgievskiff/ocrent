"use strict";
/* eslint-disable import/no-extraneous-dependencies */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const timepicker_ui_1 = require("timepicker-ui");
const prismjs_1 = __importDefault(require("prismjs"));
require("prismjs/themes/prism.css");
require("prismjs/plugins/line-numbers/prism-line-numbers.css");
require("prismjs/plugins/line-highlight/prism-line-highlight.css");
prismjs_1.default.highlightAll();
// let basic = document.querySelector('.basic') as HTMLDivElement;
// const basicPicker = new TimepickerUI(basic, {
//   disabledTime: {
//     minutes: {
//       value: ['12', 5, '10', '3', '13', 44, '55', 33],
//     },
//     hours: {
//       value: [1, 9, '3', 4, 5, '12'],
//     },
//     interval: '6:00 AM - 10:00 PM',
//   },
// });
// basicPicker.create();
const currentDate = new Date();
currentDate.setMinutes(0);
const test = document.querySelector('.test');
const testPicker = new timepicker_ui_1.TimepickerUI(test, {
    currentTime: {
        time: currentDate,
        preventClockType: true,
    },
    focusTrap: true,
});
// const inputElement = test.querySelector('input') as HTMLInputElement;
// inputElement.value = new Date().toLocaleTimeString('en-us', { timeStyle: 'short' });
testPicker.create();
const test1 = document.querySelector('.test1');
// good
const testPicker1 = new timepicker_ui_1.TimepickerUI(test1, {
    currentTime: {
        time: new Date(),
        updateInput: true,
    },
});
testPicker1.create();
const test2 = document.querySelector('.test2');
// good
const testPicker2 = new timepicker_ui_1.TimepickerUI(test2, {
    currentTime: true,
});
testPicker2.create();
const test3 = document.querySelector('.test3');
// goood
const testPicker3 = new timepicker_ui_1.TimepickerUI(test3, {
    enableScrollbar: true,
    clockType: '24h',
    disabledTime: {
        minutes: [1, 2, 4, 55, '25'],
    },
});
testPicker3.create();
const test4 = document.querySelector('.test4');
// goood
const testPicker4 = new timepicker_ui_1.TimepickerUI(test4, {
    enableScrollbar: true,
    clockType: '24h',
    disabledTime: {
        interval: '5:30 - 21:30',
    },
});
testPicker4.create();
const test20 = document.querySelector('.test20');
// good
const testPicker20 = new timepicker_ui_1.TimepickerUI(test20, {
    disabledTime: {
        interval: '5:30 AM - 10:30 AM',
    },
});
testPicker20.create();
const test21 = document.querySelector('.test21');
// good
const testPicker21 = new timepicker_ui_1.TimepickerUI(test21, {
    disabledTime: {
        interval: '5:30 PM - 10:30 PM',
    },
});
testPicker21.create();
const test22 = document.querySelector('.test22');
// good
const testPicker22 = new timepicker_ui_1.TimepickerUI(test22, {
    disabledTime: {
        interval: '4:00 PM - 11:00 PM',
    },
});
testPicker22.create();
/// ///////////////////////////////////
const test23 = document.querySelector('.test23');
// good
const testPicker23 = new timepicker_ui_1.TimepickerUI(test23, {
    enableScrollbar: true,
    disabledTime: {
        interval: '4:00 AM - 5:00 PM',
    },
});
testPicker23.create();
const test24 = document.querySelector('.test24');
const testPicker24 = new timepicker_ui_1.TimepickerUI(test24, {
    enableScrollbar: true,
    disabledTime: {
        interval: '4:30 AM - 5:30 PM',
    },
});
testPicker24.create();
const test25 = document.querySelector('.test25');
const testPicker25 = new timepicker_ui_1.TimepickerUI(test25, {
    enableScrollbar: true,
    disabledTime: {
        interval: '4:00 AM - 5:50 PM',
    },
});
testPicker25.create();
const test26 = document.querySelector('.test26');
const testPicker26 = new timepicker_ui_1.TimepickerUI(test26, {
    enableScrollbar: true,
    disabledTime: {
        interval: '4:25 AM - 4:55 PM',
    },
});
testPicker26.create();
const test27 = document.querySelector('.test27');
const testPicker27 = new timepicker_ui_1.TimepickerUI(test27, {
    enableScrollbar: true,
    disabledTime: {
        interval: '4:25 AM - 4:00 PM',
    },
});
testPicker27.create();
// const arr: OptionTypes[] = [
//   { mobile: true, backdrop: true, amLabel: 'Test' },
//   { mobile: false, amLabel: 'Not Test', pmLabel: 'test' },
//   { mobile: false, backdrop: false, pmLabel: 'OMG' },
// ];
// document.querySelector('#test-button')?.addEventListener('click', () => {
//   basicPicker.destroy(() => {
//     console.log('destroyed');
//   });
//   const randomIndex = Math.floor(Math.random() * arr.length);
//   basicPicker.update({
//     options: arr[randomIndex],
//     create: true,
//   });
//   basicPicker.close(true, () => {
//     console.log('lo');
//   });
// });
const mobiles = document.querySelector('.mobile');
const mobilePicker = new timepicker_ui_1.TimepickerUI(mobiles, {
    mobile: true,
    enableSwitchIcon: true,
});
mobilePicker.create();
const keyboardIcon = document.querySelector('.keyboard-icon-add');
const keyboardIconInit = new timepicker_ui_1.TimepickerUI(keyboardIcon, {
    enableSwitchIcon: true,
    focusTrap: true,
});
keyboardIconInit.create();
const themeCrane = document.querySelector('.theme-crane-straight');
const themeCraneInit = new timepicker_ui_1.TimepickerUI(themeCrane, {
    enableSwitchIcon: true,
    theme: 'crane-straight',
    focusTrap: true,
});
themeCraneInit.create();
const themeCraneRadius = document.querySelector('.theme-crane-radius');
const themeCraneRadiusInit = new timepicker_ui_1.TimepickerUI(themeCraneRadius, {
    enableSwitchIcon: true,
    theme: 'crane-radius',
    focusTrap: true,
});
themeCraneRadiusInit.create();
const acceptEvent = document.querySelector('.accept-event');
const acceptEventInit = new timepicker_ui_1.TimepickerUI(acceptEvent, {
    enableSwitchIcon: true,
});
acceptEventInit.create();
const acceptValue = document.querySelector('#accept-value');
acceptEvent.addEventListener('accept', 
// @ts-ignore
// eslint-disable-next-line no-return-assign
({ detail: { hour, minutes, type } }) => (acceptValue.innerHTML = `${hour}:${minutes} ${type}`));
const errorValueDiv = document.querySelector('#error-value');
const openByButton = document.querySelector('.open-by-button');
const openByButtonInit = new timepicker_ui_1.TimepickerUI(openByButton, {
    clockType: '12h',
    editable: true,
    focusInputAfterCloseModal: true,
});
openByButtonInit.create();
openByButton.addEventListener('geterror', (e) => {
    console.log(e);
    // @ts-ignore
    errorValueDiv.innerHTML = `Error: ${e.detail.error}`;
});
openByButton.addEventListener('update', (e) => {
    console.log(e);
});
const mobiles24 = document.querySelector('.mobile-24');
const mobilePicker24 = new timepicker_ui_1.TimepickerUI(mobiles24, {
    mobile: true,
    clockType: '24h',
    editable: true,
});
mobilePicker24.create();
const errorPicker = document.querySelector('.error');
const errorPickerInit = new timepicker_ui_1.TimepickerUI(errorPicker, {
    cancelLabel: 'cancel',
    clockType: '24h',
    mobile: false,
    okLabel: 'ok',
    hourMobileLabel: '',
    minuteMobileLabel: '',
    mobileTimeLabel: 'select time',
    // @ts-ignore
    selectTimeLabel: 'select time',
    backdrop: true,
    editable: true,
    enableSwitchIcon: true,
    iconTemplate: '<div class="keyboard-time"></div>',
    iconTemplateMobile: '<div class="clock-time"></div>',
});
errorPickerInit.create();
