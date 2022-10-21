

export default class index {
    constructor() {

        /**
         * Map对象
         */
        let myMap = new Map([
            ["A000", "床边故事"],
            ["w000", "伟大的作品"],
            ["qqqq", "明明就"],
            ["eeee", "扯"],
            ["rrrr", "青花瓷"],
            ["yyyy", "花海"]
        ]);


        // 迭代 Map 中的 key
        for (let key of myMap.keys()) {
            // console.log(key);  
            print_r(key)
        }

        // 迭代 Map 中的 value
        for (let value of myMap.values()) {
            print_r(value)
        }

        // 迭代 Map 中的 key => value
        for (let entry of myMap.entries()) {
            print(entry[0], entry[1]);
        }

        // 使用对象解析
        for (let [key, value] of myMap) {
            print(key, value);
        }

        // 获取键对应的值
        print(myMap.get("qqqq"));

        // 判断 Map 中是否包含键对应的值
        print(myMap.has("yyyy")); //true
        print(myMap.has("Zhihu")); //false

        /**
         * 元组
         */

        let mytuple = [10, "Runoob"];
        //解构元组
        let [b, c] = mytuple
        print(b)
        print(c)


        /**
         * 接口
         */
        interface IPerson {
            firstName: string,
            lastName: string,
            sayHi: () => string
        }

        let customer: IPerson = {
            firstName: "Tom",
            lastName: "Hanks",
            sayHi: (): string => { return "Hi there" }
        }

        // console.log("Customer 对象 ") 
        // console.log(customer.firstName) 
        // console.log(customer.lastName) 
        // console.log(customer.sayHi())  

        let employee: IPerson = {
            firstName: "Jim",
            lastName: "Blakes",
            sayHi: (): string => { return "Hello!!!" }
        }

    }
}