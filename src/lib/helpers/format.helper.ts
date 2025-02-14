export class FormatHelper {
    static formatMonth(month: number): string {
        if (month < 1 || month > 12) return "Invalid month";
        return `Tháng ${month.toString().padStart(2, "0")}`;
    }

    static formatDateToMonthYear(date : string) {
        const d = new Date(date);
        const month = String(d.getMonth() + 1).padStart(2, "0"); // Ensure 2-digit month
        const year = d.getFullYear();
        return `${month}/${year}`;
    }

    static formatDateToShortMonthYear(date : string) {
        const d = new Date(date);
        const month = d.toLocaleString("en-US", { month: "short" }); // "Jan", "Feb", ...
        const year = d.getFullYear();
        return `${month} ${year}`;
    }


}
