<script setup>
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";


const firebaseConfig = {
    databaseURL: "https://texas-arduino-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);


const database = getDatabase(app);

const ivoCardsRef = ref(database, "/users/ivo",);
const ivoCards = shallowRef()
onValue(ivoCardsRef, (snapshot) => {
    const data = snapshot.val();
    ivoCards.value = data;
});

const doichiCardsRef = ref(database, "/users/doichi",);
const doichiCards = shallowRef()
onValue(doichiCardsRef, (snapshot) => {
    const data = snapshot.val();
    doichiCards.value = data;
});



</script>
<template>
    <div style="background: #242424; height: 100vh">
        <div class="flex flex-col gap-8" style="position: fixed; bottom: 60px; left: 10px">
            <div v-if="ivoCards && ivoCards.length == 2" class="flex gap-6 items-center">
                <img :src="`/assets/ivo.png`" style="width: 200px; ">
                <div class="flex flex-col gap-1">
                    <div class="flex">
                        <img v-if="ivoCards" v-for="w in ivoCards" :src="`/cards/${w}.png`" style="width: 80px; ">
                    </div>
                    <div class="px-4 py-2 rounded-full font-semibold" style=" background: #EFEFEF; font-size: 22px">
                        Ivaylo Ovcharov
                    </div>

                </div>
            </div>
            <div v-if="doichiCards && doichiCards.length == 2" class="flex gap-6 items-center">
                <img :src="`/assets/doichi.png`" style="width: 200px; ">
                <div class="flex flex-col gap-1">
                    <div class="flex">
                        <img v-if="doichiCards" v-for="w in doichiCards" :src="`/cards/${w}.png`" style="width: 80px; ">
                    </div>
                    <div class="px-4 py-2 rounded-full font-semibold" style=" background: #EFEFEF; font-size: 22px">
                        Doichin Alexandrov
                    </div>

                </div>
            </div>

        </div>

    </div>
</template>

