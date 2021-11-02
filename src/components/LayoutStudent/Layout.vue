<template>
    <v-app class="pa-6">
        <Header />
        <Sidebar />
        <v-main class="content">
            <router-view />
            <Footer />
        </v-main>
    </v-app>
</template>

<script>
    import Header from '@/components/HeaderStudent/Header';
    import Sidebar from '@/components/SidebarStudent/Sidebar';
    import Footer from "@/components/Footer/Footer";
    import './Layout.scss';

    export default {
        name: 'Layout',
        components: {Footer, Header, Sidebar },
    };
</script>

<style src="./Layout.scss" lang="scss" />
