<script setup>
import { version } from '../../package.json';
</script>

<template>
    <AppSegment>
        <USeparator />
        <div class="flex justify-between">
            <UButton to="https://raxys.app" target="_blank" icon="i-material-symbols-landscape-rounded" size="xs">
                {{ $t('home.raxys') }}
            </UButton>
            <UButton to="https://github.com/raxysstudios/yaziv" target="_blank" size="xs">
                v{{ version }}
            </UButton>
        </div>
    </AppSegment>
</template>
