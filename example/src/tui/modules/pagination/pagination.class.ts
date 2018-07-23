export class Pagination {
    constructor(public total: number = 0, public page: number = 1, public limit = 10) { }

    get offset(): number {
        return (this.page - 1) * this.limit;
    }

    get pageData(): { [key: string]: number } {
        return { limit: this.limit, offset: this.offset };
    }

    get maxPage(): number {
        return Math.ceil(this.total / this.limit);
    }

    getpageDataWith(params: any = {}): { limit: number, offset: number, [key: string]: string | number } {
        params.limit = this.limit;
        params.offset = this.offset;
        return params;
    }

    reset(): void {
        this.total = 0;
        this.page = 1;
        this.limit = 10;
    }

    hasNext(): boolean {
        return this.page < this.maxPage;
    }

    hasPrev(): boolean {
        return this.page > 1;
    }

    hasPage(page: number) {
        return page > 0 && page <= this.maxPage;
    }

    pageValid() {
        return this.hasPage(this.page);
    }

    clone(): Pagination {
        return new Pagination(this.total, this.page, this.limit);
    }
}
