export interface MedicalExaminationResultDTO {
    userId: number;
    steps: MedicalExaminationResultDTOStep[];
}

export interface MedicalExaminationResultDTOStep {
    stepId: number;
    success: boolean;
}

export const MEDICAL_EXAMINATION_RESULT = 'medical-examination-result';