import { useState } from "react";

export const useValidateFormSchema = () => {
    const [errors, setErrors] = useState({});

    const validate = (validationSchema, formData) => {
        validationSchema.validate(formData, { abortEarly: false })
            .then((validData) => {
                // اگر داده‌ها معتبر باشند
                setErrors({});
            })
            .catch((validationErrors) => {
                // اگر خطایی وجود داشته باشد
                const formattedErrors = {};
                validationErrors.inner.forEach((error) => {
                    formattedErrors[error.path] = error.message;
                });
                setErrors(formattedErrors);
            });
    }

    return {validate, errors}
}