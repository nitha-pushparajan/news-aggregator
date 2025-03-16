export type Source = "nyt" | "newsapi" | "guardian";

export interface NewsSource {
    id: Source;
    label: string;
}
