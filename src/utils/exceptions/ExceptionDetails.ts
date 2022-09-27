export default class ExceptionDetail {
    private code?: string;
    private title?: string;
    private detail?: string;
    private source?: string;

    constructor(code?: string, title?: string, detail?: string, source?: string) {
        this.code = code;
        this.title = title;
        this.detail = detail;
        this.source = source;
    }

    static create(
        code?: string,
        title?: string,
        detail?: string,
        source?: string
    ) {
        return new ExceptionDetail(code, title, detail, source);
    }
}