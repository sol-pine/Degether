/** 오늘 날짜 조회 */
export const useToday = () => {
    let today = new Date();
    today = today.toISOString().substring(0, 10);
    return today;
};

