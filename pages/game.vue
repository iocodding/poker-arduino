<script setup>
import { initializeApp } from "firebase/app";
import { getDatabase, onValue, ref, set } from "firebase/database";


const firebaseConfig = {
    databaseURL: "https://texas-arduino-default-rtdb.europe-west1.firebasedatabase.app/",
};

const app = initializeApp(firebaseConfig);


const database = getDatabase(app);
const starCountRef = ref(database, "/users",);

const www = shallowRef()

onValue(starCountRef, (snapshot) => {
    const data = snapshot.val();
    www.value = data;
});

function writeUserData() {
    set(ref(database, 'users/0',), { hand: 'ss', hand2: 'Hand2' });
}

</script>
<template>
    <div style="background: #242424; height: 100vh">
        <img src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052011/pokerstars_0.jpg?itok=a-5zL_Ae" />
        <div>
            <div class="flex gap-6 items-center" style="margin-left: 1000px">

                <img v-if="www && www[0] && www[0].hand1" :src="`/${www[0].hand1}.png`" style="width: 200px; ">
                <img v-if="www && www[0] && www[0].hand2" :src="`/${www[0].hand2}.png`" style="width: 200px; ">

                <img :src="`/assets/ivo.png`" style="width: 200px; ">
                <div class="flex flex-col gap-2">
                    <div class="px-4 py-2 rounded-full font-semibold" style=" background: #EFEFEF; font-size: 22px">
                        Ivaylo Ovcharov
                    </div>
                    <div class="flex px-4 py-2 rounded-full font-semibold"
                        style="background: #B90020; color: white;  font-size: 18px; width: fit-content">
                        Wins: 17
                    </div>
                </div>
            </div>
            <br>
        </div>

    </div>
</template>

