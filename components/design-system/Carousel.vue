<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import type { VNodeChild } from 'vue'
import { css } from '~/styled-system/css'
import DesignSystemButton from './Button.vue'

export interface CarouselSlide {
  id: number | string
  content: VNodeChild | (() => VNodeChild)
  title?: string
  description?: string
}

interface CarouselProps {
  slides: CarouselSlide[]
  autoPlay?: boolean
  autoPlayInterval?: number
  showIndicators?: boolean
  showControls?: boolean
  ariaLabel?: string
  ariaRoleDescription?: string
  slideHeight?: number
  aspectRatio?: string
}

const props = withDefaults(defineProps<CarouselProps>(), {
  autoPlay: false,
  autoPlayInterval: 3000,
  showIndicators: true,
  showControls: true,
  ariaLabel: 'カルーセル',
  ariaRoleDescription: 'carousel',
})

const currentSlide = ref(0)
const isPlaying = ref(props.autoPlay)
const touchStartX = ref<number | null>(null)
const touchEndX = ref<number | null>(null)
const carouselRef = ref<HTMLDivElement | null>(null)
const totalSlides = computed(() => props.slides.length)
const currentSlideData = computed(() => props.slides[currentSlide.value])

let intervalId: ReturnType<typeof setInterval> | null = null

const clearAutoPlay = () => {
  if (intervalId) {
    clearInterval(intervalId)
    intervalId = null
  }
}

const startAutoPlay = () => {
  if (!isPlaying.value || totalSlides.value === 0) return
  clearAutoPlay()
  intervalId = setInterval(() => {
    goToNext()
  }, props.autoPlayInterval)
}

watch([isPlaying, () => props.autoPlayInterval, () => props.slides.length], startAutoPlay, { immediate: true })
watch(
  () => props.autoPlay,
  (value) => {
    isPlaying.value = value
  },
)
onBeforeUnmount(() => clearAutoPlay())

const goToSlide = (index: number) => {
  if (totalSlides.value === 0) return
  currentSlide.value = (index + totalSlides.value) % totalSlides.value
}

const goToPrevious = () => {
  goToSlide(currentSlide.value - 1)
}

const goToNext = () => {
  goToSlide(currentSlide.value + 1)
}

const togglePlayPause = () => {
  isPlaying.value = !isPlaying.value
}

const minSwipeDistance = 50
const onTouchStart = (event: TouchEvent) => {
  touchEndX.value = null
  touchStartX.value = event.targetTouches[0]?.clientX ?? null
}
const onTouchMove = (event: TouchEvent) => {
  touchEndX.value = event.targetTouches[0]?.clientX ?? null
}
const onTouchEnd = () => {
  if (touchStartX.value === null || touchEndX.value === null) return
  const distance = touchStartX.value - touchEndX.value
  if (distance > minSwipeDistance) {
    goToNext()
  } else if (distance < -minSwipeDistance) {
    goToPrevious()
  }
}

const renderSlideContent = (slide: CarouselSlide) => {
  return typeof slide.content === 'function' ? slide.content() : slide.content
}

const getSlideRenderer = (slide: CarouselSlide) => ({
  render: () => renderSlideContent(slide),
})

const rootClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
})
const carouselContainerClass = css({
  position: 'relative',
  backgroundColor: 'bg.primary',
  borderRadius: 'md',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
  overflow: 'hidden',
  outline: 'none',
  '&:focus-visible': {
    borderColor: 'border.focus',
    boxShadow: '0 0 0 3px rgba(59, 130, 246, 0.1)',
  },
})
const slidesTrackClass = css({
  display: 'flex',
  transition: 'transform 0.5s ease-in-out',
  height: '100%',
})
const slideClass = css({
  minWidth: '100%',
  maxWidth: '100%',
  padding: 8,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 3,
  boxSizing: 'border-box',
  overflow: 'hidden',
  '& img': {
    maxWidth: '100%',
    maxHeight: '100%',
    height: 'auto',
    objectFit: 'contain',
  },
  '& > *': {
    maxWidth: '100%',
  },
})
const controlButtonClass = css({
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'bg.primary',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
  borderRadius: 'full',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  cursor: 'pointer',
  fontSize: 'xl',
  color: 'contents.primary',
  opacity: 0.9,
  transition: 'opacity 0.2s',
  '&:hover': {
    opacity: 1,
    backgroundColor: 'bg.secondary',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
})
const controlsRowClass = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: 3,
  flexWrap: 'wrap',
})
const indicatorsGroupClass = css({
  display: 'flex',
  gap: 2,
  alignItems: 'center',
})
const indicatorClass = css({
  width: '12px',
  height: '12px',
  borderRadius: 'full',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
  backgroundColor: 'bg.tertiary',
  cursor: 'pointer',
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'scale(1.2)',
  },
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: 'border.focus',
    outlineOffset: '2px',
  },
})
const activeIndicatorClass = css({
  backgroundColor: 'blue.500',
})
const liveRegionClass = css({
  padding: 3,
  backgroundColor: 'bg.primary',
  borderRadius: 'md',
  borderWidth: 'thin',
  borderStyle: 'solid',
  borderColor: 'border.default',
  fontSize: 'sm',
  color: 'contents.secondary',
  textAlign: 'center',
})
</script>

<template>
  <div :class="rootClass">
    <div
      ref="carouselRef"
      role="region"
      :aria-roledescription="ariaRoleDescription"
      :aria-label="ariaLabel"
      :class="carouselContainerClass"
      :style="{
        height: slideHeight ? `${slideHeight}px` : undefined,
        aspectRatio: aspectRatio || undefined,
      }"
      @touchstart.passive="onTouchStart"
      @touchmove.passive="onTouchMove"
      @touchend="onTouchEnd"
    >
      <div
        :class="slidesTrackClass"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
        <div
          v-for="(slide, index) in slides"
          :key="slide.id"
          role="group"
          aria-roledescription="slide"
          :aria-label="`${index + 1} / ${totalSlides}`"
          :aria-hidden="index !== currentSlide"
          :tabindex="index !== currentSlide ? -1 : undefined"
          :class="slideClass"
        >
          <component :is="getSlideRenderer(slide)" />
        </div>
      </div>

      <button
        v-if="showControls"
        :class="controlButtonClass"
        style="left: 0.5rem"
        type="button"
        aria-label="前のスライドへ"
        @click="goToPrevious"
      >
        ←
      </button>
      <button
        v-if="showControls"
        :class="controlButtonClass"
        style="right: 0.5rem"
        type="button"
        aria-label="次のスライドへ"
        @click="goToNext"
      >
        →
      </button>
    </div>

    <div :class="controlsRowClass">
      <div
        v-if="showIndicators"
        role="group"
        aria-label="スライドインジケーター"
        :class="indicatorsGroupClass"
      >
        <button
          v-for="(slide, index) in slides"
          :key="slide.id"
          type="button"
          :aria-label="`スライド ${index + 1} へ移動`"
          :aria-current="index === currentSlide ? 'true' : undefined"
          :class="[indicatorClass, index === currentSlide && activeIndicatorClass]"
          @click="goToSlide(index)"
        />
      </div>

      <DesignSystemButton
        variant="outline"
        size="sm"
        :aria-label="isPlaying ? '自動再生を一時停止' : '自動再生を開始'"
        @click="togglePlayPause"
      >
        {{ isPlaying ? '⏸️ 一時停止' : '▶️ 再生' }}
      </DesignSystemButton>
    </div>

    <div
      aria-live="polite"
      aria-atomic="false"
      :class="liveRegionClass"
    >
      スライド {{ currentSlide + 1 }} / {{ totalSlides }}
      <template v-if="currentSlideData?.title">
        : {{ currentSlideData?.title }}
      </template>
    </div>
  </div>
</template>
