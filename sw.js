/* 태오플레이 서비스 워커 — 앱 설치 + 한 번 연 화면은 인터넷이 잠깐 끊겨도 열리게.
 * 늘 새 버전을 먼저 받아 오고(네트워크 먼저), 안 되면 저장해 둔 걸 보여 줘요.
 * 브라우저 캐시(GitHub Pages는 10분)도 건너뛰고 서버에 바뀌었는지 물어봐요 — 새 게임이 바로 보이게.
 * /babyplay/ 안의 요청만 맡아요(로얄 스매시 본체 같은 다른 경로는 건드리지 않음). */
const CACHE = 'babyplay-v8';
const CORE = ['./', 'index.html', 'menu.html', 'games.js', 'shared/bp.css', 'manifest.webmanifest',
  'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png',
  'games/flashlight/', 'games/flashlight/thumb.svg',
  'games/flashlight/sounds/meow1.mp3', 'games/flashlight/sounds/meow2.mp3', 'games/flashlight/sounds/meow3.mp3', 'games/royal-smash/', 'games/royal-smash/thumb.svg',
  'games/shapes/', 'games/shapes/thumb.svg',
  'games/egg/', 'games/egg/thumb.svg',
  ...['chick', 'dog', 'cat', 'pig', 'cow', 'duck', 'frog', 'lion', 'dino', 'elephant',
    'sheep', 'horse', 'rooster', 'owl', 'monkey', 'penguin', 'bear', 'tiger', 'mouse', 'parrot'].map((n) => 'games/egg/sounds/' + n + '.mp3')];
self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(CORE.map((u) => new Request(u, { cache: 'reload' })))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', (e) => {
  e.waitUntil(caches.keys().then((ks) => Promise.all(ks.filter((k) => k.startsWith('babyplay-') && k !== CACHE).map((k) => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const base = new URL('./', self.location).pathname;
  if (url.origin !== location.origin || !url.pathname.startsWith(base)) return;
  e.respondWith(
    fetch(req, { cache: 'no-cache' }).then((res) => {
      if (res && res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
      return res;
    }).catch(() => caches.match(req, { ignoreSearch: true }))
  );
});
