const parties = {
    "DPP": {
        "id": "DPP",
        "name": "民主進步黨",
        "number": "1",
        "seats" : 40,
        "hasBeenCount" : 43,
        "side" : 1
    },
    "PFP": {
        "id": "PFP",
        "name": "親民黨",
        "number": "2",
        "seats" : 2,
        "hasBeenCount" : 4,
        "side" : 2
    },
    "FTP": {
        "id": "FTP",
        "name": "自由台灣黨",
        "number": "3",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "PPU": {
        "id": "PPU",
        "name": "和平鴿聯盟黨",
        "number": "4",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2 
    },
    "MCFAP": {
        "id": "MCFAP",
        "name": "軍公教聯盟黨",
        "number": "5",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2
    },
    "MKT": {
        "id": "MKT",
        "name": "民國黨",
        "number": "6",
        "seats": 1,
        "hasBeenCount" : 1,
        "side" : 2
    },
     "FHL": {
        "id": "FHL",
        "name": "信心希望聯盟",
        "number": "7",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2
    },
    "CHTY": {
        "id": "CHTY",
        "number": "8",
        "name": "中華統一促進黨",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2 
    },
     "KMT": {
        "id": "KMT",
        "name": "中國國民黨",
        "number": "9",
        "seats" : 65,
        "hasBeenCount" : 69,
        "side" : 2
    },
     "TSU": {
        "id": "TSU",
        "name": "台灣團結聯盟",
        "number": "10",
        "seats" : 3,
        "hasBeenCount" : 6,
        "side" : 1
    },
    "NPP": {
        "id": "NPP",
        "name": "時代力量",
        "number": "11",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "DASG": {
        "id": "DASG",
        "name": "大愛憲改聯盟",
        "number": "12",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2 
    },
    "GSD": {
        "id": "GSD",
        "name": "綠黨社會民主黨聯盟",
        "number": "13",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "TIP": {
        "id": "TIP",
        "name": "台灣獨立黨",
        "number": "14",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "NSU": {
        "id": "NSU",
        "name": "無黨團結聯盟",
        "number": "15",
        "seats" : 1,
        "hasBeenCount" : 2,
        "side" : 2
    },
    "NP": {
        "id": "NP",
        "name": "新黨",
        "number": "16",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 2
    },
    "NHSA": {
        "id": "NHSA",
        "name": "健保免費連線",
        "number": "17",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1 
    },
    "TP": {
        "id": "TP",
        "name": "樹黨",
        "number": "18",
        "seats": 0,
        "hasBeenCount": 0,
        "side" : 1
    },
    "NONE": {
        "id": "NONE",
        "name": "無黨籍",
        "number": "",
        "seats" : 0,
        "hasBeenCount" : 1,
        "side" : 2
    }    
}
/* 無黨籍不能拿掉，核四資料需要用 */
export default function get(){
    return parties;
}
