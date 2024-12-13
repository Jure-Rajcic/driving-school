"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MEDICAL_EXAMINATION_USER_RESULT_EVENT = exports.APPOINTMENT_CONFIRMATION_EVENT = exports.FEATURE_1_MEDICAL_EXAMINATION_APPOINTMENT_MANAGEMENT_EVENT = exports.APPOINTMENT_MANAGEMENT_EVENT = exports.FEATURE_1_MEDICAL_EXAMINATION = void 0;
const composeUniqueEventKey = (eventCategory, eventId) => eventCategory + '-' + eventId;
exports.FEATURE_1_MEDICAL_EXAMINATION = 'feature-1-medical-examination';
exports.APPOINTMENT_MANAGEMENT_EVENT = 'appointment-management-event';
exports.FEATURE_1_MEDICAL_EXAMINATION_APPOINTMENT_MANAGEMENT_EVENT = composeUniqueEventKey(exports.FEATURE_1_MEDICAL_EXAMINATION, exports.APPOINTMENT_MANAGEMENT_EVENT);
exports.APPOINTMENT_CONFIRMATION_EVENT = 'appointment-confirmation-event';
// **** MEDICAL_EXAMINATION_USER_RESULT_EVENT ****
exports.MEDICAL_EXAMINATION_USER_RESULT_EVENT = 'medical-examination-user-result-event';
