export class FormatHelper {
    static formatMonth(month: number): string {
        if (month < 1 || month > 12) return "Invalid month";
        return `Tháng ${month.toString().padStart(2, "0")}`;
    }
}
