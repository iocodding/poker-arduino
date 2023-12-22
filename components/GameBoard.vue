<script setup>
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { TexasHoldem } from "poker-odds-calc";

const props = defineProps({
  hidden: {
    type: Boolean,
    default: false,
  },
});

const firebaseConfig = {
  databaseURL:
    "https://texas-arduino-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);

function convertCardName(cardName) {
  const splitName = cardName.split("_");
  const firstLetter =
    splitName[0].charAt(0) == 1 ? "T" : splitName[0].charAt(0).toUpperCase();
  return `${firstLetter}${splitName[1].charAt(0)}`;
}

const ivoCardsRef = ref(database, "/users/ivo");
const ivoCards = shallowRef();
onValue(ivoCardsRef, (snapshot) => {
  const data = snapshot.val();
  ivoCards.value = data;
});

const doichiCardsRef = ref(database, "/users/doichi");
const doichiCards = shallowRef();
onValue(doichiCardsRef, (snapshot) => {
  const data = snapshot.val();
  doichiCards.value = data;
});

const flopCardsRef = ref(database, "/dealer/flop");
const flopCards = shallowRef();
onValue(flopCardsRef, (snapshot) => {
  const data = snapshot.val();
  flopCards.value = data;
});

const results = computed(() => {
  const Table = new TexasHoldem();

  const ivo =
    ivoCards.value && ivoCards.value.map((card) => convertCardName(card));
  const doichi =
    doichiCards.value && doichiCards.value.map((card) => convertCardName(card));

  var board = [];

  if (flopCards.value) {
    flopCards.value.forEach((card) => {
      board.push(convertCardName(card));
    });
  }

  if (!ivo || !doichi || board.length < 3) {
    return {
      doichiChance: "0%",
      ivoChance: "0%",
    };
  }

  Table.addPlayer(ivo).addPlayer(doichi);

  if (board.length) {
    Table.setBoard(board);
  }

  const Result = Table.calculate();

  const player1Wins = Result.getPlayers()[0].data.wins;
  const player2Wins = Result.getPlayers()[1].data.wins;

  const totalWins = player1Wins + player2Wins;

  return {
    ivoChance: `${((player1Wins / totalWins) * 100).toFixed(2)}%`,
    doichiChance: `${((player2Wins / totalWins) * 100).toFixed(2)}%`,
  };
});

const users = {
  user1: {
    name: "Ivaylo Ovcharov",
    image: "/assets/ivo.png",
  },
  user2: {
    name: "Doichin Alexandrov",
    image: "/assets/doichi.png",
  },
};
</script>
<template>
  <div>
    <div
      style="
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
      "
    >
      <div class="flex gap-5">
        <div class="flex">
          <img
            v-if="flopCards"
            v-for="flopCard in flopCards"
            :src="`/cards/${flopCard}.png`"
            style="width: 80px"
          />
        </div>

        <img
          v-if="turnCard"
          :src="`/cards/${turnCard}.png`"
          style="width: 80px"
        />
        <img
          v-if="riverCard"
          :src="`/cards/${riverCard}.png`"
          style="width: 80px"
        />
      </div>
    </div>
    <div
      class="flex flex-col gap-8"
      style="position: fixed; bottom: 60px; left: 10px"
    >
      <div
        v-if="ivoCards && ivoCards.length == 2"
        class="flex gap-6 items-center"
      >
        <img :src="users.user1.image" style="width: 200px" />
        <div class="flex flex-col gap-1">
          <div class="flex">
            <img
              v-if="ivoCards"
              v-for="ivoCard in ivoCards"
              :src="hidden ? `/cards/cardBack.png` : `/cards/${ivoCard}.png`"
              style="width: 80px"
            />
          </div>
          <div
            class="px-4 py-2 rounded-full font-semibold"
            style="background: #efefef; font-size: 22px"
          >
            {{ users.user1.name }}
          </div>
          <BoardPercantageChip v-if="!hidden && results.doichiChance !== '0%'">
            {{ results.ivoChance }}
          </BoardPercantageChip>
        </div>
      </div>

      <div
        v-if="doichiCards && doichiCards.length == 2"
        class="flex gap-6 items-center"
      >
        <img :src="users.user2.image" style="width: 200px" />
        <div class="flex flex-col gap-1">
          <div class="flex">
            <img
              v-if="doichiCards"
              v-for="doichiCard in doichiCards"
              :src="hidden ? `/cards/cardBack.png` : `/cards/${doichiCard}.png`"
              style="width: 80px"
            />
          </div>
          <div
            class="px-4 py-2 rounded-full font-semibold"
            style="background: #efefef; font-size: 22px"
          >
            {{ users.user2.name }}
          </div>
          <BoardPercantageChip v-if="!hidden && results.doichiChance !== '0%'">
            {{ results.doichiChance }}
          </BoardPercantageChip>
        </div>
      </div>
    </div>
  </div>
</template>
