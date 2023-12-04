
<script setup>
import { onKeyStroke } from '@vueuse/core'
import { TexasHoldem } from 'poker-odds-calc';

const props = defineProps({
    players: {
        type: Array,
        default: () => [],
    },
});


const confirmDialogOpen = ref(false);
const selectedUser = ref(null)

const playerKeys = [{
    userId: 1,
    name: 'Ivaylo Ovcharov',
    winKey: 'q',
    looseKey: 'g',
    straightKey: 'a',
    flushKey: 's',
    fullHouseKey: 'd',
    fourKind: 'f'
},
{
    userId: 2,
    name: 'Yordan Zhelev',
    winKey: 'w',
    straightKey: 'z',
    flushKey: 'x',
    fullHouseKey: 'c',
    fourKind: 'v'
},
{
    userId: 4,
    name: 'Hristo Georgiev',
    winKey: 'e',
    straightKey: 'j',
    flushKey: 'k',
    fullHouseKey: 'l',
    fourKind: ';'
},
{
    userId: 3,
    name: 'Doichin Alexandrov',
    winKey: 'r',
    straightKey: 'b',
    flushKey: 'n',
    fullHouseKey: 'n',
    fourKind: 'm'
}]



onKeyStroke((e) => {
    const winPlayer = playerKeys.find((user) => user.winKey === e.key)

    if (winPlayer) {
        selectedUser.value = winPlayer
        confirmDialogOpen.value = true;
    }
})

function onHandSubmit(userId, hand) {
    axios.post(`${config.public.API_BASE_URL}/api/player_hands`, { data: { player: props.selectedUser.userId } })
        .then((result) => {
            queryClient.invalidateQueries({ queryKey: ['players'] })
            emit('close')
        })
}
const Table = new TexasHoldem();
Table
    .addPlayer(["2s", "7d"])
    .addPlayer(["Kd", "Td"])
    .setBoard(["Js", "Ts", "Qh"])
    ;

const Result = Table.calculate();

Result.getPlayers().forEach(player => {
    console.log(`${player.getName()} - ${player.getHand()} - Wins: ${player.getWinsPercentageString()} - Ties: ${player.getTiesPercentageString()}`);
});

console.log({ Result })

console.log(`Board: ${Result.getBoard()}`);
console.log(`Iterations: ${Result.getIterations()}`);
console.log(`Time takes: ${Result.getTime()}ms`);

</script>
<template>
    <RanklistConfirmDialog :open="confirmDialogOpen" :selectedUser="selectedUser" @close="confirmDialogOpen = false" />
    <div style="background: #242424; height: 100vh">
        <img src="https://d1yjjnpx0p53s8.cloudfront.net/styles/logo-thumbnail/s3/052011/pokerstars_0.jpg?itok=a-5zL_Ae" />
        <div>
            <div v-for="player in players">
                <div class="flex gap-6 items-center" style="margin-left: 1000px">
                    <img :class="player.is_down && 'grayscale'" :src="`/assets/${player.image_name}.png`"
                        style="width: 200px; ">
                    <div class="flex flex-col gap-2">
                        <div class="px-4 py-2 rounded-full font-semibold" style=" background: #EFEFEF; font-size: 22px">
                            {{ player.name }}
                        </div>
                        <div class="flex gap-2">
                            <div class="flex px-4 py-2 rounded-full font-semibold"
                                style="background: #B90020; color: white;  font-size: 18px; width: fit-content">
                                Wins: {{ player.wins?.length || 0 }}
                            </div>
                            <div class="flex px-4 py-2 rounded-full font-semibold"
                                style="background: grey; color: white;  font-size: 18px; width: fit-content">
                                Straight: {{ player.player_hands && player.player_hands.filter((e) => e.type ===
                                    'straight').length || 0 }}
                            </div>
                            <div class="flex px-4 py-2 rounded-full font-semibold"
                                style="background: grey; color: white;  font-size: 18px; width: fit-content">
                                Flush: {{ player.player_hands && player.player_hands.filter((e) => e.type ===
                                    'flush').length || 0 }}
                            </div>
                            <div class="flex px-4 py-2 rounded-full font-semibold"
                                style="background: grey; color: white;  font-size: 18px; width: fit-content">
                                Full House: {{ player.player_hands && player.player_hands.filter((e) => e.type ===
                                    'fullhouse').length || 0 }}
                            </div>
                            <div class="flex px-4 py-2 rounded-full font-semibold"
                                style="background: grey; color: white;  font-size: 18px; width: fit-content">
                                Four Of Kind: {{ player.player_hands && player.player_hands.filter((e) => e.type ===
                                    'fourofkind').length || 0 }}
                            </div>
                        </div>

                    </div>
                </div>
                <br>
            </div>
        </div>

    </div>
</template>