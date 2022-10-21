
export default class InitString {//初始化字符串
    static InitStringBl: any[] = []

    static InitItemGrade() {
        let int = 0
        InitString.InitStringBl["品级" + int++] = "C"
        InitString.InitStringBl["品级" + int++] = "B"
        InitString.InitStringBl["品级" + int++] = "A"
        InitString.InitStringBl["品级" + int++] = "S"
        InitString.InitStringBl["品级" + int++] = "SS"

    }

    constructor() {
        InitString.InitItemGrade()//初始化物品品阶字符串
    }
}
