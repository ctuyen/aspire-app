<script setup lang="ts">
import { ref, computed, Suspense } from "vue";
import Layout from "./Layout.vue";
import Modal from "./Modal.vue";
import { getMyCard, addMyCard, cancelMyCard } from "../api";
import { useStore } from "vuex";
import { Carousel, Slide, Pagination } from "vue3-carousel";
import useVuelidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
const store = useStore();

getMyCard().then((data) => store.dispatch("updateMyCardList", data));

const myCards = computed(() =>
  store.state.card.myCards.map((card) => {
    const digitGroups = card.number.match(/.{1,4}/g).map((group) => group.split(""));
    card.digitGroups = digitGroups;
    return card;
  })
);
const showingCard = computed(() => myCards.value[showingCardIndex.value] || {});
const isAddingNewCard = ref(false);
const isCancellingCard = ref(false);
const isShowCardNumber = ref(false);
const newName = ref("");
const showingCardIndex = ref(0);
const rules = computed(() => ({
  newName: {
    required,
  },
}));
const v$ = useVuelidate(rules, { newName });

const handleUpdateName = (e) => {
  newName.value = e.target.value;
};
const handleAddCard = async () => {
  v$.value.newName.$touch();
  if (v$.value.newName.$invalid) return;
  const newCard = await addMyCard(newName.value);
  store.dispatch("addMyCard", newCard);
  isAddingNewCard.value = false;
};
const handleCancelCard = async () => {
  const cardNumber = await cancelMyCard(showingCard.value.number);
  store.dispatch("cancelMyCard", cardNumber);
  isCancellingCard.value = false;
};
const frezeeCard = () => {
  const showingCard = myCards.value[showingCardIndex.value];
  if (showingCard.status === "active") {
    store.dispatch("updateStatus", {
      number: showingCard.number,
      status: "frozen",
    });
  } else {
    store.dispatch("updateStatus", {
      number: showingCard.number,
      status: "active",
    });
  }
};
const setShowingCard = (index) => {
  showingCardIndex.value = index;
};
</script>

<template>
  <Suspense>
    <Layout>
      <div class="mx-6 -mt-6 text-cWhite">
        <!-- Balance -->
        <div class="flex items-end text-sm mb-2">Account balance</div>
        <div class="flex justify-between text-cWhite">
          <div class="flex items-center">
            <div class="bg-c1 px-3 rounded text-sm">S$</div>
            <div class="text-2xl font-extrabold ml-3">
              {{ showingCard.balance }}
            </div>
          </div>
          <div class="flex items-center justify-between" @click="isAddingNewCard = true">
            <img src="../assets/box.svg" class="w-4 mr-1" />
            <div class="text-c2 text-xs font-bold">New card</div>
          </div>
        </div>
        <!-- Cards list -->
        <div class="flex mt-8">
          <div class="text-xs font-bold">
            <div class="pb-2">My debit cards</div>
            <div class="h-0.5 rounded bg-c2"></div>
          </div>
          <div class="text-xs opacity-50 ml-6">All company cards</div>
        </div>
        <carousel :items-to-show="1" snapAlign="start">
          <slide v-for="card in myCards" :key="card.number">
            <!-- Card info -->
            <div class="relative h-60 mt-8 w-full mb-4 z-0">
              <div
                class="absolute bg-cWhite text-c1 text-xs rounded-md flex items-center px-2 pt-1.5 pb-6 top-0 right-0 h-12"
                @click="isShowCardNumber = !isShowCardNumber"
              >
                <img src="../assets/remove_red_eye-24px.svg" class="w-4 mr-1" />
                <span class="text-c2 text-xs font-bold">Show card number</span>
              </div>
              <div
                class="absolute bg-c1 h-56 rounded-lg z-10 inset-x-0 top-7 p-6 tracking-widest"
              >
                <div v-if="card.status === 'frozen'" class="absolute">Locked</div>
                <div class="flex justify-end">
                  <img src="../assets/Logo-2.svg" />
                </div>
                <div class="font-extrabold text-xl mt-6 leading-tight text-left">
                  {{ card.holderName }}
                </div>
                <!-- Card number -->
                <div class="flex items-center h-8 mt-4">
                  <template v-if="isShowCardNumber">
                    <div
                      v-for="(digitGroup, idx) in card.digitGroups"
                      :key="idx"
                      :class="{ 'ml-6': idx !== 0 }"
                      class="flex font-bold text-sm text-cWhite items-center"
                    >
                      <div v-for="(digit, i) in digitGroup" :class="{ 'ml-1': i !== 0 }">
                        {{ digit }}
                      </div>
                    </div>
                  </template>
                  <template v-else>
                    <div
                      v-for="group in 3"
                      :key="group"
                      :class="{ 'ml-6': group !== 1 }"
                      class="flex"
                    >
                      <div class="w-2 h-2 bg-cWhite rounded-full"></div>
                      <div class="w-2 h-2 bg-cWhite rounded-full ml-2"></div>
                      <div class="w-2 h-2 bg-cWhite rounded-full ml-2"></div>
                      <div class="w-2 h-2 bg-cWhite rounded-full ml-2"></div>
                    </div>
                    <div class="flex ml-6 font-bold text-sm text-cWhite items-center">
                      <div
                        v-for="(digit, i) in card.digitGroups[3]"
                        :class="{ 'ml-1': i !== 0 }"
                      >
                        {{ digit }}
                      </div>
                    </div>
                  </template>
                </div>
                <div class="flex items-center font-extrabold text-xs">
                  <div>Thru: {{ showingCard.thruDate }}</div>
                  <div class="flex items-center ml-8">
                    <span>CVV:</span>
                    <span v-if="isShowCardNumber" class="text-xl mb-2 font-bold ml-2">{{
                      card.CVV
                    }}</span
                    ><span v-else class="text-xl pt-2 font-bold ml-2">***</span>
                  </div>
                </div>
                <div class="flex justify-end">
                  <img src="../assets/Visa-Logo.svg" />
                </div>
              </div>
            </div>
          </slide>

          <template #addons="{ currentSlide }">
            <!-- <navigation /> -->
            <pagination @click="setShowingCard(currentSlide)" />
          </template>
        </carousel>
      </div>
      <div>
        <!-- Menu options -->
        <div class="flex justify-between bg-c4 rounded-t-3xl py-5 px-6 mt-8">
          <div
            class="flex flex-col items-center text-center cursor-pointer"
            @click="frezeeCard"
          >
            <img src="../assets/Freeze-card.svg" />
            <div class="mt-2 text-c3 text-sm font-thin">
              {{ showingCard.status === "active" ? "Freeze card" : "Unfreezed card" }}
            </div>
          </div>
          <div class="flex flex-col items-center text-center cursor-pointer">
            <img src="../assets/Set-spend-limit.svg" />
            <div class="mt-2 text-c3 text-sm">Set spend limit</div>
          </div>
          <div class="flex flex-col items-center text-center cursor-pointer">
            <img src="../assets/GPay.svg" />
            <div class="mt-2 text-c3 text-sm">Add to GPay</div>
          </div>
          <div class="flex flex-col items-center text-center cursor-pointer">
            <img src="../assets/Replace-card.svg" />
            <div class="mt-2 text-c3 text-sm">Replace card</div>
          </div>
          <div
            class="flex flex-col items-center text-center cursor-pointer"
            @click="isCancellingCard = true"
          >
            <img src="../assets/Deactivate-card.svg" />
            <div class="mt-2 text-c3 text-sm">Cancel card</div>
          </div>
        </div>

        <div class="p-6 bg-cWhite">
          <div
            class="flex items-center justify-between p-5 rounded-lg shadow-sm border border-c7 bg-c6"
          >
            <div class="flex items-center">
              <img src="../assets/Card-details.svg" />
              <div class="ml-3 font-bold text-sm text-c3">Card details</div>
            </div>
            <img src="../assets/down-arrow.svg" />
          </div>
          <!-- Recent transactions -->
          <div class="relative mt-6 z-0">
            <div
              class="absolute inset-x-0 w-full flex items-center justify-between p-5 rounded-lg shadow-sm border border-c7 bg-c6 z-10"
            >
              <div class="flex items-center">
                <img src="../assets/Recent-transactions.svg" />
                <div class="ml-3 font-bold text-sm text-c3">Recent transactions</div>
              </div>
              <img src="../assets/up-arrow.svg" />
            </div>
            <div class="absolute inset-x-0 top-14 w-full rounded-lg text-sm pb-8 z-0">
              <div class="relative z-10">
                <!-- Transaction -->
                <div class="border border-c8 p-6 rounded-lg">
                  <div class="flex mb-4">
                    <div class="p-4 rounded-full w-12 h-12 bg-c9">
                      <img src="../assets/file-storage.svg" />
                    </div>
                    <div class="ml-3 flex-1">
                      <div class="flex items-center justify-between">
                        <div class="font-bold text-cBlack">Hamleys</div>
                        <div class="flex items-center">
                          <div class="text-c1 font-bold mr-2">+ S$ 150</div>
                          <img src="../assets/next.svg" />
                        </div>
                      </div>
                      <div class="text-c10 text-xs mt-1 font-light">20 May 2020</div>
                      <div class="flex items-center mt-3">
                        <div
                          class="flex items-center justify-center rounded-full w-6 h-5 bg-c5"
                        >
                          <img src="../assets/business-and-finance.svg" />
                        </div>
                        <div class="text-c5 text-xs font-semibold ml-2">
                          Refund on debit card
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex border-t border-c8 pt-4 mb-4">
                    <div class="p-4 rounded-full w-12 h-12 bg-c11">
                      <img src="../assets/flights.svg" />
                    </div>
                    <div class="ml-3 flex-1">
                      <div class="flex items-center justify-between">
                        <div class="font-bold text-cBlack">Hamleys</div>
                        <div class="flex items-center">
                          <div class="text-cBlack font-bold mr-2">- S$ 150</div>
                          <img src="../assets/next.svg" />
                        </div>
                      </div>
                      <div class="text-c10 text-xs mt-1 font-light">20 May 2020</div>
                      <div class="flex items-center mt-3">
                        <div
                          class="flex items-center justify-center rounded-full w-6 h-5 bg-c5"
                        >
                          <img src="../assets/business-and-finance.svg" />
                        </div>
                        <div class="text-c5 text-xs font-semibold ml-2 mx-auto">
                          Refund on debit card
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex border-t border-c8 pt-4 mb-4">
                    <div class="p-4 rounded-full w-12 h-12 bg-c12">
                      <img src="../assets/megaphone.svg" />
                    </div>
                    <div class="ml-3 flex-1">
                      <div class="flex items-center justify-between">
                        <div class="font-bold text-cBlack">Hamleys</div>
                        <div class="flex items-center">
                          <div class="text-cBlack font-bold mr-2">- S$ 150</div>
                          <img src="../assets/next.svg" />
                        </div>
                      </div>
                      <div class="text-c10 text-xs mt-1 font-light">20 May 2020</div>
                      <div class="flex items-center mt-3">
                        <div
                          class="flex items-center justify-center rounded-full w-6 h-5 bg-c5"
                        >
                          <img src="../assets/business-and-finance.svg" />
                        </div>
                        <div class="text-c5 text-xs font-semibold ml-2 mx-auto">
                          Refund on debit card
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="flex border-t border-c8 pt-4 mb-4">
                    <div class="p-4 rounded-full w-12 h-12 bg-c9">
                      <img src="../assets/file-storage.svg" />
                    </div>
                    <div class="ml-3 flex-1">
                      <div class="flex items-center justify-between">
                        <div class="font-bold text-cBlack">Hamleys</div>
                        <div class="flex items-center">
                          <div class="text-cBlack font-bold mr-2">- S$ 150</div>
                          <img src="../assets/next.svg" />
                        </div>
                      </div>
                      <div class="text-c10 text-xs mt-1 font-light">20 May 2020</div>
                      <div class="flex items-center mt-3">
                        <div
                          class="flex items-center justify-center rounded-full w-6 h-5 bg-c5"
                        >
                          <img src="../assets/business-and-finance.svg" />
                        </div>
                        <div class="text-c5 text-xs font-semibold ml-2 mx-auto">
                          Refund on debit card
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div
                class="flex items-center justify-center bg-c13 rounded-b-lg border border-c14 mb-16 text-c1 text-sm py-3 font-bold z-0 mb-10"
              >
                View all card transactions
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modals -->
      <teleport to="#layer1">
        <Modal :isVisible="isAddingNewCard" @overlay-click="isAddingNewCard = false">
          <div class="text-2xl text-c1 font-bold">New card</div>
          <div class="mt-4 font-bold text-cBlack">Please specify the name on card</div>
          <input
            type="text"
            class="bg-cWhite text-c0-500 rounded-lg leading-tight border border-c0-300 px-3 appearance-none w-full h-10 placeholder-c0-500 focus:outline-none focus:border-c1-500 mt-1"
            @input="handleUpdateName"
          />
          <div
            v-if="v$.newName.$dirty && v$.newName.$invalid"
            class="text-xs text-cError mt-1"
          >
            Please input holder name
          </div>
          <div class="flex justify-end">
            <button
              class="px-4 py-2 border border-c1 bg-cWhite text-c1 rounded-lg text-sm mt-2"
              @click="isAddingNewCard = false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 border border-c1 bg-c1 text-cWhite rounded-lg text-sm mt-2 ml-2"
              @click="handleAddCard"
            >
              Add card
            </button>
          </div>
        </Modal>
      </teleport>
      <teleport to="#layer1">
        <Modal :isVisible="isCancellingCard" @overlay-click="isCancellingCard = false">
          <div class="text-2xl text-c1 font-bold text-center">Cancel card</div>
          <div class="mt-4 font-bold text-cBlack text-center">
            Are you sure you want to cancel this card?
          </div>
          <div class="flex justify-center">
            <button
              class="px-4 py-2 border border-c1 bg-cWhite text-c1 rounded-lg text-sm mt-2"
              @click="isCancellingCard = false"
            >
              Cancel
            </button>
            <button
              class="px-4 py-2 border border-c10 bg-c10 text-cWhite rounded-lg text-sm mt-2 ml-2"
              @click="handleCancelCard"
            >
              Cancel card
            </button>
          </div>
        </Modal>
      </teleport>
    </Layout>
  </Suspense>
</template>

<style scoped></style>
