import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import classnames from 'classnames';

import DocumentMeta from 'react-document-meta';

import LegislatorCards from '../../components/LegislatorCards/LegislatorCards.js';
import RecordStream from '../../components/RecordStream/RecordStream.js';

const breakWebVersion = 730; //跟 scss 同步
import $ from 'jquery';

const MaXiRecords = 
{
    "莊瑞雄": {
        "name": "莊瑞雄",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "莊瑞雄",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "國家的重要事項，這次的馬習會到底要談什麼？程序上到底是不是公開？是不是透明？其實路人皆知，就是一個黑箱。其實我們很卑微的要求變更議程，要求陸委會來內政委員會報告，其實可以化解人民的疑慮。\r\n \r\n 我們前幾天在審陸委會預算的時候，這樣攸關國家重大的事項，卻沒有來向國會誠實報告，這個違背了國會保留。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "none",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446566400,
                "legislator": "莊瑞雄",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "提出變更議程提案：國人對於兩岸政治談判並無共識，馬英九總統逕自安排與中國國家主席會面，欠缺民主正當性。馬習會有無必要？會談內容為何？國人毫無所悉。為善盡國會監督職責，爰要求本日變更議程，要求陸委會主委、外交部部長、總統府秘書長、國安局局長到會報告馬習會相關事宜。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446566400,
                "legislator": "莊瑞雄",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "王院長都已經講啦！到了昨天晚上12點，他才知道這件事情。天大地大的事情，國人同胞全部被蒙在鼓裡。超級大黑箱，這次的馬習會，毫無正當性。 我們不能因為馬總統朝思暮想他的歷史定位，讓我們的主權一點一滴流失。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "姚文智": {
        "name": "姚文智",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "姚文智",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "如果他可以在習近平面前，講出他是中華民國總統馬英九上述這幾個字，姚文智辭立委！\r\n \r\n 在人民不信任、民意不支持、黑箱作業底下，馬英九所進行的是非常有可能出賣台灣的利益，出賣台灣利益，把台灣框限住一個中國的架構裡面。這樣的一個會面，台灣連最後一個底牌可能都會掀起來讓人家打臉，所以這樣還不來報告嗎？這樣還不用循立法院的制度程序？統籌兩岸事務的陸委會還不用來嗎？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446566400,
                "legislator": "姚文智",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "提出變更議程提案：國人對於兩岸政治談判並無共識，馬英九總統逕自安排與中國國家主席會面，欠缺民主正當性。馬習會有無必要？會談內容為何？國人毫無所悉。為善盡國會監督職責，爰要求本日變更議程，要求陸委會主委、外交部部長、總統府秘書長、國安局局長到會報告馬習會相關事宜。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446566400,
                "legislator": "姚文智",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "如果馬英九總統公開的承諾，都可以不當一回事，都可以騙。朱立倫可以騙王金平，馬英九可以騙所有的國人同胞、可以騙所有的機構，或者是陸委會可以騙內政委員會，如果上下交相騙，那今天馬英九當到新加坡，是要繼續騙習近平還是要被習近平騙。\r\n \r\n (陸委會)過去幾周都在溝通馬習會，這是說謊，這是對立法院說謊、還是對媒體說謊，還是甚麼樣的一個情況，馬英九他的身分地位、談的事情，他對台灣利益有沒有損害，這些都應該一五一十跟大家報告清楚。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "段宜康": {
        "name": "段宜康",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "段宜康",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "我們昨天在內政委員會提了兩個提案，一個是變更議程，一個是對於禮拜一通過的陸委會跟海基會的預算的復議案。昨天即便行政院去和黨團做了說明，當然民進黨團拒絕參加，拒絕參加的原因是我們本來就有一個制度性報告的場域，就是在內政委員會。為什麼捨制度上合法的管道不用？即便去找了院長，看起來位階比較高，但是畢竟不是一個制度性的管道。他是一個私底下的說明，沒有辦法被社會看見的說明。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "none",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446566400,
                "legislator": "段宜康",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "提出變更議程提案：國人對於兩岸政治談判並無共識，馬英九總統逕自安排與中國國家主席會面，欠缺民主正當性。馬習會有無必要？會談內容為何？國人毫無所悉。為善盡國會監督職責，爰要求本日變更議程，要求陸委會主委、外交部部長、總統府秘書長、國安局局長到會報告馬習會相關事宜。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446566400,
                "legislator": "段宜康",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "今天你禮拜六，總統就要出門了，就要去跟習近平見面，我們要到禮拜三看報紙才知道這件事情。我不曉得這個總統府把立法院看成甚麼，我不知道總統府把立法院代表選民監督行政機關這樣的腳色看成甚麼。可是就我們內政委員會來說，我們做一個起碼的要求。我們希望看到我們陸委會的夏主委去廣州的夏張會的時候，在一連串的談判討論，總統去到那個地方跟習近平見面，會談什麼，什麼樣的形式。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "李俊俋": {
        "name": "李俊俋",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "李俊俋",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "那為什麼有關馬習會的事情，從來沒有報告過？而且夏立言主委其實曾經來報告過夏張會，但是夏張會的內容，他完全沒有提到馬習會這件事情，那這樣有沒有含著一個欺騙國會的事實？\r\n \r\n 國會設置，不是對你們有利就來開會，對你們不利就不來開會啊！到底是怎麼一回事？如果立法委員通通不來開會，對這個議題上的變更也不討論，那你們要怎麼跟大家訴求說，我們通通都不來開會，但是請明年的一月十六號繼續投給我們？這是負責任的態度嗎？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "none",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446566400,
                "legislator": "李俊俋",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "提出變更議程提案：國人對於兩岸政治談判並無共識，馬英九總統逕自安排與中國國家主席會面，欠缺民主正當性。馬習會有無必要？會談內容為何？國人毫無所悉。為善盡國會監督職責，爰要求本日變更議程，要求陸委會主委、外交部部長、總統府秘書長、國安局局長到會報告馬習會相關事宜。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "陳其邁": {
        "name": "陳其邁",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "陳其邁",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "我們認為說對一個即將卸任的總統，在即將不到兩個月就要進行總統大選投票，去進行他個人的政治豪賭，那以全民都不知道到底是拿了甚麼作為籌碼，來進行個人政治豪賭，深深覺得不以為然。這也是為什麼說民進黨黨團一直認為，這應該是公開透明的一個原則。\r\n \r\n 哪有說那麼重大的一件事情，去新加坡馬習會要談，談甚麼我們都不知道，行程怎麼出來我們都不知道。那國會沒有權力知道嗎？人民沒有權力知道嗎？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446566400,
                "legislator": "陳其邁",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "提出變更議程提案：國人對於兩岸政治談判並無共識，馬英九總統逕自安排與中國國家主席會面，欠缺民主正當性。馬習會有無必要？會談內容為何？國人毫無所悉。為善盡國會監督職責，爰要求本日變更議程，要求陸委會主委、外交部部長、總統府秘書長、國安局局長到會報告馬習會相關事宜。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "李桐豪": {
        "name": "李桐豪",
        "party": "PFP",
        "records": [
            {
                "date": 1446739200,
                "legislator": "李桐豪",
                "party": "PFP",
                "meeting": "院會",
                "content": "第一，追求兩岸和平發展、維護海峽兩岸穩定，是親民黨一貫的立場。\r\n 第二，兩岸和平交由本於對等參與監督的原則，也沒有任何的改變。\r\n 馬習在新加坡的會面，本席可以認同，但事前籌備的過程，不符合透明參與監督，讓人深感遺憾。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84908/1M/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446652800,
                "legislator": "李桐豪",
                "party": "PFP",
                "meeting": "國防及外交委員會",
                "content": "我們認為可以有這次跟習近平互動的機會，發動權不是在我們身上。雖然我們有這個意願，但是真正發動的應該中共這方面。大陸願意發動這件事，顯然他是有一些選後的戰略布局考量。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84883/300K/N",
                "supportMaXiMeet": "none",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "blackbox"
    },
    "詹凱臣": {
        "name": "詹凱臣",
        "party": "KMT",
        "records": [
            {
                "date": 1446739200,
                "legislator": "詹凱臣",
                "party": "KMT",
                "meeting": "院會",
                "content": "此次會面也象徵著國民黨在處理兩岸的關係上是比較可靠的，保持兩岸的和平才是對於中華民國最有利的，本席感謝新加坡政府同意這個睿智的安排，同時也不希望外界說什麼黑箱作業，外交與國防在某種程度、某種階段，都需要祕密的進行。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84907/1M/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "transparent",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446652800,
                "legislator": "詹凱臣",
                "party": "KMT",
                "meeting": "國防及外交委員會",
                "content": "我最近一年來最不喜歡聽兩個字？「黑箱」。甚麼叫做黑箱？甚麼叫沒有黑箱？我希望喜歡罵黑箱的人給我一個sop！什麼叫做沒有黑箱？我贊成甚麼事情都要透明化、都要協商，可是外交國防從無到有的階段就是機密。你什麼都公開，什麼都脫褲子給人家看了，你辦甚麼外交國防？\r\n \r\n 已經講過不簽署什麼協議和政治對談，所以絕大部份國家、世界媒體對這事情都是肯定的態度。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84890/300K/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "transparent",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "transparent"
    },
    "詹滿容": {
        "name": "詹滿容",
        "party": "KMT",
        "records": [
            {
                "date": 1446739200,
                "legislator": "詹滿容",
                "party": "KMT",
                "meeting": "院會",
                "content": "蔡英文女士不要吃不到葡萄說葡萄酸，你甚至說不排除未來的蔡習會，但是你做得到嗎？馬總統做到的是為兩岸的高階溝通搭了對話的平台，並讓未來有能力的領袖得以承先啟後造福人民。那麼最後我呼籲大家，期待這歷史的一刻，唾棄不得人心的酸葡萄政治口水，珍惜血濃於水的兩岸一家親情感，肯定兩岸領導人的高度政治智慧，展開中華民族對於區域和平的貢獻，並且迎接六十六年首次的高峰會，開創歷史的新頁。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84912/1M/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            },
            {
                "date": 1446652800,
                "legislator": "詹滿容",
                "party": "KMT",
                "meeting": "國防及外交委員會",
                "content": "很多事情是經年累月累積的善意，不管哪個黨執政都一樣，大家對於這個歷史分水嶺(馬習會)的意見，不要讓國際變成笑話。大家矚目的就是兩岸對於區域和平的貢獻。\r\n 還要為了這種事情爭得紛紛擾擾，這沒有黑箱的問題。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84900/300K/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "transparent",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "transparent"
    },
    "田秋堇": {
        "name": "田秋堇",
        "party": "DPP",
        "records": [
            {
                "date": 1446566400,
                "legislator": "田秋堇",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "但是整個社會，誰不認為已經進入看守內閣，已經是個看守總統。你卻馬習會，你要會甚麼啊？這樣馬息會還有任何歷史意義嗎？\r\n \r\n 這樣的馬習會，你連國人、媒體、連代表民意的國會議員的議長，你不要講國會議員 因為國會議員有藍有綠你覺得麻煩。至少王金平，代表立院龍頭老大，你連王金平都要看報紙才知道。你到底是打著甚麼算盤，你就是黑箱，黑夜，走黑路嗎？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "陳明文": {
        "name": "陳明文",
        "party": "DPP",
        "records": [
            {
                "date": 1446566400,
                "legislator": "陳明文",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "在這種大前提下才要見面。今天沒有看到國會監督，就偷偷摸摸的說要到新加坡，要跟中共的領導人見面。這不是黑箱作業，這是什麼？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "none",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "none",
        "positionOnProcedure": "blackbox"
    },
    "何欣純": {
        "name": "何欣純",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "何欣純",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "而這個默契，所謂一個中國的原則，也是完全背離台灣民意的。在一個沒有台灣民意的支持下，馬習會到底要談什麼？\r\n \r\n 猶記得中國片面宣布卡式台胞證全面執行，我們的毛院長還是看報紙才知道，今天拋出的馬習會，換我們王院長也是看媒體看報紙才知道。我們今天馬英九執政的政府到底是在幹什麼？完全在偷偷摸摸的做事情，不敢公開透明之下，台灣人民當然會有疑慮，到底馬英九在幹什麼？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "周倪安": {
        "name": "周倪安",
        "party": "TSU",
        "records": [
            {
                "date": 1446652800,
                "legislator": "周倪安",
                "party": "TSU",
                "meeting": "內政委員會",
                "content": "是哪一國的人民去支持馬英九這樣突然的行動？國會監督是完全監督不到。昨天下午在協商的時候，夏立言主委、毛治國院長到院長室報告的時候，本席就提出，為什麼寧可在這邊做密室的報告，而不到內政委員會做公開的備詢？讓所有的媒體、所有的國民可以知道，這整個事情的原由？但是我們的政府似乎黑箱到非常的習慣。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "陳碧涵": {
        "name": "陳碧涵",
        "party": "KMT",
        "records": [
            {
                "date": 1446652800,
                "legislator": "陳碧涵",
                "party": "KMT",
                "meeting": "內政委員會",
                "content": "昨天我們總統府行政院以及陸委會來拜會國會，事實上他是邀請了所有政黨代表。我想我們拜會行程是公開的，剛剛有委員說是密室，我想一個房間有這麼多的媒體，有三、四十人以上，那個地方怎麼會叫做密室呢？\r\n \r\n 為了國家的利益，我想馬總統他絕對不會去思考他個人的利益，尤其是說如果我們都已經在三天前向國會報告了，在程序上我們是可以接受的。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "transparent",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "transparent"
    },
    "鄭天財Sra·Kacaw": {
        "name": "鄭天財Sra·Kacaw",
        "party": "KMT",
        "records": [
            {
                "date": 1446652800,
                "legislator": "鄭天財Sra·Kacaw",
                "party": "KMT",
                "meeting": "內政委員會",
                "content": "至於馬習會，事實上是我們中華民國從過去到現在，無論是從中華民國憲法，無論是從兩岸人民關係條例，或者是從過去立法院所曾經做過的正式決議，都不曾有規定或是說有決議，這國家的領導人要跟國外的，不管是領袖或是總統或是總理或是甚麼樣層級的人要見面 ，必須要先跟國會立法院來做報告。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "none",
                "positionOnProcedure": "transparent",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "none",
        "positionOnProcedure": "transparent"
    },
    "孔文吉": {
        "name": "孔文吉",
        "party": "KMT",
        "records": [
            {
                "date": 1446739200,
                "legislator": "孔文吉",
                "party": "KMT",
                "meeting": "院會",
                "content": "馬習會沒有傷害台灣的民主，也沒有試圖影響台灣的選舉，也沒有出賣台灣。馬總統說 馬習會之後他可以到立法院來做國情咨文報告，他是現任的總統，他有權力這樣做，而不是像反對黨所說的，民意破底的總統，還要開馬習會，還要辱罵，還要貶低馬英九這次歷史性前瞻性的遠見與格局。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84910/1M/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "none"
    },
    "黃偉哲": {
        "name": "黃偉哲",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "黃偉哲",
                "party": "DPP",
                "meeting": "國防及外交委員會",
                "content": "我覺得如果新加坡的東道主在場，勉勉強強、你看這是星國的元首、這是中國的國家主席，三個都互稱先生也沒關係啊！至少大家都知道是誰啊！結果不是，人家就給個房間，你們自己去談去。所以應了中國大陸的說法「不是國際場合」，也應了我們的說法「第三國」。唯一堪慰的是，我們沒有被矮化，但是這不是一個國際場合。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84879/300K/N",
                "supportMaXiMeet": "none",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "none",
        "positionOnProcedure": "none"
    },
    "蔡煌瑯": {
        "name": "蔡煌瑯",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "蔡煌瑯",
                "party": "DPP",
                "meeting": "國防及外交委員會",
                "content": "部長不應該再為馬習會粉飾太平、擦脂塗粉，這樣的馬習會，全世界的媒體都解讀是為了挽救國民黨的選情。可以為了挽救國民黨的選情，黑箱作業，把台灣的主權當成伴手禮嗎？台灣人民會用選票教訓這種黑箱作業、沒有在人民監督、沒有在國會監督、不透明狀況下的馬習會，人民沒有祝福啦！",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84880/300K/N",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "蔡錦隆": {
        "name": "蔡錦隆",
        "party": "KMT",
        "records": [
            {
                "date": 1446652800,
                "legislator": "蔡錦隆",
                "party": "KMT",
                "meeting": "國防及外交委員會",
                "content": "我想從昨天美國國務院發言人，以及世界各國主流媒體所闡述的意見，非常的清楚。對這次馬習會表示正面的肯定。\r\n \r\n 其實馬習會是兩岸和平穩定的無字天書，他也意味著兩岸深化的成果。那未來我想我們在台海兩岸和平的發展，這是這次核心的意涵。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84881/300K/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "none"
    },
    "林德福": {
        "name": "林德福",
        "party": "KMT",
        "records": [
            {
                "date": 1446566400,
                "legislator": "林德福",
                "party": "KMT",
                "meeting": "內政委員會",
                "content": "我們希望說這一次的馬習會定位就是鞏固兩岸和平，維持台海現狀。其實我剛剛看了媒體，包括美國都相當肯定，認為說兩岸之間能夠有這樣一個和平進展，這是一樁好事。\r\n \r\n 為什麼沒有黑箱作業？我分析給大家聽。因為畢竟馬習會還沒開始，今天早上十點鐘，總統府曾永權曾秘書長跟行政院的毛院長有特別去跟王院長做說明做報告，那下午陸委會夏主委他也特別拜託王院長，希望王院長能夠召集朝野能夠做一些協商，讓他有機會來跟朝野做說明。我想這個都符合正常的程序。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "transparent",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "transparent"
    },
    "陳鎮湘": {
        "name": "陳鎮湘",
        "party": "KMT",
        "records": [
            {
                "date": 1446652800,
                "legislator": "陳鎮湘",
                "party": "KMT",
                "meeting": "國防及外交委員會",
                "content": "(馬習會)我想如果新加坡他不同意，會達成嗎？我想，不可能會達成。換句話說，也就是我們活路外交的一個具體成果。\r\n \r\n 為什麼全世界會這樣的重視它(馬習會)。就是因為他是一個超過半世紀的突破。難道我們不應該盡全力支持他嗎？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84884/300K/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "none"
    },
    "楊應雄": {
        "name": "楊應雄",
        "party": "KMT",
        "records": [
            {
                "date": 1446652800,
                "legislator": "楊應雄",
                "party": "KMT",
                "meeting": "國防及外交委員會",
                "content": "部長覺得這次馬習會是黑箱嗎？總不能一知道有馬習會就發布新聞了，那怎麼玩下去？\r\n \r\n 我個人認為，這是在創造未來兩岸領導人更寬廣的空間。那麼我認為在野黨應該給最大的掌聲，如果他們認為會執政的話。兩岸領導人如果可以平起平坐，那麼對我們未來在國際上的空間也都會有幫助。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84885/300K/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "transparent",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "transparent"
    },
    "蕭美琴": {
        "name": "蕭美琴",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "蕭美琴",
                "party": "DPP",
                "meeting": "國防及外交委員會",
                "content": "馬英九當然不是不能跟習近平會面，但是會面本身具有重大的歷史和政治上意義，所以我們要求這個會面應該在國人有一定程度的共識和信任的前提之下，才能夠去進行的。\r\n \r\n 今天我們是三更半夜聽到這樣的消息，震驚全國。如果你真的是經過縝密的規劃，為什麼會在半夜發這個新聞稿呢？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84888/300K/N",
                "supportMaXiMeet": "unknown",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "unknown",
        "positionOnProcedure": "blackbox"
    },
    "陳唐山": {
        "name": "陳唐山",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "陳唐山",
                "party": "DPP",
                "meeting": "國防及外交委員會",
                "content": "這次的會面選擇是在中國和新加坡建交25周年的紀念上，也就是跟我們斷交25周年，實際上就是有這樣的意義。選擇這樣的時段，我們去感覺就好像我們已經矮了一段。\r\n \r\n 馬英九在台灣現在民調這麼低，大部分人是不相信他，很多時候他都沒有辦法信守他的承諾。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84905/300K/N",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "none"
    },
    "馬文君": {
        "name": "馬文君",
        "party": "KMT",
        "records": [
            {
                "date": 1446652800,
                "legislator": "馬文君",
                "party": "KMT",
                "meeting": "國防及外交委員會",
                "content": "如果今天我們的總統候選人都必須去見美國、日本相關的重要人士，中國大陸跟台灣的關係這麼密切，而且影響對我們這麼深遠的情況之下，我們的領導人有機會跟他們的領導人會面，為什麼會有這樣的疑慮？\r\n 今天如果馬英九總統有機會跟習近平對談、碰面，可以表達台灣人民全體的訴求，我覺得不管是我們台灣的任何政黨或任何人，都應該全力來支持。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84906/300K/N",
                "supportMaXiMeet": "aye",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "aye",
        "positionOnProcedure": "none"
    },
    "葉津鈴": {
        "name": "葉津鈴",
        "party": "TSU",
        "records": [
            {
                "date": 1446566400,
                "legislator": "葉津鈴",
                "party": "TSU",
                "meeting": "內政委員會",
                "content": "王院長親口講，他是看報紙才知道要馬習會。所以國民黨的文化就是欺騙文化、賣台文化，搞這種黑箱作業。\r\n \r\n 不要再出賣台灣啦！這麼不重視台灣國民黨訂的體制，結果自己在搞破壞，在黑箱作業。一個立法院院院長，不知道馬英九要去和習近平幽會！",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    },
    "尤美女": {
        "name": "尤美女",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "尤美女",
                "party": "DPP",
                "meeting": "國防及外交委員會",
                "content": "我想知會跟議決是不一樣的，既然這是國家重要事項，連國會都不知道。你知道太陽花學運在訴求的是什麼？就是要求公開透明，而且國會實質監督，結果今天我們的國會連院長都是看報紙才知道，然後你們才匆匆忙忙來報告。\r\n \r\n 立委都不需要行使職權？這就是人民說的黑箱，資訊完全不公開透明，國會完全無法實質監督。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84893/300K/N",
                "supportMaXiMeet": "none",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "none",
        "positionOnProcedure": "blackbox"
    },
    "賴振昌": {
        "name": "賴振昌",
        "party": "TSU",
        "records": [
            {
                "date": 1446566400,
                "legislator": "賴振昌",
                "party": "TSU",
                "meeting": "內政委員會",
                "content": "我們兩國的元首竟然是要用這種不期而遇這樣子，那跟男女偷情的這種幽會有甚麼不一樣啊？如果說我們中華民國的總統是需要走出去，靠這種方式，那真的是一個國際大笑話啦！不要一直說講講跟中國無奈什麼，但是這是一個基本的尊嚴啊！",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9355/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "none"
    },
    "陳歐珀": {
        "name": "陳歐珀",
        "party": "DPP",
        "records": [
            {
                "date": 1446739200,
                "legislator": "陳歐珀",
                "party": "DPP",
                "meeting": "院會",
                "content": "歷史性的馬習會明天即將在新加坡登場，兩岸的領導人六十六年來第一次的會面當然是歷史大事，卻發生在馬總統即將卸任的半年，也發生在我們台灣將產生新的領導人的兩個月。這樣的歷史會面，毫無正當性跟必要性。",
                "sourceURL": "http://ivod.ly.gov.tw/Play/VOD/84909/1M/N",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "none",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "none"
    },
    "葉宜津": {
        "name": "葉宜津",
        "party": "DPP",
        "records": [
            {
                "date": 1446652800,
                "legislator": "葉宜津",
                "party": "DPP",
                "meeting": "內政委員會",
                "content": "現在他要去馬習會，我請問各位，全台灣有誰知道馬英九先生要去跟習近平先生談甚麼？沒有人知道，會不會簽什麼東西回來？沒有人知道。但是對於台灣來講 有甚麼比這個還重要？有甚麼法案，有甚麼台灣的大小事，比國家安全、比國家主權還重要？沒有了！所以我們今天內政委員會還能夠安心的審什麼其他的事情？",
                "sourceURL": "http://ivod.ly.gov.tw/Play/Full/9361/300K/",
                "supportMaXiMeet": "nay",
                "positionOnProcedure": "blackbox",
                "clarificationContent": "",
                "clarificationLastUpdate": ""
            }
        ],
        "supportMaXiMeet": "nay",
        "positionOnProcedure": "blackbox"
    }
}
export default class Report extends Component {
  static propTypes = {

  }
  constructor(props){ super(props)
      let array = Object.keys(MaXiRecords);//default 為第一位立委

      this.state = {
        activeLegislator: array[0],
        fixedStream: false,
        meetFilterValue: "all",
        procedureFilterValue: "all"
      }
  }
  _onScroll(){
      if(!this.refs.positionSection) return;
      let node = this.refs.positionSection.getDOMNode();
      
      let rect = node.getBoundingClientRect();
      let {fixedStream} = this.state;

      let Fnode = this.refs.SPfooterSection.getDOMNode();
      let Frect = Fnode.getBoundingClientRect();

      let Rnode = this.refs.recordStream.getDOMNode();

      if(rect.top <= 0){//set fixed
          //scroll to bottom, set back to default
          if(Frect.top<window.innerHeight){
              if(fixedStream === true){
                  this.setState({
                      fixedStream: false
                  })

                  Rnode.style.position = 'relative';
                  Rnode.style.top = `${-(rect.top)}px`;
                  Rnode.style.height = 'auto';


              }

          }else{
              if(fixedStream === false){
                  Rnode.style.position = '';
                  Rnode.style.top = '';
                  Rnode.style.height = '';

                  this.setState({
                     fixedStream: true
                  })
              }
          }
      }
      if(rect.top >= 0 && fixedStream === true){//set back to default
          this.setState({
             fixedStream: false
          })
      }


  }
  componentDidMount(){
      window.addEventListener("scroll", this._onScroll.bind(this));
  }
  componentWillUnmount(){
     window.removeEventListener("scroll", this._onScroll.bind(this));
  }
  _handleClickCard(name, event){
      this.setState({
          activeLegislator: name
      })
  }
  _onChangeMeetFilter(){
    let node = this.refs.meetFilter.getDOMNode();
    this.setState({
        meetFilterValue: node.value
    })

  }
  _onChangeProcedureFilter(){
    let node = this.refs.procedureFilter.getDOMNode();
    this.setState({
        procedureFilterValue: node.value
    })
  }

  render() {
    const styles = require('./Report.scss');
    const {activeLegislator, fixedStream, meetFilterValue, procedureFilterValue} = this.state;

    let coverImg = require("./images/cover.jpg");

    let legislatorCardsClasses = classnames({
        [styles.legislatorCards] :true,
        [styles.fixed] : fixedStream
    })
    let legislatorControlClasses = classnames({
        [styles.legislatorControls] :true,
        [styles.fixed] : fixedStream
    })

    let recordStreamClasses = classnames({
        [styles.fixedStream] : fixedStream
    })

    const title = `你支持馬習會嗎？你認為馬習會程序公開透明嗎？-沃草2016立委出任務`;
    const description = `你知道針對馬習會，立委在立法院講了些甚麼嗎？你認為馬習會規劃程序有符合國家需要、人民支持、國會監督的原則嗎？一起來看看立委怎麼說。`;
    const metaData = {
      title: title,
      description: description,
      meta: {
          charSet: 'utf-8',
          property: {
            'og:title': title,
            'og:description': description,
            'og:type' : 'website',
            'og:image' : 'http://wevote.tw/MaXi.jpg'
          }
      }

    };

    return (
    <div className={styles.wrap}>
        <DocumentMeta {...metaData}/>
        <img src={coverImg} className={styles.coverImg}/>
        <Fig/>
        <div className={styles.posFigSection}><h2>你知道針對馬習會，立委在立法院講了些甚麼嗎？</h2></div>
        <div className={styles.positionSection} ref="positionSection">

            <div className={legislatorCardsClasses}>
              <div className={legislatorControlClasses}>

                  <div className={styles.selectBlocks}>
                      <div className={styles.selectBlock}>
                          支持會面
                          <select onChange={this._onChangeMeetFilter.bind(this)}
                                  ref="meetFilter">
                            <option value="all">所有</option>
                            <option value="aye">贊成</option>
                            <option value="nay">反對</option>
                            <option value="unknown">模糊</option>
                            <option value="none">？</option>
                          </select>
                      </div>
                      <div className={styles.selectBlock}>
                          本次程序
                          <select onChange={this._onChangeProcedureFilter.bind(this)}
                                  ref="procedureFilter">
                            <option value="all">所有</option>
                            <option value="transparent">公開透明</option>
                            <option value="blackbox">黑箱</option>
                            <option value="unknown">模糊</option>
                            <option value="none">？</option>
                          </select>
                      </div>
                  </div>
              </div>
              <LegislatorCards handleClickCard={this._handleClickCard.bind(this)}
                               activeLegislator={activeLegislator}
                               meetFilterValue={meetFilterValue}
                               procedureFilterValue={procedureFilterValue}
                               MaXiRecords={MaXiRecords}/>
            </div>
            <div className={styles.recordStream}>
                <div className={recordStreamClasses} ref="recordStream">
                    <RecordStream activeLegislator={activeLegislator}
                                  MaXiRecords={MaXiRecords}/>
                </div>
            </div>
        </div>

        <div className={styles.footerSection} ref="SPfooterSection">

          <ul>
            <li>統計資料範圍：2015/11/03—2015/11/06</li>
            <li>澄清請email至wevote@watchout.tw</li>
          </ul>

        </div>
    </div>

    );
  }
}
class Fig extends Component {

    _scrollTo(value, e){
        let target = $("#Section"+value);

        $("html,body").animate({
            scrollTop: target.offset().top
        }, 500);

    }

    render(){
        const styles = require('./Report.scss');
        let fig1 = require('./images/slides-01.png');
        let fig2 = require('./images/slides-02.png');
        let fig3 = require('./images/slides-03.png');

        let chapters = (
            <div>
                <div className={styles.chapterItem}><div className={styles.chapterItemText} onClick={this._scrollTo.bind(this, 1)}><span className={styles.hand}>☞</span>時間大事紀告訴你到底發生了什麼事？</div></div>
                <div className={styles.chapterItem}><div className={styles.chapterItemText} onClick={this._scrollTo.bind(this, 2)}><span className={styles.hand}>☞</span>勇者黨團又各有什麼立場？</div></div>
                <div className={styles.chapterItem}><div className={styles.chapterItemText} onClick={this._scrollTo.bind(this, 3)}><span className={styles.hand}>☞</span>立委勇者又各自說了什麼話？</div></div>
            </div>
        )
        let backToContents = (
            <div>
              <div className={styles.chapterItem}>
                <div className={styles.chapterItemText} onClick={this._scrollTo.bind(this, 0)}><span className={styles.hand}>☞</span>回到出發點</div></div>
                {chapters}
            </div>
        )
        return (
            <div className={styles.figWrap}>

                <div className={styles.figSection}>
                    <h1 id="Section0">警鐘響起！【馬習會】特殊副本深夜來襲～</h1>
                    <p>即將卸任的島嶼總統，為了兩塊土地的和平和一個握手的心願，<br/>
                       在費盡千辛萬苦後，終於促成這次歷史性的會面──11/7決戰新加坡！</p>

                    <p>但因為沒有跟民主殿堂的立委勇者們進行事前溝通，當消息走漏時引發了軒然大波。<br/>
                       有些勇者認為是黑箱會議，有些勇者則認為這是為了兩岸和平。</p>

                    {chapters}

                    <p>你不可錯過的世紀之戰，快往下進入副本！</p>

                </div>
                <img src={fig1} className={styles.figCover}
                     id="Section1" />
                <div className={styles.figSection}>
                    <h2>馬習會三天震撼，藍綠各出奇招</h2>

                    <h3>陸委會「偷渡」未事先向立院報告，點燃戰火</h3>
                    <p>11/3（二）晚上「馬習會」一記震撼彈，引起台灣政治熱烈討論。而陸委會主委夏立言自稱在10/14夏張會已有討論，引發在野黨立委不滿，質疑陸委會竟未在審查預算期間報告馬習會，根本是欺騙國會及黑箱作業。</p>
                    <h3>內政委員會：民進黨立委提出變更議程，國民黨立委消失戰術</h3>
                    <p>民進黨段宜康等立委因此在11/4（三）提出變更議程案，要求陸委會到內政委員會報告。但是國民黨的內政委員會立委，除鄭天財曾有發言表態過外，其他如吳育昇、張慶忠、盧嘉辰、陳超明、徐志榮等5位立委則使出消失戰術，未出現開會，僅留下擔任召委的邱文彥受到在場立委的強烈炮轟。邱文彥也坦下這些批評，連續兩天宣布休息協商，未開會也未處理變更議程的提案，形同內政委員會停擺。</p>
                    <p>另一方面，行政院長毛治國則在同一天到立法院院長室，向院長王金平及立院各黨團報告。但民進黨則認為應到內政委員會作正式報告，而拒絕出席會議，台聯則當場退席抗議。國民黨則以此認為「馬習會三天前有報告，程序已屬公開透明」。關於陸委會到底應在哪裡報告，這也是另一個爭議點。</p>
                    <h3>院會：國民黨團出招「總統國情報告」，民進黨拒絕為馬背書</h3>
                    <p>到了11/6（五）的院會，雙方砲火更加升級，國民黨率先出招，提出「馬習會後，總統到立院國情報告」。但民進黨仍強調陸委會應先到內政委員會報告，不願以「國情報告」方式為馬總統事後背書。國民黨則以此反批民進黨「假監督」。朝野協商破裂，王金平也宣布院會直接休息，連院會也停擺整日。</p>
                    <p>目前看來，民進黨沒有其他反制或出招，也受到社民黨批評未盡在野黨監督責任，認為民進黨既不採取體制內彈劾、罷免、釋憲等手段，也不採取體制外抗議。面對國民黨的出招，民進黨被動防禦，下週立院的攻防會如何進行？週六（7日）馬習會決戰新加坡，也將點燃立院的新戰場。</p>
                    {backToContents}
                </div>


                <img src={fig2} className={styles.figCover}
                     id="Section2" />
                <div className={styles.figSection}>
                    <h2>除國民黨以外，在野黨一致批評程序黑箱</h2>
                    <div className={styles.figAuguePoints}>
                      國民黨立場：全部都贊成馬習會或認為程序公開透明<br/>
                      民進黨立場：幾乎都批評程序黑箱，另外多數主張反對馬習會<br/>
                      台聯黨立場：幾乎都同時反對馬習會，也認為程序黑箱<br/>
                      親民黨立場：贊成馬習會，但認為程序黑箱<br/>
                    </div>
                    <p>註1：並非每個政黨所有立委都有表態，這裡僅呈現有表態的立委資訊。<br/>
                       註2：政黨圖的大小依照發言次數比例。</p>
                    {backToContents}
                </div>


                <img src={fig3} className={styles.figCover}
                     id="Section3" />
                <div className={styles.figSection}>
                    <h2>朝野對立吵什麼？爭議論點大PK！</h2>
                    <p>立院內戰場兩大爭論，朝野立委各自提出了具體的論點：</p>
                    <h3>爭議一：是黑箱還是透明？</h3>
                    <p>國民黨立委幾乎都主張馬習會程序透明，論點大概是：</p>
                        <div className={styles.figAuguePoints}>
                          「馬習會三天前來報告，算是公開透明。」<br/>
                          「行政院有向立法院長報告，就符合事前報告。」<br/>
                          「外交事務需要保密。」
                        </div>

                    <p>但在野黨立委普遍都認為這次又是黑箱作業，例如：</p>
                    <div className={styles.figAuguePoints}>
                      「連立法院長王金平都是看了報紙才知道！」<br/>
                      「審查預算時，陸委會都沒有報告馬習會，這是欺騙國會！」<br/>
                      「應該到內政委員會做正式報告，院長室的是私下的說明。」</div>

                    <p>雙方對於事前應該提早多久向國會報告，認知顯然有很大的差異。</p>

                    <h3>爭議二：贊成還是反對馬習會？</h3>
                    <p>國民黨一致抱持肯定態度，特別的是，親民黨也站在這一邊：</p>
                     <div className={styles.figAuguePoints}>
                      「馬習會帶來歷史性的一步，搭起兩岸溝通的橋樑。」<br/>
                      「兩岸和平發展經濟，才是硬道理！」</div>

                    <p>台聯黨則控訴國民黨及馬總統賣台，因此強烈反對。民進黨大部分意見雖然也是偏向反對，但似乎並不直接主張反對，而是認為馬總統的民意基礎不足，例如：</p>
                    <div className={styles.figAuguePoints}>
                      「馬習會發生在馬總統即將卸任的半年，也發生在台灣將產生新領導人的兩個月。這樣的歷史會面，毫無正當性跟必要性。」<br/>
                      「馬總統民調很低，過去常常無法信守他的承諾。」</div>
                    <p>在雙方領導人會面的問題上，民進黨意見似乎並不明確反對，而是著眼於應該交由大選後的新民意來決定。這可能間接證明：比起現在的在野監督角色，民進黨更看重將來執政的準備。</p>
                    <p>台灣政治的一個特點，就是立委都不只在立法院內處理問題，更經常在立法院外的媒體上交鋒。馬習會這次引起的爭議，也有類似現象。國民黨立委面對一開始民進黨立委在內政委員會挑起的「變更議程」之戰，選擇消極避戰不開會，而是在媒體上大動作開記者會，反批民進黨「鬼叫」。當國民黨出招「國情報告」而民進黨被動防禦後，更是在媒體上批判民進黨「假監督」。這些立法院外的口水砲，雖然增加了許多看頭，但是對於馬習會是否黑箱、國會如何監督等問題，其實沒有太大幫助。仍應回歸到立院內的表態，避免一再因爭議而延宕議事，才是立委的職責所在。</p>
                    {backToContents}
                </div>


            </div>
        )
    }
 }
