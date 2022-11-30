/** 폼데이터 처리 */
export const handelFormData = (dto, thumbnail) => {
    const formData = new FormData();
    formData.append(
        "requestDto",
        new Blob(
            [
                JSON.stringify(dto, {
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
