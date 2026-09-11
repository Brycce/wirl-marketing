import type { SpriteMap } from './Sprite';

// The mark: a little round swirl, one pixel thick, about two turns, tail at the bottom right.
// This is the logo on this branch, and also what a "wirl" looks like in the scenes.
export const SWIRL: SpriteMap = [
  '...KKKKKKK..',
  '.KKK.....KK.',
  '.K........K.',
  'KK..KKKK..KK',
  'K...K..KK..K',
  'K...K...K..K',
  'KK..KK..K..K',
  '.KK....KK..K',
  '..KK..KK..KK',
  '...KKKK...K.',
  '.........KK.',
];

// Someone at a desk, building. Shirt colour 'b' is swappable. Two screen
// frames so the terminal looks alive.
export const DESK_A: SpriteMap = [
  '..............................',
  '......HHHH....................',
  '.....HHHHHH...................',
  '.....HTTTTH.......KKKKKKKKKKK.',
  '.....HTKTKH.......KkkkkkkkkkK.',
  '......TTTT........KkLLLkkkkkK.',
  '.....bbbbbb.......KkkkkkkLLkK.',
  '....bbbbbbbb......KkLLLLkkkkK.',
  '...Tbbbbbbbb......KkkkkkkkkkK.',
  '...Tbbbbbbbb......KKKKKKKKKKK.',
  '....bbbbbbbb..........KKK.....',
  '....bbbbbbbb.........KKKKK....',
  '..DDDDDDDDDDDDDDDDDDDDDDDDDDD.',
  '..DDDDDDDDDDDDDDDDDDDDDDDDDDD.',
  '..DDD.....................DDD.',
  '..DDD.....................DDD.',
];
export const DESK_B: SpriteMap = DESK_A.map((row, i) => {
  if (i === 5) return '......TTTT........KkLLLLLkkkK.';
  if (i === 6) return '.....bbbbbb.......KkkkkkkkkkK.';
  if (i === 7) return '....bbbbbbbb......KkLLkkLLkkK.';
  if (i === 8) return '...Tbbbbbbbb......KkkkkkkLkkK.';
  return row;
});

export const PERSON: SpriteMap = [
  '...HHHH...',
  '..HHHHHH..',
  '..HTTTTH..',
  '..HTKTKH..',
  '...TTTT...',
  '..bbbbbb..',
  '.Tbbbbbb..',
  '.Tbbbbbb..',
  '..bbbbbb..',
  '..bbbbbb..',
  '..DD..DD..',
  '..DD..DD..',
  '..DD..DD..',
  '.KKK..KKK.',
];

export const ROBOT: SpriteMap = [
  '.....K......',
  '....KKK.....',
  '...KBBBK....',
  '..KBBBBBK...',
  '..KBKBKBK...',
  '..KBBBBBK...',
  '...KKKKK....',
  '..KSSSSSK...',
  '.K.SSSSS.K..',
  'K..SSSSS..K.',
  '...KSSSK....',
  '...K...K....',
  '..KK...KK...',
];

export const CLOUD: SpriteMap = [
  '......KKKKK.........',
  '....KKWWWWWKK.......',
  '..KKWWWWWWWWWKK.....',
  '.KWWWWWWWWWWWWWKK...',
  'KWWWWWWWWWWWWWWWWK..',
  'KWWWWWWWWWWWWWWWWWK.',
  'KWWWWWWWWWWWWWWWWWK.',
  '.KKKKKKKKKKKKKKKKK..',
];

export const LAPTOP: SpriteMap = [
  '..KKKKKKKKKKKK..',
  '..KkkkkkkkkkkK..',
  '..KkLLkkLLkkkK..',
  '..KkkkkkkkkkkK..',
  '..KKKKKKKKKKKK..',
  'KKKKKKKKKKKKKKKK',
  'KSSSSSSSSSSSSSSK',
  '.KKKKKKKKKKKKKK.',
];

export const PAGE: SpriteMap = [
  'KKKKKKKKKK..',
  'KWWWWWWWWK..',
  'KWKKKKKWWK..',
  'KWWWWWWWWK..',
  'KWKKKKKKWK..',
  'KWWWWWWWWK..',
  'KWKKKKWWWK..',
  'KWWWWWWWWK..',
  'KWKKKKKWYYYY',
  'KWWWWWWWYYYY',
  'KWKKKWWWYYYY',
  'KWWWWWWWYYYY',
  'KKKKKKKKKKKK',
];

export const SIGN: SpriteMap = [
  'KKKKKKKKKKKK',
  'KWWWWWWWWWWK',
  'KWKWKWKWKWWK',
  'KWWWWWWWWWWK',
  'KKKKKKKKKKKK',
  '.....KK.....',
  '.....KK.....',
  '.....KK.....',
  '.....KK.....',
  '....KKKK....',
];

export const SERVER: SpriteMap = [
  'KKKKKKKKKK',
  'KSSSSSSSgK',
  'KKKKKKKKKK',
  'KSSSSSSSRK',
  'KKKKKKKKKK',
  'KSSSSSSSgK',
  'KKKKKKKKKK',
  'KSSSSSSSgK',
  'KKKKKKKKKK',
];

export const LOCK_OPEN: SpriteMap = [
  '...KKK..',
  '..K...K.',
  '..K.....',
  '..K.....',
  'KKKKKKK.',
  'KYYYYYK.',
  'KYYKYYK.',
  'KYYYYYK.',
  'KKKKKKK.',
];

export const LOCK_CLOSED: SpriteMap = [
  '..KKKK..',
  '.K....K.',
  '.K....K.',
  'KKKKKKKK',
  'KggggggK',
  'KgggKggK',
  'KggggggK',
  'KKKKKKKK',
];

export const SKULL: SpriteMap = [
  '..KKKK..',
  '.KWWWWK.',
  'KWWWWWWK',
  'KWKWWKWK',
  'KWWWWWWK',
  '.KWKKWK.',
  '..KWWK..',
  '..KKKK..',
];

export const WARN: SpriteMap = [
  '....K....',
  '...KYK...',
  '...KYK...',
  '..KYKYK..',
  '..KYKYK..',
  '.KYYYYYK.',
  '.KYYKYYK.',
  'KKKKKKKKK',
];

export const FLAME: SpriteMap = [
  '....R...',
  '...RR...',
  '..RRRO..',
  '.RROOOR.',
  '.ROYYOR.',
  'RROYYORR',
  'RROOOORR',
  '.RRRRRR.',
];

export const ARROW: SpriteMap = [
  '....K..',
  'KKKKKK.',
  'KKKKKKK',
  'KKKKKK.',
  '....K..',
];

export const CHECK: SpriteMap = [
  '.....GG',
  '....GG.',
  'GG.GG..',
  '.GGG...',
  '..G....',
];

// A plain app: a little window. Not a wirl yet. Title bar colour 'b' is swappable.
export const APP: SpriteMap = [
  'KKKKKKKKKKKK',
  'KbbbbbbbbbbK',
  'KKKKKKKKKKKK',
  'KWWWWWWWWWWK',
  'KWKKKKKWWWWK',
  'KWWWWWWWWWWK',
  'KWKKKKKKKWWK',
  'KWWWWWWWWWWK',
  'KKKKKKKKKKKK',
];

export const HEART: SpriteMap = [
  '.RR.RR.',
  'RRRRRRR',
  'RRRRRRR',
  '.RRRRR.',
  '..RRR..',
  '...R...',
];

export const PULL_REQUEST: SpriteMap = [
  'KKKKKKKKKKKKKK',
  'KWWWWWWWWWWWWK',
  'KWKKWWKKKKKWWK',
  'KWKKWWWWWWWWWK',
  'KWWKWWKKKKKKWK',
  'KWWWKWWWWWWWWK',
  'KWKKWWKKKKKWWK',
  'KWKKWWWWWWWWWK',
  'KWWWWWWWWWWWWK',
  'KRRRRRRRRRRRRK',
  'KRRRRRRRRRRRRK',
  'KKKKKKKKKKKKKK',
];

export const CLOCK: SpriteMap = [
  '..KKKK..',
  '.K....K.',
  'K..K...K',
  'K..K...K',
  'K..KKK.K',
  'K......K',
  '.K....K.',
  '..KKKK..',
];
