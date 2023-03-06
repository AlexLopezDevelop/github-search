import {dateAgo} from "../src/tools/formatter";

describe('dateAgo', () => {
    it('should return the time ago in days months or years', () => {
        const date = new Date().toISOString();
        const result = dateAgo(date);
        expect(result).toMatch(/days ago|months ago|years ago/);
    });
});