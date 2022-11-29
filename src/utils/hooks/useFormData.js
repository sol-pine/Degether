/** 폼데이터 처리 */
export const useFormData = (projectRequestDto, thumbnail) => {
    const formData = new FormData();
    formData.append(
        "projectRequestDto",
        new Blob(
            [
                JSON.stringify(projectRequestDto, {
                    contentType: "application/json",
                }),
            ],
            {
                type: "application/json",
            }
        )
    );
    formData.append("thumbnail", thumbnail);
    return formData;
};
