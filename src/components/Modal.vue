<template>
  <div>
    <!-- Overlay -->
    <transition
      :enterFromClass="variantCls.overlayEnter"
      :enterActiveClass="variantCls.overlayEnterActive"
      :leaveActiveClass="variantCls.overlayLeaveActive"
      :leaveToClass="variantCls.overlayLeaveTo"
    >
      <div v-if="isVisible" :class="variantCls.overlay" :style="modalZIndex" />
    </transition>

    <!-- Modal -->
    <transition
      :enterFromClass="variantCls.enter"
      :enterActiveClass="variantCls.enterActive"
      :leaveActiveClass="variantCls.leaveActive"
      :leaveToClass="variantCls.leaveTo"
    >
      <div
        v-if="isVisible"
        :class="variantCls.modalWrapper"
        @click.self="handleClickOverlay"
        :style="modalZIndex"
      >
        <div :class="variantCls.root">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "Modal",
  emits: ["overlay-click"],
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    zIndex: {
      type: String,
      default: "z-index: 101",
    },
  },
  computed: {
    variantCls() {
      return {
        root:
          "bg-cWhite shadow rounded-lg border border-c1-500 m-auto h-auto w-full overflow-y-auto max-w-md max-h-modal p-10 sm:px-24",
        overlayEnter: "opacity-0",
        overlayEnterActive: "transition duration-200 ease-ease-in",
        overlayLeaveActive: "transition duration-200 ease-ease-out",
        overlayLeaveTo: "opacity-0",
        overlay: "fixed top-0 left-0 w-full h-screen bg-cBlack bg-opacity-50",
        enter: "opacity-0",
        enterActive: "transition duration-200 ease-ease-in",
        leaveActive: "transition duration-200 ease-ease-out",
        leaveTo: "opacity-0",
        modalWrapper:
          "fixed top-0 left-0 w-full h-screen items-center justify-center bg-transparent overflow-y-auto p-8",
      };
    },
    modalZIndex() {
      return {
        zIndex: this.zIndex || "z-index: 101;",
      };
    },
  },
  methods: {
    handleClickOverlay() {
      this.$emit("overlay-click");
    },
  },
};
</script>
