declare type Form<T> = { [K in keyof T]?: null | [] | T[K]};
