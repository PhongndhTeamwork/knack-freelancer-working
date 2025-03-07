export class ValidateHelper {
    static checkStartAndEndTime(
        fromMonth: number,
        fromYear: number,
        toMonth: number,
        toYear: number
    ): boolean {
        return fromYear < toYear || (fromYear === toYear && fromMonth <= toMonth);
    }

    static checkDateInThePast(
        fromMonth: number,
        fromYear: number,
        toMonth: number,
        toYear: number
    ): boolean {
        const currentDate = new Date();
        const currentMonth = currentDate.getMonth() + 1;
        const currentYear = currentDate.getFullYear();
        // Check if from date is in the future
        if (fromYear > currentYear || (fromYear === currentYear && fromMonth > currentMonth)) {
            return false;
        }
        // Check if to date is in the future
        return !(toYear > currentYear || (toYear === currentYear && toMonth > currentMonth));
    }

}
