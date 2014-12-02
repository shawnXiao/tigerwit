'use strict';

angular.module('tigerwitApp')
.factory('i18nConf',
['$rootScope', '$location',
function($rootScope, $location) {
    return {
        "00001": {
            "cn": "老虎汇",
            "us": "TigerWit"
        },
        "00002": {
            "cn": "跟单",
            "us": "Copy Trade"
        },
        "00003": {
            "cn": "热门话题",
            "us": "Hotest"
        },
        "00004": {
            "cn": "交易",
            "us": "Trading"
        },
        "00005": {
            "cn": "排行榜",
            "us": "Ranking"
        },
        "00006": {
            "cn": "合作伙伴",
            "us": "Cooperation"
        },
        "00007": {
            "cn": "更多",
            "us": "More"
        },
        "00008": {
            "cn": "输入手机号",
            "us": "Phone Number"
        },
        "00009": {
            "cn": "快速开通模拟账号",
            "us": "Open Demo Account"
        },
        "000010": {
            "cn": "人人都会“玩”",
            "us": "Simples as Plug and Play"
        },
        "000011": {
            "cn": "上百位投资高手“教”你玩",
            "us": "Hundreds of trading guru to guide you how to trade"
        },
        "000012": {
            "cn": "不同水平的投资者都能找到适合自己的交易平台入门版，进阶版和专家版任你选择",
            "us": "Flexible – No matter which trading level you are, you can always find the platform that suits you the best."
        },
        "000013": {
            "cn": "PC端，移动端，随时随地炒外汇",
            "us": "PC and mobile end enables you to trade forex anytime, anywhere"
        },
        "000014": {
            "cn": "人人都 “玩” 得起",
            "us": "Everybody can Trade"
        },
        "000015": {
            "cn": "免费体验模拟账号，立即获得10000美金体验奖金",
            "us": "Get free demo with $10,000 virtual trading capital"
        },
        "000016": {
            "cn": "最低交易5美金",
            "us": "Minimum $5 trading amount"
        },
        "000017": {
            "cn": "灵活智能的平台",
            "us": "Intelligent Trading Platform"
        },
        "000018": {
            "cn": "25, 50, 100, 200倍杠杆任意选择",
            "us": "25:1, 50:1, 100:1, 200:1 leverage"
        },
        "000019": {
            "cn": "自动建议止盈、止损价",
            "us": "Automatic stop loss and stop profit point"
        },
        "000020": {
            "cn": "复制交易高手订单，一键开启赚钱旅程",
            "us": "Copy trading master order by one click, and start make profit!"
        },
        "000021": {
            "cn": "大家都在用",
            "us": "Everybody is using it"
        },
        "000022": {
            "cn": "目前已有532位交易高手加入",
            "us": "Till now: 532 trading masters joined us"
        },
        "000023": {
            "cn": "本周已经产生34567笔交易",
            "us": "34567 trades been made"
        },
        "000024": {
            "cn": "本月已经为投资者赚得456787美元",
            "us": "Generate $456,787 profit for investors"
        },
        "000025": {
            "cn": "产品",
            "us": "Product"
        },
        "000026": {
            "cn": "MT4专业版",
            "us": "MT4 professional"
        },
        "000027": {
            "cn": "合作伙伴",
            "us": "Partners"
        },
        "000028": {
            "cn": "代理加盟",
            "us": "Affiliation"
        },
        "000029": {
            "cn": "成为高手",
            "us": "Trading Master"
        },
        "000030": {
            "cn": "媒体合作",
            "us": "Media cooperation"
        },
        "000031": {
            "cn": "支持",
            "us": "Support"
        },
        "000032": {
            "cn": "交易须知",
            "us": "Trading rules"
        },
        "000033": {
            "cn": "风险警告",
            "us": "Risk warning"
        },
        "000034": {
            "cn": "隐私政策",
            "us": "Privacy"
        },
        "000035": {
            "cn": "风险提示：",
            "us": "Risk warning:"
        },
        "000036": {
            "cn": "外汇交易、差价合约和其他保证金交易存在较高风险，不适合所有投资者。增大杠杆意味着增加风险，决定参与交易前，您应谨慎考虑您的投资目标、经验等级及风险承受能力。您可能会亏损部分或者全部资金。交易者应该清楚的了解与交易相关的所有风险，必要时可向第三方征询意见。",
            "us": "Trading forex, CFDS and other margins involve high risks and may not suitable for all investors. Increasing leverage means higher risks, you need to consider your investment objectives, trading experience and capacity of bearing risk before trading. You may have possibility to loss part or all of your investment. Every single trader shall understand all the relevant risks and if possible consult a 3rd party for suggestions."
        },
        "000037": {
            "cn": "Tiger Wit 网站上的任何信息，包括实时交易信号，投资文章，外汇资源均来自互联网，并不适用于所有用户，Tiger Wit 不对用户发表的任何内容承担责任，本网站不提供任何形式的投资建议，对于本网站上的实时交易信号，您必须进行独立思考以作出判断，历史利润不代表未来一定会获得利润，您必须理解并同意由于使用Tiger Wit 网站服务所产生的任何形式的风险需要您个人全权承担。",
            "us": "All the information including trading signals, investment related article and resources may come from internet, and may not adapt all investors, TigerWit will bear no responsibility for those content and will not give any suggestions to any customer. For the trading signal that show on the website, you may use it solely based on your own judgment, the history profit record is not a grantee for the future profit, you need to totally understand it and take the potential responsibility risks. "
        },
        "000038": {
            "cn": "低至3%的交易手续费",
            "us": "No commission"
        },
        "000039": {
            "cn": "关于老虎汇",
            "us": "About TigerWit"
        },
        "000040": {
            "cn": "公司优势",
            "us": "Advantage"
        },
        "000041": {
            "cn": "监管安全",
            "us": "Security"
        },
        "000042": {
            "cn": "联系我们",
            "us": "Contact"
        },
        "000043": {
            "cn": "新手教程",
            "us": "Guidance"
        },
        "000044": {
            "cn": "推荐好友",
            "us": "Refer to a Friend"
        },
        "000048": {
            "cn": "常见问题",
            "us": "FAQ"
        },
        "000049": {
            "cn": "交易术语",
            "us": "Glossary"
        },
        "000050": {
            "cn": "平台",
            "us": "Platform"
        },
        "000051": {
            "cn": "外汇",
            "us": "Forex"
        },
        "000052": {
            "cn": "贵金属",
            "us": "Precious Metal"
        },
        "000053": {
            "cn": "CFDS",
            "us": "CFDS"
        },
        "000054": {
            "cn": "产品",
            "us": "Product"
        },
        "000055": {
            "cn": "IOS 版本",
            "us": "IOS"
        },
        "000056": {
            "cn": "安卓版本",
            "us": "Android"
        },
        "000057": {
            "cn": "网页版",
            "us": "WebTrader"
        },
        "000058": {
            "cn": "MT4 专家版",
            "us": "MT4 for professionals"
        },
        "000059": {
            "cn": "风险提示",
            "us": "Risk warning"
        },
        "000060": {
            "cn": "您的手机号码",
            "us": "Enter your phone number"
        },
        "000061": {
            "cn": "账号",
            "us": "Account"
        },
        "000062": {
            "cn": "密码",
            "us": "Password"
        }
    };
    // 结束
}]);

