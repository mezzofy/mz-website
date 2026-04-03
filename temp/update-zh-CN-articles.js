const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../dist/i18n/translations/zh-CN.json');
const json = JSON.parse(fs.readFileSync(filePath, 'utf8'));

json.articles = {
  "news": {
    "cioworldFeature": {
      "title": "TheCIOWorld 专题报道 Mezzofy：以科技打造更环保的优惠券未来",
      "headings": {
        "nfcInnovation": "以 NFC 技术重新定义数码优惠券",
        "ecoFriendly": "环保优惠券营销，迈向更绿色的未来"
      },
      "paragraphs": {
        "innovation": "Mezzofy 在数字优惠券领域的创新方案获 CIOWorld 专题报道。公司领导人 Dicky Ying 分享了企业如何以环保意识转化传统优惠券模式。",
        "technologies": "报道重点介绍 Mezzofy 的先进技术，包括 <span class=\"font-semibold text-primary-orange\">NFC 轻触领取优惠券</span>及<span class=\"font-semibold text-primary-orange\">集成电子钱包功能</span>。这些工具协助企业在降低环境影响的同时，为顾客提供个性化体验。",
        "redefining": "报道强调 Mezzofy 正在重新定义可持续数字营销的格局，展示科技创新如何同时推动商业成功与环境可持续发展。"
      },
      "callout": {
        "heading": "阅读完整文章",
        "text": "前往 CIOWorld 了解 Mezzofy 对环保数字优惠券的愿景。"
      }
    },
    "dualEsgAwards": {
      "title": "Mezzofy 荣获「ESG 及可持续发展论坛暨颁奖典礼 2024」双项殊荣",
      "headings": {
        "recognition": "2024 可持续发展论坛双料 ESG 殊荣",
        "environmental": "以数字优惠券取代纸本，减少碳足迹"
      },
      "paragraphs": {
        "awards": "Mezzofy 于 9 月 27 日获邀出席由 HK01 主办的「ESG 及可持续发展论坛暨颁奖典礼 2024」，并荣获两项殊荣：<span class=\"font-semibold text-primary-orange\">「杰出 ESG 企业奖」</span>及<span class=\"font-semibold text-primary-orange\">「可持续发展企业认证」</span>。",
        "forum": "本次论坛汇聚商界领袖及可持续发展专家，共同探讨 ESG 趋势及将可持续发展目标融入企业运营。作为数字优惠券平台，Mezzofy 以电子优惠券取代纸本，有效减少纸张废弃物，降低对环境的影响。",
        "commitment": "此奖项进一步确立公司在环境责任及可持续发展领域的领导地位。香港特别行政区环境及生态局局长谢展寰强调，企业在推动可持续发展方面扮演重要角色。",
        "future": "Mezzofy 持续研发有益于环境与社会的解决方案，此次殊荣是继早前 ESG 认证后的又一重要里程碑。"
      }
    },
    "edigestLeadingSolution": {
      "title": "eDigest 独家报道：亚太区领先数字优惠券解决方案",
      "headings": {
        "pioneering": "开创亚太区数字优惠券解决方案先河",
        "innovative": "创新数字优惠券平台",
        "expanding": "拓展市场版图",
        "commitment": "持续创新承诺"
      },
      "paragraphs": {
        "pioneering": "Mezzofy 以<span class=\"font-semibold text-primary-orange\">「亚太区领先数字优惠券平台」</span>的定位，革新了优惠券管理模式。公司提供云端解决方案，协助企业创建、分发及管理电子优惠券，同时提升客户互动及运营效率。",
        "innovative": "平台凭借易用性及全面功能脱颖而出。企业无需深厚技术背景即可设计及部署数字优惠券。系统支持多种优惠券形式，包括折扣券、礼品券及促销优惠，满足多元化营销需求。",
        "expanding": "Mezzofy 业务遍及亚太多个国家及地区，累计协助发行及管理逾<span class=\"font-semibold text-primary-orange\">3 亿张数字优惠券</span>。广泛的覆盖范围印证了平台的可扩展性与可靠性，使其成为企业强化促销活动的首选。",
        "commitment": "公司持续投资研发，引入新功能及集成方案。凭借对创新的坚持，Mezzofy 为企业提供现代化工具，有效促进客户互动及业务增长。"
      }
    },
    "ejtech300mCoupons": {
      "title": "EJTech 报道：Mezzofy 云端平台于亚太区分发逾 3 亿张数字优惠券",
      "headings": {
        "cloudPlatform": "云端平台获认可为数字优惠券行业领导者",
        "distribution": "3 亿张优惠券：环保多渠道跨亚太区分发"
      },
      "paragraphs": {
        "recognition": "Mezzofy 的数字优惠券云端平台获 EJTech 报道，表彰其在亚太地区转化客户互动方面的贡献。",
        "platform": "平台让企业「高效创建及分发环保无纸化优惠券，覆盖广泛行业」。解决方案支持通过电子邮件、短信及社交媒体直接联系客户，同时减少纸张消耗。",
        "scale": "根据 EJTech 报道，<span class=\"font-semibold text-primary-orange\">「Mezzofy 已累计分发逾 3 亿张数字优惠券」</span>，充分展示其在重塑企业可持续及具成本效益客户连结方式上的强劲市场动力。",
        "milestone": "此里程碑代表亚太区促销营销数字化转型的重大成就。平台在维持高效率及环保特性的同时处理如此庞大规模，为行业树立了新标准。"
      }
    },
    "forbesDickyYin": {
      "title": "Forbes China 表彰 Dicky Yin 在创新领域的杰出领导力",
      "headings": {
        "recognition": "Forbes China 表彰 Dicky Yin 在创新领域的杰出领导力",
        "transforming": "革新数字优惠券行业"
      },
      "paragraphs": {
        "recognition": "Mezzofy（香港）有限公司行政总裁尹健强先生获 Forbes China 认可为杰出商业领袖。",
        "philosophy": "据文章报道，尹先生认为真正的领导力在于激励同事自愿认同组织方向。他强调建立能提供战略方向与机遇的职场文化，视团队成员为共同推进集体目标的协作伙伴。",
        "stewardship": "在尹先生的领导下，Mezzofy 从根本上革新了数字优惠券行业，为零售商提供灵活工具，提升客户对数字优惠券解决方案的认知与接受度。",
        "reshaping": "通过重塑消费者行为模式，公司正推动行业可持续发展。Forbes China 的认可彰显了尹先生在领导创新方面的独特视角，以及他致力在商业实践与环境影响上创造积极改变的决心。"
      },
      "quote": {
        "text": "「追随者决定谁是领袖。」",
        "attribution": "— Dicky Yin 的领导哲学"
      },
      "callout": {
        "heading": "阅读完整 Forbes China 报道",
        "text": "了解更多 Dicky Yin 的领导哲学及 Mezzofy 的使命。"
      }
    },
    "fundingAnnouncement": {
      "title": "Mezzofy 完成 200 万美元 Pre-Series A 融资轮",
      "headings": {
        "funding": "Mezzofy 完成 200 万美元 Pre-Series A 融资轮",
        "market": "目标市场：全球 297 亿美元数字优惠券市场",
        "traction": "15 个市场管理逾 4 亿张优惠券"
      },
      "paragraphs": {
        "announcement": "Mezzofy 宣布完成<span class=\"font-semibold text-primary-orange\">200 万美元 Pre-Series A 融资轮</span>，用于支持全球扩张及 Web3 功能产品开发。本轮融资由 Isola Capital 旗下 IPVF VII 领投，Ooosh Tech Lab 跟投，并获香港政府 ITVF 计划共同投资。",
        "market": "全球数字优惠券市场预计以<span class=\"font-semibold text-primary-orange\">18.6%</span>的复合年增长率扩张，至 2031 年有望达到 297 亿美元，亚太区为第二大市场。",
        "brands": "近 100 个亚洲品牌——包括美心集团、星巴克、壳牌及凯悦酒店——已采用 Mezzofy 平台。「优惠券即服务」模式可通过 API 与现有系统集成，据报可将运营成本削减逾 87%。",
        "management": "Mezzofy 在 15 个市场管理约<span class=\"font-semibold text-primary-orange\">4 亿张数字优惠券</span>，累计价值逾 51 亿美元。"
      },
      "quote": {
        "text": "「数字支付及电子商务的增长推动了数字优惠券的崛起。我们通过让数字优惠券可转让来解决这一问题。」",
        "attribution": "— Dicky Ying，行政总裁"
      }
    },
    "techappleInnovationIndex": {
      "title": "TechApple 报道：Mezzofy 于 2024 企业创新指数获评 3 星中小企",
      "headings": {
        "recognition": "Mezzofy 于 2024 企业创新指数获评 3 星中小企",
        "transformation": "推动香港跨行业数字转型"
      },
      "paragraphs": {
        "innovation": "「2024 企业创新指数」表彰创新领导力及卓越运营的成就，进一步巩固香港作为地区创新中心的地位。奥雅纳荣登榜首，恒生银行及香港机场管理局紧随其后。",
        "recognition": "今年是中小企首次纳入评核，37 家机构获得星级评级，其中<span class=\"font-semibold text-primary-orange\">Mezzofy（香港）有限公司凭借其在数字优惠券的贡献荣获三星</span>殊荣。",
        "collaboration": "该计划由香港政府及香港中文大学亚太工商研究所（APIB）支持，促进跨行业协作及数字转型，为政策制定者提供数据，同时表彰以创新及应变能力推动经济发展的企业。",
        "future": "指数持续鼓励各规模企业采用创新方法，强化竞争地位，确立香港迈向全球创新强国的发展轨迹。"
      }
    },
    "treasureGlobalPartnership": {
      "title": "Mezzofy 与 Treasure Global 合作，加速数字优惠券于马来西亚的扩张",
      "headings": {
        "partnership": "Mezzofy 与 Treasure Global 合作，拓展马来西亚数字优惠券业务",
        "scale": "15 个全球市场、400 亿美元交易规模",
        "platform": "「优惠券即服务」平台驱动收入增长"
      },
      "paragraphs": {
        "opening": "Mezzofy 宣布与 Treasure Global Inc. 建立战略合作伙伴关系，委任其为 Mezzofy 数字优惠券平台于马来西亚的独家分销商。",
        "positioning": "公司定位为管理 15 个市场逾 400 亿美元数字优惠券交易的区域领导者。其「优惠券即服务（CaaS）」平台让企业无需新增基础设施即可有效互动客户。",
        "collaboration": "通过此次合作，Treasure Global 将凭借其本地市场专业知识及数字能力，在马来西亚推广平台。双方预计在首年内实现<span class=\"font-semibold text-primary-orange\">「200 至 400 万美元的年度经常性收入」</span>。",
        "platform": "平台提供无缝优惠券创建、实时核销追踪及活动分析等功能。此次合作体现了 Mezzofy 支持马来西亚品牌善用数字创新促进客户互动的承诺，助力国家数字经济发展。"
      },
      "quote": {
        "text": "「Treasure Global 在当地的强大影响力及市场洞察力，使其成为我们在马来西亚推广解决方案的理想伙伴。」",
        "attribution": "— Dicky Ying，Mezzofy 行政总裁"
      }
    }
  },
  "blog": {
    "nfcParknshop": {
      "title": "Mezzofy 助品牌设置电子券到 240 间百佳 NFC 标签，全程代办、无需协调",
      "headings": {
        "introduction": "简介",
        "challenges": "挑战概述",
        "service": "服务方案",
        "benefits": "核心优势",
        "applications": "目标应用场景"
      },
      "paragraphs": {
        "intro": "对于许多快消品及消费品牌而言，通过实体零售渠道执行推广活动涉及大量协调工作及程序复杂性。",
        "challenges": "文章指出典型障碍：包括与百佳等零售商协调推广详情、设计实体优惠券物料、安排物流及店内陈列，以及追踪销售数据。",
        "service": "Mezzofy 现已支持百佳全港 240 个门店的 NFC 标签推广，提供「一站式」服务——品牌只需提供折扣内容，Mezzofy 负责优惠券创建、标签设置及物流，省去直接联络零售商的需要。",
        "benefitsIntro": "平台突出多项优势：",
        "applications": "此服务适用于新品上市、限时优惠、市场测试场景，以及希望避免使用 POS 或纸本操作的品牌。"
      },
      "benefits": {
        "purchaseIntent": "消费者主动领取电子优惠券时，购买意愿提升 <span class=\"font-semibold text-primary-orange\">5 倍</span>",
        "redemptionRate": "核销率达 <span class=\"font-semibold text-primary-orange\">30-34%</span>，远高于传统纸本优惠券的 15-20%",
        "costReduction": "每张优惠券分发成本低于 <span class=\"font-semibold text-primary-orange\">HK$0.20</span>，较实体物料节省逾 80%"
      },
      "contact": {
        "heading": "联系我们",
        "info": "<a href=\"mailto:hello@mezzofy.com\" class=\"text-primary-orange hover:underline\">hello@mezzofy.com</a> | <a href=\"https://www.linkedin.com/company/mezzofy\" class=\"text-primary-orange hover:underline\">LinkedIn</a>"
      }
    },
    "eCouponsPreference": {
      "title": "60% 消费者偏好电子优惠券：数字时代零售业的启示",
      "headings": {
        "rise": "电子优惠券的崛起",
        "footTraffic": "带动客流量与销售额",
        "nfc": "NFC 技术：简化核销流程",
        "ai": "AI 个性化推荐",
        "location": "位置化营销"
      },
      "paragraphs": {
        "rise": "「60% 消费者偏好电子优惠券」这一数据标志着购物行为的深刻转变。数字优惠券已成为企业关键的互动工具，尤其在结合 NFC 及 AI 技术后更为突出。这一偏好反映了消费者对便捷、快速及个性化购物体验的渴望。",
        "footTraffic": "研究显示「77% 的购物者更倾向光顾提供折扣的商店」，突显优惠券驱动的促销活动如何带动实体及线上销售。这一数据表明消费者积极寻找具吸引力促销的零售商，使数字优惠券成为争夺市场份额的关键工具。",
        "nfc": "NFC 技术让消费者在结账时轻触手机即可即时核销优惠券，消除繁琐流程，缔造无缝购物体验。通过省去出示实体券或手动输入代码的需要，NFC 数字优惠券大幅缩短交易时间，提升销售点的顾客满意度。",
        "ai": "AI 通过分析顾客行为模式，提供个性化优惠，提升数字优惠券的效能。机器学习算法分析购买历史、偏好及消费习惯，精准推送符合个人需求的优惠，大幅提高核销率及客户终身价值。",
        "location": "GPS 定位数字优惠券是另一强效零售策略，可向实体门店附近的顾客发送限时优惠。此地理围栏功能让零售商在顾客做决定的关键时刻精准互动，大幅提升核销率及冲动购买的可能性。"
      },
      "source": {
        "name": "EJINSIGHT"
      }
    },
    "environmentalExcellence": {
      "title": "香港环保卓越计划 — 以数字优惠券节省成本、保护森林",
      "headings": {
        "impact": "纸本优惠券的环境影响",
        "waste": "废物问题",
        "business": "数字解决方案的商业优势",
        "demand": "消费者对可持续选择的需求",
        "implementation": "实施步骤"
      },
      "paragraphs": {
        "impact": "全球每年分发逾 1,360 亿张纸本优惠券，摧毁约 500 万棵树木。造纸业是空气、水源及土壤的第三大工业污染源。传统优惠券系统的环境代价远超简单物流——它对地球自然资源及生态系统造成沉重负担。",
        "waste": "逾 90% 的纸本优惠券从未被核销，最终进入垃圾填埋场，在全球各地社区制造大量废物。这惊人的浪费率不仅代表资源损失，更通过垃圾填埋场甲烷排放及持久性污染加剧环境退化。",
        "businessIntro": "数字优惠券解决方案在带来环保效益的同时，亦提供显著商业优势：",
        "demand": "数字优惠券的采用符合 ESG（环境、社会、治理）原则——73% 的全球消费者表示愿意改变消费行为以减少环境损害。这一消费者偏好既是道德责任，亦是具前瞻性零售商的重要商机。",
        "implementationIntro": "计划转型至数字优惠券解决方案的机构，应遵循以下关键步骤："
      },
      "benefits": {
        "cost": "<span class=\"font-semibold text-primary-orange\">营销费用较传统纸本优惠券活动节省高达 70%</span>",
        "redemption": "<span class=\"font-semibold text-primary-orange\">数字优惠券核销率达 10%</span>，远高于纸本优惠券的 1%",
        "personalization": "<span class=\"font-semibold text-primary-orange\">个性化优惠可提升核销率 50%</span>，通过 AI 精准推荐实现",
        "analytics": "<span class=\"font-semibold text-primary-orange\">实时数据分析</span>让商家优化策略并最大化投资回报"
      },
      "steps": {
        "evaluate": "<span class=\"font-semibold text-primary-orange\">评估现有纸本优惠券成本</span>，了解潜在节省空间",
        "select": "<span class=\"font-semibold text-primary-orange\">选择合适的数字平台</span>，配合业务需求",
        "communicate": "<span class=\"font-semibold text-primary-orange\">向利益相关者及顾客传达环保效益</span>"
      },
      "contact": {
        "heading": "联系我们",
        "info": "<a href=\"mailto:hello@mezzofy.com\" class=\"text-primary-orange hover:underline\">hello@mezzofy.com</a> | <a href=\"https://www.linkedin.com/company/mezzofy\" class=\"text-primary-orange hover:underline\">LinkedIn</a>"
      }
    },
    "hotelTechInnovation": {
      "title": "科技创新为何是酒店成功的关键",
      "headings": {
        "challenges": "行业挑战",
        "travelers": "旅客的期望",
        "nfc": "NFC 技术提升宾客体验",
        "success": "真实成功案例",
        "chatbots": "聊天机器人推动位置化互动",
        "ai": "AI 驱动个性化服务",
        "urgency": "转型的迫切性"
      },
      "paragraphs": {
        "challenges": "酒店及旅游业面临顾客忠诚度下降及激烈竞争等重大挑战。在竞争日趋激烈的市场中，款待业企业必须通过卓越体验及创新服务来脱颖而出，以留住客源并建立长期关系。",
        "travelers": "研究显示 <span class=\"font-semibold text-primary-orange\">67% 的旅客期望个性化体验</span>，<span class=\"font-semibold text-primary-orange\">75% 愿意分享个人数据</span>以换取量身定制的优惠。这些数据揭示现代旅客积极追求个性化体验，并愿意以隐私换取个性化服务——酒店可通过智能科技应用把握此机遇。",
        "nfc": "NFC 技术不仅简化入住手续——宾客可轻触智能手机即时获取餐饮或当地景点的数字优惠券等奖励，在提升体验的同时增加收益。数字便捷与个性化优惠的无缝融合，缔造令酒店与竞争对手差异化的难忘体验。",
        "success": "<span class=\"font-semibold text-primary-orange\">Sarah Kay，民宿东主：</span>「实施 NFC 及数字优惠券改变了我们与宾客的连结方式，既提升销售，亦加强了与本地商户的合作关系。」此案例印证了整合 NFC 优惠券技术为酒店带来的实际效益。",
        "chatbots": "聊天机器人通过提供附近商店及餐厅的位置化优惠券，提升宾客互动体验。智能聊天机器人系统可根据宾客偏好及位置主动推荐餐饮、娱乐及购物机会，创造额外收益来源，同时提升宾客满意度。",
        "ai": "AI 驱动个性化服务通过分析过往入住记录及偏好，打造量身定制的推广活动。机器学习算法审视历史宾客数据，预判需求与偏好，让酒店能够推送与个别旅客产生共鸣的优惠及建议，提高互动率。",
        "urgency": "转型的迫切性不容忽视：<span class=\"font-semibold text-primary-orange\">80% 的顾客更倾向选择提供个性化体验的品牌。</span>延迟采用科技的酒店面临失去市场份额的风险，而竞争对手早已善用个性化优势建立顾客忠诚度及差异化竞争力。"
      },
      "dataSources": {
        "heading": "数据来源",
        "accenture": "Accenture Interactive（67% 个性化体验期望）",
        "pwc": "PwC 消费者智慧系列（75% 数据分享意愿）",
        "epsilon": "Epsilon 研究（80% 个性化偏好）"
      },
      "contact": {
        "heading": "联系我们",
        "info": "<a href=\"mailto:hello@mezzofy.com\" class=\"text-primary-orange hover:underline\">hello@mezzofy.com</a> | <a href=\"https://www.linkedin.com/company/mezzofy\" class=\"text-primary-orange hover:underline\">LinkedIn</a>"
      }
    },
    "holidayGuide": {
      "title": "假日优惠券指南：掌握最后冲刺的假日销售旺季",
      "headings": {
        "opportunity": "假日零售的商机",
        "misconception": "破除最后时刻的迷思",
        "capitalizing": "把握剩余机遇",
        "strategies": "假日成功的数字优惠券策略",
        "tactics": "迅速而精准的营销战术",
        "guidance": "全面假日指引"
      },
      "paragraphs": {
        "opportunity": "根据美国零售联合会（NRF）数据，2022 年假日零售销售额高达 9,430 至 9,600 亿美元。这些惊人数字凸显了在假日旺季最大化销售额的重要性——这是消费者年度支出高峰期，充满战略性零售商把握的机遇。",
        "misconception": "指南指出零售商的一个常见迷思：认为把握最后时刻购物者的窗口已经关闭。许多零售商错误地认为到 12 月中旬，其假日受众已基本锁定。然而，在圣诞节前最后几周，仍有大量机遇可从拖延的购物者及寻找最后时刻礼品方案的消费者中捕获消费。",
        "capitalizing": "重要的消费者群体在假日前最后几天仍积极购物，寻找礼品、补充必需品或寻求最后娱乐选择。在此关键窗口实施精准优惠券活动的战略性零售商，可占据可观市场份额并最大化假日旺季收益。",
        "strategies": "文章探讨在假日期间执行有效促销活动的策略，特别聚焦数字优惠券解决方案。现代零售商拥有可快速部署促销优惠的精密工具，能够动态回应消费者需求及购物模式。",
        "tacticsIntro": "零售商可采用迅速而精准的营销战术，在节日旺季尾声最大化销售。主要方法包括：",
        "guidance": "此全面指南协助企业以有效的优惠券策略应对假日购物旺季最后时刻。结合紧迫感营销、个性化及现代数字分发渠道，零售商可在一年中商业上最重要的旺季最大化收益。"
      },
      "tactics": {
        "flash": "针对最后时刻购物者的限时闪购优惠",
        "personalized": "基于浏览及购买历史的个性化数字优惠券",
        "mobile": "通过短信及推送通知的移动优先优惠券分发",
        "nfc": "支持即时核销的 NFC 店内促销",
        "bundled": "跨品类捆绑优惠，提升购物篮金额"
      },
      "contact": {
        "heading": "联系我们",
        "info": "<a href=\"mailto:hello@mezzofy.com\" class=\"text-primary-orange hover:underline\">hello@mezzofy.com</a> | <a href=\"https://www.linkedin.com/company/mezzofy\" class=\"text-primary-orange hover:underline\">LinkedIn</a>"
      }
    },
    "smartRetail": {
      "title": "科技驱动智慧零售：NFC 优惠券促进冲动购买",
      "headings": {
        "landscape": "零售业的演变格局",
        "nfc": "NFC 技术缔造无缝体验",
        "impulse": "冲动购买的商机",
        "strategies": "NFC 优惠券成功的智慧策略",
        "transformative": "变革潜力"
      },
      "subheadings": {
        "location": "战略性位置",
        "value": "价值感知",
        "merchandising": "互补式陈列",
        "relevance": "通过技术提升相关性",
        "senses": "感官互动"
      },
      "paragraphs": {
        "landscape": "零售业正经历科技及消费者偏好转变带来的重大变革。现代零售商必须拥抱创新，以保持竞争力并满足日益数字化市场中不断变化的客户期望。",
        "nfc": "NFC 技术让顾客通过轻触店内 NFC 标签即可轻松获取数字优惠券，简化购物流程，消除实体优惠券管理的繁琐。这种无摩擦互动为顾客缔造无缝体验，同时降低零售商的运营开销。",
        "impulse": "Slickdeals 的研究显示「四分之三（73%）的受访者会进行冲动购买」，平均月度冲动消费从 2021 年的 276 美元增至目前逾 314 美元。这些数据充分说明通过战略性店内促销及精心摆放数字优惠券捕获冲动购买行为的巨大价值。",
        "strategiesIntro": "成功实施 NFC 优惠券策略需要仔细关注多个关键因素：",
        "location": "在收银台附近及高停留时间区域摆放 NFC 优惠券，最大化曝光率及互动率。处于决策阶段的消费者对精心摆放的促销优惠反应最为积极。",
        "value": "强调优惠的节省幅度及效益有助推动核销。清晰传达折扣金额及价值主张可鼓励顾客采取行动。",
        "merchandising": "按品类、季节或活动进行逻辑分组，缔造连贯的购物体验。结合目标优惠券的战略性产品摆放，可提升交叉销售效果及购物篮金额。",
        "relevance": "基于本地活动、天气及客户行为模式的精准定向，确保优惠在正确时机触达正确受众。",
        "senses": "限时优惠制造紧迫感，刺激顾客回应。限时优惠利用稀缺性心理推动即时购买决策。",
        "transformative": "将 NFC 技术融入数字优惠券策略代表零售业的变革潜力。通过结合便捷科技与战略性促销思维，零售商可大幅提升销售业绩、顾客满意度及竞争定位。"
      },
      "contact": {
        "heading": "联系我们",
        "info": "<a href=\"mailto:hello@mezzofy.com\" class=\"text-primary-orange hover:underline\">hello@mezzofy.com</a> | <a href=\"https://www.linkedin.com/company/mezzofy\" class=\"text-primary-orange hover:underline\">LinkedIn</a>"
      }
    }
  }
};

fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
console.log('zh-CN articles updated successfully');
console.log('Total blog articles:', Object.keys(json.articles.blog).length);
console.log('Total news articles:', Object.keys(json.articles.news).length);
