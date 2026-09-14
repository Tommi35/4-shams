/* ===================================================================
   4 Shams — virtual CD player
   Plain JavaScript. No frameworks.
   =================================================================== */
'use strict';

/* ---------------------------------------------------------------
   TRACKS — user-provided track list, confirmed order.
   File refers to /audio/<file>.mp3
   --------------------------------------------------------------- */
const TRACKS = [
  { title: 'Walking Into Sunshine', artist: 'Central Line', file: '01-walking-into-sunshine' },
  { title: 'Lovely Day', artist: 'Bill Withers', file: '02-lovely-day' },
  { title: 'In Your Eyes', artist: 'Johnny Osbourne', file: '03-in-your-eyes' },
  { title: 'Can I Call You Rose', artist: 'Thee Sacred Souls', file: '04-can-i-call-you-rose' },
  { title: 'Parking Lot', artist: 'Anderson .Paak', file: '05-parking-lot' },
  { title: 'One In A Million', artist: 'Half Pint', file: '06-one-in-a-million' },
  { title: 'See You Again', artist: 'Tyler, The Creator', file: '07-see-you-again' },
  { title: 'Butterflies', artist: 'Brent Faiyaz', file: '08-butterflies' },
  { title: 'Sfiorivano le viole', artist: 'Rino Gaetano', file: '09-sfiorivano-le-viole' },
  { title: 'Is This Love', artist: 'Bob Marley & The Wailers', file: '10-is-this-love' },
  { title: 'Window', artist: 'Still Woozy', file: '11-window' },
  { title: 'Amore che vieni, amore che vai', artist: 'Fabrizio De André', file: '12-amore-che-vieni-amore-che-vai' },
  { title: 'Kiss of Life', artist: 'Sade', file: '13-kiss-of-life' },
  { title: 'Apocalypse', artist: 'Cigarettes After Sex', file: '14-apocalypse' }
];

const AUDIO_BASE = 'audio/';

/* ---------------------------------------------------------------
   Elements
   --------------------------------------------------------------- */
const device = document.getElementById('device');
const hint = document.getElementById('hint');
const lcdTitle = document.getElementById('lcdTitle');
const lcdTrackNum = document.getElementById('lcdTrackNum');
const lcdTimeNow = document.getElementById('lcdTimeNow');
const lcdTimeTotal = document.getElementById('lcdTimeTotal');
const lcdProgressFill = document.getElementById('lcdProgressFill');
const lcdIconPlay = document.getElementById('lcdIconPlay');
const btnPlay = document.getElementById('btnPlay');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const btnEject = document.getElementById('btnEject');
const disc = document.getElementById('disc');
const lid = document.getElementById('lid');
const volRange = document.getElementById('volRange');
const btnMute = document.getElementById('btnMute');
const tracklistEl = document.getElementById('tracklist');
const booklet = document.querySelector('.booklet');

const audio = document.getElementById('player');

/* ---------------------------------------------------------------
   State
   --------------------------------------------------------------- */
const STATE = {
  power: 'off',    // off | open | closing | reading | ready | playing | paused
  index: 0,
  muted: false,
  lastVolume: 70,
  marquee: null    // running Animation for the LCD marquee
};

const HINTS = {
  off:      'Press OPEN to lift the lid',
  open:     'Tap the disc to load it',
  closing:  'Loading\u2026',
  reading:  'Reading disc\u2026',
  ready:    'Press PLAY to start',
  playing:  '',
  paused:   'Paused'
};

/* ---------------------------------------------------------------
   Helpers
   --------------------------------------------------------------- */
function setHint(text) {
  hint.textContent = text || '\u00a0';
}

function fmtTime(sec) {
  if (!isFinite(sec) || sec < 0) return '0:00';
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return m + ':' + String(s).padStart(2, '0');
}

/* ---------------------------------------------------------------
   Power state machine
   --------------------------------------------------------------- */
function setPower(next) {
  if (STATE.power === next) return;
  STATE.power = next;
  device.dataset.state = next;
  device.dataset.playing = (next === 'playing') ? 'true' : 'false';
  setHint(HINTS[next] || '');
  updateControls();
  updateLcd();
}

function updateControls() {
  const live = ['playing', 'paused', 'ready'].includes(STATE.power);
  btnPlay.disabled = !live;
  btnPrev.disabled = !live;
  btnNext.disabled = !live;
  volRange.disabled = !live;
  btnMute.disabled = !live;
  booklet.classList.toggle('is-idle', !live);
}

function updateLcd() {
  if (STATE.power === 'off') {
    lcdTitle.textContent = '\u00a0';
    lcdTrackNum.textContent = '--';
    lcdTimeNow.textContent = '0:00';
    lcdTimeTotal.textContent = '0:00';
    lcdProgressFill.style.width = '0%';
    lcdIconPlay.style.opacity = '0';
    stopMarquee();
    return;
  }

  if (['open', 'closing', 'reading'].includes(STATE.power)) {
    lcdTitle.textContent = (STATE.power === 'open') ? 'INSERT DISC'
      : (STATE.power === 'closing' ? 'CLOSING\u2026' : 'READING\u2026');
    lcdTrackNum.textContent = '--';
    lcdTimeNow.textContent = '0:00';
    lcdTimeTotal.textContent = '0:00';
    lcdProgressFill.style.width = '0%';
    lcdIconPlay.style.opacity = '0';
    scheduleMarquee();
    return;
  }

  const t = TRACKS[STATE.index];
  const idx = (STATE.power === 'playing' || STATE.power === 'paused') ? STATE.index + 1 : '--';
  lcdTrackNum.textContent = String(idx).padStart(2, '0');
  lcdIconPlay.style.opacity = '1';
  lcdTitle.textContent = t ? (t.title + ' \u2014 ' + t.artist) : '4 SHAMS';
  scheduleMarquee();
  updateTimeLcd();
}

/* ---------------------------------------------------------------
   LCD marquee — measure the real widths, animate in px.
   Text enters from the right edge, travels fully across, exits left.
   --------------------------------------------------------------- */
function scheduleMarquee() {
  requestAnimationFrame(() => {
    const scrollEl = document.querySelector('.lcd-scroll');
    if (!scrollEl) return;
    const containerW = scrollEl.clientWidth;

    lcdTitle.style.transform = 'none';
    lcdTitle.style.whiteSpace = 'nowrap';
    const textW = lcdTitle.scrollWidth;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const speed = reduce ? 10 : 45;                // px per second
    const dur = Math.max(8000, ((containerW + textW) / speed) * 1000);

    stopMarquee();
    const anim = lcdTitle.animate(
      [
        { transform: 'translateX(' + containerW + 'px)' },
        { transform: 'translateX(' + (-textW) + 'px)' }
      ],
      { duration: dur, iterations: Infinity, easing: 'linear' }
    );
    STATE.marquee = anim;
  });
}

function stopMarquee() {
  if (STATE.marquee) {
    STATE.marquee.cancel();
    STATE.marquee = null;
  }
}

/* ---------------------------------------------------------------
   Audio element wiring
   --------------------------------------------------------------- */
audio.addEventListener('loadedmetadata', () => {
  if (STATE.power === 'paused' || STATE.power === 'playing') {
    lcdTimeTotal.textContent = fmtTime(audio.duration);
    updateTimeLcd();
  }
});

audio.addEventListener('timeupdate', updateTimeLcd);

audio.addEventListener('play', () => {
  if (STATE.power !== 'playing') setPower('playing');
  device.dataset.playing = 'true';
});

audio.addEventListener('pause', () => {
  device.dataset.playing = 'false';
  if (STATE.power === 'playing') setPower('paused');
});

audio.addEventListener('ended', () => {
  if (STATE.index < TRACKS.length - 1) {
    nextTrack();
  } else {
    setPower('ready');
    updateLcd();
  }
});

audio.addEventListener('error', () => {
  setHint('This track could not be played');
  setPower('ready');
  updateLcd();
});

audio.addEventListener('stalled', () => {
  if (STATE.power === 'playing') setHint('Loading\u2026');
});

audio.addEventListener('playing', () => {
  if (STATE.power === 'playing') setHint('');
});

function updateTimeLcd() {
  if (STATE.power !== 'playing' && STATE.power !== 'paused') {
    lcdTimeNow.textContent = '0:00';
    return;
  }
  const now = audio.currentTime || 0;
  const dur = audio.duration || 0;
  lcdTimeNow.textContent = fmtTime(now);
  lcdTimeTotal.textContent = fmtTime(dur);
  const pct = dur ? (now / dur) * 100 : 0;
  lcdProgressFill.style.width = pct.toFixed(1) + '%';
}

/* ---------------------------------------------------------------
   Playback actions
   --------------------------------------------------------------- */
function loadTrack(i) {
  STATE.index = i;
  const t = TRACKS[i];
  audio.src = AUDIO_BASE + t.file + '.mp3';
  audio.load();
  updateLcd();
  markCurrent(i);
}

function play() {
  if (STATE.power === 'closing' || STATE.power === 'reading') return;
  if (STATE.power === 'off' || STATE.power === 'open') return;
  if (STATE.power !== 'playing') setPower('playing');
  const p = audio.play();
  if (p && p.catch) p.catch(() => setHint('Cannot play - tap a track'));
  device.dataset.playing = 'true';
}

function pause() {
  audio.pause();
  device.dataset.playing = 'false';
}

function togglePlay() {
  if (audio.paused) play(); else pause();
}

function nextTrack() {
  if (!['playing', 'paused'].includes(STATE.power)) return;
  const i = (STATE.index + 1) % TRACKS.length;
  loadTrack(i);
  play();
}

function prevTrack() {
  if (!['playing', 'paused'].includes(STATE.power)) return;
  if (audio.currentTime > 3) {
    audio.currentTime = 0;
    updateTimeLcd();
    return;
  }
  const i = (STATE.index - 1 + TRACKS.length) % TRACKS.length;
  loadTrack(i);
  play();
}

function selectTrack(i) {
  if (!['ready', 'playing', 'paused'].includes(STATE.power)) return;
  loadTrack(i);
  play();
}

function markCurrent(i) {
  const items = tracklistEl.querySelectorAll('li');
  items.forEach((li, j) => {
    li.classList.toggle('is-current', j === i);
  });
}

/* ---------------------------------------------------------------
   Volume
   --------------------------------------------------------------- */
function applyVolume() {
  const shown = STATE.muted ? 0 : STATE.lastVolume;
  audio.volume = STATE.muted ? 0 : STATE.lastVolume / 100;
  volRange.value = shown;
  volRange.style.setProperty('--vol', shown + '%');
  btnMute.dataset.muted = STATE.muted ? 'true' : 'false';
}

volRange.addEventListener('input', () => {
  STATE.lastVolume = Number(volRange.value);
  STATE.muted = (STATE.lastVolume === 0);
  applyVolume();
});

btnMute.addEventListener('click', () => {
  STATE.muted = !STATE.muted;
  if (!STATE.muted && STATE.lastVolume === 0) STATE.lastVolume = 40;
  applyVolume();
});

/* ---------------------------------------------------------------
   Opening sequence
   --------------------------------------------------------------- */
function openTray() {
  if (STATE.power === 'closing' || STATE.power === 'reading') return;
  audio.pause();
  device.dataset.playing = 'false';
  setPower('open');
}

function loadDisc() {
  if (STATE.power !== 'open') return;
  setPower('closing');
  setTimeout(() => setPower('reading'), 550);
  setTimeout(() => {
    setPower('ready');
    loadTrack(0);
  }, 1500);
}

btnEject.addEventListener('click', () => {
  if (STATE.power === 'off' || STATE.power !== 'open') openTray();
  else loadDisc();
});

lid.addEventListener('click', () => {
  if (STATE.power === 'open') loadDisc();
  else if (STATE.power === 'off') openTray();
});

disc.addEventListener('click', () => {
  if (STATE.power === 'open') loadDisc();
});

/* ---------------------------------------------------------------
   Transport buttons
   --------------------------------------------------------------- */
btnPlay.addEventListener('click', togglePlay);
btnNext.addEventListener('click', nextTrack);
btnPrev.addEventListener('click', prevTrack);

/* ---------------------------------------------------------------
   Tracklist (booklet)
   --------------------------------------------------------------- */
function buildTracklist() {
  const frag = document.createDocumentFragment();
  TRACKS.forEach((t, i) => {
    const li = document.createElement('li');
    li.tabIndex = 0;
    li.setAttribute('role', 'button');
    li.setAttribute('aria-label', (i + 1) + '. ' + t.title + ' by ' + t.artist);

    const num = document.createElement('span');
    num.className = 't-num';
    li.appendChild(num);

    const meta = document.createElement('span');
    meta.className = 't-meta';

    const title = document.createElement('span');
    title.className = 't-title';
    title.textContent = t.title;

    const artist = document.createElement('span');
    artist.className = 't-artist';
    artist.textContent = t.artist;

    meta.appendChild(title);
    meta.appendChild(artist);
    li.appendChild(meta);

    const mark = document.createElement('span');
    mark.className = 't-mark';
    mark.textContent = '\u25b6';
    li.appendChild(mark);

    li.addEventListener('click', () => selectTrack(i));
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectTrack(i);
      }
    });
    frag.appendChild(li);
  });
  tracklistEl.appendChild(frag);
}

/* ---------------------------------------------------------------
   Init
   --------------------------------------------------------------- */
buildTracklist();
applyVolume();
setPower('off');

window.addEventListener('resize', () => {
  if (STATE.power !== 'off') scheduleMarquee();
});