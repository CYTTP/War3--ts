

// 颜色表
let Hope_Color_data: { [str: string]: string } = {
    'red': '|cffff0000',
    '红': '|cffff0000',
    'orange': '|cffff6600',
    '橙': '|cffff6600',
    'yellow': '|cffffff00',
    '黄': '|cffffff00',
    'green': '|cff00ff00',
    '绿': '|cff00ff00',
    'cyan': '|cff00ffff',
    '青': '|cff00ffff',
    'blue': '|cff0000ff',
    '蓝': '|cff0000ff',
    'purple': '|cffff00ff',
    '紫': '|cffff00ff',
    'brown': '|cff993300',
    '褐': '|cff993300',
    'grey': '|cff808080',
    '灰': '|cff808080',
    'grass': '|Cff808000',
    '草色': '|Cff808000',
    'pink': '|cffe55bb0',
    '粉色': '|cffe55bb0',
    'azure': '|c7a919fdf',
    '天蓝色': '|c7a919fdf',
    'violet': '|Cff8b8bfc',
    '蓝紫色': '|Cff8b8bfc',
    'gray': "|cff959697",
    'lightblue': "|cff7ebff1",
    'darkgreen': "|cff106246",
    'maroon': "|cff9b0000",
    'navy': "|cff0000c3",
    'turquoise': "|cff00eaff",
    'wheat': "|cffebcd87",
    'peach': "|cfff8a48b",
    'mint': "|cffbfff80",
    'lavender': "|cffdcb9eb",
    'coal': "|cff282828",
    'snow': "|cffebf0ff",
    'emerald': "|cff00781e",
    'peanut': "|cffa46f33",
    'sheepblue': "|CFF3F81F8",
    'wolred': "|CFFC00040",
    'gold': "|CFFD9D919",
    'string': "|cffce915b",
    'number': "|cffdcdc8b",
    'boolean': "|cff569cd6",
    'white': "|cffffffff",
    'handle': "|cff7ebff1",
    'black': "|CFF000000",


};
/***  文本 -- 颜色 9中颜色      HoepColorText()
**  红 = red
**  橙 =  orange
**  黄 = yellow
**  绿 = green
**  青 = cyan
**  蓝 = blue
**  紫 = purple
**  褐 = brown
**  灰 = grey
***/
export default function HoepColorText(Color?: string): string {
    if (Color == null) {
        return '|r'
    }
    // 直接取键值对，
    let color = Hope_Color_data[Color]
    if (color) {
        return color
    }
    return '颜色参数错误'


}

//     return '|r'
// // 1    red
// }else if (Color == 'red' || Color == '红') {
//     return '|cffff0000'
//     // 2    orange
// } else if (Color == 'orange' || Color == '橙') {
//     return '|cffff6600'
//     // 3    yellow
// } else if (Color == 'yellow' || Color == '黄') {
//     return '|cffffff00'
//     // 4    green
// } else if (Color == 'green' || Color == '绿') {
//     return '|cff00ff00'
//     // 5    cyan
// } else if (Color == 'cyan' || Color == '青') {
//     return '|cff00ffff'
//     // 6    blue
// } else if (Color == 'blue' || Color == '蓝') {
//     return '|cff0000ff'
//     // 7    purple
// } else if (Color == 'purple' || Color == '紫') {
//     return '|cffff00ff'
//     // 8    brown
// } else if (Color == 'brown' || Color == '褐') {
//     return '|cff993300'
//     // 9    grey
// } else if (Color == 'grey' || Color == '灰') {
//     return '|cff808080'
// }
// return '颜色参数错误'




