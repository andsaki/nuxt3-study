<template>
  <div :class="containerClass">
    <div :class="headerClass">
      <h1 :class="titleClass">デザインシステム</h1>
      <p :class="descriptionClass">
        Panda CSS + Vue 3 で実装したプロダクショングレードのUIコンポーネント集
      </p>
    </div>

    <!-- Buttons -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">Buttons</h2>
      <div :class="gridClass">
        <DesignSystemCard title="Primary" color-scheme="blue">
          <div :class="buttonGridClass">
            <DesignSystemButton variant="primary" size="sm">Small</DesignSystemButton>
            <DesignSystemButton variant="primary" size="md">Medium</DesignSystemButton>
            <DesignSystemButton variant="primary" size="lg">Large</DesignSystemButton>
          </div>
        </DesignSystemCard>

        <DesignSystemCard title="Secondary" color-scheme="gray">
          <div :class="buttonGridClass">
            <DesignSystemButton variant="secondary" size="sm">Small</DesignSystemButton>
            <DesignSystemButton variant="secondary" size="md">Medium</DesignSystemButton>
            <DesignSystemButton variant="secondary" size="lg">Large</DesignSystemButton>
          </div>
        </DesignSystemCard>

        <DesignSystemCard title="Danger" color-scheme="red">
          <div :class="buttonGridClass">
            <DesignSystemButton variant="danger" size="sm">Small</DesignSystemButton>
            <DesignSystemButton variant="danger" size="md">Medium</DesignSystemButton>
            <DesignSystemButton variant="danger" size="lg">Large</DesignSystemButton>
          </div>
        </DesignSystemCard>
      </div>
    </section>

    <!-- Inputs -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">Input Fields</h2>
      <div :class="gridClass">
        <DesignSystemCard title="Text Input" color-scheme="purple">
          <DesignSystemInput
            v-model="sampleText"
            label="お名前"
            placeholder="山田太郎"
            helper-text="フルネームで入力してください"
          />
        </DesignSystemCard>

        <DesignSystemCard title="TextArea" color-scheme="purple">
          <DesignSystemTextArea
            v-model="sampleTextarea"
            label="ご意見・ご感想"
            placeholder="ご自由にご記入ください"
            :rows="4"
          />
        </DesignSystemCard>

        <DesignSystemCard title="Select" color-scheme="blue">
          <DesignSystemSelect
            v-model="sampleSelect"
            label="都道府県"
            :options="prefectures"
          />
        </DesignSystemCard>
      </div>
    </section>

    <!-- Checkboxes & Radios -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">Checkboxes & Radios</h2>
      <div :class="gridClass">
        <DesignSystemCard title="Checkbox" color-scheme="green">
          <DesignSystemCheckbox
            v-model="sampleCheckbox"
            label="利用規約に同意する"
          />
        </DesignSystemCard>

        <DesignSystemCard title="Radio" color-scheme="yellow">
          <div :class="css({ spaceY: 2 })">
            <DesignSystemRadio
              v-model="sampleRadio"
              label="Option 1"
              value="option1"
              name="sample-radio"
            />
            <DesignSystemRadio
              v-model="sampleRadio"
              label="Option 2"
              value="option2"
              name="sample-radio"
            />
            <DesignSystemRadio
              v-model="sampleRadio"
              label="Option 3"
              value="option3"
              name="sample-radio"
            />
          </div>
        </DesignSystemCard>
      </div>
    </section>

    <!-- Loading & Modal -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">Loading & Modal</h2>
      <div :class="gridClass">
        <DesignSystemCard title="Loading" color-scheme="blue">
          <div :class="css({ display: 'flex', justifyContent: 'center', py: 8 })">
            <DesignSystemLoading />
          </div>
        </DesignSystemCard>

        <DesignSystemCard title="Modal" color-scheme="purple">
          <DesignSystemButton variant="primary" @click="showModal = true">
            モーダルを開く
          </DesignSystemButton>
          <DesignSystemModal v-model:is-open="showModal" title="サンプルモーダル">
            <p>これはモーダルの内容です。</p>
            <p>任意のコンテンツを表示できます。</p>
          </DesignSystemModal>
        </DesignSystemCard>

        <DesignSystemCard title="Tooltip" color-scheme="gray">
          <div :class="css({ display: 'flex', justifyContent: 'center', py: 4 })">
            <DesignSystemTooltip content="これはツールチップです">
              <DesignSystemButton variant="secondary">
                ホバーしてください
              </DesignSystemButton>
            </DesignSystemTooltip>
          </div>
        </DesignSystemCard>
      </div>
    </section>

    <!-- Card Variants -->
    <section :class="sectionClass">
      <h2 :class="sectionTitleClass">Card Color Schemes</h2>
      <div :class="gridClass">
        <DesignSystemCard title="Blue" icon="💙" color-scheme="blue">
          <p :class="css({ fontSize: 'sm', color: 'gray.600' })">
            ブルーカラースキーム
          </p>
        </DesignSystemCard>

        <DesignSystemCard title="Purple" icon="💜" color-scheme="purple">
          <p :class="css({ fontSize: 'sm', color: 'gray.600' })">
            パープルカラースキーム
          </p>
        </DesignSystemCard>

        <DesignSystemCard title="Green" icon="💚" color-scheme="green">
          <p :class="css({ fontSize: 'sm', color: 'gray.600' })">
            グリーンカラースキーム
          </p>
        </DesignSystemCard>

        <DesignSystemCard title="Red" icon="❤️" color-scheme="red">
          <p :class="css({ fontSize: 'sm', color: 'gray.600' })">
            レッドカラースキーム
          </p>
        </DesignSystemCard>

        <DesignSystemCard title="Yellow" icon="💛" color-scheme="yellow">
          <p :class="css({ fontSize: 'sm', color: 'gray.600' })">
            イエローカラースキーム
          </p>
        </DesignSystemCard>

        <DesignSystemCard title="Gray" icon="🩶" color-scheme="gray">
          <p :class="css({ fontSize: 'sm', color: 'gray.600' })">
            グレーカラースキーム
          </p>
        </DesignSystemCard>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { css } from '~/styled-system/css'

const sampleText = ref('')
const sampleTextarea = ref('')
const sampleSelect = ref('')
const sampleCheckbox = ref(false)
const sampleRadio = ref('option1')
const showModal = ref(false)

const prefectures = [
  { value: 'tokyo', label: '東京都' },
  { value: 'osaka', label: '大阪府' },
  { value: 'kyoto', label: '京都府' },
  { value: 'hokkaido', label: '北海道' },
]

// スタイル
const containerClass = css({
  minH: 'screen',
  bg: 'gray.50',
  py: 8,
})

const headerClass = css({
  maxW: '7xl',
  mx: 'auto',
  px: { base: 4, md: 6, lg: 8 },
  mb: 12,
  textAlign: 'center',
})

const titleClass = css({
  fontSize: { base: '3xl', md: '4xl' },
  fontWeight: 'bold',
  color: 'gray.900',
  mb: 4,
})

const descriptionClass = css({
  fontSize: { base: 'base', md: 'lg' },
  color: 'gray.600',
  maxW: '2xl',
  mx: 'auto',
})

const sectionClass = css({
  maxW: '7xl',
  mx: 'auto',
  px: { base: 4, md: 6, lg: 8 },
  mb: 16,
})

const sectionTitleClass = css({
  fontSize: { base: '2xl', md: '3xl' },
  fontWeight: 'bold',
  color: 'gray.900',
  mb: 6,
})

const gridClass = css({
  display: 'grid',
  gridTemplateColumns: { base: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
  gap: 6,
})

const buttonGridClass = css({
  display: 'flex',
  flexDirection: 'column',
  gap: 3,
  mt: 4,
})
</script>
