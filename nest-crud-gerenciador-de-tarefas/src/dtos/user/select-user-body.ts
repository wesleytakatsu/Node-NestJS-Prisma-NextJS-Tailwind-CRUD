import { Exclude, Expose } from "class-transformer";

export class SelectUserBody {
    @Expose()
    id: string;
    @Expose()
    name: string;
    @Expose()
    username: string;
    @Exclude()
    password: string;
    @Exclude()
    createdAt: Date;
    @Exclude()
    updatedAt: Date;
}