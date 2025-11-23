import { DiveLevel, RoadmapStep } from './types';

export const APP_NAME = "DeepBlue Journey";

export const ROADMAP: RoadmapStep[] = [
  {
    id: 'step-0',
    level: DiveLevel.INTEREST,
    title: '探索蔚蓝 (Discover)',
    description: '为什么要潜水？感受失重的自由，探索地球的另外70%。',
    image: 'https://picsum.photos/800/600?random=10',
    topics: ['海洋的魅力', '潜水的历史', '第一次呼吸水下空气的感觉', '海洋生物多样性']
  },
  {
    id: 'step-1',
    level: DiveLevel.OPEN_WATER,
    title: '开放水域潜水员 (OW)',
    description: '成为合格潜水员的第一步。学习基础理论与技巧。',
    image: 'https://picsum.photos/800/600?random=11',
    topics: ['压力与体积 (波义耳定律)', '潜水装备介绍', '耳压平衡技巧', '潜伴制度 (Buddy System)', '水下手势']
  },
  {
    id: 'step-2',
    level: DiveLevel.ADVANCED,
    title: '进阶开放水域 (AOW)',
    description: '拓展你的极限。深潜、导航与夜潜。',
    image: 'https://picsum.photos/800/600?random=12',
    topics: ['深潜生理反应', '水下导航基础', '浮力控制顶尖表现', '夜潜注意事项']
  },
  {
    id: 'step-3',
    level: DiveLevel.RESCUE,
    title: '救援潜水员 (Rescue)',
    description: '学会照顾他人。识别压力，处理紧急情况。',
    image: 'https://picsum.photos/800/600?random=13',
    topics: ['恐慌潜水员识别', '水面救援技巧', '水下搜寻模式', '急救氧气使用']
  },
  {
    id: 'step-4',
    level: DiveLevel.DIVEMASTER,
    title: '潜水长 (Divemaster)',
    description: '迈向专业人士的第一步。引导潜水，协助教学。',
    image: 'https://picsum.photos/800/600?random=14',
    topics: ['潜水物理与生理详解', '潜水环境制图', '潜水简报技巧', '风险管理']
  },
  {
    id: 'step-5',
    level: DiveLevel.INSTRUCTOR,
    title: '开放水域教练 (OWSI)',
    description: '分享你的激情。教导他人如何安全潜水。',
    image: 'https://picsum.photos/800/600?random=15',
    topics: ['教学心理学', 'PADI/SSI 标准概览', '平静水域教学演练', '开放水域评估']
  }
];