export class ValidateHelper {
    static checkStartAndEndTime(fromMonth : number, fromYear : number, toMonth : number, toYear : number): boolean {
        return !(fromYear > toYear || (fromYear === toYear && fromMonth > toMonth));
    }
}
