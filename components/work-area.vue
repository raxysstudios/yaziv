<template>
    <div class="flex flex-col gap-1">
        <div class="flex flex-row gap-1">
            <slot />
            <div class="flex flex-col gap-1">
                <slot name="v-bar" />
            </div>
        </div>
        <div class="flex flex-row gap-1 mt-auto">
            <slot name="h-bar"/>
        </div>
    </div>
</template>