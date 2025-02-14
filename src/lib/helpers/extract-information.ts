
export class ExtractInformation {
    static getUsernameFromURL(url : string) {
        try {
            const pathname = new URL(url).pathname; // Extract pathname (e.g., "/nguyen.inh.hong.phong")
            return pathname.split("/")[1]; // Get the first segment after "/"
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            // console.error("Invalid URL:", error);
            return url;
        }
    }

}