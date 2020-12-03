export interface Todo {
    todobh: string;
    name: string;
    content: string;
    type: string;
    deadline: Date;
    parentbh: string;
    state: string;
    userbh: string;
    createtime: Date;
    finishtime: Date;
    abandontime: Date;
    residue_hour: number;
    sub_num: number;
    sub_finish_num: number;
}