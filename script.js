/* =========================================================
   Nekomimi Paradise · 猫耳乐园 — interactions
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const rand = (a, b) => Math.random() * (b - a) + a;
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const store = {
    get(k, d) { try { const v = localStorage.getItem('neko:' + k); return v === null ? d : JSON.parse(v); } catch { return d; } },
    set(k, v) { try { localStorage.setItem('neko:' + k, JSON.stringify(v)); } catch { /* ignore */ } }
  };

  /* ---------------------------------------------------------
     猫娘数据
     --------------------------------------------------------- */
  const CATS = [
    {
      id: 'sakura', name: '小樱', en: 'Sakura', type: 'airhead', typeName: '天然系',
      tags: ['天然呆', '樱花控', '元气'],
      hair: '#f6a6c1', hairDark: '#e07fa3', eye: '#7c4dff', skin: '#ffe9e0', outfit: '#ffffff', accent: '#ff7aa8',
      bg: 'linear-gradient(160deg,#ffe0ec,#ffd1e3 50%,#fbe7ff)',
      acc: 'flower',
      quote: '“欸？今天也是樱花满开的好日子喵~”',
      stats: { 傲娇: 20, 粘人: 75, 食量: 60, 睡眠: 70 },
      birthday: '3月27日', height: '152 cm', likes: '樱花饼、追蝴蝶、晒太阳', dislikes: '下雨天、吸尘器',
      story: '乐园的第一位猫娘，在一个春雨的午后被收留。总是迷迷糊糊地把花瓣当成小鱼干，但她的笑容能让整个乐园都亮起来。',
      lines: ['今天的风是樱花味的喵！', '咦？我的尾巴去哪了……啊，在后面。', '要一起去看花吗？喵~', '花瓣……好像不能吃呢。']
    },
    {
      id: 'luna', name: '露娜', en: 'Luna', type: 'cool', typeName: '高冷系',
      tags: ['高冷', '夜行', '神秘'],
      hair: '#3a3456', hairDark: '#241f3a', eye: '#ffc94d', skin: '#fbe6dc', outfit: '#2d2a4a', accent: '#b6a6ff',
      bg: 'linear-gradient(160deg,#d9d4ff,#b8b0f0 50%,#8f86d9)',
      acc: 'moon',
      quote: '“……别靠太近。除非你带了小鱼干。”',
      stats: { 傲娇: 70, 粘人: 30, 食量: 40, 睡眠: 90 },
      birthday: '10月31日', height: '160 cm', likes: '月光、安静的书房、热可可', dislikes: '吵闹、早起',
      story: '只在夜晚现身的神秘猫娘。白天几乎找不到她，传说她在乐园屋顶守护着所有人的梦。嘴上冷淡，其实会偷偷给晚归的人留一盏灯。',
      lines: ['……哼，随便你。', '月亮很圆，所以今天可以陪你一会儿。', '别、别摸耳朵！……再一下就好。', '晚安。做个好梦，人类。']
    },
    {
      id: 'mochi', name: '麻糬', en: 'Mochi', type: 'clingy', typeName: '粘人系',
      tags: ['超粘人', '软糯', '踩奶'],
      hair: '#fffaf4', hairDark: '#eadfd3', eye: '#4fb3ff', skin: '#fff0ea', outfit: '#ffd6e5', accent: '#ff9ec2',
      bg: 'linear-gradient(160deg,#fff7f0,#ffe9f1 50%,#e7f4ff)',
      acc: 'bow',
      quote: '“抱抱！再抱抱！今天也要一直在一起喵~”',
      stats: { 傲娇: 5, 粘人: 100, 食量: 70, 睡眠: 85 },
      birthday: '1月14日', height: '148 cm', likes: '被抱、软垫子、草莓大福', dislikes: '一个人、关着的门',
      story: '像糯米团子一样白白软软的猫娘。只要你坐下，她就会出现在你腿上；只要你起身，她就会用湿漉漉的眼睛看着你。',
      lines: ['你回来啦！等了你好久喵！', '可以踩踩吗？就一下下~', '呼噜噜噜噜……', '不要走嘛……'],
    },
    {
      id: 'amber', name: '琥珀', en: 'Amber', type: 'tsundere', typeName: '傲娇系',
      tags: ['傲娇', '橘猫', '大小姐'],
      hair: '#f29a4a', hairDark: '#d47422', eye: '#2fbf8f', skin: '#ffe6d6', outfit: '#c2385a', accent: '#ffd36b',
      bg: 'linear-gradient(160deg,#ffe7c9,#ffd2a8 50%,#ffc2c2)',
      acc: 'crown',
      quote: '“才、才不是特意等你的！只是刚好路过而已喵！”',
      stats: { 傲娇: 100, 粘人: 55, 食量: 95, 睡眠: 60 },
      birthday: '8月8日', height: '155 cm', likes: '高级罐头、被夸奖、王座（纸箱）', dislikes: '被无视、洗澡',
      story: '自称乐园女王的橘色猫娘。食量是全乐园第一，傲娇程度也是全乐园第一。被夸奖时尾巴会疯狂摇动，但嘴上绝对不承认。',
      lines: ['哼！本小姐才不稀罕呢！', '……既然你这么诚恳，就允许你摸一下。', '罐头呢？本小姐的罐头呢？', '笨、笨蛋！谁让你夸我的！'],
    },
    {
      id: 'yukimi', name: '雪见', en: 'Yukimi', type: 'cool', typeName: '高冷系',
      tags: ['冰山', '优雅', '茶道'],
      hair: '#cfe3f7', hairDark: '#9fbfe0', eye: '#5aa6ff', skin: '#fff3ef', outfit: '#6c8fc7', accent: '#ffffff',
      bg: 'linear-gradient(160deg,#eef6ff,#d6e8ff 50%,#e9e0ff)',
      acc: 'snow',
      quote: '“请用茶。……加了一点点猫薄荷。”',
      stats: { 傲娇: 50, 粘人: 25, 食量: 30, 睡眠: 65 },
      birthday: '12月21日', height: '163 cm', likes: '雪景、抹茶、书法', dislikes: '炎热、毛线打结',
      story: '如初雪般安静优雅的猫娘，乐园茶室的主人。很少笑，但会记住每个人喜欢的茶的温度。',
      lines: ['今日宜饮茶，宜静心。', '……你的手很暖。', '雪落下的声音，你听得到吗？', '茶要趁热喝喵。'],
    },
    {
      id: 'pudding', name: '布丁', en: 'Pudding', type: 'clingy', typeName: '粘人系',
      tags: ['甜点师', '温柔', '手作'],
      hair: '#f5d48a', hairDark: '#d9ad55', eye: '#ff7a59', skin: '#fff0e2', outfit: '#8b5a3c', accent: '#fff3c4',
      bg: 'linear-gradient(160deg,#fff4d6,#ffe5b8 50%,#ffd9c7)',
      acc: 'bell',
      quote: '“新烤的小鱼饼干出炉啦，第一块给你喵~”',
      stats: { 傲娇: 15, 粘人: 85, 食量: 80, 睡眠: 50 },
      birthday: '5月5日', height: '150 cm', likes: '烘焙、毛线、热牛奶', dislikes: '烤焦的饼干、雷声',
      story: '乐园的甜点师，身上总带着香草和黄油的味道。喜欢用毛线织各种歪歪扭扭的小东西送给大家。',
      lines: ['要尝尝我做的布丁吗？', '这个毛线球……我织给你的！', '肚子饿了吗？我去烤点心！', '叮铃~ 是我的铃铛在说想你。'],
    },
    {
      id: 'coco', name: '可可', en: 'Coco', type: 'airhead', typeName: '天然系',
      tags: ['迷糊', '冒险家', '纸箱控'],
      hair: '#8a5a44', hairDark: '#62392a', eye: '#45c4b0', skin: '#ffe8da', outfit: '#3fa37c', accent: '#ffcf5a',
      bg: 'linear-gradient(160deg,#e2f7ec,#cdeedd 50%,#fff1cc)',
      acc: 'leaf',
      quote: '“发现了一个超——大的纸箱！今天就住这里了喵！”',
      stats: { 傲娇: 25, 粘人: 60, 食量: 75, 睡眠: 55 },
      birthday: '6月18日', height: '146 cm', likes: '纸箱、探险、捉迷藏', dislikes: '黄瓜、被找到',
      story: '好奇心满满的小个子猫娘，每天都在乐园里“探险”。经常卡在奇怪的地方，然后理直气壮地说“我是故意的”。',
      lines: ['冲呀！探险开始喵！', '这个箱子是我的了！', '咦，这里是哪里……', '找到我了？不可能！'],
    },
    {
      id: 'lily', name: '莉莉', en: 'Lily', type: 'tsundere', typeName: '傲娇系',
      tags: ['小恶魔', '歌姬', '紫罗兰'],
      hair: '#c8a2f0', hairDark: '#9c74cf', eye: '#ff5c8a', skin: '#ffeaf0', outfit: '#1f1630', accent: '#ff8fbf',
      bg: 'linear-gradient(160deg,#f3e6ff,#e2cdff 50%,#ffd6ea)',
      acc: 'star',
      quote: '“想听我唱歌？那、那就只唱给你一个人听喵。”',
      stats: { 傲娇: 85, 粘人: 65, 食量: 45, 睡眠: 40 },
      birthday: '2月14日', height: '157 cm', likes: '唱歌、闪亮的东西、恶作剧', dislikes: '被说可爱（其实很喜欢）',
      story: '乐园偶像，舞台上光芒四射的小恶魔。喜欢恶作剧捉弄人，被反过来夸可爱时会瞬间满脸通红。',
      lines: ['嘿嘿，上当了吧~', '不、不许说我可爱！', '今晚的演唱会，第一排留给你。', '……再说一次？刚刚没听清。'],
    }
  ];
  const catById = id => CATS.find(c => c.id === id);

  /* ---------------------------------------------------------
     SVG 猫娘生成器
     --------------------------------------------------------- */
  let svgUid = 0;
  function accessory(c) {
    switch (c.acc) {
      case 'flower': return `<g transform="translate(130 58)">${[0, 72, 144, 216, 288].map(r => `<ellipse rx="6" ry="9" cy="-8" fill="#ffc2d6" transform="rotate(${r})"/>`).join('')}<circle r="4" fill="#ffd36b"/></g>`;
      case 'moon': return `<path d="M128 50 a12 12 0 1 0 12 16 a9 9 0 1 1 -12 -16z" fill="#ffd56b"/>`;
      case 'bow': return `<g transform="translate(130 56)"><path d="M0 0 L-14 -9 L-14 9 Z M0 0 L14 -9 L14 9 Z" fill="${c.accent}"/><circle r="4" fill="#ff6fa3"/></g>`;
      case 'crown': return `<path d="M82 46 L86 32 L94 42 L100 28 L106 42 L114 32 L118 46 Z" fill="#ffd36b" stroke="#e0a42e" stroke-width="1.5"/><circle cx="100" cy="40" r="2.5" fill="#ff5c8a"/>`;
      case 'snow': return `<g transform="translate(130 58)" stroke="#fff" stroke-width="2.4" stroke-linecap="round">${[0, 60, 120].map(r => `<line x1="-9" x2="9" transform="rotate(${r})"/>`).join('')}</g>`;
      case 'bell': return '';
      case 'leaf': return `<path d="M124 60 Q136 42 150 50 Q140 66 124 60Z" fill="#5cc28f"/><path d="M126 59 Q138 52 146 51" stroke="#2f8a5f" stroke-width="1.2" fill="none"/>`;
      case 'star': return `<path d="M132 46 l3.5 7 7.5 1 -5.5 5 1.5 7.5 -7 -3.8 -7 3.8 1.5 -7.5 -5.5 -5 7.5 -1z" fill="#ffd36b"/>`;
      default: return '';
    }
  }
  function catSVG(c, opts = {}) {
    const u = ++svgUid;
    const mood = opts.mood || 'smile';
    const mouth = {
      smile: `<path d="M93 125 Q96.5 129.5 100 125 Q103.5 129.5 107 125" stroke="#7a3b4f" stroke-width="2" fill="none" stroke-linecap="round"/>`,
      open: `<path d="M94 124 Q100 136 106 124 Z" fill="#c9506e"/>`,
      pout: `<path d="M95 128 Q100 124 105 128" stroke="#7a3b4f" stroke-width="2" fill="none" stroke-linecap="round"/>`
    }[mood];
    return `
<svg class="catgirl" viewBox="0 0 200 240" xmlns="http://www.w3.org/2000/svg" aria-label="${c.name}">
  <defs>
    <radialGradient id="eye${u}" cx="50%" cy="35%" r="70%">
      <stop offset="0" stop-color="#fff" stop-opacity=".5"/><stop offset=".35" stop-color="${c.eye}"/><stop offset="1" stop-color="#2a1630"/>
    </radialGradient>
    <linearGradient id="hair${u}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${c.hair}"/><stop offset="1" stop-color="${c.hairDark}"/>
    </linearGradient>
  </defs>
  <g class="tail" style="animation-delay:${(-Math.random() * 3).toFixed(2)}s"><path d="M128 200 Q182 206 176 160 Q172 128 188 112" stroke="${c.hairDark}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M182 122 Q186 114 188 112" stroke="${c.hair}" stroke-width="13" stroke-linecap="round"/></g>
  <path d="M46 102 Q38 38 100 30 Q162 38 154 102 L162 176 Q132 190 100 182 Q68 190 38 176 Z" fill="url(#hair${u})"/>
  <path d="M60 240 Q58 186 100 174 Q142 186 140 240 Z" fill="${c.outfit}"/>
  <path d="M88 176 L100 194 L112 176 Z" fill="#fff" opacity=".95"/>
  <rect x="92" y="146" width="16" height="30" rx="6" fill="${c.skin}"/>
  <path d="M84 178 Q100 186 116 178" stroke="${c.accent}" stroke-width="5" fill="none" stroke-linecap="round"/>
  <circle cx="100" cy="190" r="${c.acc === 'bell' ? 7 : 5}" fill="#ffd36b" stroke="#d9a032" stroke-width="1.5"/><line x1="100" y1="191" x2="100" y2="195" stroke="#a87220" stroke-width="1.5"/>
  <g class="ear-l"><path d="M50 76 L58 18 L94 50 Z" fill="url(#hair${u})"/><path d="M59 66 L62 32 L83 52 Z" fill="#ffb8cf"/><path d="M62 40 L66 50 M66 36 L70 48" stroke="#fff" stroke-width="1.5" opacity=".6"/></g>
  <g class="ear-r"><path d="M150 76 L142 18 L106 50 Z" fill="url(#hair${u})"/><path d="M141 66 L138 32 L117 52 Z" fill="#ffb8cf"/><path d="M138 40 L134 50 M134 36 L130 48" stroke="#fff" stroke-width="1.5" opacity=".6"/></g>
  <ellipse cx="100" cy="106" rx="47" ry="45" fill="${c.skin}"/>
  <g class="eyes" style="animation-delay:${(-Math.random() * 4.5).toFixed(2)}s">
    <ellipse cx="79" cy="110" rx="10" ry="13" fill="url(#eye${u})"/>
    <ellipse cx="121" cy="110" rx="10" ry="13" fill="url(#eye${u})"/>
    <ellipse cx="79" cy="112" rx="4.5" ry="7" fill="#1d0f22"/>
    <ellipse cx="121" cy="112" rx="4.5" ry="7" fill="#1d0f22"/>
    <circle cx="75" cy="104" r="4" fill="#fff"/><circle cx="117" cy="104" r="4" fill="#fff"/>
    <circle cx="83" cy="117" r="2" fill="#fff" opacity=".85"/><circle cx="125" cy="117" r="2" fill="#fff" opacity=".85"/>
    <path d="M67 99 Q79 92 90 98" stroke="#3a1d2c" stroke-width="2.6" fill="none" stroke-linecap="round"/>
    <path d="M110 98 Q121 92 133 99" stroke="#3a1d2c" stroke-width="2.6" fill="none" stroke-linecap="round"/>
  </g>
  <ellipse cx="68" cy="126" rx="9" ry="5" fill="#ff8fb1" opacity=".45"/>
  <ellipse cx="132" cy="126" rx="9" ry="5" fill="#ff8fb1" opacity=".45"/>
  <path d="M63 124 l5 -2 M66 128 l5 -2 M129 122 l5 2 M126 126 l5 2" stroke="#ff7aa0" stroke-width="1.3" opacity=".6"/>
  ${mouth}
  <path d="M52 104 Q50 52 100 46 Q150 52 148 104 Q140 82 128 76 Q126 94 113 98 Q110 82 100 74 Q90 82 87 98 Q74 94 72 76 Q60 82 52 104 Z" fill="url(#hair${u})"/>
  <path d="M53 96 Q42 134 54 166 Q60 132 64 102 Z" fill="url(#hair${u})"/>
  <path d="M147 96 Q158 134 146 166 Q140 132 136 102 Z" fill="url(#hair${u})"/>
  <path class="hair-strand" d="M98 48 Q92 24 112 16 Q100 30 104 48 Z" fill="${c.hairDark}"/>
  <path d="M74 62 Q90 52 108 56" stroke="#fff" stroke-width="3" opacity=".35" fill="none" stroke-linecap="round"/>
  ${accessory(c)}
</svg>`;
  }

  /* ---------------------------------------------------------
     Loader / theme / sound
     --------------------------------------------------------- */
  window.addEventListener('load', () => setTimeout(() => $('#loader').classList.add('done'), 900));
  setTimeout(() => $('#loader').classList.add('done'), 4000);

  const root = document.documentElement;
  const savedTheme = store.get('theme', null);
  const preferDark = window.matchMedia && matchMedia('(prefers-color-scheme: dark)').matches;
  root.setAttribute('data-theme', savedTheme || (preferDark ? 'dark' : 'light'));
  $('#themeToggle').addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store.set('theme', next);
    toast(next === 'dark' ? '🌙 夜晚的乐园，猫娘们的眼睛在发光' : '☀️ 早安！猫娘们正在伸懒腰');
  });

  let soundOn = store.get('sound', true);
  let actx = null;
  const soundBtn = $('#soundToggle');
  const syncSound = () => { soundBtn.textContent = soundOn ? '🔔' : '🔕'; };
  syncSound();
  soundBtn.addEventListener('click', () => {
    soundOn = !soundOn; store.set('sound', soundOn); syncSound();
    toast(soundOn ? '喵声已开启 🔔' : '喵声已静音 🔕');
    if (soundOn) meow();
  });
  function meow(pitch = 1) {
    if (!soundOn) return;
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      const t = actx.currentTime;
      const o = actx.createOscillator(), g = actx.createGain(), f = actx.createBiquadFilter();
      o.type = 'sawtooth';
      f.type = 'bandpass'; f.frequency.value = 1400; f.Q.value = 2;
      const base = 520 * pitch * rand(.92, 1.08);
      o.frequency.setValueAtTime(base, t);
      o.frequency.linearRampToValueAtTime(base * 1.7, t + .12);
      o.frequency.linearRampToValueAtTime(base * .9, t + .42);
      g.gain.setValueAtTime(0, t);
      g.gain.linearRampToValueAtTime(.16, t + .05);
      g.gain.exponentialRampToValueAtTime(.001, t + .5);
      o.connect(f); f.connect(g); g.connect(actx.destination);
      o.start(t); o.stop(t + .52);
    } catch { /* audio unsupported */ }
  }

  /* ---------------------------------------------------------
     Toast & bursts
     --------------------------------------------------------- */
  let toastTimer;
  function toast(msg) {
    const t = $('#toast');
    t.textContent = msg; t.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
  }
  function burst(x, y, chars = ['💗', '💕', '✨', '🐾'], n = 8) {
    for (let i = 0; i < n; i++) {
      const s = document.createElement('span');
      s.className = 'burst';
      s.textContent = pick(chars);
      const a = rand(0, Math.PI * 2), d = rand(50, 130);
      s.style.left = x + 'px'; s.style.top = y + 'px';
      s.style.setProperty('--dx', Math.cos(a) * d + 'px');
      s.style.setProperty('--dy', Math.sin(a) * d - 40 + 'px');
      s.style.setProperty('--rot', rand(-90, 90) + 'deg');
      document.body.appendChild(s);
      setTimeout(() => s.remove(), 1200);
    }
  }

  /* ---------------------------------------------------------
     Nav, scroll progress, active links, back to top
     --------------------------------------------------------- */
  const nav = $('#nav'), burger = $('#burger'), links = $('#navLinks');
  burger.addEventListener('click', () => { burger.classList.toggle('open'); links.classList.toggle('open'); });
  $$('#navLinks a').forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); links.classList.remove('open'); }));

  const prog = $('#scrollProgress'), toTop = $('#toTop');
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    nav.classList.toggle('scrolled', y > 30);
    prog.style.width = (h > 0 ? y / h * 100 : 0) + '%';
    toTop.classList.toggle('show', y > 700);
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  toTop.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  const sections = $$('main section[id]');
  const navIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        $$('[data-nav]').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
      }
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  sections.forEach(s => navIO.observe(s));

  /* ---------------------------------------------------------
     Reveal on scroll + counters
     --------------------------------------------------------- */
  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const sibs = [...el.parentElement.children].filter(n => n.classList.contains('reveal'));
      el.style.transitionDelay = Math.min(sibs.indexOf(el), 6) * 0.09 + 's';
      el.classList.add('in');
      revealIO.unobserve(el);
    });
  }, { threshold: 0.12 });
  const observeReveal = root => $$('.reveal', root).forEach(el => revealIO.observe(el));
  observeReveal(document);

  const countIO = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target, target = +el.dataset.count, start = performance.now(), dur = 2000;
      const step = now => {
        const p = Math.min((now - start) / dur, 1), eased = 1 - Math.pow(1 - p, 4);
        el.textContent = Math.round(target * eased).toLocaleString() + (p === 1 && target > 9999 ? '+' : '');
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
      countIO.unobserve(el);
    });
  }, { threshold: .6 });
  $$('[data-count]').forEach(el => countIO.observe(el));

  /* ---------------------------------------------------------
     Typing effect
     --------------------------------------------------------- */
  const phrases = ['会撒娇的', '会傲娇的', '会踩奶的', '会呼噜噜的', '会在你怀里睡着的', '世界第一可爱的'];
  const typedEl = $('#typed');
  let pi = 0, ci = 0, deleting = false;
  (function type() {
    const word = phrases[pi];
    typedEl.textContent = word.slice(0, ci) + (ci === word.length && !deleting ? '猫娘喵~' : '');
    if (!deleting && ci < word.length) { ci++; setTimeout(type, 140); }
    else if (!deleting) { deleting = true; setTimeout(type, 1800); }
    else if (ci > 0) { ci--; typedEl.textContent = word.slice(0, ci); setTimeout(type, 60); }
    else { deleting = false; pi = (pi + 1) % phrases.length; setTimeout(type, 300); }
  })();

  /* ---------------------------------------------------------
     Hero cat & polaroids
     --------------------------------------------------------- */
  const heroCat = $('#heroCat');
  heroCat.innerHTML = catSVG(CATS[0]);
  const heroLines = ['喵~ 欢迎光临！', '要摸摸头吗？', '今天也辛苦了喵', '♡ 呼噜噜 ♡', '你身上有小鱼干的味道！'];
  heroCat.addEventListener('click', e => {
    const svg = $('svg', heroCat);
    svg.classList.remove('happy'); void svg.offsetWidth; svg.classList.add('happy');
    burst(e.clientX, e.clientY);
    meow(1.1);
    $('.tag-2').textContent = pick(heroLines);
  });
  $$('.polaroid-img').forEach(el => {
    const c = catById(el.dataset.cat);
    el.style.background = c.bg;
    el.innerHTML = catSVG(c, { mood: el.dataset.cat === 'mochi' ? 'smile' : 'open' });
  });
  $$('.polaroid').forEach((p, i) => p.addEventListener('click', () => openProfile(catById(['mochi', 'luna', 'sakura'][i]))));

  /* ---------------------------------------------------------
     Tilt cards
     --------------------------------------------------------- */
  $$('.tilt').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      card.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 12}deg) rotateY(${(x - 0.5) * 12}deg) translateY(-6px)`;
      card.style.setProperty('--mx', x * 100 + '%');
      card.style.setProperty('--my', y * 100 + '%');
    });
    card.addEventListener('mouseleave', () => { card.style.transform = ''; });
  });

  /* ---------------------------------------------------------
     Characters grid
     --------------------------------------------------------- */
  const likes = store.get('likes', {});
  const grid = $('#charGrid');
  grid.innerHTML = CATS.map(c => `
    <div class="char-card reveal" data-type="${c.type}" data-id="${c.id}" style="--card-bg:${c.bg}">
      <div class="char-inner">
        <div class="char-face char-front">
          <button class="like-btn" aria-label="喜欢">${likes[c.id] ? '💗' : '🤍'}</button>
          <span class="like-count">${(likes[c.id] ? 1 : 0) + 1000 + c.name.charCodeAt(0) % 900}</span>
          <div class="char-art">${catSVG(c)}</div>
          <div class="char-meta">
            <h3>${c.name} <small>${c.en}</small></h3>
            <div class="char-tags"><span>${c.typeName}</span>${c.tags.map(t => `<span>${t}</span>`).join('')}</div>
          </div>
        </div>
        <div class="char-face char-back">
          <div>
            <h4>${c.name} · ${c.en}</h4>
            <p class="quote">${c.quote}</p>
            ${Object.entries(c.stats).map(([k, v]) => `<div class="stat-row"><span>${k}</span><div class="stat-bar"><i style="--v:${v}%"></i></div></div>`).join('')}
          </div>
          <div>
            <p style="font-size:15px;margin:0">🎂 ${c.birthday}　📏 ${c.height}</p>
            <button class="btn btn-primary" data-profile="${c.id}">详细档案 →</button>
          </div>
        </div>
      </div>
    </div>`).join('');
  observeReveal(grid);

  grid.addEventListener('click', e => {
    const card = e.target.closest('.char-card');
    if (!card) return;
    const c = catById(card.dataset.id);
    const likeBtn = e.target.closest('.like-btn');
    if (likeBtn) {
      e.stopPropagation();
      likes[c.id] = !likes[c.id];
      store.set('likes', likes);
      likeBtn.textContent = likes[c.id] ? '💗' : '🤍';
      likeBtn.classList.remove('liked'); void likeBtn.offsetWidth; likeBtn.classList.add('liked');
      const cnt = $('.like-count', card);
      cnt.textContent = +cnt.textContent + (likes[c.id] ? 1 : -1);
      if (likes[c.id]) { burst(e.clientX, e.clientY, ['💗', '💖', '💕']); meow(1.2); toast(`${c.name}：${pick(c.lines)}`); }
      return;
    }
    if (e.target.closest('[data-profile]')) { e.stopPropagation(); openProfile(c); return; }
    card.classList.toggle('flipped');
  });

  $('#filters').addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    $$('.chip').forEach(c => c.classList.toggle('active', c === chip));
    const f = chip.dataset.filter;
    $$('.char-card').forEach(card => {
      const show = f === 'all' || card.dataset.type === f;
      card.classList.toggle('hide', !show);
      card.classList.remove('pop', 'flipped');
      if (show) { void card.offsetWidth; card.classList.add('pop', 'in'); }
    });
  });

  /* ---------------------------------------------------------
     Modal
     --------------------------------------------------------- */
  const modal = $('#modal'), modalContent = $('#modalContent');
  function openModal(html) {
    modalContent.innerHTML = html;
    modal.classList.add('open'); modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('locked');
  }
  function closeModal() {
    modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('locked');
  }
  modal.addEventListener('click', e => { if (e.target.closest('[data-close]')) closeModal(); });
  addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

  function openProfile(c) {
    openModal(`
      <div class="profile" style="--card-bg:${c.bg}">
        <div class="profile-art">${catSVG(c, { mood: 'open' })}</div>
        <div class="profile-info">
          <p class="kicker">${c.typeName} · Profile</p>
          <h3>${c.name}</h3>
          <p class="en">${c.en}</p>
          <dl class="profile-table">
            <dt>生日</dt><dd>${c.birthday}</dd>
            <dt>身高</dt><dd>${c.height}</dd>
            <dt>喜欢</dt><dd>${c.likes}</dd>
            <dt>讨厌</dt><dd>${c.dislikes}</dd>
          </dl>
          <p class="story">${c.story}</p>
          <p style="margin:18px 0 4px;font-weight:600">🎙 点击收听语音台词</p>
          <div class="voice-lines">${c.lines.map((l, i) => `<button data-line="${i}">台词 ${i + 1}</button>`).join('')}</div>
          <div class="profile-bubble" id="profileBubble">${c.quote}</div>
          <div class="btn-row" style="justify-content:flex-start;margin-top:20px">
            <button class="btn btn-primary btn-small" data-adopt="${c.id}">带她去互动小屋 →</button>
          </div>
        </div>
      </div>`);
    $$('[data-line]', modalContent).forEach(b => b.addEventListener('click', () => {
      const bub = $('#profileBubble');
      bub.textContent = '';
      const line = c.lines[+b.dataset.line];
      let i = 0;
      const t = setInterval(() => { bub.textContent = line.slice(0, ++i); if (i >= line.length) clearInterval(t); }, 45);
      meow(rand(.9, 1.3));
    }));
    $('[data-adopt]', modalContent).addEventListener('click', () => {
      closeModal(); setPet(c.id);
      $('#interact').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* ---------------------------------------------------------
     Interaction room
     --------------------------------------------------------- */
  const petChoice = $('#petChoice'), roomCat = $('#roomCat'), speech = $('#speech');
  petChoice.innerHTML = CATS.map(c => `<option value="${c.id}">${c.name} · ${c.typeName}</option>`).join('');
  const LEVELS = [[0, '陌生人'], [20, '点头之交'], [45, '好朋友'], [70, '亲密伙伴'], [95, '命中注定']];
  const BADGES = [
    { id: 'first', icon: '🤚', tip: '第一次摸头' },
    { id: 'feed5', icon: '🐟', tip: '喂食 5 次' },
    { id: 'play', icon: '🪶', tip: '一起玩耍' },
    { id: 'yarn', icon: '🧶', tip: '毛线球传递' },
    { id: 'friend', icon: '💕', tip: '好感度达到 45' },
    { id: 'destiny', icon: '👑', tip: '好感度满分' },
    { id: 'poke', icon: '😾', tip: '惹她生气了' },
    { id: 'all', icon: '🌈', tip: '集齐全部猫娘好感' }
  ];
  const state = store.get('room', { pet: 'sakura', aff: {}, hunger: {}, feeds: 0, badges: [] });
  $('#badges').innerHTML = BADGES.map(b => `<div class="badge" data-badge="${b.id}" data-tip="${b.tip}">${b.icon}</div>`).join('');
  const saveRoom = () => store.set('room', state);
  function unlock(id) {
    if (state.badges.includes(id)) return;
    state.badges.push(id); saveRoom();
    const b = BADGES.find(x => x.id === id);
    $(`[data-badge="${id}"]`).classList.add('on');
    toast(`🏅 解锁成就：${b.tip}`);
  }
  state.badges.forEach(id => { const el = $(`[data-badge="${id}"]`); if (el) el.classList.add('on'); });

  const cur = () => catById(state.pet);
  function say(text) {
    speech.textContent = text;
    speech.classList.remove('pop'); void speech.offsetWidth; speech.classList.add('pop');
  }
  function renderRoom() {
    const c = cur();
    const aff = state.aff[c.id] || 0;
    const hunger = state.hunger[c.id] ?? 50;
    $('#affectionVal').textContent = aff;
    $('#affectionBar').style.width = aff + '%';
    const lvl = LEVELS.filter(l => aff >= l[0]).length - 1;
    $('#affectionLevel').textContent = `Lv.${lvl} · ${LEVELS[lvl][1]}`;
    $('#hungerVal').textContent = hunger + '%';
    $('#moodVal').textContent = aff >= 95 ? '😻' : aff >= 70 ? '😽' : aff >= 45 ? '😺' : aff >= 20 ? '🐱' : '😐';
  }
  function setPet(id) {
    state.pet = id; petChoice.value = id; saveRoom();
    roomCat.innerHTML = catSVG(cur());
    renderRoom();
    say(`${cur().name}：${cur().quote.replace(/[“”]/g, '')}`);
  }
  petChoice.addEventListener('change', () => setPet(petChoice.value));

  const REACT = {
    pat: { d: 4, chars: ['💗', '✨'], lines: { tsundere: ['才、才没有很舒服！', '哼……再摸一下也不是不行。'], clingy: ['呼噜噜……还要！', '最喜欢被摸头了喵~'], airhead: ['诶嘿嘿~ 好舒服~', '头上有花瓣吗？谢谢喵！'], cool: ['……嗯。', '手法……还算及格。'] } },
    feed: { d: 6, chars: ['🐟', '🍣', '✨'], lines: { tsundere: ['本小姐勉强收下了！', '还、还有吗？'], clingy: ['好吃！你最好了！', '啊——再喂一口~'], airhead: ['小鱼干！是小鱼干！', '嚼嚼……这是什么味道？好吃！'], cool: ['……谢谢。', '火候刚好。'] } },
    play: { d: 5, chars: ['🪶', '⭐', '💫'], lines: { tsundere: ['我才不会被这种东西……喵！', '再、再来一次！'], clingy: ['抓到了！一起玩！', '喵喵喵！'], airhead: ['它在动！它在动！', '啊……扑空了喵。'], cool: ['幼稚。……再晃一下。', '（尾巴悄悄跟着摆动）'] } },
    brush: { d: 4, chars: ['✨', '🌸'], lines: { tsundere: ['毛、毛乱了才不是我的错！', '嗯……那边也要梳。'], clingy: ['好舒服……要睡着了……', '呼噜噜噜噜~'], airhead: ['毛毛变得亮晶晶的！', '梳子好痒~ 嘿嘿'], cool: ['不错，有进步。', '……下次也拜托你。'] } },
    milk: { d: 3, chars: ['🥛', '☁️'], lines: { tsundere: ['温度刚好……才没有很开心！', '胡子上沾到了？不准看！'], clingy: ['暖暖的~ 和你一样~', '咕嘟咕嘟~'], airhead: ['白色的胡子！', '喝完就想睡觉了……'], cool: ['热牛奶……适合今晚。', '谢谢，很暖。'] } },
    poke: { d: -5, chars: ['💢', '😾'], lines: { tsundere: ['你在干什么啊笨蛋！', '不准碰尾巴！！'], clingy: ['呜……好过分……', '那、那里不行啦！'], airhead: ['诶？刚才发生了什么？', '尾巴自己跑掉了喵！'], cool: ['……你想被挠吗？', '再碰一下试试。'] } }
  };

  function act(type, ev) {
    const c = cur(), r = REACT[type];
    let aff = state.aff[c.id] || 0;
    let hunger = state.hunger[c.id] ?? 50;
    if (type === 'feed') {
      if (hunger >= 100) { say(`${c.name}：已经吃不下了喵……肚子圆滚滚的`); roomCat.classList.remove('shake'); void roomCat.offsetWidth; roomCat.classList.add('shake'); return; }
      hunger = Math.min(100, hunger + 15);
      state.feeds++;
      if (state.feeds >= 5) unlock('feed5');
    } else if (type !== 'poke') {
      hunger = Math.max(0, hunger - 3);
    }
    let delta = r.d;
    if (hunger < 15 && type !== 'feed' && type !== 'poke') { delta = 1; }
    aff = Math.max(0, Math.min(100, aff + delta));
    state.aff[c.id] = aff; state.hunger[c.id] = hunger;
    saveRoom();

    let line = pick(r.lines[c.type]);
    if (hunger < 15 && type !== 'feed' && type !== 'poke') line = '肚子饿了……先喂点东西嘛';
    else if (aff >= 95 && type !== 'poke' && Math.random() < .5) line = pick(c.lines);
    say(`${c.name}：${line}`);

    const svg = $('svg', roomCat);
    svg.classList.remove('happy'); void svg.offsetWidth;
    roomCat.classList.remove('bounce', 'shake'); void roomCat.offsetWidth;
    if (type === 'poke') { roomCat.classList.add('shake'); meow(.7); unlock('poke'); }
    else { svg.classList.add('happy'); roomCat.classList.add('bounce'); meow(rand(1, 1.3)); }

    const rect = roomCat.getBoundingClientRect();
    const x = ev && ev.clientX && ev.target.closest('#roomCat') ? ev.clientX : rect.left + rect.width / 2;
    const y = ev && ev.clientY && ev.target.closest('#roomCat') ? ev.clientY : rect.top + rect.height * .3;
    burst(x, y, r.chars, type === 'poke' ? 4 : 8);

    if (type === 'pat') unlock('first');
    if (type === 'play') unlock('play');
    if (aff >= 45) unlock('friend');
    if (aff >= 100) unlock('destiny');
    if (CATS.every(k => (state.aff[k.id] || 0) >= 45)) unlock('all');
    renderRoom();
  }
  $$('.action-btn').forEach(b => b.addEventListener('click', e => {
    act(b.dataset.act, e);
    b.disabled = true; setTimeout(() => (b.disabled = false), 350);
  }));
  roomCat.addEventListener('click', e => act('pat', e));

  // 毛线球拖拽
  const yarn = $('#yarn'), stage = $('#roomStage');
  let dragging = false, offX = 0, offY = 0;
  yarn.addEventListener('pointerdown', e => {
    dragging = true; yarn.setPointerCapture(e.pointerId);
    const r = yarn.getBoundingClientRect();
    offX = e.clientX - r.left; offY = e.clientY - r.top;
  });
  yarn.addEventListener('pointermove', e => {
    if (!dragging) return;
    const s = stage.getBoundingClientRect();
    const x = Math.max(0, Math.min(s.width - 50, e.clientX - s.left - offX));
    const y = Math.max(0, Math.min(s.height - 50, e.clientY - s.top - offY));
    yarn.style.left = x + 'px'; yarn.style.top = y + 'px'; yarn.style.bottom = 'auto';
  });
  yarn.addEventListener('pointerup', e => {
    if (!dragging) return;
    dragging = false;
    const a = yarn.getBoundingClientRect(), b = roomCat.getBoundingClientRect();
    const hit = a.left < b.right && a.right > b.left && a.top < b.bottom && a.bottom > b.top;
    if (hit) {
      act('play', e);
      unlock('yarn');
      say(`${cur().name}：毛线球！！是我的了喵！`);
      yarn.style.transition = 'left .6s cubic-bezier(.3,1.6,.5,1), top .6s cubic-bezier(.3,1.6,.5,1)';
      yarn.style.left = '70%'; yarn.style.top = (stage.clientHeight - 80) + 'px';
      setTimeout(() => (yarn.style.transition = ''), 650);
    }
  });

  setPet(state.pet);

  /* ---------------------------------------------------------
     Quiz
     --------------------------------------------------------- */
  const QUESTIONS = [
    { q: '周末的午后，你最想做什么？', a: [['在被窝里一觉睡到天黑', 'clingy'], ['去没去过的地方探险', 'airhead'], ['泡一壶茶，安静地看书', 'cool'], ['去高级餐厅犒劳自己', 'tsundere']] },
    { q: '朋友给你发了一张可爱的猫猫照片，你会？', a: [['“才、才没有觉得可爱”然后偷偷保存', 'tsundere'], ['连发十个“啊啊啊好可爱”', 'clingy'], ['回复一个“嗯”，然后设为壁纸', 'cool'], ['“这是什么品种？我也想要！”', 'airhead']] },
    { q: '你理想中的约会地点是？', a: [['星空下的屋顶', 'cool'], ['有很多软垫的猫咖', 'clingy'], ['游乐园的过山车', 'airhead'], ['只有两个人的私人包场', 'tsundere']] },
    { q: '如果你也有一条尾巴，它最常做的事是？', a: [['紧紧缠住喜欢的人', 'clingy'], ['出卖我嘴硬的真实想法', 'tsundere'], ['优雅地缓缓摆动', 'cool'], ['自己追着自己转圈', 'airhead']] },
    { q: '最后一题：你最希望猫娘对你说哪句话？', a: [['“笨蛋……我一直在等你。”', 'tsundere'], ['“欢迎回家！今天也最喜欢你了！”', 'clingy'], ['“今晚的月色真美。”', 'cool'], ['“一起去找宝藏吧喵！”', 'airhead']] }
  ];
  const quizBody = $('#quizBody'), quizBar = $('#quizBar');
  let qi = 0, scores = {};
  function quizStart() {
    quizBar.style.width = '0';
    quizBody.innerHTML = `
      <div class="quiz-start quiz-step">
        <div class="big">🔮</div>
        <h3>谁是你的命定猫娘？</h3>
        <p>猫娘占卜师已经准备好了水晶球。<br>请凭直觉回答，不要想太久哦。</p>
        <button class="btn btn-primary btn-shine" id="quizGo">开始占卜 ✦</button>
      </div>`;
    $('#quizGo').addEventListener('click', () => { qi = 0; scores = {}; quizStep(); });
  }
  function quizStep() {
    const Q = QUESTIONS[qi];
    quizBar.style.width = (qi / QUESTIONS.length * 100) + '%';
    quizBody.innerHTML = `
      <div class="quiz-step">
        <span class="q-num">Question ${qi + 1} / ${QUESTIONS.length}</span>
        <h3>${Q.q}</h3>
        <div class="q-options">${Q.a.map((o, i) => `<button class="q-option" data-t="${o[1]}"><b>${'ABCD'[i]}</b>${o[0]}</button>`).join('')}</div>
      </div>`;
    $$('.q-option', quizBody).forEach(b => b.addEventListener('click', e => {
      scores[b.dataset.t] = (scores[b.dataset.t] || 0) + 1;
      burst(e.clientX, e.clientY, ['✨', '🔮', '💫'], 5);
      qi++;
      qi < QUESTIONS.length ? quizStep() : quizResult();
    }));
  }
  function quizResult() {
    quizBar.style.width = '100%';
    const best = Object.entries(scores).sort((a, b) => b[1] - a[1])[0][0];
    const pool = CATS.filter(c => c.type === best);
    const c = pick(pool);
    const match = 88 + Math.floor(Math.random() * 12);
    quizBody.innerHTML = `
      <div class="quiz-result" style="--card-bg:${c.bg}">
        <div class="result-art">${catSVG(c, { mood: 'open' })}</div>
        <p class="match">命运契合度 ${match}%</p>
        <h3>你的命定猫娘是 · ${c.name}</h3>
        <p>${c.story}</p>
        <div class="btn-row">
          <button class="btn btn-primary" id="quizMeet">去见她 →</button>
          <button class="btn btn-ghost" id="quizRetry">再测一次</button>
        </div>
      </div>`;
    const r = quizBody.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top + 120, ['💗', '✨', '🌸', '🐾', '🎀'], 18);
    meow(1.2);
    $('#quizMeet').addEventListener('click', () => openProfile(c));
    $('#quizRetry').addEventListener('click', quizStart);
  }
  quizStart();

  /* ---------------------------------------------------------
     A day in paradise
     --------------------------------------------------------- */
  const DAY = [
    { t: '07:00', title: '伸懒腰', emoji: '🌅', desc: '小樱第一个醒来，把整个身体拉成一根长长的面条，然后又倒回了被窝。', sky: 'linear-gradient(180deg,#ffd6a5,#ffc2d1)', sun: [12, 70], night: false },
    { t: '09:00', title: '早餐时间', emoji: '🐟', desc: '布丁端出刚烤好的小鱼饼干，琥珀已经排在了第一位（她说自己只是刚好路过）。', sky: 'linear-gradient(180deg,#a8e0ff,#ffe9f2)', sun: [25, 40], night: false },
    { t: '11:00', title: '探险出发', emoji: '📦', desc: '可可在仓库发现了一个新纸箱，宣布今日的探险圆满成功。', sky: 'linear-gradient(180deg,#7fc8ff,#d8f1ff)', sun: [40, 18], night: false },
    { t: '13:00', title: '神圣午睡', emoji: '😴', desc: '阳光窗台上排满了猫娘。请保持安静——这是乐园最神圣的时间。', sky: 'linear-gradient(180deg,#6fbaff,#ffeccc)', sun: [52, 10], night: false },
    { t: '16:00', title: '下午茶', emoji: '🍵', desc: '雪见在茶室点起香，为每个人泡上温度刚好的抹茶。', sky: 'linear-gradient(180deg,#ffbf8a,#ffd9e8)', sun: [70, 30], night: false },
    { t: '18:30', title: '黄昏演唱会', emoji: '🎤', desc: '莉莉站上纸箱舞台开唱，观众席第一排永远是麻糬。', sky: 'linear-gradient(180deg,#ff8a8a,#a785ff)', sun: [86, 64], night: false },
    { t: '21:00', title: '被炉时光', emoji: '🛋️', desc: '十二位猫娘挤进同一个被炉，只露出一排毛茸茸的耳朵。', sky: 'linear-gradient(180deg,#3a2a6b,#7a4f9e)', sun: [20, 28], night: true },
    { t: '00:00', title: '月下夜巡', emoji: '🌙', desc: '露娜坐在屋顶上，守护着乐园里所有人的梦。晚安，喵。', sky: 'linear-gradient(180deg,#0e0b2a,#2c1f57)', sun: [70, 18], night: true }
  ];
  const daySky = $('#daySky'), dayRange = $('#dayRange'), sunMoon = $('#sunMoon'), dayScene = $('.day-scene');
  $('#dayTicks').innerHTML = DAY.map((d, i) => `<span data-i="${i}">${d.t}</span>`).join('');
  function setDay(i) {
    const d = DAY[i];
    daySky.style.background = d.sky;
    daySky.classList.toggle('night', d.night);
    sunMoon.style.left = `calc(${d.sun[0]}% - 35px)`;
    sunMoon.style.top = `${d.sun[1]}%`;
    sunMoon.style.background = d.night ? '#fff6d6' : '#ffd56b';
    sunMoon.style.boxShadow = d.night ? '0 0 40px 8px rgba(255,246,214,.6), inset -14px -4px 0 0 #d8cfa8' : '0 0 60px 20px rgba(255,213,107,.6)';
    $('#dayEmoji').textContent = d.emoji;
    $('#dayTitle').textContent = `${d.t} · ${d.title}`;
    $('#dayDesc').textContent = d.desc;
    dayScene.classList.remove('swap'); void dayScene.offsetWidth; dayScene.classList.add('swap');
    $$('#dayTicks span').forEach((s, j) => s.classList.toggle('on', j === i));
    dayRange.value = i;
  }
  dayRange.addEventListener('input', () => setDay(+dayRange.value));
  $('#dayTicks').addEventListener('click', e => { if (e.target.dataset.i) setDay(+e.target.dataset.i); });
  setDay(0);

  /* ---------------------------------------------------------
     Gallery carousel
     --------------------------------------------------------- */
  const SCENES = [
    { c: 'sakura', title: '樱花雨', cap: '“花瓣落在耳朵上了喵~”', deco: ['🌸', '🌸', '🌸'] },
    { c: 'luna', title: '月下独白', cap: '“今晚的月色真美。”', deco: ['⭐', '✨', '🌙'] },
    { c: 'mochi', title: '午后的被窝', cap: '“再睡五分钟……”', deco: ['💤', '☁️', '💤'] },
    { c: 'amber', title: '女王的王座', cap: '“这个纸箱，本小姐征用了！”', deco: ['👑', '📦', '✨'] },
    { c: 'yukimi', title: '初雪茶会', cap: '“请用茶。”', deco: ['❄️', '🍵', '❄️'] },
    { c: 'pudding', title: '甜点工坊', cap: '“新烤好的哦~”', deco: ['🍮', '🍪', '🧁'] },
    { c: 'coco', title: '森林探险', cap: '“发现宝藏了喵！”', deco: ['🍃', '🗺️', '🍄'] },
    { c: 'lily', title: '星光舞台', cap: '“只唱给你听。”', deco: ['🎤', '💜', '🎶'] }
  ];
  const track = $('#carTrack'), dots = $('#carDots');
  track.innerHTML = SCENES.map((s, i) => {
    const c = catById(s.c);
    const pos = [[8, 12], [80, 20], [14, 58]];
    return `<div class="car-slide" data-i="${i}" style="--card-bg:${c.bg}">
      <div class="scene-deco">${s.deco.map((d, j) => `<span style="left:${pos[j][0]}%;top:${pos[j][1]}%;animation-delay:${-j}s">${d}</span>`).join('')}</div>
      ${catSVG(c, { mood: i % 2 ? 'smile' : 'open' })}
      <div class="car-caption"><h4>${s.title}</h4><p>${s.cap}</p></div>
    </div>`;
  }).join('');
  dots.innerHTML = SCENES.map((_, i) => `<button aria-label="第 ${i + 1} 张"></button>`).join('');
  let ci2 = 0;
  const perView = () => innerWidth <= 600 ? 1 : innerWidth <= 900 ? 2 : 3;
  function goSlide(i) {
    const n = SCENES.length;
    ci2 = (i + n) % n;
    const pv = perView();
    const offset = Math.max(0, Math.min(ci2 - Math.floor((pv - 1) / 2), n - pv));
    const slide = track.children[0];
    const w = slide.getBoundingClientRect().width + 24;
    track.style.transform = `translateX(${-offset * w}px)`;
    $$('.car-slide', track).forEach((s, j) => s.classList.toggle('current', j === ci2));
    $$('button', dots).forEach((d, j) => d.classList.toggle('on', j === ci2));
  }
  $('#carPrev').addEventListener('click', () => { goSlide(ci2 - 1); resetAuto(); });
  $('#carNext').addEventListener('click', () => { goSlide(ci2 + 1); resetAuto(); });
  dots.addEventListener('click', e => { const i = $$('button', dots).indexOf(e.target); if (i >= 0) { goSlide(i); resetAuto(); } });
  let autoT;
  const resetAuto = () => { clearInterval(autoT); autoT = setInterval(() => goSlide(ci2 + 1), 4500); };
  resetAuto();
  addEventListener('resize', () => goSlide(ci2));
  let sx = null, moved = false;
  track.addEventListener('pointerdown', e => { sx = e.clientX; moved = false; });
  track.addEventListener('pointerup', e => {
    if (sx === null) return;
    const dx = e.clientX - sx; sx = null;
    if (Math.abs(dx) > 40) { moved = true; goSlide(ci2 + (dx < 0 ? 1 : -1)); resetAuto(); }
  });
  track.addEventListener('click', e => {
    if (moved) return;
    const slide = e.target.closest('.car-slide');
    if (!slide) return;
    const i = +slide.dataset.i;
    if (i !== ci2) { goSlide(i); resetAuto(); return; }
    const s = SCENES[i], c = catById(s.c);
    openModal(`<div style="--card-bg:${c.bg}"><div class="lightbox-art">${catSVG(c, { mood: 'open' })}</div>
      <div class="lightbox-cap"><h3>${s.title} · ${c.name}</h3><p>${s.cap}</p></div></div>`);
  });
  requestAnimationFrame(() => goSlide(0));

  /* ---------------------------------------------------------
     Testimonials
     --------------------------------------------------------- */
  const voices = $$('.voice'), vDots = $('#voiceDots');
  vDots.innerHTML = voices.map(() => '<button aria-label="切换评价"></button>').join('');
  let vi = 0;
  const showVoice = i => {
    vi = (i + voices.length) % voices.length;
    voices.forEach((v, j) => v.classList.toggle('active', j === vi));
    $$('button', vDots).forEach((d, j) => d.classList.toggle('on', j === vi));
  };
  vDots.addEventListener('click', e => { const i = $$('button', vDots).indexOf(e.target); if (i >= 0) showVoice(i); });
  showVoice(0);
  setInterval(() => showVoice(vi + 1), 5200);

  /* ---------------------------------------------------------
     FAQ: only one open
     --------------------------------------------------------- */
  $$('.faq-item').forEach(d => d.addEventListener('toggle', () => {
    if (d.open) $$('.faq-item').forEach(o => { if (o !== d) o.open = false; });
  }));

  /* ---------------------------------------------------------
     Join form
     --------------------------------------------------------- */
  $('#joinForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#joinName'), email = $('#joinEmail'), oath = $('#joinOath'), msg = $('#formMsg');
    [name, email].forEach(i => i.classList.remove('err'));
    oath.parentElement.classList.remove('err');
    let ok = true;
    if (!name.value.trim()) { name.classList.add('err'); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { email.classList.add('err'); ok = false; }
    if (!oath.checked) { void oath.parentElement.offsetWidth; oath.parentElement.classList.add('err'); ok = false; }
    if (!ok) { msg.textContent = '喵？还有信息没有填好哦~'; return; }
    msg.textContent = `欢迎你，${name.value.trim()}！第一封《猫娘日报》正在由信鸽……不，信猫送出 🐾`;
    const r = e.target.getBoundingClientRect();
    burst(r.left + r.width / 2, r.top, ['🎉', '💗', '🐾', '✨', '🎀'], 24);
    meow(1.3);
    e.target.reset();
  });

  /* ---------------------------------------------------------
     Ripple on buttons
     --------------------------------------------------------- */
  document.addEventListener('click', e => {
    const b = e.target.closest('.btn, .action-btn, .chip');
    if (!b) return;
    const r = b.getBoundingClientRect(), s = document.createElement('span');
    const size = Math.max(r.width, r.height);
    s.className = 'ripple';
    s.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - r.left - size / 2}px;top:${e.clientY - r.top - size / 2}px`;
    b.appendChild(s);
    setTimeout(() => s.remove(), 700);
  });

  /* ---------------------------------------------------------
     Cursor glow + paw trail
     --------------------------------------------------------- */
  const glow = $('#cursorGlow');
  let lastPaw = 0, pawSide = false;
  const finePointer = matchMedia('(pointer: fine)').matches;
  addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px'; glow.style.top = e.clientY + 'px';
    const now = performance.now();
    if (!finePointer || now - lastPaw < 90) return;
    lastPaw = now; pawSide = !pawSide;
    const p = document.createElement('span');
    p.className = 'paw-trail'; p.textContent = '🐾';
    p.style.left = e.clientX + (pawSide ? 8 : -8) + 'px'; p.style.top = e.clientY + 14 + 'px';
    p.style.opacity = '.5';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1000);
  });

  /* ---------------------------------------------------------
     Falling petals canvas
     --------------------------------------------------------- */
  const cv = $('#petals'), ctx = cv.getContext('2d');
  let W, H, petals = [], rain = 0;
  const resize = () => { W = cv.width = innerWidth * devicePixelRatio; H = cv.height = innerHeight * devicePixelRatio; cv.style.width = innerWidth + 'px'; cv.style.height = innerHeight + 'px'; };
  resize(); addEventListener('resize', resize);
  const makePetal = (top = false, emoji = null) => ({
    x: rand(0, W), y: top ? rand(-H * .2, 0) : rand(0, H), s: rand(6, 13) * devicePixelRatio,
    vy: rand(.4, 1.1) * devicePixelRatio, vx: rand(-.3, .5) * devicePixelRatio, r: rand(0, Math.PI * 2), vr: rand(-.02, .02),
    sw: rand(0, Math.PI * 2), hue: rand(330, 355), emoji
  });
  const count = innerWidth < 600 ? 18 : 34;
  for (let i = 0; i < count; i++) petals.push(makePetal());
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  function draw() {
    ctx.clearRect(0, 0, W, H);
    petals.forEach((p, i) => {
      p.sw += .02; p.y += p.vy * (p.emoji ? 3 : 1); p.x += p.vx + Math.sin(p.sw) * .6; p.r += p.vr;
      ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
      if (p.emoji) {
        ctx.font = `${p.s * 2.4}px serif`; ctx.fillText(p.emoji, 0, 0);
      } else {
        ctx.fillStyle = `hsla(${p.hue}, 90%, 82%, .75)`;
        ctx.beginPath();
        ctx.moveTo(0, -p.s);
        ctx.bezierCurveTo(p.s, -p.s * .6, p.s * .7, p.s * .7, 0, p.s);
        ctx.bezierCurveTo(-p.s * .7, p.s * .7, -p.s, -p.s * .6, 0, -p.s);
        ctx.fill();
      }
      ctx.restore();
      if (p.y > H + 40) { petals[i] = p.emoji ? null : makePetal(true); }
    });
    petals = petals.filter(Boolean);
    if (rain > 0) { rain--; if (rain % 3 === 0) petals.push(makePetal(true, pick(['🐱', '😺', '🐾', '💗', '🐟']))); }
    requestAnimationFrame(draw);
  }
  if (!reduced) draw();

  /* ---------------------------------------------------------
     Easter eggs: secret link / konami / title
     --------------------------------------------------------- */
  function catRain() {
    rain = 240;
    document.body.classList.add('rainbow-mode');
    toast('🌈 秘密被发现了！猫猫雨降临！');
    meow(1.4); setTimeout(() => meow(1), 250); setTimeout(() => meow(1.6), 500);
    setTimeout(() => document.body.classList.remove('rainbow-mode'), 6000);
  }
  $('#secretLink').addEventListener('click', e => { e.preventDefault(); catRain(); });
  const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let kpos = 0;
  addEventListener('keydown', e => {
    kpos = e.key === KONAMI[kpos] ? kpos + 1 : (e.key === KONAMI[0] ? 1 : 0);
    if (kpos === KONAMI.length) { kpos = 0; catRain(); }
  });
  const baseTitle = document.title;
  document.addEventListener('visibilitychange', () => {
    document.title = document.hidden ? '喵？你去哪里了…… 🥺' : baseTitle;
  });

  let brandClicks = 0;
  $('.nav .brand').addEventListener('click', () => { if (++brandClicks % 7 === 0) catRain(); });
})();
