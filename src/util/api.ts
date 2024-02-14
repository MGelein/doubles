import { writable, get } from "svelte/store";
import { TRINNRemote, TRINNController } from "trinn-remote-control";

const NEXT_ROUND_INTERVAL = 5000;
export const GAMES_IN_ROUND = 5;

export let players = writable<Player[]>([]);
export let isHost = writable<boolean>(false);
export let puzzle = writable<Puzzle | null>(null);
export let peerId = writable<string>("");
export let gameNumber = writable<number>(0);
export let page = writable<string>("title");

export type Player = {
  id: string;
  name: string;
  score: number;
  done: boolean;
};

let peer: TRINNController | TRINNRemote;

type MessageType =
  | "join"
  | "list_players"
  | "rejected"
  | "start_game"
  | "new_puzzle"
  | "goto_page"
  | "register_time";

type GameMessage = {
  action: MessageType;
  data: any;
};

export const createRemote = (id: string) => {
  isHost.set(true);
  const username = localStorage.getItem("username");
  if (username == null) {
    console.error("Could not create host if username was not set");
    return;
  }
  peer = new TRINNRemote(id);

  peer.onCreate((id) => {
    peerId.set(id);
    players.set([{ id, name: username, score: 0, done: true }]);
  });

  peer.onData((message) => {
    const { action, data } = message as GameMessage;
    console.log({ action, data });
    switch (action) {
      case "register_time":
        updatePlayerScore(data.id, data.time);
        break;
      case "join":
        const newPlayer = {
          id: data.id,
          name: data.name,
          score: 0,
          done: true,
        };
        players.update((oldPlayers) => {
          if (oldPlayers.some((p) => p.name === newPlayer.name)) {
            sendMessage("rejected", {});
            return oldPlayers;
          } else {
            const newPlayers = [...oldPlayers, newPlayer];
            sendMessage("list_players", newPlayers);
            return newPlayers;
          }
        });
        break;
      default:
        console.log("unhandled message type:", action);
        break;
    }
  });
};

export const updatePlayerScore = (id: string, time: number) => {
  players.update((oldPlayers) => {
    const playerToUpdate = oldPlayers.find((p) => p.id === id);
    const otherPlayers = oldPlayers.filter((p) => p.id !== id);
    if (playerToUpdate) {
      playerToUpdate.score += time;
      playerToUpdate.done = true;
      const newPlayers = [playerToUpdate, ...otherPlayers];
      const allDone = !newPlayers.some((p) => !p.done);
      if (allDone) {
        const numberOfGamesPlayed = get(gameNumber);

        if (numberOfGamesPlayed < GAMES_IN_ROUND) {
          setTimeout(() => {
            generatePuzzle(3);
          }, NEXT_ROUND_INTERVAL);
        } else {
          sendMessage("goto_page", "score");
          page.set("score");
        }
      }
      sendMessage("list_players", newPlayers);
      return newPlayers;
    }
    return oldPlayers;
  });
};

export const createController = (
  id: string,
  name: string,
  onStartGame: () => void
) => {
  if (peer) return sendMessage("join", { name });

  peer = new TRINNController(id);
  peer.onCreate((id) => {
    peerId.set(id);
  });
  peer.onConnection(() => {
    sendMessage("join", { name, id: peer.id });
  });

  peer.onData((message) => {
    const { action, data } = message as GameMessage;
    console.log({ action, data });

    switch (action) {
      case "goto_page":
        page.set(data);
        break;
      case "start_game":
        gameNumber.set(0);
        onStartGame();
        break;
      case "new_puzzle":
        gameNumber.update((old) => old + 1);
        puzzle.set(data);
        break;
      case "list_players":
        players.update(() => data as Player[]);
        break;
      default:
        console.log("unhandled message type: ", action);
        break;
    }
  });
};

export const sendMessage = (action: MessageType, data: any) => {
  peer?.sendData({ action, data });
};

export const generatePuzzle = (size: number) => {
  const amountToPick = size * size;
  const picked: Emoji[] = [];
  const pickList = [...animals];
  for (let i = 0; i < amountToPick; i++) {
    const index = Math.floor(Math.random() * pickList.length);
    picked.push(pickList.splice(index, 1)[0]);
  }

  let replaced = false;
  do {
    const indexToReplace = Math.floor(Math.random() * amountToPick);
    const replacer = Math.floor(Math.random() * amountToPick);
    if (indexToReplace === replacer) continue;
    picked[indexToReplace] = picked[replacer];
    replaced = true;
  } while (!replaced);

  const newPuzzle: Puzzle = [[]];
  for (let i = 0; i < size; i++) newPuzzle[i] = [];
  for (let i = 0; i < picked.length; i++) {
    const col = i % size;
    const row = (i - col) / size;
    newPuzzle[col][row] = picked[i];
  }

  puzzle.set(newPuzzle);
  players.update((oldPlayers) => {
    oldPlayers.forEach((p) => {
      p.done = false;
    });
    return [...oldPlayers];
  });

  gameNumber.update((old) => old + 1);
  sendMessage("new_puzzle", newPuzzle);
};

export type Emoji = (typeof animals)[number];
type Row = Emoji[];
export type Puzzle = Row[];

export const animals = [
  "🐘",
  "🦘",
  "🦑",
  "🐙",
  "🦙",
  "🐖",
  "🐄",
  "🐼",
  "🦍",
  "🦌",
  "🐂",
  "🐨",
  "🦏",
  "🐗",
  "🦅",
  "🐒",
  "💐",
  "🌵",
  "🌺",
  "🚙",
  "🚜",
  "🚝",
  "🚑",
  "🚌",
  "🚁",
  "🚕",
  "🚗",
  "🚐",
  "🚚",
  "🚘",
  "🚛",
  "🚟",
  "🚖",
  "🏎️",
  "⛽",
  "🍇",
  "🍈",
  "🍉",
  "🍊",
  "🍋",
  "🍌",
  "🍍",
  "🥭",
  "🍎",
  "🍏",
  "🍐",
  "🍑",
  "🍒",
  "🍓",
  "🥝",
  "🍅",
  "🥥",
  "🍞",
  "🥐",
  "🥖",
  "🥨",
  "🥞",
  "🧇",
  "🧀",
  "🍖",
  "🥩",
  "🥓",
  "🍔",
  "🍟",
  "🍕",
  "🌭",
  "🥪",
  "🌮",
  "🌯",
  "🧆",
  "🥚",
  "🍳",
  "🥘",
  "🍲",
  "🥣",
  "🥗",
  "🍿",
  "🧈",
  "🥫",
  "🍝",
] as const;
