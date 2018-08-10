import {Field} from "./field";

export class Block {
    id: number;
    title: string;
    fields: Field[];

    constructor(id, title) {
        this.id = id;
        this.title = title;
    }

    setFields(fields: Field[]): void {
        this.fields = fields;
    }
}