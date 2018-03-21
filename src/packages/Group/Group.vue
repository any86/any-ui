<template>
    <section class="atom-group">
        <header v-if="title || $slots.header">
            <slot name="header"></slot>
            {{title}}
        </header>
        <slot></slot>
    </section>
</template>
<script>
export default {
    name: 'AtomGroup',
    
    props: {
        title: {}
    }
}
</script>